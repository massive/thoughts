# Integration resources: deployment-scoped, not tenant-scoped

**Status:** NOT ADOPTED - See `tenant-level-qualifiers-proposal.md` for the adopted solution

## Problem

The current hierarchy model places integration resources (blob storage, Kafka topics, etc.) at the tenant level. This means all deployments within a tenant share the same integration infrastructure.

RELEX Plan doesn't work this way. A typical Plan setup has multiple environments within what we'd consider a single "instance" - for example, UAT-for-testing and UAT-for-development. These environments must not share integration resources. They need separate blob storage containers, separate Kafka topics, and separate connections to downstream systems.

The current model creates an impossible situation: if UAT-for-testing and UAT-for-development are both deployments under a single tenant, they'd be forced to share integration resources. That's unacceptable for Plan's operational requirements.

## Feedback source

Mikko Minkkinen raised this in a meeting after reviewing the Foundations documentation. The conclusion from that discussion: integration resources belong at the deployment level, not the tenant level.

## Proposed change

Move integration resource binding from tenant to deployment, such as but not limited to:

| Resource type | Current binding | Proposed binding |
|---------------|-----------------|------------------|
| Blob storage containers | Tenant | Deployment |
| Kafka topics | Tenant | Deployment |
| External system integrations | Tenant | Deployment |

## Implications

**Topic naming changes.** Currently topics use tenant UUID as prefix:
```
{tenant-uuid}.{domain}.{subdomain}.{event}.{version}.{access}
```

With deployment-scoped resources, topics would use deployment UUID:
```
{deployment-uuid}.{domain}.{subdomain}.{event}.{version}.{access}
```

**Cross-deployment communication.** If two deployments within a tenant need to communicate, they'd use deployment-scoped topics with explicit producer/consumer relationships. The tenant boundary still provides the access control and governance scope - it just doesn't dictate resource sharing.

**Tenant still matters.** The tenant level remains the operational boundary for:
- Access control policies
- Data governance and residency
- Environment type classification
- Regional infrastructure placement

What changes is that integration resources are provisioned per-deployment, not per-tenant.

## Why this makes sense

The hierarchy model defines tenant as "customer + region + environment type." But environment type is too coarse for Plan's needs. A single "staging" tenant might contain multiple Plan deployments with different purposes (testing vs. development vs. demo). These aren't arbitrary distinctions - they reflect genuine isolation requirements.

Binding integration resources to deployment aligns with how Plan actually operates. Each Plan deployment is an independent operational unit that shouldn't accidentally pollute or depend on resources from a sibling deployment.

## Diagram: deployment-scoped integration resources

