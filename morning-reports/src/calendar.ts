import { query } from "@anthropic-ai/claude-agent-sdk";

export interface Meeting {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  location?: string;
  description?: string;
}

export async function fetchTodaysMeetings(): Promise<Meeting[]> {
  const today = new Date().toISOString().split("T")[0];

  for await (const message of query({
    prompt: `Fetch my calendar events for today (${today}). Return ONLY a valid JSON array with no additional text, where each event has these fields:
- id: string (unique identifier)
- title: string (event subject/title)
- startTime: string (ISO 8601 format)
- endTime: string (ISO 8601 format)
- attendees: string[] (list of attendee names or emails)
- location: string | null (meeting location or video call link)
- description: string | null (event description/notes)

If there are no events, return an empty array: []`,
    options: {
      settingSources: ["user"],
      allowedTools: [
        "mcp__claude_ai_Microsoft_365__outlook_calendar_search",
        "mcp__claude_ai_Microsoft_365__read_resource",
      ],
      maxTurns: 5,
    },
  })) {
    if (message.type === "result" && message.subtype === "success") {
      try {
        const result = message.result.trim();
        // Extract JSON from the response - handle potential markdown code blocks
        const jsonMatch = result.match(/```(?:json)?\s*([\s\S]*?)```/) || [
          null,
          result,
        ];
        const jsonStr = jsonMatch[1]?.trim() || result;
        return JSON.parse(jsonStr) as Meeting[];
      } catch (error) {
        console.error("Failed to parse calendar response:", error);
        console.error("Raw response:", message.result);
        return [];
      }
    }
  }

  return [];
}
