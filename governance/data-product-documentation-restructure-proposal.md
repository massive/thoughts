    # Proposal: Data Product Documentation Restructure

**Author:** Matias Kakela
**Date:** 2025-12-30
**Status:** Draft
**Audience:** Shared Services Architecture Board, Data Bridge team, documentation stakeholders

## Summary

This proposal recommends consolidating the Data Product governance documentation from approximately 15 scattered pages across three locations into 6-8 flat, self-contained reference documents. The goal is to eliminate duplication, establish clear single sources of truth, and make the documentation accessible to readers unfamiliar with the topic.

## Problem statement

The current Data Product governance documentation suffers from several structural problems that make it difficult to use as a reference:

**No clear entry point.** The governance folder at `/wiki/spaces/II/folder/5581111456` contains eight pages in a flat list with no index or navigation guidance. Readers land in the folder and must guess where to start.

**Ownership and roles documented in multiple places.** The concept of who owns data products and their responsibilities appears in at least three locations:
- "Data Product roles and ownership" in the governance folder
- "Streaming Data Governance: Ownership, Standards, and Roles" main page
- "Ownership and Schema Governance" as a streaming subpage

**Conventions page tries to do too much.** The "Data product conventions at RELEX" page mixes truly shared conventions (schema naming, versioning) with batch-specific and streaming-specific details, creating confusion about what applies where.

**Deep hierarchy requires click-through navigation.** The Batch guide has five subpages and the Streaming guide has four subpages. Readers looking for a simple answer must navigate through multiple pages.

**Redundant content.** "How to get started with piloting Data Products" overlaps significantly with the Batch getting started guide. "Data Product Producer & Consumer basic principles" duplicates content found in both Batch and Streaming sections.

## Goals

1. Create a clear entry point for Data Product governance documentation
2. Establish single sources of truth for shared concepts (ownership, schema conventions)
3. Keep batch and streaming content cleanly separated
4. Minimize hierarchy - readers should find answers in 1-2 clicks
5. Make documentation suitable for both reference use and architectural guidance

## Anti-goals

- Creating exhaustive tutorials - these are reference docs, not training materials
- Mandating specific tooling or implementation details - those belong in team-specific documentation
- Restructuring content outside the governance folder scope

## Proposed structure

The new structure uses a flat hierarchy with 6-8 self-contained pages:

```
Data Product Governance/
├── Data Products Overview              (NEW - entry point)
├── Roles and Ownership                 (CONSOLIDATED)
├── Schema Conventions                  (REFOCUSED)
├── Tools and Catalog                   (EXISTS - minor updates)
├── Batch Data Products                 (CONSOLIDATED)
├── Streaming Data Products             (CONSOLIDATED)
└── Reference                           (OPTIONAL - edge cases)
```

### Page specifications

#### 1. Data Products Overview (NEW)

**Purpose:** Entry point answering "what is this, where do I start"

**Content:**
- What data products are (2-3 sentences)
- When to use batch vs streaming (decision table)
- Links to other pages with brief descriptions
- Contact channels for questions

**Why this is needed:** Currently readers land in a flat folder with no guidance. This page orients them.

---

#### 2. Roles and Ownership (CONSOLIDATED)

**Purpose:** Single source of truth for who does what

**Content:**
- Domain Owner definition and responsibilities
- Data Product Owner definition and responsibilities
- Module Owner definition and responsibilities
- Current ownership table (link to Data Product Designer)
- Schema governance process and approval workflows
- Contacts for governance questions

**Source pages to merge:**
- "Data Product roles and ownership" (page 5580357790)
- Ownership section from "Streaming Data Governance" main page (page 4952490685)
- "Ownership and Schema Governance" streaming subpage (page 4981949361)

**Why consolidation is needed:** Three separate pages cover overlapping aspects of ownership. Streaming has its own ownership section that duplicates and sometimes contradicts the governance folder version.

---

#### 3. Schema Conventions (REFOCUSED)

**Purpose:** Shared naming and typing rules that apply to both batch and streaming

**Content:**
- Field naming rules (lowercase, allowed characters: a-z, 0-9, underscore)
- Versioning rules (major.minor.patch semantics, breaking vs non-breaking changes)
- Data types (string, integer, double, boolean, date, timestamp, etc.)
- Key and primary key conventions
- Custom fields rules (custom_ prefix)

**What to remove from current page:**
- Batch-specific file format details (move to Batch page)
- Streaming-specific CloudEvents details (move to Streaming page)

**Source:** Refocus "Data product conventions at RELEX" (page 5557388236)

**Why refocusing is needed:** Current page mixes truly shared conventions with delivery-specific details. Readers cannot tell what applies to their use case.

