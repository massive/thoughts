# Understanding Streaming Data Products

> **Document Type**: Explanation (Diataxis)  
> **Audience**: Developers, architects, and product managers who need to understand how streaming data products work at RELEX  
> **Prerequisites**: Familiarity with [Data Product Governance](5769626049) concepts

This page explains what streaming data products are, how they differ from batch, and why we've adopted specific architectural patterns. For implementation details, see the [Streaming Producer Guide](4983292549) and [Streaming Consumer Guide](4980967002).

---

## What Is a Streaming Data Product?

A streaming data product delivers real-time or near-real-time data between RELEX applications via Apache Kafka. Unlike batch data products that transfer large files on schedules, streaming data products publish individual events as they occur—enabling reactive, event-driven workflows.

**Core characteristics:**
- **Event-driven**: Data flows as discrete messages when business events happen
- **Low latency**: Seconds to minutes, not hours to days
- **Continuous**: Always-on data flow rather than scheduled jobs
- **Schema-enforced**: Every message validated against a registered schema

**Typical use cases:**
- Order proposals pushed to execution systems
- Planogram changes broadcast to stores
- Demand forecasts distributed to downstream applications
- Real-time alerts and notifications

---

## How Streaming Differs from Batch

| Aspect | Batch | Streaming |
|--------|-------|-----------|
| **Latency** | Hours to days | Seconds to minutes |
| **Data format** | CSV files on Azure Blob Storage | Kafka messages with CloudEvents envelope |
| **Processing** | Scheduled, bulk transfers | Event-driven, continuous |
| **Volume per operation** | Large files, infrequent | Small messages, high frequency |
| **Schema validation** | At processing time | On write (producer) and read (consumer) |
| **State management** | Files represent point-in-time snapshots | Log compaction maintains current state |

**When to choose streaming over batch:**
- You need data within minutes, not hours
- Downstream systems should react immediately to changes
- The data represents discrete business events (order created, forecast updated)
- Multiple consumers need the same data with low latency

**When batch remains appropriate:**
- Large-scale historical data loads
- Data that changes infrequently (master data)
- Consumers process data in bulk anyway
- Integration with systems that only support file-based imports

---

## Core Architecture Components

### Apache Kafka (Confluent Cloud)

Kafka is our message streaming platform. Each streaming data product publishes to one or more Kafka topics, and consumers subscribe to receive events.

**Key design decisions:**
- **Per-tenant topics**: Each customer gets their own topic for data isolation
- **Single partition per topic**: Guarantees message ordering, sufficient for most RELEX volumes
- **Log compaction by default**: Consumers can always fetch the current full state

### Confluent Schema Registry

Every streaming data product requires a registered schema. The Schema Registry enforces this at runtime:

- **Producers** validate messages before publishing (schema-on-write)
- **Consumers** validate messages on receipt
- **Schema evolution** follows compatibility rules to prevent breaking changes

We use **JSON Schema** by default for its tooling support and human readability. For large payloads (>1MB), **AVRO** provides better serialization performance (see [RFC-0078](3855810609)).

### CloudEvents Envelope

All streaming messages use a CloudEvents-inspired envelope format:

```json
{
  "specversion": "1.0",
  "type": "com.relexsolutions.supply-chain.transactions.order-proposals.v1",
  "source": "urn:relex:plan:customer-retail-001:order-proposals",
  "id": "ORD-12345",
  "time": "2025-01-14T12:30:00Z",
  "datacontenttype": "application/json",
  "meta": {
    "correlation_id": "uuid",
    "tenant": "customer-retail-001",
    "source": {
      "application": "relex-plan",
      "environment_type": "production"
    }
  },
  "data": {
    // Business payload
  }
}
```

**Why CloudEvents?**
- Industry standard for event metadata
- Enables consistent tracing and debugging across all streaming products
- Provides schema versioning and source identification out of the box

> **Note**: RELEX's envelope includes a `meta` property that isn't part of the official CloudEvents specification. This maintains backward compatibility with existing integrations.

---

## How Events Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Producer   │───▶│    Kafka    │───▶│  Consumer   │
│ Application │    │    Topic    │    │ Application │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
   Schema             Message            Schema
  Validation         Storage           Validation
