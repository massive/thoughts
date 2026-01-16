# Research Contract

## Scope Agreement

**Project**: Understanding Streaming Data Products - Research for New Documentation Page
**Date**: January 16, 2026
**Researcher**: Deep Research System
**Methodology**: 7-Phase Protocol with triangulation

---

## Core Question

**Primary**: What architectural, technical, and governance knowledge should explain streaming data products as a parallel explanation to "Understanding Batch Data Products"?

**Sub-questions**:
1. What is the core streaming architecture at RELEX? (Components, platforms, patterns)
2. How do streaming and batch data products differ fundamentally? (Architecture, trade-offs, when to use each)
3. What are the technical components and standards? (CloudEvents, Kafka, schemas, naming conventions)
4. What are the data flow patterns? (Event flow, ordering, state management, error handling)
5. What governance structures apply to streaming? (Roles, ownership models, schema evolution)
6. What design decisions/RFCs guide streaming architecture? (Architectural rationale)
7. What are the current limitations and roadmap? (Maturity level, gaps)

---

## Use Case

This research informs creation of documentation that helps stakeholders (technical teams, architects, data product owners) understand what streaming data products are and how they fit into RELEX's broader data strategy—without instructing HOW to implement them (that's covered in separate producer/consumer guides).

**Decision supported**: Should we build/use a streaming data product for our use case? What do I need to know?

---

## Audience

**Primary**: Technical teams, architects, data product stakeholders
**Secondary**: Data product governance teams, security/compliance reviewers
**Context**: Internal RELEX documentation

**Audience assumption**: Reader has some familiarity with RELEX data platforms or Kafka basics; wants conceptual understanding before diving into implementation guides.

---

## Research Scope

### Geographic & Organizational
- **Primary search space**: RELEX II (Internal Integrations) space
- **Secondary**: DP (Data Products), DC (Architecture/RFCs)
- **Depth**: Full spectrum from governance to technical implementation

### Content Domains
1. Architecture patterns and design
2. Technical standards and specifications
3. Governance and role definitions
4. Data flow and operational patterns
5. Limitations and roadmap

### Timeline
- Research conducted: January 16, 2026
- Sources are current as of Q4 2025 / Q1 2026
- Architectural Board approval: November 13, 2025 (baseline for governance)

### Exclusions
- Customer-specific implementation details (focus on standards, not use cases)
- Operational procedures for creating topics/registering schemas (covered in guides)
- Pricing/cost analysis
- Third-party Kafka ecosystem tools (focus on Confluent Cloud at RELEX)

---

## Output Format

**Deliverable**: Page outline with:
- Section structure (8 major sections + appendix)
- Key content points for each section
- Source page IDs for traceability
- Identified gaps where content doesn't exist
- Diataxis classification for documentation type

**Structure approach**: Mirrors "Understanding Batch Data Products" but adapted for streaming's simpler architecture.

---

## Citation Requirements

**Citation level**: Standard
- Each substantive claim must have source attribution
- Critical/governance claims require 2+ independent sources (triangulation)
- Page IDs provided for verification

**Definition of critical claims**:
- Mandatory requirements ("ALL messages MUST...")
- Governance policies (approval processes, breaking change procedures)
- Architectural decisions (why CloudEvents, why log compaction)
- Role definitions and responsibilities

---

## Research Methodology (Phases 2-4)

### Phase 2: Retrieval Plan

**Search strategy**:
1. Direct search: "streaming data products" + "Kafka" + "event streaming"
2. Governance search: "streaming" + "ownership" + "governance"
3. RFC search: "streaming" in DC space
4. Reference page fetch: Known page IDs for batch architecture template

**Search spaces**:
- Primary: `space=II` (Internal Integrations)
- Secondary: `space=DP` (Data Products)
- Secondary: `space=DC` (Architecture/RFCs)

**Query log**:
- Search 1: `title~'streaming data products'` → 4 results, 2 relevant
- Search 2: `space=II AND (title~'kafka' OR title~'streaming' OR title~'event')` → 15 results, 6 relevant
- Search 3: `space=DP AND (title~'streaming' OR title~'real-time')` → 1 result
- Search 4: `space=DC AND (title~'streaming' OR title~'kafka' OR title~'event')` → 10 results, 4 relevant
- Direct fetch: Pages 5770052061, 5786894469, 2977497102 (known governance pages)

**Source fetch budget**: Executed (met budget)
- Searches: 4 completed
- Page fetches: 10+ completed
- Total sources identified: 13 (5 tier A, 4 tier B, 4 tier C)

### Phase 3: Iterative Querying & Content Extraction

**Parallel queries executed**:
- Architecture overview pages (Streaming Data Products)
- Technical standards (Conventions, Kafka Essentials)
- Governance frameworks (Roles, Ownership, Schema Conventions)
- Producer/Consumer guides (implementation context)
- RFCs and Architecture Board decisions

**Content extraction approach**:
- Extracted key concepts from each source
- Mapped content to outline sections
- Identified overlapping topics (triangulation opportunities)
- Noted gaps between sources

