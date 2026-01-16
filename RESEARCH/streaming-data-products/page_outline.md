# Understanding Streaming Data Products - Page Outline

*Structured using Diataxis principles for explanation pages*

---

## Document Type: EXPLANATION

**User need**: Understand what streaming data products are, how they differ from batch, and how they fit into RELEX's data architecture.

**Audience**: Technical teams, data product stakeholders, architects.

**Content approach**: Explain concepts, principles, and design decisions rather than instructing HOW to do things (which the guides cover).

---

## Front Matter / Opening

### Status & Approval
- **Note**: "This architecture was officially accepted by RELEX Architecture Board on 2025-11-13"
- **Maintenance**: "This is a living document. Updates reflect production practices and can be refined as needed."

### Quick Links (Diataxis navigation)
- **You want to understand**: ← Read this page
- **You want to start as a producer**: → [Streaming Producer Guide](4983292549)
- **You want to start as a consumer**: → [Streaming Consumer Guide](4980967002)
- **You need governance/ownership details**: → [Roles and Ownership](5770052061)
- **You need technical specifications**: → [Streaming Conventions](4983292520)
- **You need Kafka fundamentals**: → [Kafka: The essentials](2977497102)

---

## SECTION 1: What Are Streaming Data Products? (EXPLANATION)

**Diataxis type**: Explanation (understanding)
**Length**: 400-500 words
**Purpose**: Define concept, explain why they exist, position them in RELEX architecture

### Content Points

1. **Definition (opening)**
   - Source: Streaming Data Products (4952490685)
   - "Streaming data products are reusable, standardized data streams offered to RELEX internal consumers for use in multiple use cases"
   - Differentiate: Not point-to-point Kafka integrations, but governed data products

2. **Why streaming data products exist**
   - Source: Streaming Data Products (4952490685)
   - Complement batch products (low-latency alternative)
   - Support event-driven architectures
   - Enable real-time data sharing between applications
   - Time-sensitive business processes (explain examples: forecasts, planograms, promotions)

3. **Key characteristics**
   - Source: Streaming Data Products (4952490685)
   - Real-time delivery (near real-time, low latency)
   - High throughput (many small messages efficiently)
   - Multiple consumers (one stream → many applications)
   - Standardized format (CloudEvents specification)
   - Schema governance (centrally managed with evolution control)
   - Event-driven patterns (reactive, event-sourcing compatible)
   - Log compaction (topics persist data by default)

4. **Default assumption**
   - Source: Streaming Data Products (4952490685)
   - "By default, all data streams should be built as streaming data products"
   - Encourages data sharing and standardization
   - Alternative: point-to-point only if data product model doesn't apply

5. **Current status**
   - Source: Streaming Data Products (4952490685)
   - Development/pilot phase (not production-wide yet)
   - See Data Product Catalog for list of active products

### Transition
"Understanding how they differ from batch systems clarifies when to use streaming products and what architectural patterns apply."

---

## SECTION 2: How Streaming Differs from Batch (EXPLANATION)

**Diataxis type**: Explanation (comparison, design rationale)
**Length**: 400-500 words
**Purpose**: Explain the fundamental architectural difference and why it matters

### Content Points (Based on Batch vs. Streaming contrast)

1. **Delivery model**
   - **Batch**: Files (CSV, Parquet) scheduled/pushed periodically
   - **Streaming**: Events pushed continuously (near real-time)
   - Source: Understanding Batch Data Products (4982964415); Streaming Data Products (4952490685)
   - Implication: Streaming enables reactive systems, batch for analytical/archival loads

2. **Message frequency vs. volume trade-offs**
   - **Batch**: Optimized for large files, fewer transfers, processing windows
   - **Streaming**: Optimized for small frequent messages, always-on consumers
   - Source: Streaming Data Products (4952490685); Streaming Conventions (4983292520)
   - Use streaming when: Event detection matters, latency is critical
   - Use batch when: Bulk processing, scheduled analytics, archival

3. **Schema and message envelope**
   - **Batch**: Schema embedded in format (CSV headers, Parquet metadata)
   - **Streaming**: CloudEvents envelope + JSON payload (separate concerns)
   - Source: Streaming Conventions (4983292520); Schema Conventions (5786894469)
   - Reason: Events need traceability metadata; consumers need context

