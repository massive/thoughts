# Open Question: Integration Resource Scoping

**Status:** RESOLVED - Adopted tenant qualifier approach
**Raised:** 2026-01-13
**Resolved:** 2026-01-19 (meeting with key stakeholders)
**Solution:** See `tenant-level-qualifiers-proposal.md`
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

**Diagram (Olli's diagram from Slack, with corrected labels):**

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ customer                                                                                        │
│                                                                                                 │
│  ┌────────────────────────────────┐    ┌────────────────────────────────────────────────────┐  │
│  │ us                             │    │ eu                                                 │  │
│  │                                │    │                                                    │  │
│  │  ╔═════════╗  ╔═════════╗     │    │  ╔═════════════╗  ╔═════════════╗  ╔═════════════╗ │  │
│  │  ║  prod   ║  ║  uat    ║     │    │  ║    prod     ║  ║     uat     ║  ║  uat-dev    ║ │  │
│  │  ║ ─────── ║  ║ ─────── ║     │    │  ║  ─────────  ║  ║  ─────────  ║  ║  ─────────  ║ │  │
│  │  ║  plan   ║  ║  plan   ║     │    │  ║ plan    sp- ║  ║ plan    sp- ║  ║ plan    sp- ║ │  │
│  │  ║  make   ║  ║  make   ║     │    │  ║        de   ║  ║        de   ║  ║        de   ║ │  │
│  │  ║  space  ║  ║  space  ║     │    │  ║ make    sp- ║  ║ make    sp- ║  ║ make    sp- ║ │  │
│  │  ║  mobile ║  ║  mobile ║     │    │  ║        fr   ║  ║        fr   ║  ║        fr   ║ │  │
│  │  ║  conn.  ║  ║  conn.  ║     │    │  ║ mobile      ║  ║ mobile      ║  ║ mobile      ║ │  │
│  │  ║         ║  ║         ║     │    │  ║ connect     ║  ║ connect     ║  ║ connect     ║ │  │
│  │  ╚═════════╝  ╚═════════╝     │    │  ╚═════════════╝  ╚═════════════╝  ╚═════════════╝ │  │
│  │                                │    │                                                    │  │
│  └────────────────────────────────┘    └────────────────────────────────────────────────────┘  │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

Legend:
  ╔═══╗ = Tenant boundary (bold green in original) - integration resources shared within
  ┌───┐ = Region/customer boundary (dotted in original) - no data sharing across
  
Tenant names:
  - customer-us-prod, customer-us-uat
  - customer-eu-prod, customer-eu-uat, customer-eu-uat-dev (note: "dev" is a tenant qualifier, not env-type)
```

**Key insight from diagram:**
- US region has 2 tenants: `customer-us-prod`, `customer-us-uat`
- EU region has 3 tenants: `customer-eu-prod`, `customer-eu-uat`, `customer-eu-uat-dev`
- The third EU tenant uses a **tenant-level qualifier** (`dev`) to create isolation within the `uat` env-type
- Space has country qualifiers (`space-de`, `space-fr`) as **deployment qualifiers** within each tenant
- All deployments within a tenant (bold green box) share integration resources

**Important constraint:** The blueprint standardizes on 4 env-types: `dev`, `qa`, `uat`, `prod`. We cannot add new env-types. Therefore, Olli's "dev" box must be modeled as a **tenant-level qualifier** on `uat`, not a separate env-type:
- ✅ `customer-eu-uat-dev` (tenant qualifier on uat env-type)
- ❌ `customer-eu-dev` (would require "dev" as a 5th env-type, but `dev` already exists with different meaning)

The tenant boundary (bold green line) is where data moves freely—shared ABS accounts, Kafka topics, Snowflake, etc. `customer-eu-prod-space-de` can read nightly exports from `customer-eu-prod-plan`, but nothing crosses to `customer-eu-uat` or `customer-eu-dev`.

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

1. **Is two-level qualifiers the right model?** Olli proposes `{customer}-{region}-{env-type}-{tenant-qualifier}-{system}-{deployment-qualifier}`. The current blueprint only has deployment-level qualifiers.

2. **What automation rules govern tenant creation?** If qualified tenants are common (not exceptions), how does automation decide what to provision?

3. ~~**Should "dev" be a separate env-type or a qualifier?**~~ **RESOLVED:** Must be a tenant-level qualifier. The blueprint standardizes on 4 env-types (`dev`, `qa`, `uat`, `prod`), and `dev` already has a defined meaning (daily development with synthetic data). Olli's "dev" isolation need within UAT must be `customer-eu-uat-dev` (qualifier), not `customer-eu-dev` (env-type).

4. **What exactly remains at tenant level?** If Proposal A is adopted, tenant becomes metadata (same customer, region, env type) but not an operational boundary. Is "tenant" still the right name?

5. **How do we handle the transition?** Existing topic naming uses tenant UUIDs. Any change affects existing integrations.

6. **Naming collision risk:** If `dev` is both an env-type AND a valid tenant qualifier, we could have:
   - `customer-eu-dev` (env-type: development environment)
   - `customer-eu-uat-dev` (qualifier: UAT environment for development purposes)
   
   These are semantically different. Is this confusing? Should tenant qualifiers have a restricted vocabulary that doesn't overlap with env-types?

## Resolution

Meeting on 2026-01-19 adopted **Proposal B: Tenant-Level Qualifiers** (Olli's proposal).

**Key decisions:**

1. **Integration resources remain at tenant level** - deployments within a tenant share Kafka topics and blob storage
2. **Tenant qualifiers create isolation** - `circlek-eu-uat` and `circlek-eu-uat-dev` are separate tenants with separate integration resources
3. **Deployment qualifiers don't split tenants** - `circlek-eu-prod-store-pl` and `circlek-eu-prod-store-es` share resources within the same tenant
4. **Default automation** - Creates `prod` and `uat` base tenants automatically; qualified tenants created manually via CMT
5. **Cross-tenant data flow** - Generally forbidden, but documented exceptions allowed (prod→uat refresh, etc.)

Full proposal: `tenant-level-qualifiers-proposal.md`

## Related Documents

- [Foundations Blueprint DRAFT](https://relexsolutions.atlassian.net/wiki/spaces/DC/pages/5709890209) - Current model
- `tenant-level-qualifiers-proposal.md` - **ADOPTED SOLUTION**
- `integration-resources-deployment-scoped.md` - Proposal A (NOT ADOPTED)
- `unified-terminology-hierarchy-model.md` - Summary of the hierarchy model

## References

- Architecture Board channel (Slack), 2026-01-13
- Meeting transcript, 2026-01-19
