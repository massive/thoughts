import type { Meeting } from "./calendar.js";
import type { JiraTask } from "./jira.js";
import type { MeetingSuggestions, TaskSuggestions } from "./suggestions.js";

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

function formatDueDate(dueDateStr: string): string {
  const dueDate = new Date(dueDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const dateFormatted = dueDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (diffDays === 0) return `${dateFormatted} (today)`;
  if (diffDays === 1) return `${dateFormatted} (tomorrow)`;
  return `${dateFormatted} (${diffDays} days)`;
}

function renderTasks(
  tasks: JiraTask[],
  suggestions: TaskSuggestions[]
): string {
  if (tasks.length === 0) {
    return "";
  }

  const suggestionsMap = new Map<string, TaskSuggestions>();
  for (const s of suggestions) {
    suggestionsMap.set(s.taskKey, s);
  }

  let markdown = `## Upcoming Jira Tasks\n\n`;
  markdown += `You have **${tasks.length} task${tasks.length === 1 ? "" : "s"}** with deadlines in the next 3 days.\n\n`;

  for (const task of tasks) {
    markdown += `### ${task.key}: ${task.summary}\n\n`;
    markdown += `**Due:** ${formatDueDate(task.dueDate)}\n`;
    markdown += `**Status:** ${task.status} | **Priority:** ${task.priority}\n`;
    markdown += `**Link:** ${task.url}\n\n`;

    const taskSuggestions = suggestionsMap.get(task.key);
    if (taskSuggestions?.suggestions?.length) {
      markdown += `**Prep:**\n`;
      for (const suggestion of taskSuggestions.suggestions) {
        markdown += `- ${suggestion}\n`;
      }
      markdown += `\n`;
    }

    markdown += `---\n\n`;
  }

  return markdown;
}

export function renderReport(
  meetings: Meeting[],
  meetingSuggestions: MeetingSuggestions[],
  tasks: JiraTask[] = [],
  taskSuggestions: TaskSuggestions[] = []
): string {
  const today = new Date();
  const dateStr = formatDate(today);

  const suggestionsMap = new Map<string, MeetingSuggestions>();
  for (const s of meetingSuggestions) {
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

  markdown += renderTasks(tasks, taskSuggestions);

  markdown += `*Generated at ${today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}*\n`;

  return markdown;
}
