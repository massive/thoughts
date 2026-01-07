# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This subdirectory contains Matias's personal literature management system - tracking his reading preferences, library inventory, book recommendations, and to-read list. This is a personal knowledge base, not a software project.

## Core Files

### literature-persona.md
Comprehensive profile of Matias's reading preferences, including:
- Core preferences (loves generational sagas, long books, emotional impact)
- The "Ending Feeling" test for measuring book quality
- Favorite authors by genre
- 5-star benchmark books (Lonesome Dove, Shōgun, The Godfather, etc.)
- What doesn't work (episodic structure, forced humor, alienating atmospheres)
- Reading patterns from 2012-2025 Goodreads data

**When recommending books:** Always reference this file first to understand taste profile.

### library-inventory.md
Current collection across two locations:
- Calibre Library (local iCloud): Author list
- Google Drive (rclone): Specific book titles

**Before recommending:** Check this file to avoid suggesting books already owned.

### recommendations-log.md
Historical record of recommendations given and feedback received. Tracks:
- What was recommended and why
- Matias's verdict (rating, ending feeling)
- Success/failure patterns for future refinement

**After recommendations:** Log new suggestions here with detailed reasoning.

### to-read-list.md
Priority-ordered list of books not yet acquired or read:
- High priority: Strong taste profile matches
- Medium priority: Solid recommendations
- Low priority: Interesting but lower urgency
- Acquired but unread section

**When recommending:** Add books here with priority level and detailed rationale.

## Key Characteristics of Matias's Taste

### The Gold Standard Pattern
- **Lonesome Dove** (Larry McMurtry): Generational Western saga
- **Shōgun** (James Clavell): Cultural immersion + historical epic
- **The Godfather** (Mario Puzo): Family dynamics + moral complexity
- **Words of Radiance** (Brandon Sanderson): Epic worldbuilding + long form

### What Works Best
- Generational scope (decades or generations)
- Deep character bonds developing over time
- Bittersweet emotional resonance
- 800+ pages (feature, not bug)
- Moral complexity (no pure good/evil)
- Slow burn pacing (200+ page setup is fine)
- Historical/cultural immersion

### Deal-Breakers
- Episodic/monster-of-week structure
- Protagonists that don't resonate emotionally
- Forced humor or quippy tone
- Infantile/unbelievable writing
- Later-series decline (author running out of ideas)

## Working with This System

### Giving Recommendations
1. Ask about current mood or desired experience
2. Reference literature-persona.md for taste alignment
3. Check library-inventory.md to avoid duplicates
4. Provide 2-3 recommendations with detailed reasoning:
   - Why this matches the taste profile
   - Expected "ending feeling"
   - Any caveats or considerations
5. Log recommendations in recommendations-log.md
6. Add to to-read-list.md with appropriate priority

### Library Inventory Updates
Rescan commands are in library-inventory.md:
- Calibre: `ls -1 "/Users/matias.kakela/Library/Mobile Documents/com~apple~CloudDocs/Calibre Library"`
- Google Drive: `rclone lsf "gdrive:onyx/books" --files-only`

### Writing Style
Follow parent CLAUDE.md conventions:
- Sentence case for headings
- Narrative style, not bullet points
- Active voice, present tense
- Simple, clear language
- No em dashes

## Reading Format Preferences
- **Fiction:** Ebooks on Onyx Boox (prefers English for ebook availability)
- **Non-fiction:** Audiobooks (Storytel) only
- **Native language:** Finnish, fluent English
