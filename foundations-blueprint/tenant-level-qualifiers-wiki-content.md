# Tenant-Level Qualifiers - Wiki Content

Content to add to the Foundations Blueprint wiki page.

---

## Section: Tenant-level qualifiers

*Insert after the "Qualifier" section under Deployment*

---

### Tenant-level qualifiers

The current model defines tenant as customer + region + environment type. This works for Store, where `circlek-eu-prod-store-pl` and `circlek-eu-prod-store-es` should share integration resources. It doesn't work for Plan, where `circlek-eu-uat` used for testing must be completely isolated from `circlek-eu-uat` used for development.

A **tenant qualifier** is an optional suffix that creates a separate, isolated tenant at the same environment type.

**Tenant naming format:**

```
{customer}-{region}-{env-type}[-{tenant-qualifier}]
```

| Tenant type | Definition | Example |
|-------------|------------|---------|
| **Base tenant** | Tenant without qualifier (the default) | `circlek-eu-uat` |
| **Qualified tenant** | Tenant with qualifier (isolated from base) | `circlek-eu-uat-dev` |

Both are full tenants with their own integration resources. The tenant qualifier creates isolation without changing the hierarchy model.

#### Examples

| Tenant name | Env Type | Tenant Qualifier | Type |
|-------------|----------|------------------|------|
| `circlek-eu-prod` | prod | - | Base tenant |
| `circlek-eu-uat` | uat | - | Base tenant |
| `circlek-eu-uat-dev` | uat | `dev` | Qualified tenant |
| `circlek-eu-uat-demo` | uat | `demo` | Qualified tenant |

#### Two levels of qualifiers

| Qualifier type | Purpose | Effect | Example |
|----------------|---------|--------|---------|
| **Tenant qualifier** | Create isolated tenant at same env-type | New tenant, separate integration resources | `uat-dev`, `uat-demo` |
| **Deployment qualifier** | Multiple deployments of same system in tenant | Same tenant, shared integration resources | `store-pl`, `store-es` |

**Full naming pattern:**

```
{customer}-{region}-{env-type}[-{tenant-qualifier}]-{system}[-{deployment-qualifier}]
```

Examples:
- `circlek-eu-uat-plan` - base tenant, Plan deployment
- `circlek-eu-uat-dev-plan` - qualified tenant, Plan deployment
- `circlek-eu-uat-store-pl` - base tenant, Store deployment with country qualifier

#### Key principles

1. **Tenant is the integration boundary** - All deployments within a tenant share integration resources. Data flows freely between `circlek-eu-prod-plan` and `circlek-eu-prod-store-pl` because they're in the same tenant.

2. **Qualified tenants are fully isolated** - `circlek-eu-uat` and `circlek-eu-uat-dev` are separate tenants. They have different UUIDs, different Kafka topics, different blob containers. No automatic data sharing.

3. **Deployment qualifiers don't split tenants** - `circlek-eu-prod-store-pl` and `circlek-eu-prod-store-es` are different deployments in the SAME tenant. They share integration resources.

4. **Tenant qualifiers DO split tenants** - `circlek-eu-uat` and `circlek-eu-uat-dev` are DIFFERENT tenants. Complete isolation.

#### Visual model

```
Customer: Circle K Europe
│
├── Tenant: circlek-eu-prod (base tenant)
│   ├── Integration Resources (shared within tenant)
│   │   ├── Kafka topics: {tenant-uuid}.*
│   │   └── Blob storage: circlek-eu-prod/
│   │
│   ├── Deployment: circlek-eu-prod-plan
│   ├── Deployment: circlek-eu-prod-store-pl   (deployment qualifier: pl)
│   ├── Deployment: circlek-eu-prod-store-es   (deployment qualifier: es)
│   └── Deployment: circlek-eu-prod-connect
│
├── Tenant: circlek-eu-uat (base tenant)
│   ├── Integration Resources (isolated from prod and uat-dev)
│   │   ├── Kafka topics: {tenant-uuid}.*
│   │   └── Blob storage: circlek-eu-uat/
│   │
│   ├── Deployment: circlek-eu-uat-plan
│   ├── Deployment: circlek-eu-uat-store-pl
│   └── Deployment: circlek-eu-uat-connect
│
└── Tenant: circlek-eu-uat-dev (qualified tenant)
    ├── Integration Resources (isolated from uat base tenant)
    │   ├── Kafka topics: {tenant-uuid}.*
    │   └── Blob storage: circlek-eu-uat-dev/
    │
    ├── Deployment: circlek-eu-uat-dev-plan
    ├── Deployment: circlek-eu-uat-dev-connect
    └── (No Store - not needed for this use case)
```

