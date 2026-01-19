# Foundations Blueprint Cleanup Plan

> **Manual execution plan:** Edit the Confluence page directly to preserve hand-tweaked formatting and styles.

**Goal:** Improve structure, clarity, and consistency of the Foundations Blueprint document

**Target:** https://relexsolutions.atlassian.net/wiki/spaces/DC/pages/5709890209/Foundations+Blueprint+DRAFT

**Page ID:** 5709890209

**Instructions:** Open the page in edit mode and work through each task. Check the box when complete.

---

## Phase 1: Critical fixes (affects understanding)

### Task 1: Remove duplicated TLDR [ ]

**Problem:** The TLDR section appears twice at the beginning of the document, identical content repeated.

**Action:** Remove the second TLDR block. Keep only one instance immediately after the sign-offs.

**Verify:** Only one TLDR section exists.

---

### Task 2: Fix anti-goals phrasing [ ]

**Problem:** The first anti-goal reads as something you ARE doing:
> "Establishing the identifier concept for automation and cross-system integration. This is covered in RFC-0106..."

**Action:** Rewrite to clarify what is OUT of scope:

```
This blueprint does not cover:

- Establishing the identifier concept for automation and cross-system integration - see RFC-0106: Immutable UUIDs as customer identifier across RELEX Platform
- Replacing existing system-internal IDs (e.g., Application ID, namespace conventions)
- Defining infrastructure-level details (pods, nodes, replicas)
- Prescribing specific tooling or implementation patterns
- Defining multi-tenant shared resources (e.g., shared Kubernetes clusters, database servers, multi-tenant ABS Storage Accounts) - to be agreed separately
```

**Verify:** Anti-goals clearly state what the document does NOT cover.

---

### Task 3: Clarify System/Service ID relationship [ ]

**Problem:** The System definition is confusing about Service IDs vs slugs:
> "Systems are based on Service IDs in Technology. However, system identifiers, used for deployment metadata, are based on Configuration Management Tool's plugin slugs."

**Action:** Replace with clearer explanation:

```
A system is a RELEX software component. These fall into two categories:
- Customer-facing applications: Plan, Store, Promo, Make, Work, Mobile Replenishment, Mobile Pro
- Platform services: Connect, Data API, Message Bus, Internal ABS, Data Product Designer

Each system has two identifiers:
- **Service ID**: The numeric identifier in the Technology catalog (e.g., Plan = 18147)
- **Slug**: The short name used in CMT and deployment naming (e.g., `plan`)

The slug is used in deployment names (`circlek-eu-prod-plan`), while the Service ID is used for internal catalogs and CMDB integration. Each CMT plugin manifest maps its slug to the corresponding Service ID.
```

**Verify:** Reader can understand the difference between Service ID and slug.

---

## Phase 2: Structure improvements

### Task 4: Add transition before tenant qualifiers section [ ]

**Problem:** The "Tenant-level qualifiers" section appears abruptly within Definitions without context.

**Action:** Add a clear heading and transition paragraph before the current content:

```
### Extending the model: Tenant-level qualifiers

The base tenant model (customer + region + environment type) works for most scenarios. However, some use cases require additional isolation at the same environment type level. This section describes how tenant qualifiers extend the model.

[existing content continues...]
```

**Verify:** The section now has proper context.

---

### Task 5: Move "How do two levels of qualifiers relate?" before examples [ ]

**Problem:** This explanatory section appears AFTER the Circle K example that uses both qualifier types. Readers see the examples before understanding the concepts.

**Action:** Move the entire section "How do two levels of qualifiers relate?" to appear immediately after the "Tenant-level qualifiers" definition section, before the "Examples" section.

**Verify:** Conceptual explanation precedes examples.

---

### Task 6: Consolidate examples section [ ]

**Problem:** "Circle K Europe" and "Global Enterprise with Data Residency Requirements" examples are separated by other content.

**Action:** Move "Global Enterprise with Data Residency Requirements" to be part of the Examples section, immediately after the Circle K examples.

**Verify:** All concrete examples are grouped together.

---

### Task 7: Move lifecycle uncertainty to explicit TBD section [ ]

**Problem:** The lifecycle section contains uncertain language inline:
> "We don't yet have an exact design for how to model this..."

**Action:** Replace with clear TBD marker:

```
### Lifecycle

Certain workloads are short-lived (sandbox environments, temporary UAT instances) while others run indefinitely (production). The leading approach is to add a lifecycle attribute at the tenant or deployment level to enable automated cleanup.

> **TBD:** The exact design for lifecycle modeling is pending. This will be defined in a future revision of this blueprint.
```