4. **State and ordering**
   - **Batch**: Immutable snapshots, no ordering concerns within file
   - **Streaming**: Ordered per partition key; supports state/change-data-capture patterns
   - Source: Streaming Data Products (4952490685) — ordering maintained per partition
   - Implication: Streaming enables saga patterns, ordered command streams

5. **Storage and retention**
   - **Batch**: File-based with dates/versions in filenames
   - **Streaming**: Log-compacted Kafka topics (persist latest state by key)
   - Source: Streaming Data Products (4952490685); Kafka Essentials (2977497102)
   - Implication: New consumers can replay recent state without batch re-export

6. **Governance model (same foundation, streaming-specific aspects)**
   - **Both**: Same ownership models (Direct/Broadcasting/Funnel/Data Product)
   - **Streaming-specific**: Kafka ACLs, topic provisioning, consumer group management
   - Source: Roles and Ownership (5770052061); Streaming Data Products (4952490685)
   - See also: [Streaming Governance](5187043339)

### Transition
"With these architectural differences clear, we can examine the technical components that enable streaming products at RELEX."

---

## SECTION 3: Core Architecture & Technology Stack (EXPLANATION/REFERENCE)

**Diataxis type**: Mostly explanation, some reference elements
**Length**: 500-600 words
**Purpose**: Explain what technologies power streaming and why they were chosen

### Content Points

1. **Technology stack overview**
   - Source: Streaming Data Products (4952490685)
   - **Apache Kafka** (Confluent Cloud): Message streaming backbone
   - **Confluent Schema Registry**: Schema management and validation
   - **CloudEvents specification (v1.0)**: Standard message envelope
   - **JSON Schema**: Data schema format
   - **AsyncAPI**: Documentation and contract management (roadmap)
   - **Data Product Designer**: Central governance tool (roadmap)

2. **Why Kafka?**
   - Source: Kafka Essentials (2977497102); Streaming Data Products (4952490685)
   - Proven event streaming platform
   - Supports multiple producers and consumers
   - Log-based architecture enables replay and compaction
   - Scalability for RELEX's throughput
   - Operational maturity and tooling

3. **CloudEvents: Why mandatory?**
   - Source: Streaming Conventions (4983292520); Streaming Data Products (4952490685)
   - Standardized envelope format for all messages (non-negotiable)
   - Provides metadata: source, type, id, timestamp, tracing
   - Enables consumer resilience: unknown event types can be handled gracefully
   - Traceability across systems (source, correlation ID)
   - Alignment with industry standards

4. **Core components breakdown**

   **Kafka Clusters**
   - Source: Kafka Essentials (2977497102)
   - Multiple environments: dev, qa, stg, prod
   - Geographic split (EU/US) for redundancy
   - Confluent Cloud managed service

   **Topics**
   - Source: Streaming Conventions (4983292520); Kafka Essentials (2977497102)
   - Customer data isolated per topic
   - Mandatory naming convention: `{customer}.{domain}.{category}.{data-product}[.v{MAJOR}].{suffix}`
   - Log-compacted by default (retains latest state per key)
   - Production requirement: must have schema

   **Schema Registry**
   - Source: Streaming Conventions (4983292520); Schema Conventions (5786894469)
   - All schemas registered before publishing
   - JSON Schema format
   - Subject naming: `{topic-name}-value`
   - Enforces schema validation
   - Enables schema evolution tracking

5. **Message structure: CloudEvents envelope**
   - Source: Streaming Conventions (4983292520)
   - Required fields: specversion, type, source, id, time
   - Payload: CloudEvents + JSON body (`/data` field)
   - Message key: RELEX standard format (entity identifiers)
   - Message partitioning: key determines partition (ordering guarantee)

6. **Integration with RELEX Data Platform**
   - Source: Streaming Data Products (4952490685)
   - **Complementary to batch**: Consistent schema definitions possible
   - **Unified governance**: Same roles, ownership models across streaming/batch
   - **Central schema management**: Will manage both delivery mechanisms
   - Linked with: Integration Manifesto, API Blueprint, Data Product Designer

### Transition
"Understanding the architecture, let's examine how data flows through the system."

---

## SECTION 4: Data Flow & Patterns (EXPLANATION)

**Diataxis type**: Explanation with conceptual flow diagrams
**Length**: 400-500 words
**Purpose**: Show how events move through streaming data products and what patterns apply

### Content Points

