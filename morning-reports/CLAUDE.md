# Morning Reports

A Bun + TypeScript application that generates daily morning briefings at 7am with calendar events and AI-generated prep suggestions, displayed in Obsidian.

## Architecture

The system runs via launchd at 7am daily:

1. Fetch today's calendar via Claude Code SDK + Microsoft 365 MCP
2. Generate prep suggestions via Claude Code SDK
3. Render markdown from template
4. Write to reports/YYYY-MM-DD.md
5. Open Obsidian and bring to foreground

## Project structure

- `src/index.ts` - Entry point that orchestrates the flow
- `src/calendar.ts` - Fetch calendar via Claude Code SDK
- `src/suggestions.ts` - Generate prep suggestions via Claude Code SDK
- `src/render.ts` - Markdown rendering
- `src/open.ts` - macOS Obsidian integration
- `reports/` - Generated daily reports

## Development commands

```bash
mise install    # Install dependencies
mise dev        # Run in watch mode
mise start      # Generate morning report
mise test       # Run tests
mise clean      # Remove build artifacts
```

## Scheduling

The launchd plist at `~/Library/LaunchAgents/com.user.morning-report.plist` runs this at 7am daily.

```bash
# Load the scheduler
launchctl load ~/Library/LaunchAgents/com.user.morning-report.plist

# Manual trigger
launchctl start com.user.morning-report

# Check logs
cat /tmp/morning-report.log
```
