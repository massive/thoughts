# Open Question: Integration Resource Scoping

**Status:** Under discussion  
**Raised:** 2026-01-13  
**Follow-up:** Meeting to be scheduled by Mikko Minkkinen  
**Key stakeholders:** Mikko Kasanen, Olli Niskanen, Mikko Minkkinen, Joonas Kröger, Matias Käkelä

## The Conflict

The Foundations Blueprint defines tenant as the integration boundary—where Kafka topics, blob storage, and other integration resources are scoped. This works for some products but not others.

### Plan's Requirement: Isolation Within Environment Type

A single Plan "instance" often has multiple environments that need **complete separation**:
- UAT-for-testing
- UAT-for-development  
- UAT-for-demos

These cannot share integration resources. If they're all deployments under one `customer-eu-uat` tenant, the current model forces them to share Kafka topics and blob storage. That's unacceptable for Plan's operational requirements.

This is not Plan-specific. Mikko Minkkinen confirmed that multiple customer contracts require 3-tier environments (dev, uat, prod) for **all** products. Joonas noted this will become common with SAP connector—tens of cases now, potentially hundreds by 2030.

### Store's Requirement: Sharing Within Tenant

Store has country-specific deployments (`circlek-eu-prod-store-pl`, `circlek-eu-prod-store-es`) that **want** to share integration resources within the same tenant. Moving integration resources to deployment level would break this.

## Two Competing Proposals

### Proposal A: Deployment-Scoped Resources

Move integration resources from tenant to deployment level.

**Topic naming changes from:**
```
{tenant-uuid}.domain.subdomain.event.version.access
```

**To:**
```
{deployment-uuid}.domain.subdomain.event.version.access
```

**Pros:**
- Matches how Plan actually operates
- Each deployment is fully isolated by default
- No ambiguity about resource ownership

**Cons:**
- Breaks Store's shared-resource model
- Cross-deployment communication requires explicit producer/consumer setup
- Undermines tenant as "primary operational binding point"
- What's left at tenant level if deployments share nothing?

### Proposal B: Tenant-Level Qualifiers (Olli Niskanen)

Keep tenant as the integration boundary, but add qualifiers at the tenant level to create more tenants.

**Naming format:**
```
{customer}-{region}-{env-type}-{optional-qualifier}
```

**Examples:**
- `customer-eu-uat-test` (tenant for testing)
- `customer-eu-uat-dev` (tenant for development)
- `customer-eu-uat` (standard tenant)

**Diagram (Olli's description):**
```
Customer
├── customer-eu-prod
│   ├── plan
│   ├── store-pl
│   ├── store-de
│   └── space-de
│
├── customer-eu-uat (for UAT testing)
│   ├── plan
│   └── store
│
└── customer-eu-dev (or customer-eu-uat-dev)
    └── plan
```

The tenant boundary (bold line) is where data moves freely—shared ABS accounts, Kafka topics, Snowflake, etc. `customer-eu-prod-space-de` can read nightly exports from `customer-eu-prod-plan`, but nothing crosses to `customer-eu-uat` or `customer-eu-dev`.

**Pros:**
- Keeps tenant as integration boundary (no model change)
- Store's shared-resource pattern continues to work
- Plan's isolation needs are met via separate tenants
- Automation creates "default" tenants; qualified tenants are exceptions

**Cons:**
- Two qualifier concepts (tenant-level and deployment-level) may cause confusion
- Current doc only defines deployment-level qualifiers
- "Manual exception" approach may not scale (Mikko M: this pattern is common)
- Needs clear automation rules for when to create qualified tenants

## Olli's Specific Connection Example

> "Store would be part of one or both of the uat tenants depending on needs, and integrated with the corresponding Plan instance. `customer-eu-uat-test-plan` connects to `customer-eu-uat-test-store` but not `customer-eu-uat-dev-store`"

## Open Questions

1. **Is two-level qualifiers the right model?** Olli proposes `{customer}-{region}-{env-type}-{qualifier}-{system}-{qualifier}`. The current blueprint only has deployment-level qualifiers.

2. **What automation rules govern tenant creation?** If qualified tenants are common (not exceptions), how does automation decide what to provision?

3. **Should "dev" be a separate env-type or a qualifier?** Olli suggested `customer-eu-uat-dev` (qualifier) or potentially `customer-eu-dev` (env-type). Different modeling has different implications.

4. **What exactly remains at tenant level?** If Proposal A is adopted, tenant becomes metadata (same customer, region, env type) but not an operational boundary. Is "tenant" still the right name?

5. **How do we handle the transition?** Existing topic naming uses tenant UUIDs. Any change affects existing integrations.

## Related Documents

- [Foundations Blueprint DRAFT](https://relexsolutions.atlassian.net/wiki/spaces/DC/pages/5709890209) - Current model
- `integration-resources-deployment-scoped.md` - Proposal A detailed writeup
- `unified-terminology-hierarchy-model.md` - Summary of the hierarchy model

## Slack Thread Reference

Architecture Board channel, 2026-01-13, starting with Matias's message about the meeting with Mikko Minkkinen.