---

#### 4. Tools and Catalog (EXISTS)

**Purpose:** Where to manage data products

**Content:** Keep existing content from "Data Product management, configuration and catalog tools" (page 5559648930)

**Changes:** Minor updates for consistency, add links to new structure

---

#### 5. Batch Data Products (CONSOLIDATED)

**Purpose:** Complete batch reference in one page

**Content sections:**
1. What batch data products are
2. File format specification (CSV rules, encoding, separators)
3. Container and path structure (raw vs processed)
4. Filename conventions
5. How to produce data (brief guide with key steps)
6. How to consume data (brief guide with key steps)
7. Architecture overview (diagram)
8. Monitoring and troubleshooting

**Source pages to merge:**
- "Batch Data Products: Getting Started and In-Depth Guide" (page 4620255490)
- "Batch Data Product Conventions" (page 4874994544)
- "Getting Started as a Data Producer" (page 4982767801)
- "Getting Started as a Data Consumer" (page 4983292001)
- "Batch Data Product Architecture" (page 4982964415)
- "Monitoring and Troubleshooting" (page 4983161135)

**Alternative:** If the consolidated page exceeds reasonable length, split into main page plus one "Batch Technical Reference" subpage for detailed specifications.

**Why consolidation is needed:** Six separate pages force readers to navigate extensively for basic questions. A reader asking "how do I produce batch data" should find the answer on one page.

---

#### 6. Streaming Data Products (CONSOLIDATED)

**Purpose:** Complete streaming reference in one page

**Content sections:**
1. What streaming data products are
2. CloudEvents envelope specification
3. Topic naming conventions
4. Message key format
5. Schema registry usage
6. How to produce data (brief guide with key steps)
7. How to consume data (brief guide with key steps)
8. Kafka configuration defaults

**Source pages to merge:**
- "Streaming Data Governance: Ownership, Standards, and Roles" (page 4952490685) - content only, ownership moves to consolidated Roles page
- "Streaming Data Standards" (page 4983292520)
- "Getting Started as a Streaming Data Producer" (page 4983292549)
- "Getting Started as a Streaming Data Consumer" (page 4980967002)

**Alternative:** If the consolidated page exceeds reasonable length, split into main page plus one "Streaming Technical Reference" subpage.

**Why consolidation is needed:** Four separate pages plus ownership content scattered across the main page creates confusion. Kafka-specific ownership details should link to the central Roles page rather than duplicating it.

---

#### 7. Reference (OPTIONAL)

**Purpose:** Edge cases and less common topics

**Content:**
- Data deletions
- Metadata in integrations

**Source pages:**
- "Data deletions in RELEX data products" (page 5561974803)
- "Metadata in data product integrations" (page 5730435761)

**Decision:** Can remain as separate pages or consolidate into one Reference page depending on length.

---

## Pages to delete or archive

| Page | Action | Reason |
|------|--------|--------|
| How to get started with piloting Data Products (5627871298) | Delete | Content covered by Batch getting started |
| Data Product Producer & Consumer basic principles (5579964548) | Merge into Overview, then delete | Generic principles duplicated in Batch/Streaming sections |
| DRAFT: Overall principles of ownership... (5747507883) | Merge useful content into Roles page, then delete | Draft content, incomplete |
| Individual Getting Started pages (4 pages) | Merge into Batch/Streaming main pages | Reduces navigation depth |
| Ownership and Schema Governance (4981949361) | Merge into central Roles page | Eliminates streaming-specific ownership duplication |

## Implementation approach

### Phase 1: Create new structure (Week 1-2)

1. Create "Data Products Overview" page as the new entry point
2. Consolidate all ownership content into single "Roles and Ownership" page
3. Refocus "Schema Conventions" to remove delivery-specific content

### Phase 2: Consolidate delivery-specific content (Week 2-3)

4. Consolidate Batch pages into one comprehensive page
5. Consolidate Streaming pages into one comprehensive page
6. Update all cross-links between pages

### Phase 3: Cleanup (Week 3-4)

7. Archive or delete redundant pages
8. Add redirects from old URLs to new locations
9. Update any external references to old page locations
10. Announce changes to affected teams

## Success criteria

- Reader can find any topic in 1-2 clicks from Overview page
- No duplicated content across pages
- Each page has one clear purpose
- Batch and streaming content clearly separated
- Shared concepts (ownership, schema rules) have single source of truth
- Documentation serves both reference use and architectural guidance

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Breaking existing links | Add redirects from old URLs; announce changes |
| Lost content during consolidation | Review each source page systematically before deletion |
| Resistance to change | Involve stakeholders early; explain benefits |
| Consolidated pages too long | Split into main page + technical reference subpage if needed |

