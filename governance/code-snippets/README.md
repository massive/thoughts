# Batch Data Products Code Examples

Example scripts for working with batch data products.

## Scripts

| File | Description |
|------|-------------|
| `publish_sales_data.py` | Publishing data to batch data products |
| `consume_sales_data.py` | Consuming data with file tracking |
| `query_with_duckdb.py` | Ad-hoc analytics with DuckDB |

## Requirements

```bash
pip install pandas azure-storage-blob duckdb
```

## Authentication

These examples use placeholder credentials. In production, use:
- `DefaultAzureCredential` from `azure-identity` package
- Managed Identity when running in Azure
- Service Principal credentials for automated pipelines

## Related Documentation

- [Batch Data Products](link-to-confluence) - Technical specifications
- [Producer Guide](link-to-confluence) - How to publish data
- [Consumer Guide](link-to-confluence) - How to consume data

## Future

These scripts will be moved to a dedicated repository with:
- Automated testing
- CI/CD pipelines
- Version tags aligned with schema versions
