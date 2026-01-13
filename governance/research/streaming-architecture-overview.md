# Research: Streaming Architecture Overview (thoughts-53j)

**Source Pages:**
- Streaming Data Products (4952490685)
- Ownership and Schema Governance (4981949361)
- Data Product Governance (5769626049)
- Understanding Batch Data Products (4982964415) - for comparison

## Core Streaming Components

### Apache Kafka (Confluent Cloud)
- Primary message streaming platform
- Per-tenant topic strategy with single partition per topic
- CloudEvents-inspired envelope format mandatory
- EU and US regional clusters available

### Confluent Schema Registry
- Mandatory schema validation
- JSON Schema format (also AVRO for large payloads like Macrospace)
- Subject naming: `{topic-name}-value`
- Forward-transitive compatibility recommended

### CloudEvents Specification
- Standard message envelope format (v1.0 inspired)
- Required fields: specversion, type, source, id, time, datacontenttype
- RELEX addition: `meta` top-level property (not fully CloudEvents compatible)

### Data Product Designer (roadmap)
- Future: schema governance integration
- Currently: manual schema management via GitLab provisioning repository

## How Streaming Differs from Batch

| Factor | Batch | Streaming |
|--------|-------|-----------|
| Latency requirement | Hours to days | Seconds to minutes |
| Data volume | Large files, infrequent | Small messages, high frequency |
| Processing pattern | Scheduled, bulk | Event-driven, reactive |
| Technology | CSV on Azure Blob Storage | Kafka with CloudEvents |
| Typical use cases | Master data, historical, aggregations | Order proposals, real-time updates, alerts |

## Integration Points with RELEX Applications

### Producers
- RELEX Plan (order proposals, demand forecasts)
- RELEX Store (floorplans, location space via RFC-0078)
- Data API / SAP Connector
- Promo & Pricing (promotions)
- Any RELEX application can be a producer

### Consumers
- RELEX Plan
- Promo & Pricing
- Mobile Replenishment
- Category Management
- Event API (customer-facing webhooks via RFC-0097)

### Key Integration Patterns
1. **One-to-many (broadcasting)** - Most common at RELEX
   - Example: Demand forecasts, planograms, promotions
   - Owner: Producer
   
2. **Many-to-many (data product)**
   - Example: Order proposals (Data API + SAP Connector -> Plan + P&P)
   - Requires Data Product Owner (DPO)

3. **Many-to-one (funnel)**
   - Example: Event API collecting from multiple sources
   - Owner: Consumer

## Architecture Diagram Context

```
Producer Apps → Kafka Topics (CloudEvents) → Consumer Apps
                    ↓
            Schema Registry
                    ↓
         (Future) Data Product Designer
```

## Current Status
- **Development Phase**: Streaming data products being developed and piloted
- **Officially accepted**: RELEX Architecture Board 2025-11-13
- Pilot deployments limited; production deployments in progress
