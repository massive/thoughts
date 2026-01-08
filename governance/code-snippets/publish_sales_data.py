"""
Example: Publishing sales data to batch data products.

This script demonstrates how to:
- Format data as CSV with the correct conventions
- Generate a valid filename
- Upload to Azure Blob Storage

Requirements:
    pip install pandas azure-storage-blob
"""

import uuid
from datetime import datetime

import pandas as pd
from azure.storage.blob import BlobServiceClient


def publish_sales_data(
    blob_service_client: BlobServiceClient,
    data: pd.DataFrame,
    container_name: str = "shared-data-products-raw",
    data_product_path: str = "sales",
) -> str:
    """
    Publish a DataFrame to batch data products.

    Args:
        blob_service_client: Authenticated BlobServiceClient
        data: DataFrame to publish
        container_name: Target container
        data_product_path: Path within container

    Returns:
        The filename of the uploaded file
    """
    # Generate filename following conventions
    timestamp = datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    unique_id = str(uuid.uuid4())
    filename = f"sales_{timestamp}_{unique_id}.csv"

    # Convert to CSV with correct format:
    # - Semicolon separator
    # - Double quote for quoting
    # - No index column
    csv_content = data.to_csv(sep=";", index=False, quoting=1)

    # Upload to ABS
    container_client = blob_service_client.get_container_client(container_name)
    blob_path = f"{data_product_path}/{filename}"
    blob_client = container_client.get_blob_client(blob_path)
    blob_client.upload_blob(csv_content, overwrite=True)

    return filename


# Example usage
if __name__ == "__main__":
    # Authenticate with Azure (replace with your credentials)
    blob_service_client = BlobServiceClient(
        account_url="https://rxicustomername.blob.core.windows.net",
        credential="your_credential_here",  # Use DefaultAzureCredential in production
    )

    # Prepare sample data
    df = pd.DataFrame(
        {
            "transaction_id": ["TXN001", "TXN002"],
            "location": ["LOC001", "LOC002"],
            "product_id": ["PROD1", "PROD2"],
            "quantity": [10, 5],
            "amount": [99.99, 49.99],
            "transaction_date": ["2025-06-23", "2025-06-23"],
        }
    )

    filename = publish_sales_data(blob_service_client, df)
    print(f"Successfully published: {filename}")
