# Consumer Guide

This guide walks you through consuming data from batch data products. Follow these steps to become a data consumer.

For technical specifications (file format, data types, filename patterns), see the parent page: [Batch Data Products](link).

## Prerequisites

Before you start:
- Understand what data you need and how you will use it
- Have access to the customer environment where data is available
- Coordinate with your Data Domain Owner for mapping requirements

## Step 1: Get Azure Blob Storage access

Data products are stored in Azure Blob Storage. Access is granted through Service Principals.

**What to request:**
- Customer name (e.g., "dpe2e")
- Environment (dev, qa, stg, prod)
- Region (EU or US)
- Read access to both containers:
  - `shared-data-products-raw` (primary data source)
  - `shared-data-products-processed` (processed/aggregated data)

**Process:** Follow the [Azure Blob Storage documentation](link).

**Timeline:** Access is typically granted within 1-2 business days.

## Step 2: Discover available data products

Before consuming, explore what data products are available.

**Discovery tools:**
- [Data Product Catalog](link) - All available data products
- [Data Product Designer](https://data-product-designer.data-internal.relexsolutions.com/) - Browse schemas
- Your Data Domain Owner - Help identifying relevant data products
- [II-SIG](link) - Help with missing data products

**Information to gather:**
- Available data products (sales, products, locations, etc.)
- Field definitions and data types
- Update frequency and timing
- File naming patterns
- Custom fields specific to your customer

## Step 3: Understand file formats and locations

Files follow standardized conventions. See the Batch Data Products page for complete specifications.

**Key points:**
- Format: CSV with semicolon separator
- Encoding: UTF-8
- Compression: Files may be GZIP compressed (`.gz`)
- Location: `shared-data-products-raw/{data_product_name}/`

## Step 4: Implement consumption logic

Design your consumption approach based on these patterns.

### Incremental processing

Track which files you have processed to avoid duplicates.

**Best practice:** Track at the file level, not just timestamps.

```python
# Check if file has been processed
if not already_processed(file.name):
    process_file(file)
    mark_as_processed(file.name)
```

### Selective field processing

Only process fields relevant to your application.

- Improves performance
- Reduces coupling to schema changes
- Map standard fields to your internal model

### Error handling

- Handle malformed files gracefully
- Implement retry logic for temporary issues
- Log processing errors for troubleshooting

### Schema evolution

Design for schema changes over time:
- Handle new optional fields gracefully
- Validate that critical fields are present
- Do not fail on unknown fields

## Step 5: Choose a file discovery strategy

### Option A: Polling pattern

Check for new files periodically.

```python
# Check for new files since last check
new_files = list_files_since_last_check()
for file in new_files:
    if not already_processed(file):
        process_file(file)
        mark_as_processed(file)
```

### Option B: Full scan pattern

Scan all files and filter already-processed ones.

```python
# Scan all files, filter processed
all_files = list_all_files()
unprocessed = [f for f in all_files if not already_processed(f)]
for file in unprocessed:
    process_file(file)
    mark_as_processed(file)
```

## Step 6: Handle data types correctly

Parse data types according to standard definitions.

| Type | Parsing notes |
|------|---------------|
| `string` | May be quoted |
| `integer` | Standard integer parsing |
| `double` | Use `.` as decimal separator |
| `date` | Format: `YYYY-MM-DD` |
| `time` | Format: `HH:MM` (24-hour) |
| `boolean` | Lowercase: `true` or `false` |
| `timestamp` | ISO 8601 with timezone |

**Empty values:**
- Empty numeric fields: empty string between separators (`;;`)
- Empty string vs zero-length: `;;` is null, `;"";` is zero-length

## Step 7: Implement monitoring

Set up monitoring for reliable consumption.

**Key metrics:**
- Processing success/failure rates
- Data freshness (time since last successful processing)
- Processing latency
- Unprocessed file backlog

**Recommended alerts:**
- No new files within expected timeframe
- Processing failures above threshold
- Unexpected schema changes
- Storage access issues

## Example code

See the [batch-data-products-examples repository](link-to-repository) for complete, tested code samples:

- **consume_sales_data.py** - Consumer class with file tracking using SQLite
- **query_with_duckdb.py** - Ad-hoc analytics querying files directly from ABS

The examples demonstrate:
- Tracking processed files to avoid duplicates
- Parsing CSV with correct format settings (semicolon separator, UTF-8)
- Handling GZIP compressed files
- Converting data types safely
- Using DuckDB for analytics without downloading files

## Best practices summary

**Do:**
- Track processed files to avoid duplicates
- Implement error handling and retry logic
- Process only fields relevant to your application
- Monitor data freshness and processing success
- Handle schema evolution gracefully

**Do not:**
- Rely on file timestamps alone for processing logic
- Process all fields if you only need some
- Assume schema will never change
- Skip error handling for malformed data
- Process files multiple times unnecessarily

## Common issues

| Issue | Solution |
|-------|----------|
| Access denied | Verify Service Principal credentials |
| File parsing errors | Check encoding (UTF-8), separator (semicolon), quoting |
| Missing expected files | Check producer status; verify path and naming patterns |
| Stale data | Check producer publishing schedule; set up freshness alerts |

## Getting help

| Topic | Contact |
|-------|---------|
| Data questions | Your Data Domain Owner |
| Technical issues | #tech-data-products Slack channel |
| Access issues | Follow ABS access request process |
| Schema questions | Use Data Product Designer or consult specifications |

## Next steps

Once you are consuming data successfully:
1. Set up automated monitoring and alerting
2. Optimize consumption patterns for performance
3. Plan for handling schema evolution
4. Implement data quality checks
5. Document your consumption patterns for your team
