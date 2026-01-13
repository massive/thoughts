# Research: Streaming Technical Components (thoughts-v0d)

**Source Pages:**
- Streaming Conventions (4983292520)
- Streaming Producer Guide (4983292549)
- Streaming Consumer Guide (4980967002)
- Ownership and Schema Governance (4981949361)

## Kafka Topics and Structure

### Topic Naming Convention
```
{customer}.{domain}.{category}.{data-product}[.v{MAJOR}].{suffix}
```

**Components:**
- **{customer}** - Standardized customer identifier (e.g., `customer-retail-001`)
- **{domain}** - Business domain: `supply-chain`, `space`, `pricing-promotions`, `integration`, `work`, `cpg`
- **{category}** - Subdomain defined by Data Domain Owner (e.g., `transactions`, `master-data`)
- **{data-product}** - Specific data product identifier (e.g., `order-proposals`)
- **v{MAJOR}** - Major version (v1 SHOULD be included for new topics)
- **{suffix}** - `.pub` (published/processed) or `.raw` (private to producers)

**Examples:**
```
customer-retail-001.supply-chain.transactions.order-proposals.v1.pub
customer-grocery-002.integration.master-data.products.pub
```

### Topic Configuration
- **Retention**: Infinite with log compaction (default) OR 7 days time-based
- **Compression**: `lz4` (topic-level)
- **Partitions**: Single partition per topic (multi-tenant isolation at tenant level)
- **Cleanup policy**: `compact` for state data, `delete` with `retention.ms` for events

## Event Schema Definitions

### CloudEvents Envelope Structure
```json
{
  "specversion": "1.0",
  "type": "com.relexsolutions.{domain}.{category}.{data-product}.v{MAJOR}",
  "source": "urn:relex:{application}:{customer}:{data-product}",
  "id": "{business-entity-id}",
  "time": "{iso8601-timestamp}",
  "datacontenttype": "application/json",
  "meta": {
    "correlation_id": "uuid",
    "batch_id": "identifier",
    "tenant": "customer-identifier",
    "version": "1.0.0",
    "source": {
      "application": "relex-plan",
      "application_instance": "plan-instance-003",
      "environment_type": "production",
      "version": "10.7.3"
    }
  },
  "data": {
    // Business payload
  }
}
```

### Schema Registry Subjects
```
{customer}.{domain}.{category}.{data-product}[.v{MAJOR}].{suffix}-value
```

- Uses TopicNameStrategy
- Subject aliases map topic-specific subjects to canonical schema
- Keys do NOT need schemas

### JSON Schema Requirements
- Register schemas before publishing
- Define both CloudEvents envelope AND data payload
- Required fields: specversion, type, source, id, time, datacontenttype, data

## Producer/Consumer Patterns

### Producer Requirements
- **Mandatory**: `enable.idempotence=true`, `acks=all`
- **Message validation**: Schema-on-write validation MUST be done
- **Message keys**: Every message MUST have a key
- **Key format**: Simple strings, composite keys use `::` separator (e.g., `PROD-123::LOC-456`)

### Consumer Requirements
- **Mandatory**: `isolation.level=read_committed`
- **Idempotent processing**: Use CloudEvents `id` for deduplication
- **Handle unknown fields**: Ignore for forward compatibility
- **Error handling**: Implement retry with backoff, dead letter queues

### Consumer Group Naming
```
{customer}.{consumer}[.{qualifier}]
```
- **{consumer}** - Logical name based on service naming conventions
- **{qualifier}** - Optional: `blue`, `green`, `canary`, `tmp`, `adhoc-<ticket>`

## Authentication and Access Control

### Authentication
- OAuth-based authentication SHOULD be used (not key-based)
- Environment-specific access controls
- Cross-environment isolation maintained

### Default Permissions
- **Producers**: Write to public topics, read+write to own raw topics
- **Consumers**: NO default permissions

### Access Request Process
1. Consumer requests access via central Kafka configuration registry
2. Data owner MUST approve the request
3. Consumers cannot self-approve
4. Platform team cannot approve (lacks business context)

### ACL Management
- Central provisioning via GitLab MRs (stopgap until CMT automation)
- Future: Automated via Configuration Management Tool