## Open questions

1. Should the governance folder be renamed to better reflect its purpose?
2. Who should own ongoing maintenance of the consolidated pages?
3. Should we add a changelog or revision history to track documentation updates?

## Next steps

1. Review this proposal with Shared Services Architecture Board
2. Get sign-off from Data Bridge team and affected stakeholders
3. Begin Phase 1 implementation
4. Schedule review checkpoint after each phase


---

# Implementation Progress

**Last updated:** 2026-01-08
**Status:** In Progress - Phase 1

## Scope constraint

**IMPORTANT:** We are ONLY creating and modifying pages under the new [Data Product Governance](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5769626049/Data+Product+Governance) section (page 5769626049) and its child pages. We are NOT updating, changing, or modifying any other existing pages at this time. Source pages remain untouched - archival and link updates to external pages will happen in a separate cleanup phase after all new content is created.

## Completed tasks

### 1. Data Products Overview (NEW) - DONE

**New page created:** [Data Product Governance](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5769626049/Data+Product+Governance) (5769626049)

**Content added:**
- Definition of data products
- Batch vs streaming decision table
- Documentation index with links
- Help channels

**Source pages referenced:**
| Page ID | Page Title | Content Used | Status |
|---------|------------|--------------|--------|
| 5579964548 | Data Product Producer & Consumer basic principles | Definition context | To archive |
| 5557388236 | Data product conventions at RELEX | Definition context | Keep (will be refocused) |
| 4620255490 | Batch Data Products: Getting Started | Batch description | Keep (will be consolidated) |
| 4952490685 | Streaming Data Governance | Streaming description | Keep (will be consolidated) |

---

### 2. Roles and Ownership (CONSOLIDATED) - DONE

**New page created:** [Roles and Ownership](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5770052061/Roles+and+Ownership) (5770052061)

**Content added:**
- Role definitions table (Domain Owner, DPO, Module Owner, Data Products Team)
- Ownership models table (one-to-one through many-to-many)
- DPO selection criteria
- Schema governance process (high-level)
- Breaking change process
- Governance contacts

**Note:** Per-domain ownership tables with specific people are intentionally NOT in this page - they live in [Data Product Catalog](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/4835312812) (4835312812) to keep dynamic assignment data separate from stable governance concepts.

**Source pages merged:**
| Page ID | Page Title | Content Used | Status |
|---------|------------|--------------|--------|
| 5580357790 | Data Product roles and ownership | Role definitions, domain ownership table | To archive |
| 4952490685 | Streaming Data Governance main page | Ownership models, DPO concept | Keep (ownership section now links here) |
| 4981949361 | Ownership and Schema Governance | Detailed ownership models, schema governance process | To archive |

#### Detailed Design for Roles and Ownership Consolidation

**Design Date:** 2026-01-07

**Design Decisions:**

Four key decisions shaped the consolidated Roles and Ownership page:

1. **Separation of Governance Concepts from Dynamic Data**: The Roles and Ownership page documents stable governance concepts (role definitions, ownership models, processes). Dynamic ownership assignments (who currently owns what) live in the [Data Product Catalog](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/4835312812) (4835312812). This prevents governance documentation from becoming stale when people change roles.

2. **Abstraction from Delivery Mechanism**: The page defines ownership models that apply regardless of whether data is batch or streaming. Streaming-specific operational details (topic creation, ACL management, Kafka configuration) belong in the Streaming Data Products consolidated page, not here.

3. **Schema Governance as Subset of Ownership**: Schema change processes (backward-compatible, forward-compatible, breaking) are included because they directly depend on ownership roles. The DPO's authority over schema evolution is central to the ownership model.

4. **Single Source of Truth for Role Definitions**: Previously, roles were defined differently in different places. The streaming governance page emphasized DPO for many-to-many scenarios, while the batch-focused page emphasized Domain Owners. The consolidated page presents a unified model where all roles coexist in a clear hierarchy.

**Current Page Structure:**

```
Roles and Ownership (5770052061)

1. Introduction
   - Page purpose: defines roles and documents ownership

2. Role definitions
   - Table with 4 roles: Domain Owner, DPO, Module Owner, Data Products Team
   - Each role has clear responsibilities

3. Ownership models
   - Table with 4 scenarios: Direct (1:1), Broadcasting (1:N), Funnel (N:1), Data product (N:N)
   - Each shows producers, consumers, owner, and notes

4. Data Product Owner selection
   - Criteria for DPO appointment in many-to-many scenarios
   - DPO authority over schema changes
   - Link to II-SIG as final authority

5. Schema governance process
   - Table with 3 change types and their processes
   - Backward-compatible, forward-compatible, breaking changes

6. Breaking change process
   - 6-step process from proposal to documentation

7. Governance contacts
   - II-SIG for policy/approval
   - Data Domain Owner for domain-specific guidance
```

