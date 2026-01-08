# Producer Guide

This guide walks you through publishing data to batch data products. Follow these steps to become a data producer.

For technical specifications (file format, data types, filename patterns), see the parent page: [Batch Data Products](link).

## Prerequisites

Before you start:
- Understand your data schema and business requirements
- Have access to the customer environment where you need to publish
- Coordinate with your Data Domain Owner for schema validation

## Step 1: Contact II-SIG

Before creating a new data product, contact the [Internal Integrations Special Interest Group (II-SIG)](link). They will:
- Approve the new data product
- Provide guidance on schema design
- Ensure alignment with existing data products

## Step 2: Get Azure Blob Storage access

Data products use Azure Blob Storage. Access is granted through Service Principals.

**What to request:**
- Customer name (e.g., "dpe2e")
- Environment (dev, qa, stg, prod)
- Region (EU or US)
- Write access to `shared-data-products-raw` container

**Process:** Follow the [Azure Blob Storage documentation](link).

**Timeline:** Access is typically granted within 1-2 business days.

## Step 3: Understand your data product schema

Before producing data, understand what structure is expected.

**Schema sources:**
- [Data Product Designer](https://data-product-designer.data-internal.relexsolutions.com/) - Primary source for current schemas
- Your Data Domain Owner - Help with schema mapping
- [Standard interface specifications](link)

**Key requirements:**
- Field names: lowercase letters, numbers, underscores only
- Data types: Follow standard definitions (see Batch Data Products page)
- Custom fields: Must be prefixed with `custom_`

## Step 4: Implement file format

Your files must comply with the batch data product format:

- **Format:** CSV with semicolon separator
- **Encoding:** UTF-8 (no BOM)
- **Compression:** GZIP recommended
- **Header:** Required, with valid field names

See the Batch Data Products page for complete format specifications.

## Step 5: Choose your publishing location

Publish files to `shared-data-products-raw` container.

**Path:** `/{data_product_name}/`

Examples:
- Sales data: `/sales/`
- Product data: `/products/`
- Location data: `/locations/`

The exact path is defined in your data product's metadata.

## Step 6: Implement validation

Validate your data before publishing:

**Required validations:**
- Schema compliance (correct field names and types)
- Data quality (no missing required fields)
- File format compliance (CSV structure)
- Filename format compliance

**Recommended approach:**
- Implement validation in your data pipeline
- Test with sample data in dev environment first
- Monitor for errors in production

## Step 7: Document your data product

A data product without documentation has no discoverability. At minimum, document your data product in the [Data Product Catalog](link).

## Step 8: Publish your data

Once validation passes, upload files to the designated container.

**Best practices:**
- Publish files atomically (upload complete files, not partial)
- Use consistent timing for regular updates
- Monitor for successful uploads
- Track published files for troubleshooting

## Step 9: Monitor and maintain

After going live:

**Monitor:**
- Failed uploads
- Data quality metrics
- Schema changes or updates

**Maintain:**
- Update schemas when business requirements change
- Adapt to new standards
- Communicate changes to stakeholders and consumers

## Example code

See the [batch-data-products-examples repository](link-to-repository) for complete, tested code samples:

- **publish_sales_data.py** - How to format data and upload to Azure Blob Storage

The examples demonstrate:
- Generating filenames with correct timestamp and UUID format
- Converting DataFrames to CSV with semicolon separators
- Uploading to the correct container and path

## Common issues

| Issue | Solution |
|-------|----------|
| Access denied | Verify Service Principal credentials and permissions |
| Schema validation failed | Check field names, data types, and required fields |
| File not appearing | Verify container name and path |
| Upload timeout | Check network connectivity; consider splitting large files |

## Getting help

| Topic | Contact |
|-------|---------|
| Schema questions | Your Data Domain Owner |
| Technical issues | #tech-data-products Slack channel |
| Access issues | Follow ABS access request process |

## Next steps

Once you are producing data successfully:
1. Set up monitoring and alerting
2. Coordinate with data consumers
3. Plan for future schema evolution
4. Consider implementing automated testing
