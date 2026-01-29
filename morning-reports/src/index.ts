import { fetchTodaysMeetings } from "./calendar.js";
import { filterMeetingsNeedingPrep } from "./filter.js";
import { generatePrepSuggestions } from "./suggestions.js";
import { renderReport } from "./render.js";
import { openInObsidian } from "./open.js";
import { loadExpertise } from "./expertise.js";
import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";

const REPORTS_DIR = join(dirname(import.meta.dir), "reports");

function getReportFilename(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}.md`;
}

async function main() {
  console.log("Starting morning report generation...");

  // Step 1: Load expertise profile
  console.log("Loading expertise profile...");
  const expertise = await loadExpertise();

  // Step 2: Fetch today's calendar events
  console.log("Fetching calendar events...");
  const allMeetings = await fetchTodaysMeetings();
  console.log(`Found ${allMeetings.length} total event(s)`);

  // Step 3: Filter to work meetings that need preparation
  console.log("Filtering meetings that need preparation...");
  const workMeetings = await filterMeetingsNeedingPrep(allMeetings);
  console.log(
    `${workMeetings.length} meeting(s) need preparation (filtered ${allMeetings.length - workMeetings.length})`
  );

  // Step 4: Generate prep suggestions for filtered meetings
  console.log("Generating preparation suggestions...");
  const suggestions = await generatePrepSuggestions(workMeetings, expertise);
  console.log(`Generated suggestions for ${suggestions.length} meeting(s)`);

  // Step 5: Render the markdown report
  console.log("Rendering report...");
  const report = renderReport(workMeetings, suggestions);

  // Step 6: Write to reports directory
  await mkdir(REPORTS_DIR, { recursive: true });
  const filename = getReportFilename();
  const filePath = join(REPORTS_DIR, filename);
  await writeFile(filePath, report, "utf-8");
  console.log(`Report written to ${filePath}`);

  // Step 7: Open in Obsidian
  console.log("Opening in Obsidian...");
  await openInObsidian(filePath);

  console.log("Morning report complete!");
}

main().catch((error) => {
  console.error("Morning report failed:", error);
  process.exit(1);
});