1. **Producer → Topic → Consumer flow**
   - Source: Streaming Producer Guide (4983292549); Streaming Consumer Guide (4980967002)
   - Producer publishes CloudEvents-compliant messages to topic
   - Messages stored in log-compacted topic (ordered by partition key)
   - Consumers read from topic offset (can replay from start or latest)
   - Multiple independent consumer groups possible

2. **Ownership model and flow implications**
   - Source: Roles and Ownership (5770052061); Streaming Data Products (4952490685)
   - **Broadcasting** (1-to-many): Producer owns topic, defines schema; consumers subscribe
   - **Funnel** (many-to-1): Consumer owns topic, defines schema; producers adapt
   - **Data Product** (many-to-many): Data Product Owner governs schema and access
   - Flow pattern: DPO approves producers/consumers, manages evolution

3. **Event ordering and consistency**
   - Source: Streaming Data Products (4952490685); Kafka Essentials (2977497102)
   - Ordering guaranteed per partition key
   - Not globally ordered (different keys can be out-of-order)
   - Implications: Consumers can process independent event streams in parallel
   - Trade-off: throughput vs. global ordering

4. **Schema evolution patterns**
   - Source: Roles and Ownership (5770052061); Streaming Conventions (4983292520)
   - **Backward-compatible**: Add optional fields, enum values (allowed)
   - **Forward-compatible**: Remove optional fields (requires coordination)
   - **Breaking**: Remove required fields, rename, change types (prohibited unless justified)
   - Process: Breaking changes require II-SIG approval, dual publishing, 12-24 month migration

