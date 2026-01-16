# Source Catalog

## Research Sources with Quality Ratings

### Primary Sources (Tier A: Authoritative)

| Source | Page ID | Space | Authority Level | Content Summary |
|--------|---------|-------|-----------------|-----------------|
| Streaming Data Products | 4952490685 | II | A - Official approved | Complete overview of streaming, TLDR essentials, prerequisites, key differentiators, governance model, RELEX architecture integration, limitations, roadmap. **Status**: Officially approved by Architecture Board 2025-11-13 |
| Streaming Conventions | 4983292520 | II | A - Standards | Technical standards and implementation details: CloudEvents envelope format, JSON Schema requirements, topic naming patterns, message key format, producer/consumer configurations, error handling patterns |
| Kafka: The essentials | 2977497102 | II | A - Authoritative | Comprehensive Kafka guide at RELEX: key concepts, producers/consumers, environments and clusters, topics, schemas, producer/consumer configuration, business continuity, security/compliance, monitoring, provisioning requirements, production gates |
| Roles and Ownership | 5770052061 | II | A - Governance | Role definitions (Domain Owner, DPO, Module Owner), ownership models (Direct/Broadcasting/Funnel/Data Product), schema governance process, breaking change procedures, governance contacts |
| Schema Conventions | 5786894469 | II | A - Cross-cutting | General schema standards for all data products (batch and streaming): field naming, data types, structure (flat/hierarchical), keys/identifiers, constraints, custom fields, versioning, module mappings |

### Secondary Sources (Tier B: Detailed Guidance)

| Source | Page ID | Space | Authority Level | Content Summary |
|--------|---------|-------|-----------------|-----------------|
| Streaming Producer Guide | 4983292549 | II | B - Implementation | Step-by-step guide for implementing data producers: prerequisites, producer approval process, schema registration, topic creation, configuration details, error scenarios |
| Streaming Consumer Guide | 4980967002 | II | B - Implementation | Guide for data consumers: prerequisites, consumer group management, CloudEvents message handling, error handling, schema evolution |
| Understanding Batch Data Products | 4982964415 | II | B - Reference | Batch architecture page serving as structural template for streaming page. Includes architecture overview, integration with RELEX platform, components breakdown |
| RFC-0097: Customer-facing event API | 4787011871 | DC | B - Architecture | Architectural decision document for event API design, CloudEvents adoption rationale, API contract patterns |

### Tertiary Sources (Tier C: Contextual)

| Source | Page ID | Space | Authority Level | Content Summary |
|--------|---------|-------|-----------------|-----------------|
| RELEX Architecture Board 2025-11-12 | 5187043339 | DC | C - Meeting notes | Architecture Board approval of streaming governance document; confirmation of governance standards; related decisions on Temporal orchestration |
| RFC-0108: Sharing production data to UAT | 5621350566 | DC | C - Decision | Kafka-specific RFC for production data handling in streaming integrations |
| RFC-0092: Customer-facing query APIs and events | 4131947121 | DC | C - Context | Earlier RFC on event-based APIs; provides historical context for streaming direction |

## Source Quality Assessment

### Tier A Sources (Critical for Page)

**Streaming Data Products (4952490685)**
- Status: Officially approved by Architecture Board
- Completeness: Comprehensive - covers overview, governance, getting started paths, limitations
- Currency: Highly current (2025)
- Claim verification: ✓ All standards documented
- Used for: Architecture overview, key characteristics, governance models, technology stack, getting started paths

**Streaming Conventions (4983292520)**
- Status: Living standard, approved and maintained
- Completeness: Detailed technical specifications
- Currency: Up-to-date with production requirements
- Claim verification: ✓ All technical requirements listed
- Used for: CloudEvents requirements, naming conventions, message structure, schema standards

**Kafka: The essentials (2977497102)**
- Status: Authoritative internal guide
- Completeness: Covers foundations, concepts, policies, production gates
- Currency: Current best practices
- Claim verification: ✓ Production gate requirements verified
- Used for: Kafka architecture, security/compliance, monitoring, provisioning

**Roles and Ownership (5770052061)**
- Status: Governance policy document
- Completeness: Clear role definitions and ownership models
- Currency: Current with 4 distinct ownership patterns
- Claim verification: ✓ Ownership models with examples
- Used for: Governance structure, Data Product Owner role, schema evolution process

**Schema Conventions (5786894469)**
- Status: Cross-cutting standard for all data products
- Completeness: Covers naming, types, structure, versioning
- Currency: Current with semantic versioning guidelines
- Claim verification: ✓ Rules clearly stated
- Used for: General schema requirements applicable to streaming

### Tier B Sources (Supporting Detail)

**Streaming Producer/Consumer Guides (4983292549, 4980967002)**
- Used for: Implementation patterns, configuration examples
- Completeness: Action-oriented with prerequisites and error handling

**Understanding Batch Data Products (4982964415)**
- Used for: Structural template and comparison baseline
- Provides: Architecture overview pattern to adapt for streaming

### Tier C Sources (Context Only)

**Architecture Board meeting (5187043339)**
- Confirms: Official approval of streaming governance
- Decision: "Approved. It remains a living document and can be refined as needed."

## Coverage Summary

| Topic | Source(s) | Coverage |
|-------|-----------|----------|
| Architecture Overview | Streaming Data Products, Kafka Essentials | Comprehensive |
| Technical Components | Streaming Conventions, Kafka Essentials | Detailed |
| Data Flow Patterns | Producer/Consumer Guides, Conventions | Covered |
| Governance Models | Roles and Ownership, Streaming Data Products | Comprehensive |
| Schema Management | Schema Conventions, Streaming Conventions | Covered |
| Error Handling | Streaming Conventions (partial), Producer/Consumer Guides | Covered |
| Monitoring & Operations | Kafka Essentials | Covered |
| Security & Compliance | Kafka Essentials, Conventions | Covered |
| Roadmap & Limitations | Streaming Data Products | Documented |

## Key Claims Verified (2-Source Rule)

| Claim | Source 1 | Source 2 | Status |
|-------|----------|----------|--------|
| All messages MUST use CloudEvents envelope | Streaming Data Products | Streaming Conventions | ✓ Verified |
| Schema registration in Confluent Registry required | Streaming Data Products | Streaming Conventions | ✓ Verified |
| Producer config: enable.idempotence=true, acks=all | Streaming Conventions | Kafka Essentials | ✓ Verified |
| Consumer config: isolation.level=read_committed | Streaming Data Products | Streaming Conventions | ✓ Verified |
| Four ownership models: Direct/Broadcasting/Funnel/DPO | Roles and Ownership | Streaming Data Products | ✓ Verified |
| Breaking changes prohibited except with justification | Roles and Ownership | Streaming Data Products | ✓ Verified |
| Topics should use log compaction by default | Streaming Data Products | Kafka Essentials | ✓ Verified |
| Governance officially approved 2025-11-13 | Streaming Data Products | Architecture Board 2025-11-12 | ✓ Verified |

## Notable Gaps in Sources

| Gap | Implication |
|-----|-------------|
| No detailed RFC for streaming architecture | Architecture rationale scattered across multiple sources |
| Error handling patterns documented minimally | Section will need to link to producer/consumer guides |
| Retry patterns not explicitly detailed | Can reference Kafka and CloudEvents best practices |
| AsyncAPI documentation not found | Mentioned as planned but not yet integrated |
| Data Product Designer integration not documented | Page should note as roadmap item |
| Customer-specific streaming use cases limited | Only pipeline/forecasting mentioned in sources |

