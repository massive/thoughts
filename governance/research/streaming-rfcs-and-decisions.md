# Research: Streaming RFCs and Architectural Decisions (thoughts-7mz)

**Source Pages:**
- RFC-0078: Streaming Macrospace Data (3855810609)
- RFC-0097: Customer-facing event API (4787011871)
- RFC-0075: Data Products Vision (3400269949)
- Architecture Board meetings (5187043329, 5187043339)
- Streaming Data Governance Presentation (5328437285)

## Related RFCs

### RFC-0075: Data Products Vision
**Page ID:** 3400269949
**Status:** Accepted
**Summary:** Grand vision for data products and data platform

**Key Decisions:**
- Paradigm shift from point-to-point to hub-and-spoke architecture
- Standardize data documentation via Data Catalog
- Decentralize data publishing (Data Mesh principles)
- Multiple consumption channels: file-based, query-based, streaming
- Medallion Architecture (Bronze, Silver, Gold) for batch data

### RFC-0078: Streaming Macrospace Data
**Page ID:** 3855810609
**Status:** Accepted (2024-09-23)
**Summary:** Real-time streaming of Space & Assortment Macrospace data into Kafka

**Key Decisions:**
- Use compacted topics for state persistence
- AVRO binary format for large payloads (better serialization performance)
- Event-carried state transfer pattern (full entity, not deltas)
- RavenDB Data Subscriptions for Change Data Capture
- Data payload inline in Kafka message (not external storage references)
- Message key = GUID (unique business entity identifier)
- Topic-per-tenant strategy, single partition per topic

**Design Rationale:**
- Decouples consumers - only need Kafka + Schema Registry access
- Latency improvements over external storage retrieval
- Log compaction enables consumers to replay full state
- Clear data contracts via enforced schemas

### RFC-0097: Customer-facing Event API
**Page ID:** 4787011871
**Status:** Accepted (2025-09-05)
**Summary:** Internal Kafka to external HTTP webhooks mediation

**Key Decisions:**
- Webhooks as primary external delivery mechanism
- Svix initially, Gravitee as likely 2026 replacement
- Reuse streaming data product topics as event sources
- Custom Kafka consumer service (not Flink/Spark - overkill)
- HMAC signatures + TLS + IP allowlisting for security
- Configurable message batching (time windows or message counts)
- No guaranteed message ordering (fire-and-forget async)
- Single RELEX standard webhook payload format

**Architecture:**
```
Source Apps → Kafka Topics → Event Processor → Svix/Gravitee → Customer Webhooks
```

### RFC-0074: Kafka Data Governance with Schemas
**Reference mentioned in governance pages**
- Establishes mandatory schema requirements for Kafka
- Schema Registry integration requirements

### RFC-0076: Batch Data Integration in Data Products
**Reference for batch context**
- Describes batch data products architecture
- Streaming builds on these patterns

## Architecture Board Decisions

### 2025-11-12: Streaming Governance Approval
**Page ID:** 5187043339
- Streaming Governance document officially approved
- Remains a "living document" for updates
- No objections from previous meeting

### 2025-10-29: Streaming Data Governance Discussion
**Page ID:** 5187043329
- Updated guidance near completion
- Reviewers provided comments, none blocking
- Two schema RFCs approved between meetings

### 2025-09-25: Streaming Data Governance Presentation
**Page ID:** 5328437285
**Summary:** Framework to address gaps in Kafka integration governance

**Key Points Presented:**
- Data Product Owner roles introduced
- Mandatory schema validation
- Standardized processes for streaming data products
- Extends batch data product patterns to streaming
- Maintains current Kafka payload format (meta + data)
- Cloud Events compliance added

## Design Rationale Summary

### Why CloudEvents-inspired Format?
- Industry standard for event envelope
- Standardized metadata for traceability/debugging
- Enables event-driven architecture patterns
- Compromise: RELEX `meta` property not fully CloudEvents compatible (backward compatibility)

### Why Compacted Topics as Default?
- Consumers can always fetch current full state from Kafka
- Enables replay capability at any time
- Natural fit for state snapshot patterns
- Exception: High-volume, frequently-changing data (e.g., sales forecasts)

### Why Single Partition per Topic?
- Multi-tenant isolation at topic level
- Ordering guarantees within partition
- Sufficient for most RELEX data product volumes
- Can increase if throughput requirements demand

### Why JSON Schema (not Avro by default)?
- Better tooling support across organization
- Human-readable schemas
- Exception: Large payloads (>1MB) use AVRO for performance (RFC-0078)

### Why DPO Role?
- Traditional ownership models don't handle many-to-many complexity
- Schema evolution must consider all producers AND consumers
- No single application owns complete data flow in data product scenarios
