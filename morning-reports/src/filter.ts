import { query } from "@anthropic-ai/claude-agent-sdk";
import type { Meeting } from "./calendar.js";

// Pre-filter obvious non-work events before AI evaluation
const BLOCKLIST_PATTERNS = [
  /\blunch\b/i,
  /\blounas\b/i, // Finnish for lunch
  /\bdaycare\b/i,
  /\bday care\b/i,
  /\bpick up\b/i,
  /\bdoctor\b/i,
  /\bdentist\b/i,
  /\bfocus time\b/i,
  /\bblocked?\b/i,
  /\bpersonal\b/i,
  /\bviva insights\b/i,
  /\b👶/i, // Baby emoji often indicates childcare
];

function isObviouslyPersonal(meeting: Meeting): boolean {
  const textToCheck = `${meeting.title} ${meeting.description || ""}`;
  return BLOCKLIST_PATTERNS.some((pattern) => pattern.test(textToCheck));
}

export async function filterMeetingsNeedingPrep(
  meetings: Meeting[]
): Promise<Meeting[]> {
  if (meetings.length === 0) {
    return [];
  }

  // Pre-filter obvious personal events
  const candidates = meetings.filter((m) => !isObviouslyPersonal(m));

  if (candidates.length === 0) {
    return [];
  }

  // Use AI to filter remaining meetings
  const meetingsForEvaluation = candidates.map((m) => ({
    id: m.id,
    title: m.title,
    description: m.description?.slice(0, 200) || null,
    attendeeCount: m.attendees.length,
  }));

  for await (const message of query({
    prompt: `You are filtering a calendar for meetings that need preparation.

INCLUDE meetings that:
- Are work meetings with colleagues or external parties
- Involve decisions, reviews, planning, or collaboration
- Have an agenda that requires reading or thinking beforehand

EXCLUDE meetings that:
- Are personal (family, appointments, errands)
- Are routine with no prep needed (daily standups, quick syncs)
- Are blocked time or focus time
- Are purely social (coffee chats, team socials - unless presenting)

Meetings to evaluate:
${JSON.stringify(meetingsForEvaluation, null, 2)}

Return ONLY a valid JSON array of meeting IDs that need preparation, like:
["id1", "id2"]

If no meetings need prep, return: []`,
    options: {
      maxTurns: 2,
      model: "claude-haiku-4-5",
    },
  })) {
    if (message.type === "result" && message.subtype === "success") {
      try {
        const result = message.result.trim();
        // Try to extract JSON from the response - handle markdown code blocks or inline arrays
        const jsonMatch = result.match(/```(?:json)?\s*([\s\S]*?)```/) ||
          result.match(/(\[[\s\S]*?\])\s*$/) || [null, result];
        const jsonStr = jsonMatch[1]?.trim() || result;
        const meetingIds = JSON.parse(jsonStr) as string[];

        return candidates.filter((m) => meetingIds.includes(m.id));
      } catch (error) {
        console.error("Failed to parse filter response:", error);
        console.error("Raw response:", message.result);
        // On error, return all candidates rather than nothing
        return candidates;
      }
    }
  }

  return candidates;
}
