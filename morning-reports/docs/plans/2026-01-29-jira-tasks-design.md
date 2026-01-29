# Jira Tasks Integration Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Jira task tracking to the morning report, showing tasks with upcoming deadlines and AI-generated suggestions.

**Architecture:** Parallel data source pattern matching existing calendar flow. New `jira.ts` module fetches tasks via Claude Agent SDK + mcp-atlassian MCP, suggestions generated alongside meeting suggestions, render combines both in single report.

**Tech Stack:** Bun, TypeScript, Claude Agent SDK, mcp-atlassian MCP tools

---

## Task 1: Create Jira module

**Files:**
- Create: `src/jira.ts`

**Step 1: Create the jira.ts file with types and fetch function**

```typescript
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
```

**Step 2: Verify the file compiles**

Run: `cd "/Users/matias.kakela/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault/Thoughts/morning-reports" && bun build src/jira.ts --outdir /tmp`

Expected: Build succeeds with no errors

**Step 3: Commit**

```bash
git add src/jira.ts
git commit -m "feat: add Jira module to fetch tasks with upcoming deadlines"
```

---

## Task 2: Add task suggestions function

**Files:**
- Modify: `src/suggestions.ts`

**Step 1: Add import for JiraTask type**

At the top of the file, after the existing imports, add:

```typescript
import type { JiraTask } from "./jira.js";
```

**Step 2: Add TaskSuggestions interface**

After the `MeetingSuggestions` interface, add:

```typescript
export interface TaskSuggestions {
  taskKey: string;
  suggestions: string[];
}
```

**Step 3: Add generateTaskSuggestions function**

At the end of the file, add:

```typescript
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
```

**Step 4: Verify the file compiles**

Run: `cd "/Users/matias.kakela/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault/Thoughts/morning-reports" && bun build src/suggestions.ts --outdir /tmp`

Expected: Build succeeds with no errors

**Step 5: Commit**

```bash
git add src/suggestions.ts
git commit -m "feat: add generateTaskSuggestions for Jira tasks"
```

---

## Task 3: Update render to include Jira tasks section

**Files:**
- Modify: `src/render.ts`

**Step 1: Add imports for Jira types**

At the top of the file, after existing imports, add:

```typescript
import type { JiraTask } from "./jira.js";
import type { TaskSuggestions } from "./suggestions.js";
```

**Step 2: Add helper function for formatting due dates**

After the `formatLocation` function, add:

```typescript
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
```

**Step 3: Add renderTasks function**

After `formatDueDate`, add:

```typescript
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
```

**Step 4: Update renderReport function signature and body**

Change the function signature from:
```typescript
export function renderReport(
  meetings: Meeting[],
  suggestions: MeetingSuggestions[]
): string {
```

To:
```typescript
export function renderReport(
  meetings: Meeting[],
  meetingSuggestions: MeetingSuggestions[],
  tasks: JiraTask[] = [],
  taskSuggestions: TaskSuggestions[] = []
): string {
```

Then update the variable name inside from `suggestions` to `meetingSuggestions`:

Change:
```typescript
  const suggestionsMap = new Map<string, MeetingSuggestions>();
  for (const s of suggestions) {
```

To:
```typescript
  const suggestionsMap = new Map<string, MeetingSuggestions>();
  for (const s of meetingSuggestions) {
```

**Step 5: Add tasks section before the generated timestamp**

Find this line:
```typescript
  markdown += `*Generated at ${today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}*\n`;
```

Add before it:
```typescript
  markdown += renderTasks(tasks, taskSuggestions);

```

**Step 6: Verify the file compiles**

Run: `cd "/Users/matias.kakela/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault/Thoughts/morning-reports" && bun build src/render.ts --outdir /tmp`

Expected: Build succeeds with no errors

**Step 7: Commit**

```bash
git add src/render.ts
git commit -m "feat: add Jira tasks section to report rendering"
```

---

## Task 4: Update index.ts to orchestrate Jira flow

**Files:**
- Modify: `src/index.ts`

**Step 1: Add import for Jira module**

After the existing imports, add:

```typescript
import { fetchUpcomingTasks } from "./jira.js";
```

**Step 2: Add import for task suggestions**

Update the suggestions import from:
```typescript
import { generatePrepSuggestions } from "./suggestions.js";
```

To:
```typescript
import { generatePrepSuggestions, generateTaskSuggestions } from "./suggestions.js";
```

**Step 3: Add Jira fetch step in main()**

After the calendar fetch step (after `console.log(\`Found ${allMeetings.length} total event(s)\`);`), add:

```typescript

  // Step 2b: Fetch Jira tasks with upcoming deadlines
  console.log("Fetching Jira tasks with upcoming deadlines...");
  const tasks = await fetchUpcomingTasks();
  console.log(`Found ${tasks.length} task(s) with deadlines in the next 3 days`);
```

**Step 4: Add task suggestions generation**

After the meeting suggestions step (after `console.log(\`Generated suggestions for ${suggestions.length} meeting(s)\`);`), add:

```typescript

  // Step 4b: Generate suggestions for Jira tasks
  console.log("Generating task suggestions...");
  const taskSuggestions = await generateTaskSuggestions(tasks, expertise);
  console.log(`Generated suggestions for ${taskSuggestions.length} task(s)`);
```

**Step 5: Update renderReport call**

Change:
```typescript
  const report = renderReport(workMeetings, suggestions);
```

To:
```typescript
  const report = renderReport(workMeetings, suggestions, tasks, taskSuggestions);
```

**Step 6: Verify the full application compiles**

Run: `cd "/Users/matias.kakela/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault/Thoughts/morning-reports" && bun build src/index.ts --outdir /tmp`

Expected: Build succeeds with no errors

**Step 7: Commit**

```bash
git add src/index.ts
git commit -m "feat: integrate Jira tasks into morning report pipeline"
```

---

## Task 5: Test the full flow

**Step 1: Run the application**

Run: `cd "/Users/matias.kakela/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault/Thoughts/morning-reports" && bun run start`

Expected output includes:
- "Fetching Jira tasks with upcoming deadlines..."
- "Found N task(s) with deadlines in the next 3 days"
- "Generating task suggestions..."
- Report opens in Obsidian with Jira section (if tasks exist)

**Step 2: Verify generated report**

Check the report at `reports/YYYY-MM-DD.md` contains:
- Existing "Today's Schedule" section
- New "Upcoming Jira Tasks" section (if tasks with deadlines exist)
- Each task shows key, summary, due date, status, priority, link, and suggestions

**Step 3: Commit any fixes if needed**

If all works:
```bash
git add -A
git commit -m "test: verify Jira integration works end-to-end"
```