**Content Mapping from Source Pages:**

| Source Page | Section/Content | Action | Notes |
|------------|-----------------|--------|-------|
| 5580357790 (Data Product roles and ownership) | Role definitions (Domain Owner, DPO, Module Owner, Data Products Team) | **Migrated** | Reformatted as table with expanded responsibilities |
| 5580357790 | Per-domain ownership table (Customer Data, F&R, P&P, etc.) | **Not migrated - by design** | Dynamic data lives in Data Product Catalog (4835312812) |
| 5580357790 | Links to Data Product Designer | **Not migrated - gap** | Should add link to Data Product Catalog |
| 4952490685 (Streaming Data Governance main page) | DPO concept and responsibilities | **Migrated** | Combined with role definitions |
| 4952490685 | Ownership decision tree (1:1, 1:N, N:1, N:N) | **Migrated** | Became ownership models table |
| 4952490685 | Streaming-specific TLDR and technical essentials | **Not migrated - by design** | Streaming-specific, belongs in Streaming page |
| 4981949361 (Ownership and Schema Governance) | Understanding Streaming Data Products | **Not migrated - by design** | Streaming-specific introduction |
| 4981949361 | Data product vs integration criteria | **Not migrated - by design** | Streaming-specific, move to Streaming page |
| 4981949361 | Topic and schema ownership excerpt | **Partially migrated** | Ownership models adapted |
| 4981949361 | Single-owner and many-to-many scenarios | **Migrated** | Became ownership models table |
| 4981949361 | DPO responsibilities and authority | **Migrated** | Combined into DPO selection section |
| 4981949361 | Decision matrix | **Migrated** | Simplified into ownership models table |
| 4981949361 | "What does ownership mean?" section | **Not migrated - gap** | Practical responsibilities missing |
| 4981949361 | Schema Registry requirements | **Not migrated - by design** | Streaming-specific technical detail |
| 4981949361 | CloudEvents compliance | **Not migrated - by design** | Streaming-specific |
| 4981949361 | Schema evolution process | **Migrated** | Became schema governance process |
| 4981949361 | Breaking change process | **Migrated** | Full 6-step process included |
| 4981949361 | Access control for data products | **Not migrated - by design** | Streaming-specific (Kafka ACLs) |
| 4981949361 | Monitoring and observability | **Not migrated - by design** | Streaming-specific |
| 4981949361 | Data retention and log compaction | **Not migrated - by design** | Streaming-specific (Kafka) |
| 5747507883 (DRAFT ownership principles) | Field-level and row-level ownership complexity | **Not migrated - incomplete** | Draft content, concepts worth capturing |
| 5747507883 | Guiding principles for dual mastering | **Not migrated - incomplete** | Useful but draft status |

**Identified Gaps in Current Page:**

1. **Missing link to Data Product Catalog**: Page should direct readers to Data Product Catalog (4835312812) for current domain ownership tables and Data Product Designer links.

2. **Missing "What ownership means practically"**: The source page explained day-to-day responsibilities: topic creation, ACL approvals, schema management delegation. This operational context helps new readers understand what they're signing up for.

3. **Missing link to Data Product Designer**: Should reference the tool directly for DPO/Module Owner lookups.

**Recommended Additions:**

Add a new section after "Role definitions" called "Finding current ownership":

```
## Finding current ownership

For current ownership assignments by domain, see the [Data Product Catalog](link).

The authoritative source for Data Product Owners and Module Owners is
[Data Product Designer](https://data-product-designer.data-internal.relexsolutions.com/).
```

Optionally add a brief "What ownership means in practice" section after "Ownership models":

```
## What ownership means in practice

Being an owner of a data product means:
- Managing schema definitions and evolution
- Approving access requests from consumers
- Coordinating breaking changes with affected parties
- Maintaining documentation and discoverability

For streaming data products, this also includes topic creation and ACL management.
For batch data products, this includes container access and path conventions.
```

**Content NOT to Include (Belongs Elsewhere):**

The following content from source pages should NOT be in the Roles and Ownership page:

