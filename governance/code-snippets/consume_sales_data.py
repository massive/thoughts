"""
Example: Consuming sales data from batch data products.

This script demonstrates how to:
- List and track processed files
- Parse CSV with correct format settings
- Handle compressed files
- Implement incremental processing

Requirements:
    pip install pandas azure-storage-blob
"""

import gzip
import sqlite3
from datetime import datetime
from io import StringIO

import pandas as pd
from azure.storage.blob import BlobServiceClient


class BatchDataProductConsumer:
    """
    Consumer for batch data products with file tracking.

    Tracks processed files in a local SQLite database to enable
    incremental processing and avoid duplicates.
    """

    def __init__(
        self,
        blob_service_client: BlobServiceClient,
        container_name: str = "shared-data-products-raw",
        tracking_db: str = "processed_files.db",
    ):
        self.blob_service_client = blob_service_client
        self.container_client = blob_service_client.get_container_client(container_name)

        # Initialize tracking database
        self.conn = sqlite3.connect(tracking_db)
        self.conn.execute(
            """
            CREATE TABLE IF NOT EXISTS processed_files (
                filename TEXT PRIMARY KEY,
                processed_at TIMESTAMP,
                row_count INTEGER
            )
            """
        )
        self.conn.commit()

    def get_unprocessed_files(self, path: str) -> list[str]:
        """Get list of files not yet processed."""
        unprocessed = []
        for blob in self.container_client.list_blobs(name_starts_with=path):
            cursor = self.conn.execute(
                "SELECT 1 FROM processed_files WHERE filename = ?", (blob.name,)
            )
            if cursor.fetchone() is None:
                unprocessed.append(blob.name)
        return sorted(unprocessed)

    def download_and_parse(self, blob_name: str) -> pd.DataFrame:
        """Download and parse a CSV file."""
        blob_client = self.container_client.get_blob_client(blob_name)
        content = blob_client.download_blob().readall()

        # Decompress if needed
        if blob_name.endswith(".gz"):
            content = gzip.decompress(content)

        # Parse CSV with batch data product format:
        # - Semicolon separator
        # - Double quote character
        # - Read as string first for safe type conversion
        df = pd.read_csv(
            StringIO(content.decode("utf-8")),
            sep=";",
            quotechar='"',
            dtype=str,
        )
        return df

    def mark_as_processed(self, filename: str, row_count: int) -> None:
        """Mark a file as processed in the tracking database."""
        self.conn.execute(
            "INSERT OR REPLACE INTO processed_files VALUES (?, ?, ?)",
            (filename, datetime.now(), row_count),
        )
        self.conn.commit()

    def process_file(self, blob_name: str) -> int:
        """
        Process a single file.

        Override this method to implement your business logic.
        Returns the number of rows processed.
        """
        df = self.download_and_parse(blob_name)

        # Convert types for fields you need
        if "quantity" in df.columns:
            df["quantity"] = pd.to_numeric(df["quantity"], errors="coerce")
        if "amount" in df.columns:
            df["amount"] = pd.to_numeric(df["amount"], errors="coerce")

        # Your business logic here
        # Example: only keep fields relevant to your application
        # relevant_columns = ['transaction_id', 'location', 'amount']
        # relevant_data = df[relevant_columns].copy()

        self.mark_as_processed(blob_name, len(df))
        return len(df)

    def run(self, data_product_path: str) -> dict:
        """
        Run consumption cycle for a data product.

        Returns summary of processing results.
        """
        unprocessed = self.get_unprocessed_files(data_product_path)
        print(f"Found {len(unprocessed)} unprocessed files")

        results = {"success": 0, "failed": 0, "rows": 0}

        for filename in unprocessed:
            try:
                rows = self.process_file(filename)
                results["success"] += 1
                results["rows"] += rows
                print(f"Processed {filename}: {rows} rows")
            except Exception as e:
                results["failed"] += 1
                print(f"Failed {filename}: {e}")

        return results


# Example usage
if __name__ == "__main__":
    # Authenticate with Azure (replace with your credentials)
    blob_service_client = BlobServiceClient(
        account_url="https://rxicustomername.blob.core.windows.net",
        credential="your_credential_here",  # Use DefaultAzureCredential in production
    )

    consumer = BatchDataProductConsumer(blob_service_client)
    results = consumer.run("sales/")
    print(f"Results: {results}")
