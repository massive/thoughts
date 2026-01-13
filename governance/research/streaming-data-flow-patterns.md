# Research: Streaming Data Flow Patterns (thoughts-86d)

**Source Pages:**
- Streaming Conventions (4983292520)
- Streaming Consumer Guide (4980967002)
- Streaming Producer Guide (4983292549)
- RFC-0078: Streaming Macrospace Data (3855810609)

## How Events Flow from Producers to Consumers

### Basic Event Flow
```
1. Source Application produces event
2. Schema validation (producer-side, schema-on-write)
3. Publish to Kafka topic with CloudEvents envelope
4. Kafka stores message (compacted or time-based retention)
5. Consumer subscribes and polls topic
6. Consumer validates against schema registry
7. Consumer processes CloudEvents envelope + data payload
8. Consumer commits offset after successful processing
```

### State Snapshot Pattern (Recommended)
- CloudEvents `id` = Kafka Message Key = Business Entity ID
- Each message represents current state of a single business entity
- Enables simple idempotency and tombstone deletion patterns
- Consumers read topic to end for latest state

### Event-Carried State Transfer
- "Fact" events fully describe entity state at point in time
- Updates republish full entity (not deltas)
- Consumers always have consistent view without reconstruction logic

## Event Formats and Conventions

### Message Key Format
- Simple strings: `PROD-123`
- Composite keys: `PROD-123::LOC-456` (use `::` as separator)
- Keys MUST be stable and business-relevant
- Common key sources: `location_code`, `product_code`, `code`, `date`

### Data Payload Conventions
- Field names: lowercase, alphanumeric, underscore only
- Enum values: SCREAMING_SNAKE_CASE (e.g., `ORDER_PENDING`)
- Custom fields: `custom_` prefix under `custom_fields` object

### Record Deletions (Tombstones)
- Key present, value = `null`
- Signals: record deleted, consumers should remove from local state
- Enables Kafka log compaction to remove deleted records

### Message Size Limits
- **Optimal**: <100KB
- **Practical max**: 1MB (Kafka default)
- **Hard limit**: 8MB (safe across all clusters)
- **Absolute max**: 20MB (not available everywhere)
- **Large payloads (>8MB)**: Use claim check pattern (store externally, reference via message)

## Error Handling and Retry Patterns

### Producer Error Handling
1. **Validation failures**: Log and reject before publishing
2. **Publish failures**: Retry with exponential backoff
3. **Schema incompatibility**: Stop publishing, alert DPO

### Consumer Error Handling
1. **Schema validation errors**: Log, potentially skip malformed messages
2. **Business logic errors**: Retry with backoff OR dead letter queue
3. **Connectivity issues**: Standard Kafka consumer retry patterns
4. **Offset management**: Commit only after successful processing

### Transactional Processing
- **When needed**: Read-process-write pipelines, multi-topic consistency, atomic commits
- **Producer config**: `enable.idempotence=true`, `acks=all`, `transactional.id={stable-id}`
- **Consumer config**: `isolation.level=read_committed`, `enable.auto.commit=false`

### Idempotent Processing Requirements
- Use CloudEvents `id` for deduplication
- Design for retries (duplicates may occur)
- Implement upsert logic where appropriate

## Schema Evolution Handling

### Non-Breaking Changes (allowed without coordination)
- Adding optional fields
- Adding new enum values
- Expanding field constraints (e.g., increasing string length)

### Forward-Compatible Changes (require consumer coordination)
- Removing optional fields
- Removing enum values
- Tightening field constraints

### Breaking Changes (prohibited unless absolutely necessary)
1. Propose to II-SIG with business reason
2. Create new schema version with new subject name
3. Impact assessment with all registered consumers
4. Dual publishing (12-24 months default)
5. Decommission old stream after all consumers migrate
6. Update documentation

### Consumer Migration During Breaking Changes
- Begin consuming v2 slightly earlier than v1 left-off point
- Suitable for idempotent streams
- Non-idempotent: manual switchover required