| Content | Why Excluded | Where It Belongs |
|---------|--------------|------------------|
| CloudEvents envelope format | Streaming-specific | Streaming Data Products page |
| Kafka topic naming conventions | Streaming-specific | Streaming Data Products page |
| ACL management details | Streaming-specific | Streaming Data Products page |
| Schema Registry configuration | Streaming-specific | Streaming Data Products page |
| Log compaction and retention | Streaming-specific | Streaming Data Products page |
| "Data product vs integration" criteria | Streaming-specific | Streaming Data Products page |
| Consumer/producer configuration | Streaming-specific | Streaming Data Products page |
| Per-domain ownership tables | Dynamic data | Data Product Catalog (4835312812) |
| Specific people assignments | Dynamic data | Data Product Catalog (4835312812) |

**Status:** COMPLETE

The page successfully consolidates all core governance concepts. Additions made on 2026-01-07:
1. "Finding current ownership" section with links to Data Product Catalog and Data Product Designer
2. "What ownership means in practice" section explaining day-to-day responsibilities

---

## Remaining tasks

### 3. Schema Conventions (REFOCUSED) - DONE

**New page created:** [Schema Conventions](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5786894469/Schema+Conventions) (5786894469)

**Content added:**
- Introduction with scope and links to delivery-specific pages
- Data product key information (domain, owner, versioning, naming)
- Field naming rules (lowercase a-z, 0-9, underscore)
- Abstract data types (semantic definitions without format details)
- Schema structure (flat vs hierarchical concepts)
- Keys and identifiers (code field, _code suffix, composite keys)
- Field constraints (NOT NULL, required, description, length)
- Custom fields (custom_ prefix, custom_fields object)
- Versioning (major.minor.patch semantics, breaking vs non-breaking)
- Module mappings (Data Product Designer integration)
- Customer-specific configurations (instance inheritance model)
- Field standardization (first-come, first-served approach)

**Source page:** 5557388236 (Data product conventions at RELEX)

**Content refactored:**
- Data types: Removed CSV-specific details (quote characters, decimal separators) - now links to Batch page
- Schema structure: Kept flat/hierarchical concepts, removed CSV/Kafka format details - now links to delivery pages

**Content removed (already documented elsewhere):**
- CSV file format specifications → Already in Batch Data Product Conventions (4874994544)
- Container and path structures → Already in Batch Data Product Conventions (4874994544)
- Filename conventions → Already in Batch Data Product Conventions (4874994544)
- CloudEvents envelope → Already in Streaming Data Standards (4983292520)
- Kafka topic naming → Already in Streaming Data Standards (4983292520)
- Message key formats → Already in Streaming Data Standards (4983292520)

#### Detailed Design for Schema Conventions Refocus

**Design Date:** 2026-01-07

**Design Decisions:**

Three key decisions shape the refocused Schema Conventions page:

1. **Abstract Data Types + Delivery Mappings**: Schema Conventions defines abstract types (string, integer, date, etc.) with semantic meaning. Batch page shows how these map to CSV representations (quote characters, decimal separators). Streaming page shows JSON Schema equivalents. This approach avoids duplication while maintaining shared vocabulary.

2. **Split Schema Types from Delivery Details**: Schema Conventions keeps the abstract concept of flat vs hierarchical schemas with examples. Batch page explains how hierarchical is not supported in CSV. Streaming page explains hierarchical support in JSON. Clear separation of concerns.

3. **Keep Tool-Specific Sections**: Module mappings and customer-specific configurations stay in Schema Conventions. These sections explain how standard schemas get configured for specific use cases. While tool-focused, they are part of the schema lifecycle and fit logically after defining what schemas are.

**Proposed Page Structure:**

