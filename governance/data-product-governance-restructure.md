# Data Product Governance Documentation Restructure

**Date:** 2025-12-29
**Status:** Proposed
**Goal:** Consolidate ~15 scattered pages into 6-8 clear, flat reference documents

## Current state

The Data Product governance documentation is spread across three locations with significant overlap:

- **Governance folder** (8 pages) - general concepts, some batch-specific content mixed in
- **Batch Data Products guide** (5 subpages) - getting started, conventions, architecture
- **Streaming Data Products guide** (4 subpages) - getting started, standards, ownership

**Problems:**
1. No entry point - governance folder is just a flat list
2. Ownership/roles documented in 3 places
3. "Conventions" page mixes batch and streaming specifics
4. Too many small pages requiring click-through navigation
5. Redundant content (piloting guide, producer/consumer principles)

## Target structure

Six to eight self-contained pages with minimal hierarchy:

```
Data Product Governance/
├── Data Products Overview              (NEW - entry point)
├── Roles and Ownership                 (CONSOLIDATED)
├── Schema Conventions                  (REFOCUSED)
├── Tools and Catalog                   (EXISTS)
├── Batch Data Products                 (CONSOLIDATED)
├── Streaming Data Products             (CONSOLIDATED)
└── Reference                           (OPTIONAL - edge cases)
```

## Page specifications

### 1. Data Products Overview (NEW)

**Purpose:** Entry point answering "what is this, where do I start"

**Content:**
- What data products are (2-3 sentences)
- When to use batch vs streaming (decision table)
- Links to other pages
- Contact/help channels

**Source pages:** New, pulling intro content from existing pages

---

### 2. Roles and Ownership (CONSOLIDATED)

**Purpose:** Single source of truth for who does what

**Content:**
- Domain Owner definition and responsibilities
- Data Product Owner definition and responsibilities
- Module Owner definition and responsibilities
- Current ownership table (link to Data Product Designer)
- Schema governance process
- Approval workflows and contacts

**Source pages to merge:**
- `Data Product roles and ownership` (5580357790)
- Ownership section from `Streaming Data Governance` (4952490685)
- `Ownership and Schema Governance` streaming subpage (4981949361)

---

### 3. Schema Conventions (REFOCUSED)

**Purpose:** Shared naming/typing rules that apply to both batch and streaming

**Content:**
- Field naming rules (lowercase, allowed characters)
- Versioning rules (major.minor.patch semantics)
- Data types (string, integer, double, boolean, date, timestamp, etc.)
- Key/primary key conventions
- Custom fields rules (custom_ prefix)
- What triggers breaking vs non-breaking changes

**Source pages:**
- General sections from `Data product conventions at RELEX` (5557388236)
- Remove batch-specific file format content (belongs in Batch page)
- Remove streaming-specific CloudEvents content (belongs in Streaming page)

---

### 4. Tools and Catalog (EXISTS)

**Purpose:** Where to manage data products

**Content:** Keep existing content from `Data Product management, configuration and catalog tools` (5559648930)

**Changes:** Minor updates for consistency, add links to new structure

---

### 5. Batch Data Products (CONSOLIDATED)

**Purpose:** Complete batch reference in one page

**Content sections:**
1. What batch data products are
2. File format specification (CSV rules, encoding, separators)
3. Container and path structure (raw vs processed)
4. Filename conventions
5. How to produce data (brief guide)
6. How to consume data (brief guide)
7. Architecture overview (diagram)
8. Monitoring and troubleshooting

**Source pages to merge:**
- `Batch Data Products: Getting Started and In-Depth Guide` (4620255490)
- `Batch Data Product Conventions` (4874994544)
- `Getting Started as a Data Producer` (4982767801)
- `Getting Started as a Data Consumer` (4983292001)
- `Batch Data Product Architecture` (4982964415)
- `Monitoring and Troubleshooting` (4983161135)

**Note:** If too long, split into main page + "Batch Technical Reference" subpage

---

### 6. Streaming Data Products (CONSOLIDATED)

**Purpose:** Complete streaming reference in one page

**Content sections:**
1. What streaming data products are
2. CloudEvents envelope specification
3. Topic naming conventions
4. Message key format
5. Schema registry usage
6. How to produce data (brief guide)
7. How to consume data (brief guide)
8. Kafka configuration defaults

**Source pages to merge:**
- `Streaming Data Governance: Ownership, Standards, and Roles` (4952490685) - remove ownership section
- `Streaming Data Standards` (4983292520)
- `Getting Started as a Streaming Data Producer` (4983292549)
- `Getting Started as a Streaming Data Consumer` (4980967002)

**Note:** If too long, split into main page + "Streaming Technical Reference" subpage

---

### 7. Reference (OPTIONAL)

**Purpose:** Edge cases and less common topics

**Content:**
- Data deletions
- Metadata in integrations

**Source pages:**
- `Data deletions in RELEX data products` (5561974803)
- `Metadata in data product integrations` (5730435761)

**Decision:** Can remain as separate pages or consolidate into one Reference page

---

## Pages to delete

| Page | Reason |
|------|--------|
| How to get started with piloting Data Products (5627871298) | Redundant with Batch getting started |
| Data Product Producer & Consumer basic principles (5579964548) | Merged into Overview |
| DRAFT: Overall principles of ownership... (5747507883) | Draft content, merge useful parts into Roles page |
| Individual Getting Started pages (4 pages) | Merged into Batch/Streaming main pages |
| Ownership and Schema Governance (4981949361) | Merged into central Roles page |

---

## Implementation steps

1. **Create Overview page** - write new entry point
2. **Consolidate Roles page** - merge all ownership content
3. **Refocus Schema Conventions** - remove delivery-specific content
4. **Consolidate Batch page** - merge 6 pages into 1-2
5. **Consolidate Streaming page** - merge 4 pages into 1-2
6. **Update cross-links** - ensure all pages link correctly
7. **Delete redundant pages** - remove merged/obsolete content
8. **Update governance folder** - ensure clean navigation

---

## Success criteria

- Reader can find any topic in 1-2 clicks from Overview
- No duplicated content across pages
- Each page has one clear purpose
- Batch and streaming are clearly separated
- Shared concepts (ownership, schema rules) have single source of truth
