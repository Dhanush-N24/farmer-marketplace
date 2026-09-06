import os
import requests


OUTPUT_DIR = "app/data/farming_docs"


PDF_SOURCES = {
    "tnau_crop_production_agriculture_2020.pdf":
        "https://agritech.tnau.ac.in/pdf/AGRICULTURE.pdf",

    "tnau_crop_production_horticulture_2020.pdf":
        "https://www.agritech.tnau.ac.in/pdf/HORTICULTURE.pdf",
}


def download_pdf(filename, url):

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    file_path = os.path.join(OUTPUT_DIR, filename)

    print(f"Downloading: {filename}")

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(
        url,
        headers=headers,
        timeout=120
    )

    response.raise_for_status()

    with open(file_path, "wb") as file:
        file.write(response.content)

    print(f"✓ Saved: {file_path}")
    print(f"✓ Size: {len(response.content) / (1024 * 1024):.2f} MB")


def main():

    print("\n🌾 Downloading official TNAU Crop Production Guides...\n")

    success = 0

    for filename, url in PDF_SOURCES.items():

        try:
            download_pdf(filename, url)
            success += 1

        except Exception as error:
            print(f"✗ Failed: {filename}")
            print(error)

    print("\n--------------------------------")
    print(f"Successfully downloaded {success} PDF guides")
    print("--------------------------------\n")


if __name__ == "__main__":
    main()