**Hypothesis updates during search**:
1. ✓ Confirmed: Streaming is simpler than batch
2. ✓ Confirmed: Kafka is core platform with CloudEvents mandatory
3. ✓ Confirmed: Event-driven governance structures exist
4. ✓ Confirmed: Producer/consumer patterns differ from batch schedulers
5. ✓ Confirmed: Same governance roles apply with streaming-specific aspects

### Phase 4: Source Triangulation

**2-Source Verification (Critical Claims)**:

| Claim | Source 1 | Source 2 | Verified |
|-------|----------|----------|----------|
| All messages MUST use CloudEvents | Streaming Data Products | Streaming Conventions | ✓ |
| Schema registration mandatory | Streaming Data Products | Streaming Conventions | ✓ |
| Producer: enable.idempotence=true, acks=all | Streaming Conventions | Kafka Essentials | ✓ |
| Consumer: isolation.level=read_committed | Streaming Data Products | Streaming Conventions | ✓ |
| Four ownership models exist | Roles and Ownership | Streaming Data Products | ✓ |
| Breaking changes prohibited unless justified | Roles and Ownership | Streaming Data Products | ✓ |
| Topics log-compacted by default | Streaming Data Products | Kafka Essentials | ✓ |
| Officially approved 2025-11-13 | Streaming Data Products | Architecture Board meeting | ✓ |

**Contradictions found**: None

**Source quality assessment**:
- Tier A sources (5): Highly authoritative, current, comprehensive
- Tier B sources (4): Detailed guidance, implementation-focused
- Tier C sources (4): Context/decisions, historical value

---

## Limitations

### Research Limitations

1. **Scope boundaries**
   - Customer-specific streaming use cases not deeply analyzed (no current production deployments found)
   - Third-party tool ecosystem not researched
   - Cost/billing not covered in sources

2. **Documentation maturity**
   - Some areas marked as "roadmap" (central schema tool, self-service provisioning)
   - Error handling patterns documented minimally
   - Few production use case examples

3. **Search coverage**
   - Limited historical RFCs found (main RFC-0097 for event API)
   - AsyncAPI documentation mentioned but not found in Confluence
   - Data Product Designer integration described as future work

### Content Gaps Identified

| Gap | Impact | Workaround |
|-----|--------|-----------|
| No visual architecture diagram | Understanding | Reference RFC-0097 or create new |
| Limited error handling documentation | Completeness | Link to producer/consumer guides |
| Few realistic examples | Accessibility | Add domain-specific examples |
| Cost information absent | Decision support | Document as not covered |
| Performance/latency specs sparse | Technical clarity | Reference Kafka defaults + Confluent docs |

---

## Confidence Levels

| Topic | Confidence | Evidence |
|-------|------------|----------|
| Architecture overview | High (95%) | Comprehensive official page, Architecture Board approval |
| Technical standards | High (95%) | Multiple authoritative sources with 2+ confirmations |
| Governance model | High (95%) | Explicit definitions in Roles & Ownership |
| Current limitations | High (90%) | Documented in official page and roadmap items |
| Roadmap items | Medium (75%) | Mentioned in sources but some are aspirational |
| Production use cases | Low (40%) | Few concrete examples found (mostly pilot phase) |

---

## Change Tracking

**What would change our conclusions**:

1. If new RFC emerged with different architecture (unlikely—architecture board approved current)
2. If tooling roadmap significantly changed (would update limitations section)
3. If streaming adoption expanded dramatically (would update current status)
4. If breaking API changes to CloudEvents adoption (would update standards section)

---

## Deliverables Completed

✓ README.md - Navigation and quick reference
✓ source_catalog.md - Full source list with quality ratings
✓ page_outline.md - Detailed section structure with content points
✓ research_contract.md - This document

---

## Follow-up Actions for Page Creation

1. **Before starting page write**:
   - Get agreement on Diataxis style from content stakeholders
   - Confirm which related documents to link (some URLs are placeholders)

2. **During page write**:
   - Use page_outline.md as structure
   - Reference source_catalog.md for page IDs
   - Include visual architecture diagram (recommendation)
   - Add 2-3 realistic use case examples

3. **After page write**:
   - Verify all page ID links are correct
   - Have governance team review (Roles & Ownership, DPO context)
   - Have technical team review (Kafka, CloudEvents, schema details)
   - Prepare for Architecture Board review/approval

4. **Ongoing**:
   - Set reminder to update when roadmap items complete (central schema tool, etc.)
   - Track new RFCs that might reference streaming architecture
   - Update if customer-facing event API launches (RFC-0097 related)

---

## Research Metadata

**Protocol used**: Deep Research 7-Phase (Phases 0-4 completed; 5-6-7 comprise output packaging)
**Graph of Thoughts**: Linear path with triangulation checkpoints
**Quality gates**: All critical claims verified via 2+ sources; no unsourced claims in output
**Citation audit**: Every content point traceable to source page ID
**Contradiction log**: None found; sources consistent and complementary

