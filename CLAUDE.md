# CLAUDE.md

## Repository Purpose

This is a personal knowledge management repository for organizing development-related thoughts, notes, architecture decisions, plans, and documentation. It uses a symlinked memory system that connects to a centralized memory location at `~/memory/repos/thoughts/`.

## Architecture

### Memory System Structure

The `memory/` directory contains symlinks to categorized subdirectories:
- **MEMORY.md** - Memory system documentation (symlinked from `~/memory/MEMORY.md`)

All content is stored in the actual memory repository at `~/memory/repos/thoughts/`, with the `memory/` directory in this repo acting as a convenience access point via symlinks.

### Important Characteristics

**No code**: This repository contains documentation and thoughts only, not executable code.

There are no particular theme in this repository. It it just a collection of thoughts, ideas, experiments, and notes.

### Creating/Editing Files

When creating or editing memory files:
- Store documents in the appropriate category subdirectory
- Use descriptive filenames with dates when relevant (e.g., `2025_accomplishments_lattice_format.md`)
- Use markdown format for all documentation
- Reference the global `memory/MEMORY.md` for memory system conventions

### Writing Style

- Use sentence case for headings and subheadings
- Use narrative style, not bullet points
- Use active voice
- Use present tense
- Use simple language
- Use clear and concise language
- Avoid em dashes use normal dashes instead

## Development Commands

This repository has no build, test, or deployment commands as it contains documentation only. All work is file creation and editing.