```
Schema Conventions (Refocused - Shared Rules Only)

1. Introduction
   - Scope: conventions that apply to ALL data products
   - Links to Batch Data Products (4874994544) for CSV-specific details
   - Links to Streaming Data Standards (4983292520) for Kafka-specific details

2. Data Product Key Information
   - Domain assignment
   - Owner email
   - Version information
   - Data product code (a-z, 0-9, underscore)
   - Naming conventions (plural names, associative entities with dash)
   - Supported schema types and delivery mechanisms

3. Field Naming Rules
   - Lowercase a-z, 0-9, underscore only
   - Avoid denormalization (prefer foreign keys)
   - Examples of good and bad field names

4. Data Types (ABSTRACT - No Format-Specific Details)
   - Type definitions table:
     * string: variable-length text (max 16MB, customizable)
     * integer: 4-byte integer values
     * double: decimal or integer values
     * date: calendar dates
     * time: time of day
     * boolean: true/false values
     * timestamp: date and time with timezone
     * enum: enumerated values (SCREAMING_SNAKE_CASE)
   - Note: "See Batch Data Product Conventions for CSV representations"
   - Note: "See Streaming Data Standards for JSON Schema mappings"

5. Schema Structure (ABSTRACT)
   - Flat schemas: single-level data without hierarchies
   - Hierarchical schemas: structured data with nested levels
   - When to use each type
   - Note: "Delivery mechanism support varies - see Batch/Streaming pages"

6. Keys and Identifiers
   - Primary key conventions: prefer 'code' field
   - Foreign key conventions: use '_code' suffix (product_code, location_code)
   - Composite keys: multiple key fields for unique identification
   - Examples from Product-locations, Closed dates

7. Field Constraints
   - Key constraint (primary, composite)
   - NOT NULL constraint
   - Required fields (must be present in payloads)
   - Description (documentation for each field)
   - Length limitations (optional, field-specific)

8. Custom Fields
   - custom_ prefix requirement
   - custom_fields object structure
   - Cannot be used as key fields
   - Schema extension rules

9. Versioning
   - Major.minor.patch semantics (1.0.0)
   - Breaking changes (major version): field deletion, type changes, new required fields, constraint changes
   - Non-breaking changes (minor version): new optional fields, metadata updates
   - Customer-specific releases (patch version): customer instance modifications
   - Independent release cycles per data product

10. Module Mappings
    - Data Product Designer tool usage
    - Module-level specifications (owner, description)
    - Field-level specifications (mandatory, used for, impact if missing)
    - Mapping to latest schema version

11. Customer-Specific Data Product Instance Configurations
    - Instance version concept (what runs for customer X)
    - Auto-generation from module mappings
    - Configuration rules:
      * Required standard fields: cannot change or remove
      * Optional fields: can remove, can add from standard set
      * Custom fields: add with custom_ prefix
    - Connection to standard version for upgrades

12. Field Standardization for Shared Data Products
    - First-come, first-served naming approach
    - Request process for new fields
    - Mapping requirements for other product areas
```

**Content Mapping:**

Content from current page 5557388236:

| Current Section | Action | New Location |
|----------------|--------|--------------|
| Data product key information | Keep | Section 2 (cleaned up) |
| Field name rules | Keep | Section 3 (unchanged) |
| Key field constraint | Keep | Section 6 (expanded) |
| NOT NULL, required, description | Keep | Section 7 (consolidated) |
| Data types table | **Refactor** | Section 4 (remove CSV-specific details like quote characters, decimal separators) |
| Schema types and delivery mechanisms | **Split** | Abstract concept stays in Section 5; CSV/Kafka details move to delivery-specific pages |
| CSV file format details | **Remove** | Already in Batch Data Product Conventions (4874994544) |
| Paths and containers | **Remove** | Already in Batch Data Product Conventions (4874994544) |
| Filenames | **Remove** | Already in Batch Data Product Conventions (4874994544) |
| CloudEvents reference | **Remove** | Already in Streaming Data Standards (4983292520) |
| Module mappings | Keep | Section 10 (unchanged) |
| Customer configurations | Keep | Section 11 (unchanged) |
| Schema extensions | Keep | Section 8 (moved earlier, consolidated with custom fields) |
| Versioning | Keep | Section 9 (unchanged) |
| Field standardization | Keep | Section 12 (unchanged) |

**Cross-References to Add:**

The refocused page must link to delivery-specific pages at these points:

- Introduction: prominent links to both Batch and Streaming pages
- Data Types section: "For CSV format specifications, see Batch Data Product Conventions"
- Data Types section: "For JSON Schema specifications, see Streaming Data Standards"
- Schema Structure section: "CSV supports flat schemas only - see Batch page"
- Schema Structure section: "Kafka supports both flat and hierarchical - see Streaming page"

**Content Already in Delivery-Specific Pages:**

These topics are already documented and should NOT be duplicated:

From Batch Data Product Conventions (4874994544):
- CSV character encoding (UTF-8, no BOM)
- Field separator (semicolon)
- Quote character rules
- Line separators
- Compression (GZIP)
- Container structure (shared-data-products-raw, shared-data-products-processed)
- Path conventions
- Filename patterns
- Empty field representations
- CSV-specific data type formats (decimal separators, timestamp formats)

From Streaming Data Standards (4983292520):
- CloudEvents envelope structure
- Topic naming conventions
- Message key format
- Schema registry subjects
- Partition usage
- Compacted topics
- Tombstone records for deletions
- JSON payload conventions (snake_case, null handling)
- Kafka configuration defaults

---

### 4. Tools and Catalog - DEFERRED

**Original action:** Minor updates to existing page 5559648930

**Status:** DEFERRED per scope constraint - we are not modifying pages outside the new Data Product Governance section at this time. Link updates to this page will happen in the cleanup phase.

