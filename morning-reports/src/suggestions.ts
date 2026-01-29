import { query } from "@anthropic-ai/claude-agent-sdk";
import type { Meeting } from "./calendar.js";
import type { JiraTask } from "./jira.js";

export interface MeetingSuggestions {
  meetingId: string;
  context: string;
  suggestions: string[];
}

export interface TaskSuggestions {
  taskKey: string;
  suggestions: string[];
}

export async function generatePrepSuggestions(
  meetings: Meeting[],
  expertise: string
): Promise<MeetingSuggestions[]> {
  if (meetings.length === 0) {
    return [];
  }

  // Prepare compact meeting summaries for the prompt
  const meetingsSummary = meetings
    .map((m) => ({
      id: m.id,
      title: m.title,
      time: `${new Date(m.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })} - ${new Date(m.endTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`,
      attendeeCount: m.attendees.length,
      description: m.description?.slice(0, 300) || null,
    }))
    .map(
      (m) =>
        `- ${m.title} (${m.time}, ${m.attendeeCount} attendees)${m.description ? `\n  Context: ${m.description}` : ""}`
    )
    .join("\n");

  for await (const message of query({
    prompt: `You are preparing a morning briefing for a Technical Principal at RELEX.

USER EXPERTISE (DO NOT suggest things they already know):
${expertise}

For each meeting below, provide:
1. A brief context summary (1-2 sentences, NOT the verbatim description)
2. 2-3 preparation suggestions that:
   - Are specific and actionable
   - Account for the user's deep expertise in APIs, Kafka, architecture
   - Focus on what they need to BRING or PREPARE, not what they already know
   - Skip obvious suggestions like "review agenda" or "know your domain"

MEETINGS TODAY:
${meetingsSummary}

Meeting data for IDs:
${JSON.stringify(meetings.map((m) => ({ id: m.id, title: m.title })), null, 2)}

Return ONLY a valid JSON array with no additional text:
[
  {
    "meetingId": "string",
    "context": "Brief meeting context (1-2 sentences)",
    "suggestions": ["actionable prep item 1", "actionable prep item 2"]
  }
]`,
    options: {
      maxTurns: 3,
    },
  })) {
    if (message.type === "result" && message.subtype === "success") {
      try {
        const result = message.result.trim();
        const jsonMatch = result.match(/```(?:json)?\s*([\s\S]*?)```/) || [
          null,
          result,
        ];
        const jsonStr = jsonMatch[1]?.trim() || result;
        return JSON.parse(jsonStr) as MeetingSuggestions[];
      } catch (error) {
        console.error("Failed to parse suggestions response:", error);
        console.error("Raw response:", message.result);
        return [];
      }
    }
  }

  return [];
}

export async function generateTaskSuggestions(
  tasks: JiraTask[],
  expertise: string
): Promise<TaskSuggestions[]> {
  if (tasks.length === 0) {
    return [];
  }

  const tasksSummary = tasks
    .map(
      (t) =>
        `- ${t.key}: ${t.summary} (Due: ${t.dueDate}, Status: ${t.status}, Priority: ${t.priority})${t.description ? `\n  Description: ${t.description.slice(0, 500)}` : ""}`
    )
    .join("\n");

  for await (const message of query({
    prompt: `You are preparing a morning briefing for a Technical Principal at RELEX.

USER EXPERTISE (DO NOT suggest things they already know):
${expertise}

For each Jira task below, provide 2-3 preparation suggestions that:
- Are specific and actionable
- Account for the user's deep expertise in APIs, Kafka, architecture
- Focus on HOW to approach or prepare for the task
- Consider the due date urgency
- Skip obvious suggestions

TASKS WITH UPCOMING DEADLINES:
${tasksSummary}

Task keys for reference:
${JSON.stringify(tasks.map((t) => t.key), null, 2)}

Return ONLY a valid JSON array with no additional text:
[
  {
    "taskKey": "AT-123",
    "suggestions": ["actionable suggestion 1", "actionable suggestion 2"]
  }
]`,
    options: {
      maxTurns: 3,
    },
  })) {
    if (message.type === "result" && message.subtype === "success") {
      try {
        const result = message.result.trim();
        const jsonMatch = result.match(/```(?:json)?\s*([\s\S]*?)```/) || [
          null,
          result,
        ];
        const jsonStr = jsonMatch[1]?.trim() || result;
        return JSON.parse(jsonStr) as TaskSuggestions[];
      } catch (error) {
        console.error("Failed to parse task suggestions response:", error);
        console.error("Raw response:", message.result);
        return [];
      }
    }
  }

  return [];
}
