import { query } from "@anthropic-ai/claude-agent-sdk";

export interface JiraTask {
  key: string;
  summary: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  url: string;
}

export async function fetchUpcomingTasks(): Promise<JiraTask[]> {
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 3);

  const todayStr = today.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  for await (const message of query({
    prompt: `Search for Jira issues on board 14374 (project AT) with due dates between ${todayStr} and ${endStr}.

Use the jira_get_board_issues tool with:
- board_id: "14374"
- jql: "project = AT AND duedate >= ${todayStr} AND duedate <= ${endStr} ORDER BY duedate ASC"
- fields: "summary,status,priority,duedate,description"
- limit: 20

Return ONLY a valid JSON array with no additional text, where each issue has:
- key: string (e.g., "AT-260")
- summary: string (issue title)
- description: string (full description, or empty string if none)
- status: string (status name like "To Do", "In Progress")
- priority: string (priority name like "High", "Medium")
- dueDate: string (YYYY-MM-DD format)
- url: string (full Jira URL like "https://relexsolutions.atlassian.net/browse/AT-260")

If there are no matching issues, return an empty array: []`,
    options: {
      settingSources: ["user"],
      allowedTools: ["mcp__mcp-atlassian__jira_get_board_issues"],
      maxTurns: 5,
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
        return JSON.parse(jsonStr) as JiraTask[];
      } catch (error) {
        console.error("Failed to parse Jira response:", error);
        console.error("Raw response:", message.result);
        return [];
      }
    }
  }

  return [];
}
