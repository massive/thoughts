"""
Example: Querying batch data products with DuckDB.

DuckDB can query CSV files directly from Azure Blob Storage,
which is useful for ad-hoc analytics without downloading files.

Requirements:
    pip install duckdb
"""

import duckdb


def setup_azure_connection(con: duckdb.DuckDBPyConnection, account_name: str) -> None:
    """Configure DuckDB to connect to Azure Blob Storage."""
    con.install_extension("azure")
    con.load_extension("azure")

    # Use credential chain for authentication
    # This works with DefaultAzureCredential (managed identity, CLI, etc.)
    con.sql(
        f"""
        CREATE SECRET azure_secret (
            TYPE azure,
            PROVIDER credential_chain,
            ACCOUNT_NAME '{account_name}'
        )
        """
    )


def query_sales_by_location(
    con: duckdb.DuckDBPyConnection, storage_account: str
) -> duckdb.DuckDBPyRelation:
    """Example: Aggregate sales by location."""
    return con.sql(
        f"""
        SELECT
            location,
            SUM(CAST(amount AS DOUBLE)) as total_sales,
            COUNT(*) as transaction_count
        FROM 'az://{storage_account}.blob.core.windows.net/shared-data-products-raw/sales/sales*.csv'
        GROUP BY location
        ORDER BY total_sales DESC
        LIMIT 10
        """
    )


# Example usage
if __name__ == "__main__":
    storage_account = "rxicustomername"

    con = duckdb.connect()
    setup_azure_connection(con, storage_account)

    result = query_sales_by_location(con, storage_account)
    print(result)