5. **Error handling and retry patterns**
   - Source: Streaming Conventions (4983292520) (referenced in Producer/Consumer guides)
   - Producer config: `enable.idempotence=true`, `acks=all` (at-least-once guarantee)
   - Consumer config: `isolation.level=read_committed` (exactly-once semantics with transactional producers)
   - Retry logic: Application-level (Kafka doesn't provide automatic retries)
   - Dead-letter pattern: Recommendations in producer/consumer guides

6. **Consumer group management**
   - Source: Streaming Consumer Guide (4980967002); Kafka Essentials (2977497102)
   - Multiple independent consumer groups from same topic
   - Each group tracks offset independently
   - Scaling: Consumers per partition (up to partition count)
   - Rebalancing: Kafka handles automatic rebalancing on group membership changes

### Transition
"With data flow understood, governance structures ensure reliability and coordination."

---

## SECTION 5: Governance & Ownership (EXPLANATION)

**Diataxis type**: Explanation (principles and roles)
**Length**: 400-500 words
**Purpose**: Explain how organizations use streaming data products and what responsibilities apply

### Content Points

1. **Governance framework**
   - Source: Roles and Ownership (5770052061); Streaming Data Products (4952490685)
   - Same ownership models apply to streaming as batch
   - Four patterns: Direct (1-1), Broadcasting (1-many), Funnel (many-1), Data Product (many-many)
   - Governance controls: schema evolution, access control, breaking changes, consumer registry

2. **Key roles**
   - Source: Roles and Ownership (5770052061)
   - **Domain Owner**: Overall data responsibility per business domain (Customer, F&R, S&A, P&P, etc.)
   - **Data Product Owner (DPO)**: Coordinates schema evolution, approves producers/consumers, manages many-to-many scenarios
   - **Module Owner**: Maps modules to data product versions, specifies field usage
   - **Data Products Team**: Maintains conventions, tools, governance processes

3. **Data Product Owner (DPO) responsibilities (Streaming-specific)**
   - Source: Roles and Ownership (5770052061); Streaming Data Products (4952490685)
   - Manage schema versions and evolution
   - Approve new producers/consumers
   - Coordinate breaking changes across all stakeholders
   - Maintain consumer registry (for notification when breaking changes occur)
   - Manage Kafka ACLs (access control lists)
   - Topic provisioning and configuration
   - Schema governance in Confluent Registry

4. **Schema governance process**
   - Source: Roles and Ownership (5770052061); Streaming Conventions (4983292520)
   - Backward-compatible changes: Allowed without coordination
   - Forward-compatible changes: Require consumer coordination
   - Breaking changes: Prohibited unless justified; requires:
     - II-SIG approval with business justification
     - New schema version with new subject name
     - DPO coordinates consumer impact assessment
     - Dual publishing strategy (old + new schema 12-24 months)
     - Consumer migration and old schema decommissioning

5. **Access and security**
   - Source: Kafka Essentials (2977497102); Streaming Conventions (4983292520)
   - **Authentication**: OAuth
   - **Authorization**: Kafka ACLs (Access Control Lists) per DPO assignment
   - **Encryption**: TLS for all traffic
   - **Data isolation**: Customer data per topic
   - Current limitation: Manual ACL management (self-service planned)

6. **Approval process for new streaming data products**
   - Source: Streaming Data Products (4952490685)
   - Contact: II-SIG (Internal Integrations Special Interest Group)
   - Determine ownership model using decision tree (broadcast/funnel/data product)
   - Identify Data Product Owner if many-to-many
   - Follow naming conventions and schema standards
   - Register schema before publishing

### Link to shared governance pages
- **Roles and Ownership** (5770052061): Complete role definitions and ownership models
- **Schema Conventions** (5786894469): General schema standards for batch and streaming

### Transition
"With governance understood, we can see the current state and roadmap."

---

## SECTION 6: Current State & Limitations (EXPLANATION)

**Diataxis type**: Explanation (status, constraints)
**Length**: 300-400 words
**Purpose**: Manage expectations about maturity level and what's not yet available

### Content Points

1. **Pilot phase status**
   - Source: Streaming Data Products (4952490685)
   - Production use is active but limited
   - Not yet universally deployed across all data products
   - See Data Product Catalog for current list of streaming products
   - Gradual expansion as patterns mature

2. **Current limitations**
   - Source: Streaming Data Products (4952490685)
   - **Schema tooling**: Central schema management tool not yet available (planned)
   - **Access control**: Manual Kafka ACL provisioning (self-service planned)
   - **Consumer registration**: Manual process (automation planned)
   - **Breaking changes**: Manual coordination until tooling available
   - **Schema validation**: Developer-side tooling integration planned

3. **Technical considerations**
   - Source: Streaming Data Products (4952490685); Kafka Essentials (2977497102)
   - **Message size**: Optimized for small, frequent messages (not bulk payloads)
   - **Ordering**: Per-partition only, not globally ordered
   - **Exactly-once semantics**: Requires `read_committed` consumer config and producer idempotence
   - **Regional availability**: EU and US Kafka clusters only (no other regions yet)

4. **Roadmap items**
   - Source: Streaming Data Products (4952490685); Architecture Board (5187043339)
   - Central schema management integration
   - Self-service topic/ACL provisioning
   - Automated consumer registration
   - Automated breaking change notification system
   - Schema validation tooling for IDEs
   - Custom fields framework (RFC-0101 in progress)
   - Data Product Designer integration
   - AsyncAPI documentation support

5. **Known issues and workarounds**
   - Source: Streaming Data Products (4952490685)
   - Currently use manual processes where automation planned
   - Contact Data Product Owner or II-SIG for approval/provisioning
   - Development in RFC-0101: Schema Management and Validation Framework

### Transition
"To get started with streaming data products, different roles take different paths."

---

## SECTION 7: Getting Started Paths (REFERENCE/NAVIGATION)

**Diataxis type**: Reference (directory/navigation)
**Length**: 200-300 words
**Purpose**: Point users to appropriate guides based on their role

### Content Points

For each role, provide:
- Brief description of what they'll do
- Link to dedicated guide
- Key prerequisites
- Typical first step

**For Governance & Leadership:**
- Path: [Roles and Ownership](5770052061)
- Understand: DPO concept, ownership models, governance process
- Key task: Assign Data Product Owner for your domain/product

**For Data Producers:**
- Path: [Streaming Producer Guide](4983292549)
- Understand: How to design producers, schema registration, configuration
- Typical first step: Contact II-SIG for new data product approval

**For Data Consumers:**
- Path: [Streaming Consumer Guide](4980967002)
- Understand: How to consume events, error handling, schema evolution
- Typical first step: Discover available streaming products in Data Product Catalog

**For Technical Implementation:**
- Path: [Streaming Conventions](4983292520)
- Understand: CloudEvents envelope, naming patterns, message structure
- Typical first step: Review naming conventions and JSON Schema examples

**For Kafka Operations:**
- Path: [Kafka: The essentials](2977497102)
- Understand: Kafka architecture, monitoring, production gates
- Typical first step: Verify compliance with production gate checklist

---

## SECTION 8: Related Documents & Context (REFERENCE)

**Diataxis type**: Reference (signposting)
**Length**: 200-300 words
**Purpose**: Explain relationship to batch, other architectural documents, and RFCs

### Content Points

1. **Connection to batch data products**
   - [Understanding Batch Data Products](4982964415): Parallel document for batch architecture
   - Shared: Governance models, schema standards, ownership concept
   - Different: Delivery mechanism (files vs. Kafka), technology stack, latency profile

2. **Related architectural decisions**
   - [RFC-0097: Customer-facing event API](4787011871): Event API design patterns
   - [RFC-0108: Sharing production data to UAT](5621350566): Kafka-specific data handling
   - [RFC-0092: Customer-facing query APIs and events](4131947121): Historical event API decisions
   - [Architecture Board decision 2025-11-12](5187043339): Official approval of streaming governance

3. **General data governance**
   - [Integration Manifesto](source needed): RELEX's integration principles
   - [API Blueprint](source needed): API design standards applicable to async APIs
   - [Data Product management tools](source needed): Tool documentation for Data Product Designer

4. **Regulatory and operational**
   - [Data Products roadmap](source needed): 3-year plan for data product vision
   - [Accessing observability for Confluent Kafka](source needed): Monitoring and alerting setup

### Future updates
This page will be refreshed as:
- Schema management tooling becomes available
- Customer-facing event APIs launch
- Additional streaming use cases emerge
- Data Product Designer integrates streaming governance

---

## SECTION 9: Getting Help (REFERENCE)

**Diataxis type**: Reference (contacts, support)
**Length**: 150-200 words
**Purpose**: Direct users to appropriate support channels

### Content Points

**For governance and new data product approvals:**
- Contact: Internal Integrations Special Interest Group (II-SIG)
- Use case: Proposing new streaming data product, ownership model questions
- See: [II-SIG page](source needed)

**For Kafka technical issues:**
- Contact: @jedi in #help-message-bus Slack channel
- Use case: Kafka configuration, monitoring, production issues
- Response time: Rapid (active team)

**For schema and governance questions:**
- Contact: Relevant Data Product Owner
- Use case: Schema evolution, breaking changes, consumer coordination
- See: Data Product Catalog for DPO contact

**For integration design guidance:**
- Review: [Integration Manifesto](source needed)
- Review: [API Blueprint](source needed)
- See: Streaming Conventions page

**For streaming-specific questions:**
- This page (Understanding Streaming Data Products)
- Producer/Consumer guides
- Kafka essentials
- Architecture Board decision (approval context)

---

## APPENDIX: Key Concepts Quick Reference

**CloudEvents**: Industry-standard envelope format for events (specversion, type, source, id, time + data payload)

**Data Product Owner (DPO)**: Role responsible for governing data products (many-to-many pattern); coordinates schema evolution and access

**Log Compaction**: Kafka feature that retains latest value per key, enabling consumers to replay recent state

**Partition Key**: Message field determining partition assignment; messages with same key stay ordered

**Schema Registry**: Confluent service managing schema versions and validating message compliance

**Exactly-once semantics**: Guarantee that messages are processed exactly once (requires producer idempotence + consumer read_committed)

---

## Identified Content Gaps & Recommendations

| Gap | Recommendation | Source |
|-----|----------------|--------|
| No visual architecture diagram | Create C4 diagram showing Producers → Kafka → Consumers with schema registry | Use existing RFC-0097 diagram as reference |
| Limited error handling examples | Link to producer/consumer guides; consider adding side-by-side example | Streaming guides contain examples |
| Custom use cases | Add 2-3 realistic examples (forecasts, promotions, analytics) | Based on Streaming Data Products mentions |
| Performance characteristics | Document latency, throughput, and scalability expectations | Kafka Essentials has some metrics |
| Monitoring setup guide | Link to observability documentation | Referenced but not linked |
| Troubleshooting section | Create quick reference for common issues | Not currently documented |
| Cost considerations | No cost/pricing information in sources | May need to research separately |

---

## Diataxis Checklist for Review

- [ ] Explanation sections explain "why" and provide context ✓
- [ ] Reference sections are austere and factual ✓
- [ ] No instruction embedded in explanation (guides are separate) ✓
- [ ] How-to aspects excluded (guides link out) ✓
- [ ] User needs clear from section headings ✓
- [ ] Boundaries clear between sections ✓
- [ ] Language appropriate for explanation (discuss tradeoffs, principles, design decisions) ✓
- [ ] Related documents linked clearly ✓
- [ ] Navigation between sections clear ✓