**Alternative:** If Tools and Catalog content needs to be part of the new structure, create a NEW page under Data Product Governance that consolidates or references the tooling information.

---

### 5. Batch Data Products (HIERARCHICAL) - DONE

**Structure decision (2026-01-08):** Based on debate with Codex and Gemini, adopting hierarchical structure instead of flat. Rationale:
- Producers and consumers have different mental models and tasks
- Confluence search cannot deep-link to headings, so separate pages improve discoverability
- Separating "Reference" (technical specs) from "Guides" (how-to) reduces cognitive load
- Role-specific guides can include code examples without creating "wall of text"

**Action:** Create parent page with two sub-pages

**New page structure:**
```
Batch Data Products/                    (Parent - technical contract)
├── Producer Guide                      (Sub-page - how to publish data)
└── Consumer Guide                      (Sub-page - how to consume data)
```

**5a. Batch Data Products (Parent page)**
- Introduction: what batch data products are, key technologies
- File format specification: CSV rules, UTF-8, semicolon separator, quoting, compression
- Data types table: string, integer, double, date, time, boolean, timestamp
- Container structure: shared-data-products-raw, shared-data-products-processed
- Path conventions: data product folders, file type subfolders
- Filename conventions: pattern, timestamps, unique IDs
- Architecture overview: ABS, Data Product Designer, Dagster, Snowflake
- Monitoring overview: available tools, key metrics
- Current limitations: pilot phase, CSV only, regional availability

**5b. Producer Guide (Sub-page)**
- Prerequisites
- Step-by-step workflow: Contact II-SIG, get ABS access, understand schema, implement format, validate, publish, monitor
- Code example (Python)
- Best practices
- Getting help

**5c. Consumer Guide (Sub-page)**
- Prerequisites
- Step-by-step workflow: Get ABS access, discover products, implement consumption, handle data types, monitor
- Consumption patterns: incremental processing, selective fields, error handling, schema evolution
- File discovery strategies: polling vs full scan
- Code example (Python)
- Best practices
- Getting help

**Source pages to merge:**
| Page ID | Page Title | Content Goes To |
|---------|------------|-----------------|
| 4620255490 | Batch Data Products: Getting Started and In-Depth Guide | Parent page (intro, overview) |
| 4874994544 | Batch Data Product Conventions | Parent page (file format, paths, filenames) |
| 4982767801 | Getting Started as a Data Producer | Producer Guide |
| 4983292001 | Getting Started as a Data Consumer | Consumer Guide |
| 4982964415 | Batch Data Product Architecture | Parent page (architecture section) |
| 4983161135 | Monitoring and Troubleshooting | Parent page (monitoring section) + both guides |

---

### 6. Streaming Data Products (HIERARCHICAL) - NOT STARTED

**Action:** Create parent page with two sub-pages (same structure as Batch)

**New page structure:**
```
Streaming Data Products/                (Parent - technical contract)
├── Producer Guide                      (Sub-page - how to publish data)
└── Consumer Guide                      (Sub-page - how to consume data)
```

**6a. Streaming Data Products (Parent page)**
- Introduction: what streaming data products are
- CloudEvents envelope specification
- Topic naming conventions
- Message key format
- Schema registry usage
- Kafka configuration defaults
- Architecture overview
- Current limitations

**6b. Producer Guide (Sub-page)**
- Step-by-step workflow for streaming producers
- Code examples
- Best practices

**6c. Consumer Guide (Sub-page)**
- Step-by-step workflow for streaming consumers
- Code examples
- Best practices

**Source pages to merge:**
| Page ID | Page Title | Content Goes To |
|---------|------------|-----------------|
| 4952490685 | Streaming Data Governance: Ownership, Standards, and Roles | Parent page (technical content only, ownership already migrated) |
| 4983292520 | Streaming Data Standards | Parent page (specs) |
| 4983292549 | Getting Started as a Streaming Data Producer | Producer Guide |
| 4980967002 | Getting Started as a Streaming Data Consumer | Consumer Guide |

---

### 7. Reference (OPTIONAL) - NOT STARTED

**Decision needed:** Keep as separate pages or consolidate?

**Source pages:**
| Page ID | Page Title | Status |
|---------|------------|--------|
| 5561974803 | Data deletions in RELEX data products | Decision pending |
| 5730435761 | Metadata in data product integrations | Decision pending |

---

## Pages to archive after migration

