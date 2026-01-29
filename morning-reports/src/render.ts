import type { Meeting } from "./calendar.js";
import type { MeetingSuggestions } from "./suggestions.js";

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatLocation(location: string | undefined): string {
  if (!location) return "";

  // Shorten common locations
  if (location.includes("teams.microsoft.com")) return "Teams";
  if (location.includes("zoom.us")) return "Zoom";
  if (location.includes("meet.google.com")) return "Meet";

  // Truncate long locations
  if (location.length > 30) {
    return location.slice(0, 27) + "...";
  }

  return location;
}

export function renderReport(
  meetings: Meeting[],
  suggestions: MeetingSuggestions[]
): string {
  const today = new Date();
  const dateStr = formatDate(today);

  const suggestionsMap = new Map<string, MeetingSuggestions>();
  for (const s of suggestions) {
    suggestionsMap.set(s.meetingId, s);
  }

  let markdown = `# Morning Briefing - ${dateStr}\n\n`;

  if (meetings.length === 0) {
    markdown += `## No meetings scheduled\n\n`;
    markdown += `Your calendar is clear today. Consider using this time for:\n\n`;
    markdown += `- Deep work on important projects\n`;
    markdown += `- Catching up on documentation\n`;
    markdown += `- Learning something new\n`;
    markdown += `- Taking a proper break\n`;
  } else {
    markdown += `## Today (${meetings.length} meeting${meetings.length === 1 ? "" : "s"})\n\n`;

    for (const meeting of meetings) {
      const startTime = formatTime(meeting.startTime);
      const endTime = formatTime(meeting.endTime);
      const location = formatLocation(meeting.location);

      // Compact header: time | title | location
      const locationPart = location ? ` | ${location}` : "";
      markdown += `### ${startTime}-${endTime} | ${meeting.title}${locationPart}\n\n`;

      // Meeting context from AI (or fallback to brief description)
      const meetingSuggestions = suggestionsMap.get(meeting.id);
      if (meetingSuggestions?.context) {
        markdown += `${meetingSuggestions.context}\n\n`;
      } else if (meeting.description) {
        // Fallback: truncate description
        const brief =
          meeting.description.length > 150
            ? meeting.description.slice(0, 147) + "..."
            : meeting.description;
        markdown += `${brief}\n\n`;
      }

      // Show attendees only if small group (3 or fewer)
      if (meeting.attendees.length > 0 && meeting.attendees.length <= 3) {
        markdown += `*With: ${meeting.attendees.join(", ")}*\n\n`;
      }

      // Preparation suggestions
      if (meetingSuggestions?.suggestions?.length) {
        markdown += `**Prep:**\n`;
        for (const suggestion of meetingSuggestions.suggestions) {
          markdown += `- ${suggestion}\n`;
        }
        markdown += `\n`;
      }

      markdown += `---\n\n`;
    }
  }

  markdown += `*Generated at ${today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}*\n`;

  return markdown;
}