```
Customer: Circle K Europe
├── UUID: 20546a6f-d08c-4c8d-8121-50c01f4be6b0
│
├── Tenant: circlek-eu-prod
│   ├── UUID: 6846a7a4-4e09-41a8-918c-9c8e2aa938ac
│   ├── Region: eu
│   ├── Environment Type: prod
│   │
│   ├── Deployment: circlek-eu-prod-plan
│   │   ├── UUID: f1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c
│   │   ├── System:
│   │   │   ├── Name: RELEX Plan
│   │   │   ├── Service ID: 18147
│   │   │   └── Slug: plan
│   │   │
│   │   ├── Integration Resources (deployment-scoped):
│   │   │   ├── Blob Storage: circlek-eu-prod-plan/
│   │   │   └── Kafka Topics:
│   │   │       └── f1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c.supply-chain.transactions.order-proposals.v1.pub
│   │   │           └── Consumers: Store-PL, Store-ES
│   │   │
│   │   └── Replicas:
│   │       ├── plan-eu-prod_brave-wolf-1 (JVM instance)
│   │       └── plan-eu-prod_brave-wolf-2 (JVM instance)
│   │
│   ├── Deployment: circlek-eu-prod-store-pl
│   │   ├── UUID: a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d
│   │   ├── Deployment qualifier:pl (Poland)
│   │   ├── System:
│   │   │   ├── Name: RELEX Store
│   │   │   ├── Service ID: 18148
│   │   │   └── Slug: store
│   │   │
│   │   └── Integration Resources (deployment-scoped):
│   │       ├── Blob Storage: circlek-eu-prod-store-pl/
│   │       └── Kafka Topics:
│   │           └── a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d.store.inventory.stock-levels.v1.pub
│   │
│   ├── Deployment: circlek-eu-prod-store-es
│   │   ├── UUID: b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e
│   │   ├── Deployment qualifier:es (Spain)
│   │   ├── System:
│   │   │   ├── Name: RELEX Store
│   │   │   ├── Service ID: 18148
│   │   │   └── Slug: store
│   │   │
│   │   └── Integration Resources (deployment-scoped):
│   │       ├── Blob Storage: circlek-eu-prod-store-es/
│   │       └── Kafka Topics:
│   │           └── b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e.store.inventory.stock-levels.v1.pub
│   │
│   └── Deployment: circlek-eu-prod-internal-abs
│       ├── UUID: c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f
│       ├── ABS Account ID: a8fc694g73h0a
│       ├── System:
│       │   ├── Name: Internal ABS
│       │   ├── Service ID: 18152
│       │   └── Slug: internal-abs
│       │
│       └── Integration Resources (deployment-scoped):
│           └── Blob Storage: circlek-eu-prod-internal-abs/
│
├── Tenant: circlek-eu-uat
│   ├── UUID: 8c9646e0-b9ce-426a-8849-a047e29afa9d
│   ├── Region: eu
│   ├── Environment Type: uat
│   │
│   └── Deployment: circlek-eu-uat-plan
│       ├── UUID: d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a
│       ├── System:
│       │   ├── Name: RELEX Plan
│       │   ├── Service ID: 18147
│       │   └── Slug: plan
│       │
│       ├── Integration Resources (deployment-scoped):
│       │   ├── Blob Storage: circlek-eu-uat-plan/
│       │   └── Kafka Topics:
│       │       └── d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a.supply-chain.transactions.order-proposals.v1.pub
│       │
│       └── Replicas:
│           └── plan-eu-uat_calm-seal-1 (JVM instance)
│
└── Tenant: circlek-eu-uat-dev
    ├── UUID: 9d0746f1-cace-537b-9950-b158f30bgb0e
    ├── Region: eu
    ├── Environment Type: uat
    ├── Purpose: Development testing (separate from circlek-eu-uat)
    │
    └── Deployment: circlek-eu-uat-dev-plan
        ├── UUID: e5f6g7h8-c9d0-5e2f-3a4b-5c6d7e8f9a0b
        ├── System:
        │   ├── Name: RELEX Plan
        │   ├── Service ID: 18147
        │   └── Slug: plan
        │
        ├── Integration Resources (deployment-scoped):
        │   ├── Blob Storage: circlek-eu-uat-dev-plan/
        │   └── Kafka Topics:
        │       └── e5f6g7h8-c9d0-5e2f-3a4b-5c6d7e8f9a0b.supply-chain.transactions.order-proposals.v1.pub
        │
        └── Replicas:
            └── plan-eu-uat-dev_quiet-fox-1 (JVM instance)


Customer: Circle K North America
├── UUID: afa6e0d2-b9ce-426a-8849-a047e29afdf
│
└── Tenant: circlek-us-prod
    ├── UUID: dba0f5e5-ea44-48cf-8320-46a1e5908bbf
    ├── Region: us
    ├── Environment Type: prod
    │
    └── Deployment: circlek-us-prod-plan
        ├── UUID: e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b
        ├── System:
        │   ├── Name: RELEX Plan
        │   ├── Service ID: 18147
        │   └── Slug: plan
        │
        ├── Integration Resources (deployment-scoped):
        │   ├── Blob Storage: circlek-us-prod-plan/
        │   └── Kafka Topics:
        │       └── e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b.supply-chain.transactions.order-proposals.v1.pub
        │
        └── Replicas:
            └── plan-us-prod_swift-hawk-1 (JVM instance)
```

## Key changes from tenant-scoped model

1. **Integration resources live under each deployment** - not as a separate "Kafka deployment" or tenant-level shared resource

2. **Topic names use deployment UUID** - `{deployment-uuid}.{domain}.{subdomain}.{event}.{version}.{access}` instead of tenant UUID

3. **Blob storage paths are deployment-specific** - each deployment gets its own container/path prefix

4. **Kafka Message Bus is infrastructure, not a deployment** - the underlying Kafka cluster is shared infrastructure, but topic provisioning and access is per-deployment

5. **Added circlek-eu-uat-dev tenant** - illustrates why deployment-scoped resources matter: UAT-for-testing and UAT-for-development are separate tenants with completely isolated integration resources