---

## Section: Automation and provisioning

*Insert after the tenant-level qualifiers section*

---

### Automation and provisioning

#### Default provisioning (automatic)

When a customer is created, provision:
- `{customer}-{region}-prod` (base tenant)
- `{customer}-{region}-uat` (base tenant)

Each purchased product gets deployments in both tenants automatically. This covers the majority of customers who need standard prod/UAT isolation.

#### Qualified tenants (manual via CMT)

Qualified tenants are not created by default. When additional isolation is needed:

1. Consultant opens CMT
2. Creates new tenant with tenant qualifier (e.g., `circlek-eu-uat-dev`)
3. Selects which systems to deploy (checkboxes: Plan, Connect, Store, etc.)
4. Platform provisions selected deployments with their integration resources

This keeps infrastructure costs controlled - qualified tenants are created when explicitly needed, not by default. A customer might have a dozen deployments but only two or three tenants.

---

## Section: Cross-tenant data movement

*Insert after automation section*

---

### Cross-tenant data movement

**General rule:** Data does not cross tenant boundaries.

A tenant's integration resources (Kafka topics, blob storage, databases) are isolated by design. There is no automatic mechanism to share data between `circlek-eu-uat` and `circlek-eu-uat-dev`, or between `circlek-eu-prod` and `circlek-eu-uat`.

#### Documented exceptions

| Exception | Description | Controlled by |
|-----------|-------------|---------------|
| Incoming data duplication | Connect reads customer data once, writes to both prod and uat | Connect service |
| Database refresh | Copy production data to UAT for testing | Defined process (TBD by files team) |
| Enterprise reporting | Aggregate data across tenants for customer-wide reports | Dedicated reporting service |

These exceptions MUST:
- Flow through a controlled service (Connect, Data Pipeline, etc.)
- Be explicitly documented per customer
- Follow a standardized pattern

Cross-tenant data movement should NEVER be done by directly connecting one tenant's database or storage to another's. The boundary must be crossed through a service that can be audited and controlled.

---

## FAQ additions

*Add to existing FAQ section*

---

**Q: Is `circlek-eu-uat-dev` a new environment type?**

No. The environment type is still `uat`. The `dev` is a tenant qualifier that creates a separate isolated tenant within the UAT tier. The four environment types (`dev`, `qa`, `uat`, `prod`) remain unchanged.

**Q: Can Store in `circlek-eu-uat-dev` talk to Store in `circlek-eu-uat`?**

No. They're in different tenants. If that's needed, they should be in the same tenant as separate deployments with deployment qualifiers.

**Q: When should I use a tenant qualifier vs a deployment qualifier?**

- **Tenant qualifier:** When you need complete isolation including integration resources (separate Kafka topics, separate blob storage)
- **Deployment qualifier:** When you need multiple instances of the same system that share integration resources (country-specific Store deployments)

**Q: What if I need Plan isolation but Store sharing?**

Create qualified Plan tenants (`uat`, `uat-dev`) but keep Store only in the base tenant (`uat`). Integration between `uat-dev-plan` and `uat-store` would require explicit cross-tenant data flow - a documented exception case.

**Q: Is this more complex than deployment-scoped resources?**

Yes, but it preserves the "tenant as integration boundary" principle that works well for Store and other products. The complexity is in the exception cases, not the default behavior.