```

**Step-by-step:**
1. Producer application creates an event
2. Producer validates against Schema Registry (schema-on-write)
3. Producer publishes to Kafka topic with CloudEvents envelope
4. Kafka stores the message (compacted or time-based retention)
5. Consumer subscribes and receives the message
6. Consumer validates against Schema Registry
7. Consumer processes the business payload
8. Consumer commits offset after successful processing

### State Snapshot Pattern

Our recommended pattern treats each message as the **current state** of a business entity:

- **Message key** = Business entity ID (e.g., `ORD-12345`, `PROD-ABC::LOC-001`)
- **CloudEvents `id`** = Same as message key
- **Message value** = Complete entity state (not deltas)

This enables:
- **Simple idempotency**: Process message = upsert entity
- **Tombstone deletions**: `null` value signals deletion
- **Replay capability**: Consumers can rebuild state from the topic

---

## Ownership and Governance

Streaming data products follow the same governance model as batch, with some streaming-specific considerations. See [Roles and Ownership](5770052061) for the full framework.

### Ownership Models

| Scenario | Producers | Consumers | Owner |
|----------|-----------|-----------|-------|
| **Broadcasting** (most common) | 1 | Many | Producer |
| **Funnel** | Many | 1 | Consumer |
| **Data Product** | Many | Many | Data Product Owner (DPO) |

**Broadcasting** is the most common pattern at RELEX—one application publishes, multiple applications consume. The producer owns the topic and schema.

**Data Product Owner (DPO)** is required when multiple producers and consumers share a schema. The DPO:
- Maintains the standardized schema
- Coordinates evolution across all parties
- Manages the consumer registry for breaking change notifications
- Validates producer adherence to the schema

### Schema Governance

Schema changes fall into three categories:

| Change Type | Examples | Process |
|-------------|----------|---------|
| **Backward-compatible** | Add optional fields, add enum values | Allowed without coordination |
| **Forward-compatible** | Remove optional fields | Requires consumer coordination |
| **Breaking** | Remove required fields, change types | Requires II-SIG approval |

**Breaking changes** follow a migration process:
1. Propose to II-SIG with business justification
2. Create new schema version (new subject name)
3. Dual-publish to old and new topics (12-24 months default)
4. Coordinate consumer migration via DPO
5. Decommission old topic after all consumers migrate

### Access Control

- **Producers** get write access to their topics by default
- **Consumers** must request access; the data owner approves
- Access requests go through the central Kafka configuration repository
- Neither consumers nor the platform team can self-approve

---

## What Streaming Governance Doesn't Cover Yet

As of early 2025, streaming data products are still maturing. Some capabilities available for batch are not yet available for streaming:

| Capability | Batch | Streaming |
|------------|-------|-----------|
| Central schema management tool | ✅ Data Product Designer | 🔜 Coming |
| Self-service provisioning | ✅ | 🔜 Manual via GitLab MRs |
| Consumer registration automation | ✅ | 🔜 Manual |
| Breaking change notifications | ✅ | 🔜 Manual via DPO |

That said, streaming has unique advantages:
- **Real-time schema validation** via Schema Registry
- **CloudEvents envelope** for standardized metadata
- **Log compaction** for state persistence without external storage

---

## Related Architectural Decisions

The following RFCs shaped our streaming architecture:

- **[RFC-0075: Data Products Vision](3400269949)** — Grand vision for data products, including streaming as a consumption channel
- **[RFC-0078: Streaming Macrospace Data](3855810609)** — Established compacted topics, AVRO for large payloads, event-carried state transfer
- **[RFC-0097: Customer-facing Event API](4787011871)** — Webhooks for external customers, built on streaming topics

The Architecture Board officially accepted streaming data governance on **2025-11-13**.

---

## Where to Go Next

| Need | Resource |
|------|----------|
| Implement a producer | [Streaming Producer Guide](4983292549) |
| Implement a consumer | [Streaming Consumer Guide](4980967002) |
| Understand topic and schema conventions | [Streaming Conventions](4983292520) |
| Understand roles and ownership | [Roles and Ownership](5770052061) |
| Understand schema conventions | [Schema Conventions](5786894469) |
| Technical Kafka help | `#help-message-bus` Slack, ping `@jedi` |
| Governance questions | Contact the relevant Data Product Owner |

---

## Summary

Streaming data products enable real-time, event-driven data sharing between RELEX applications. They complement batch data products for use cases requiring low latency and reactive processing.

**Key takeaways:**
- Use **Kafka** with **CloudEvents** envelope and **Schema Registry** validation
- Follow the **state snapshot pattern** for simple idempotency and replay
- Ownership follows **producer** (broadcasting), **consumer** (funnel), or **DPO** (data product) models
- Schema evolution must respect **backward and forward compatibility**
- Breaking changes require **II-SIG approval** and coordinated migration

---

*Source references for this page: Confluence pages [4952490685](streaming-data-products), [4981949361](ownership-schema-governance), [4983292520](streaming-conventions), [4983292549](producer-guide), [4980967002](consumer-guide), [5770052061](roles-ownership), [5786894469](schema-conventions), [3855810609](RFC-0078), [4787011871](RFC-0097), [3400269949](RFC-0075)*
