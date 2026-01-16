# Understanding Streaming Data Products - Research Output

## Overview

This research consolidates RELEX's streaming data products documentation, architectural decisions, and technical standards into a structured outline for building an explanation page parallel to "Understanding Batch Data Products."

**Research Conducted**: January 2026
**Status**: Complete - Ready for page creation
**Scope**: RELEX Internal Integrations (II), Data Products (DP), and Architecture (DC) spaces

## Contents

- **research_contract.md** - Scope, questions, and methodology
- **source_catalog.md** - All sources with quality ratings and page IDs
- **page_outline.md** - Full structural outline with key content points and gaps

## Quick Navigation

### For Page Creation
Start with `page_outline.md` - contains the section structure, key content points for each section, and source IDs for verification.

### For Source Verification
See `source_catalog.md` for complete source list, authority ratings, and content descriptions.

### For Research Methodology
See `research_contract.md` for scope, questions asked, and search strategy.

## Key Findings Summary

**Architecture approach**: Streaming is simpler than batch but requires CloudEvents compliance and schema governance
**Core platform**: Apache Kafka on Confluent Cloud with event-driven architecture
**Key differentiators from batch**: Real-time delivery, multiple consumers, standardized CloudEvents envelope, compacted topics
**Governance model**: Same ownership patterns as batch (Direct/Broadcasting/Funnel/Data Product models)
**Standards**: Mandatory CloudEvents v1.0 envelope, JSON Schema registration, specific naming conventions
**Approval status**: Officially approved by RELEX Architecture Board (2025-11-13)

## Content Structure for New Page

The outline follows Diataxis principles:
- **Architecture Overview** - Explanation section (understand what/why)
- **Technical Components** - Reference section (facts and specifications)
- **Data Flow Patterns** - How-to adjacent (conceptual flows)
- **Governance** - Explanation section (roles, ownership, evolution)
- **Getting Started** - How-to guides (links to existing guides)

