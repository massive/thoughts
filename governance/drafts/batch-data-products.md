# Batch Data Products

Batch data products enable RELEX applications to share data through standardized CSV files in Azure Blob Storage. Instead of custom integrations between every pair of applications, data products provide a common format and centralized storage that any authorized application can access.

This page defines the technical contract for batch data products. For step-by-step implementation guides, see:
- [Producer Guide](link) - How to publish data
- [Consumer Guide](link) - How to consume data

## File format specification

All batch data product files use CSV format with the following rules.

### Character encoding and structure

| Property | Value |
|----------|-------|
| Character set | UTF-8 (no BOM) |
| Field separator | Semicolon `;` |
| Line separator | Newline `\n` |
| Quote character | Double quote `"` |
| Compression | GZIP (`.gz` extension) - recommended |
| Header line | Required, contains field names |

### Quoting rules

- If a field value contains a semicolon, wrap it with double quotes: `apple;orange` becomes `"apple;orange"`
- If a field value contains a double quote, wrap it and escape the quote by doubling it: `40" TV` becomes `"40"" TV"`
- String values may optionally be quoted: `pear` or `"pear"` are both valid

### Field names

Field names in the header must use only:
- Lowercase letters `a-z`
- Numbers `0-9`
- Underscore `_`

## Data types

CSV does not have built-in data types. Use these definitions:

| Type | Definition | Example |
|------|------------|---------|
| `string` | Text up to 16,777,216 characters. Optionally define a lower maximum. | `"Helsinki"` |
| `integer` | 4-byte integer values | `42` |
| `double` | Decimal values. Use `.` as decimal separator. Percentages as decimals (20% = `0.2`). | `3.14` |
| `date` | ISO 8601 format | `2025-06-23` |
| `time` | 24-hour format | `14:30` |
| `boolean` | Lowercase true/false | `true` |
| `timestamp` | RFC 3339 with timezone. Both `Z` and `+00:00` valid for UTC. | `2025-06-23T14:30:00+02:00` |

### Empty fields

- Empty numeric or string fields: two consecutive separators `;;`
- Empty string vs zero-length string: `;;` is empty (null), `;"";` is zero-length string

### Enumerated values

Use `string` type with SCREAMING_SNAKE_CASE formatting: `ORDER_PLACED`, `SHIPPED`, `DELIVERED`

## Container structure

Each customer has a dedicated Azure Blob Storage account with these containers:

### shared-data-products-raw

Primary data source. Contains files uploaded directly by data producers (Connect, Plan, Promo and Pricing, and others).

- Data producers: read and write access
- Data consumers: read-only access
- Files are schema-validated before upload

### shared-data-products-processed

Contains output from the Dagster/Snowflake pipeline - aggregated, transformed, or consolidated data such as full master data files and historical transaction data.

- Only the data pipeline writes to this container
- Data consumers: read-only access

### shared-data-products-schema-versions

Contains JSON schemas from Data Product Designer for producer-side validation.

## Path conventions

### In shared-data-products-raw

Files go at the root of data product-specific folders:
- `/locations/` for Locations data product
- `/products/` for Products data product
- `/sales/` for Sales data product

The exact path is defined in each data product's metadata.

### In shared-data-products-processed

Files go in subfolders by file type:
- `/locations/full/` for comprehensive master data
- `/locations/delta/` for changed rows (if implemented)

## Filename conventions

Pattern: `{file_prefix}{_optional_filetype}_{timestamp}_{unique_id}{_optional_file_identifier}.csv{.optional_compression}`

| Component | Description | Example |
|-----------|-------------|---------|
| `file_prefix` | Data product-specific prefix. Lowercase, numbers, underscores. Cannot end with `_`. | `product_locations` |
| `_optional_filetype` | Optional. File type like `full` or `delta`. | `_full` |
| `timestamp` | UTC timestamp: `YYYYMMDDTHHMMSSZ` | `20250623T143000Z` |
| `unique_id` | Unique run identifier. UUID recommended. | `43058881-a11b-46d2-880c-05e6d900d8d9` |
| `_optional_file_identifier` | Optional. For split files: `{n}`, `{n}_{n}`, or `{n}_{n}_{n}` | `_01` or `_4_0_0` |
| `.csv` | File extension | `.csv` |
| `.optional_compression` | Compression type. Only `gz` supported. | `.gz` |

### Examples

```
product_locations_20250623T143000Z_43058881-a11b-46d2-880c-05e6d900d8d9_01.csv
product_locations_full_20250623T143000Z_43058882-a11b-46d2-880c-05e6d900d8d9_4_0_0.csv
sales_20250623T143000Z_43058883-a11b-46d2-880c-05e6d900d8d9_0_0_0.csv.gz
```

### Splitting datasets

Large datasets may be split into multiple files. When splitting:
- Include `optional_file_identifier` in each filename
- A Kafka notification (when available) will list all files in a dataset

### Empty files

If a producer has no new data for a delta export, an empty file with 0 rows (header only) may be created.

## Architecture overview

Batch data products use these components:

| Component | Purpose |
|-----------|---------|
| Azure Blob Storage | File storage and data exchange |
| Data Product Designer | Schema management, customer configuration, JSON schema generation |
| Dagster | Pipeline orchestration for processing raw data into consolidated outputs |
| Snowflake | Data warehousing for aggregation and transformation |
| Kafka (planned) | Event notifications for file arrivals |

### Regional deployment

| Region | Azure Region |
|--------|--------------|
| EU | westeurope |
| US | eastus2 |

### Environment types

| Environment | Abbreviation | Purpose |
|-------------|--------------|---------|
| Development | dev | Software development |
| Testing | qa | Quality assurance |
| Staging | stg | User acceptance testing |
| Production | prod | Production with real customer data |

Storage account naming: `rxi{customer_name}main{env_suffix}` (e.g., `rxidpe2emaindev`, `rxidpe2emain` for prod)

## Monitoring

### Available tools

- **Datadog** - Application performance, infrastructure metrics, custom dashboards
- **Observe** - Log aggregation and analysis
- **Dagster UI** - Pipeline execution monitoring, asset lineage, run history

### Key metrics

**For producers:**
- File upload success/failure rates
- Schema validation errors
- Publishing frequency

**For consumers:**
- File processing success/failure rates
- Data freshness (time since last successful processing)
- Unprocessed file backlog

For detailed monitoring guidance, see the Producer Guide and Consumer Guide.

## Current limitations

- **Pilot phase:** Data products are in pilot with limited customers
- **CSV only:** Parquet support is planned but not yet available
- **Batch processing:** Real-time streaming is handled separately (see Streaming Data Products)
- **Regional availability:** EU (westeurope) and US (eastus2)

## Getting help

| Topic | Contact |
|-------|---------|
| Schema and data questions | Your Data Domain Owner |
| Technical issues | #tech-data-products Slack channel |
| Access requests | Follow the ABS access request process |
| General questions | Data Products team |

## Related pages

- [Data Product Governance](link) - Overview and entry point
- [Roles and Ownership](link) - Who owns what
- [Schema Conventions](link) - Shared naming rules and data types
- [Producer Guide](link) - Step-by-step guide for publishing data
- [Consumer Guide](link) - Step-by-step guide for consuming data