**Verify:** Uncertainty is explicitly marked, not hidden in prose.

---

## Phase 3: Consistency fixes

### Task 8: Standardize heading casing to sentence case [ ]

**Action:** Update all headings to use sentence case (only capitalize first word and proper nouns):

| Current | Change to |
|---------|-----------|
| "RELEX Unified Terminology & Hierarchy Model" | "RELEX unified terminology and hierarchy model" |
| "The Customer Hierarchy Model" | "The customer hierarchy model" |
| "Key Design Decisions" | "Key design decisions" |
| "Global Enterprise with Data Residency Requirements" | "Global enterprise with data residency requirements" |
| "How IDs Flow in Practice" | "How IDs flow in practice" |
| "Vocabulary Translation Guide" | "Vocabulary translation guide" |

**Verify:** All headings use sentence case consistently.

---

### Task 9: Unify naming pattern format [ ]

**Problem:** Two different naming patterns shown:

Pattern 1: `{customer-shortname}-{region}-{environment-type}-{system}-{optional qualifier}`

Pattern 2: `{customer}-{region}-{env-type}[-{tenant-qualifier}]-{system}[-{deployment-qualifier}]`

**Action:** Use one canonical pattern throughout:

```
{customer-shortname}-{region}-{env-type}[-{tenant-qualifier}]-{system}[-{deployment-qualifier}]
```

Update all references to use this format. Add note that:
- `{tenant-qualifier}` is optional, creates isolated tenant
- `{deployment-qualifier}` is optional, creates multiple deployments within same tenant

**Verify:** Only one naming pattern format used throughout document.

---

### Task 10: Standardize empty table cells [ ]

**Problem:** Some tables have blank cells, others use various markers.

**Action:** Use `-` for all empty/not-applicable cells:

| Tenant name | Env Type | Tenant Qualifier | Type |
|-------------|----------|------------------|------|
| `circlek-eu-prod` | prod | - | Base tenant |
| `circlek-eu-uat` | uat | - | Base tenant |
| `circlek-eu-uat-dev` | uat | `dev` | Qualified tenant |

**Verify:** All tables use `-` for empty cells.

---

### Task 11: Clean up Confluence artifacts [ ]

**Problem:** Raw macro content and artifacts visible in some places:
- `wide760` prefix on code blocks
- Stray note IDs (`note72fb5266-1c8d-47a2-b614-c070a3bff9fa`)
- Mermaid diagram macro metadata showing as text

**Action:**
1. Remove `wide760` prefixes from code blocks
2. Remove the stray note ID after sign-offs
3. Verify Mermaid diagrams render correctly (if not, consider replacing with static images)

**Verify:** No raw macro content visible to readers.

---

## Phase 4: Polish

### Task 12: Clarify Region definition [ ]

**Problem:** The Region definition is vague about relationship to Azure regions.

**Action:** Add concrete example:

```
### Region

Region defines the logical geographic boundary for RELEX infrastructure, determining data residency, regulatory compliance, and service availability.

A RELEX region is a business and operational concept - it answers "where must customer data reside?" not "which specific datacenter hosts this workload?"

Standard values:
- `eu` (Europe) - may include Azure West Europe, Azure North Europe, or private cloud facilities
- `us` (Americas) - may include Azure East US, Azure West US
- `apac` (Asia-Pacific) - may include Azure Southeast Asia, Azure Australia East

Multiple Azure regions or private cloud sites can exist within a single RELEX region.
```

**Verify:** Reader understands RELEX region vs Azure region distinction.

---

### Task 13: Integrate "Key observations" into narrative [ ]

**Problem:** "Key observations" callouts after examples interrupt reading flow.

**Action:** Move observations to introductory text before each example:

Before Circle K example:
> "The following example demonstrates several key aspects of the model: data isolation between regions (EU data stays in EU), multiple tenants per customer across environment types, and multiple Store deployments within a single tenant for country-specific operations."

Then remove the "Key observations" callout after the tree.

**Verify:** Examples read as continuous narrative.

---

## Execution order

Work through tasks 1-13 in order. Each task is independent but the order prioritizes:
1. Critical fixes first (understanding)
2. Structure improvements (navigation)
3. Consistency (polish)

After each task, verify the change is correct before proceeding.

---

## Notes

- Edit the Confluence page directly in the web UI to preserve formatting
- Work through tasks in order: Phase 1 (critical) → Phase 2 (structure) → Phase 3 (consistency) → Phase 4 (polish)
- Mark checkboxes [ ] → [x] as you complete each task
- The page is currently DRAFT status - changes can be made freely
- Consider saving between phases to create logical checkpoints
