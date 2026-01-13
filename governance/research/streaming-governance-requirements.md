# Research: Streaming Governance Requirements (thoughts-2bn)

**Source Pages:**
- Roles and Ownership (5770052061)
- Schema Conventions (5786894469)
- Data Product Governance (5769626049)
- Ownership and Schema Governance (4981949361)

## Link to Shared Governance Pages

### Roles and Ownership (Page ID: 5770052061)
URL: https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5770052061

**Key Roles:**
| Role | Responsibilities |
|------|-----------------|
| **Domain Owner** | Overall responsibility for domain data, assigns roles, final word on domain decisions |
| **Data Product Owner (DPO)** | Schema maintenance, versioning, consumer registry, breaking change coordination |
| **Module Owner** | Maps module data needs to latest schema versions |
| **Data Products Team** | Ensures conventions followed, maintains tooling (Data Product Designer) |

### Schema Conventions (Page ID: 5786894469)
URL: https://relexsolutions.atlassian.net/wiki/spaces/II/pages/5786894469

**Key Conventions:**
- Field names: lowercase only (a-z, 0-9, underscore)
- Data types: string, integer, double, date, time, boolean, timestamp, enum
- Enum format: SCREAMING_SNAKE_CASE
- Primary keys: use `code` field
- Foreign keys: use `_code` suffix (e.g., `product_code`)
- Custom fields: `custom_` prefix under `custom_fields` object
- Versioning: MAJOR.MINOR.PATCH semantic versioning

## Streaming-Specific Ownership Conventions

### Ownership Models
| Scenario | Producers | Consumers | Owner | DPO Needed |
|----------|-----------|-----------|-------|------------|
| Direct (one-to-one) | 1 | 1 | Consumer | Yes (if data product) |
| Broadcasting (one-to-many) | 1 | Many | Producer | Yes |
| Funnel (many-to-one) | Many | 1 | Consumer | Yes |
| Data product (many-to-many) | Many | Many | DPO | Yes |

### Data Product Owner (DPO) Requirements
**Responsibilities:**
- Create and maintain standardized schema
- Coordinate schema evolution across all producers/consumers
- Maintain consumer registry for breaking change notifications
- Ensure comprehensive AsyncAPI and usage documentation
- Validate producer adherence to standardized schema

**Authority:**
- Decision authority on schema changes
- Approval authority for new producers
- Coordination responsibility for breaking change migrations
- Quality gate for schema compliance

**Selection Criteria:**
- Domain expertise in the data being standardized
- Organizational authority to coordinate across teams
- Alignment with existing Data Domain Owners
- Typically from Data Products team or domain-owning application team

### What Ownership Means in Practice
- Topic creation and management
- ACL approvals for consumers
- Schema management with DPO coordination
- Delegate technical responsibilities to technology team

## Governance Gaps vs Batch

### Batch Has, Streaming Lacks (as of mid-2025)
1. **Central schema management tool** - Coming to replace manual management
2. **Self-service topic/ACL provisioning** - Automated provisioning planned
3. **Consumer registration automation** - Currently manual
4. **Automated notification system** - For breaking schema changes
5. **Schema validation tooling integration** - Enhanced DX planned

### Streaming Has That Batch Doesn't
1. **Real-time schema validation** via Schema Registry
2. **CloudEvents envelope standard** for metadata
3. **Log compaction** for state persistence

## Key Governance Contacts

- **Policy and approval**: II-SIG for new data product proposals and breaking changes
- **Domain-specific guidance**: Contact Data Domain Owner
- **Technical Kafka issues**: @jedi in #help-message-bus Slack
- **Schema/governance questions**: Contact relevant DPO

## Schema Governance Process

### Change Categories
| Change Type | Examples | Process |
|-------------|----------|---------|
| Backward-compatible | Add optional fields, add enum values | Allowed without coordination |
| Forward-compatible | Remove optional fields, tighten constraints | Requires consumer coordination |
| Breaking | Remove required fields, change types, rename | Prohibited unless necessary |

### Breaking Change Process
1. Propose to II-SIG with business justification
2. Create new schema version with new subject name
3. DPO coordinates impact assessment
4. Implement migration (dual publishing default: 12-24 months)
5. Decommission old schema after all migrate
6. Update all documentation

### II-SIG Authority
- Final authority over data products in general
- Approval required before implementing any new streaming data product
- Review process includes use case, technical requirements, governance model