| Page ID | Page Title | Reason | Blocked by |
|---------|------------|--------|------------|
| 5580357790 | Data Product roles and ownership | Replaced by new Roles and Ownership page | - |
| 4981949361 | Ownership and Schema Governance | Merged into Roles and Ownership | - |
| 5557388236 | Data product conventions at RELEX | Replaced by new Schema Conventions page | - |
| 5579964548 | Data Product Producer & Consumer basic principles | Content in Overview and delivery-specific pages | Task 5, 6 |
| 5627871298 | How to get started with piloting Data Products | Overlaps with Batch getting started | Task 5 |
| 5747507883 | DRAFT: Overall principles of ownership... | Draft, merged into Roles | - |
| 4874994544 | Batch Data Product Conventions | Merged into Batch consolidated page | Task 5 |
| 4982767801 | Getting Started as a Data Producer | Merged into Batch consolidated page | Task 5 |
| 4983292001 | Getting Started as a Data Consumer | Merged into Batch consolidated page | Task 5 |
| 4982964415 | Batch Data Product Architecture | Merged into Batch consolidated page | Task 5 |
| 4983161135 | Monitoring and Troubleshooting | Merged into Batch consolidated page | Task 5 |
| 4983292520 | Streaming Data Standards | Merged into Streaming consolidated page | Task 6 |
| 4983292549 | Getting Started as a Streaming Data Producer | Merged into Streaming consolidated page | Task 6 |
| 4980967002 | Getting Started as a Streaming Data Consumer | Merged into Streaming consolidated page | Task 6 |

---

## Content migration status

This table tracks whether content from each source page has been migrated.

| Page ID | Page Title | Migration Status | Migrated To |
|---------|------------|------------------|-------------|
| 5580357790 | Data Product roles and ownership | COMPLETE | Roles and Ownership (5770052061) |
| 4981949361 | Ownership and Schema Governance | COMPLETE | Roles and Ownership (5770052061) |
| 4952490685 | Streaming Data Governance (ownership section) | COMPLETE | Roles and Ownership (5770052061) |
| 4952490685 | Streaming Data Governance (technical content) | NOT STARTED | Will go to Streaming consolidated |
| 5579964548 | Data Product Producer & Consumer basic principles | PARTIAL | Overview has definition; rest needs review |
| 5557388236 | Data product conventions at RELEX | COMPLETE | Refocused as Schema Conventions (5786894469) |
| 5559648930 | Data Product management tools | NOT STARTED | Minor updates in Task 4 |
| 4620255490 | Batch Data Products main page | COMPLETE | Batch Data Products (5789680046) |
| 4874994544 | Batch Data Product Conventions | COMPLETE | Batch Data Products (5789680046) |
| 4982767801 | Getting Started as a Data Producer | COMPLETE | Producer Guide (5791449471) |
| 4983292001 | Getting Started as a Data Consumer | COMPLETE | Consumer Guide (5790368109) |
| 4982964415 | Batch Data Product Architecture | COMPLETE | Batch Data Products (5789680046) |
| 4983161135 | Monitoring and Troubleshooting | COMPLETE | Batch Data Products (5789680046) + guides |
| 4983292520 | Streaming Data Standards | NOT STARTED | Will go to Streaming Data Products parent page |
| 4983292549 | Getting Started as Streaming Data Producer | NOT STARTED | Will go to Streaming Producer Guide |
| 4980967002 | Getting Started as Streaming Data Consumer | NOT STARTED | Will go to Streaming Consumer Guide |
| 5561974803 | Data deletions in RELEX data products | NOT STARTED | Decision pending (Task 7) |
| 5730435761 | Metadata in data product integrations | NOT STARTED | Decision pending (Task 7) |
| 5627871298 | How to get started with piloting Data Products | NOT STARTED | Review for unique content |
| 5747507883 | DRAFT: Overall principles of ownership | COMPLETE | Roles and Ownership (5770052061) |

---

## New pages created

| Page ID | Page Title | URL | Created |
|---------|------------|-----|---------|
| 5769626049 | Data Product Governance (Overview) | [Link](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5769626049) | 2025-12-30 |
| 5770052061 | Roles and Ownership | [Link](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5770052061) | 2025-12-30 |
| 5786894469 | Schema Conventions | [Link](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5786894469) | 2026-01-07 |
| 5789680046 | Batch Data Products | [Link](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5789680046) | 2026-01-08 |
| 5791449471 | Producer Guide | [Link](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5791449471) | 2026-01-08 |
| 5790368109 | Consumer Guide | [Link](https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5790368109) | 2026-01-08 |

---

## Working notes

- Creating NEW pages rather than updating existing ones
- Old pages kept for reference during migration
- Will archive old pages separately after migration complete
- Domain ownership tables restructured to one table per domain with row headers

