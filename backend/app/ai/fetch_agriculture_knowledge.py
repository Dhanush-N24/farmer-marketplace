import os
import requests
from bs4 import BeautifulSoup


OUTPUT_DIR = "app/data/farming_docs"


# General agriculture knowledge
SOURCES = {
    "tnau_agriculture":
        "https://agritech.tnau.ac.in/agriculture/",

    "tnau_crop_protection":
        "https://agritech.tnau.ac.in/crop_protection/",

    "tnau_indigenous_crops":
        "https://agritech.tnau.ac.in/itk/IndigenousTechKnowledge_Crop.html",

    "fao_horticulture_management":
        "https://www.fao.org/plant-production-protection/resources/publications/technical-factsheets-series-on-horticulture-crops-management/en",

    "fao_irrigation":
        "https://www.fao.org/land-water/water/agricultural-water-management/irrigation/en",

    "fao_rice_management":
        "https://www.fao.org/agriculture/crops/thematic-sitemap/theme/spi/scpi-home/managing-ecosystems/sustainable-rice-systems/rice-how/en/",

    "fao_integrated_pest_management":
        "https://www.fao.org/agriculture/crops/thematic-sitemap/theme/spi/scpi-home/managing-ecosystems/integrated-pest-management/ipm-how/en/",

    "fao_nutrient_management":
        "https://www.fao.org/agriculture/crops/thematic-sitemap/theme/spi/scpi-home/managing-ecosystems/integrated-plant-nutrient-management/ipnm-how/en/",
}


# Crop-specific South Indian knowledge
CROP_SOURCES = {

    # CHILLI
    "chilli_thrips":
        "https://agritech.tnau.ac.in/crop_protection/chilli/chilli_1.html",

    "chilli_mites":
        "https://agritech.tnau.ac.in/crop_protection/chilli/chilli_5.html",

    "chilli_damping_off":
        "https://www.agritech.tnau.ac.in/crop_protection/chilli_diseases_1.html",

    "chilli_fusarium_wilt":
        "https://agritech.tnau.ac.in/crop_protection/chilli_diseases_6.html",

    # BANANA
    "banana_anthracnose":
        "https://agritech.tnau.ac.in/crop_protection/banana_diseases/crop_prot_crop%20diseases_fruiits_banana_1.html",

    "banana_yellow_sigatoka":
        "https://www.agritech.tnau.ac.in/crop_protection/banana_diseases/crop_prot_crop%20diseases_fruits_banana_8.html",

    "banana_aphid":
        "https://agritech.tnau.ac.in/crop_protection/banana_pest/banana_3.html",

    # MULTI-CROP DISEASE FAQ
    "tnau_crop_disease_faq":
        "https://agritech.tnau.ac.in/crop_protection/crop_prot_disease_faqs.html",

    # MULTI-CROP INTEGRATED PEST MANAGEMENT
    "tnau_integrated_pest_management":
        "https://agritech.tnau.ac.in/crop_protection/crop_prot_integrated_pest_management_package.html",

    # SOUTH INDIA CROPPING PATTERNS
    "tnau_western_zone_cropping":
        "https://agritech.tnau.ac.in/agriculture/agri_agrometeorology_croppingpattern_westernzone.html",

    "tnau_northwestern_zone_cropping":
        "https://www.agritech.tnau.ac.in/agriculture/agri_agrometeorology_croppingpattern_northwesternzone.html",
}


def fetch_page(url):

    headers = {
        "User-Agent": (
            "Mozilla/5.0 "
            "(Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 "
            "Chrome/120 Safari/537.36"
        )
    }

    response = requests.get(
        url,
        headers=headers,
        timeout=30
    )

    response.raise_for_status()

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    for tag in soup([
        "script",
        "style",
        "nav",
        "footer",
        "header",
        "noscript"
    ]):
        tag.decompose()

    text = soup.get_text(separator="\n")

    lines = []

    for line in text.splitlines():

        line = line.strip()

        if len(line) > 3:
            lines.append(line)

    return "\n".join(lines)


def download_sources(sources, category):

    success_count = 0

    print(f"\n--- {category} ---\n")

    for name, url in sources.items():

        print(f"Downloading: {name}")

        try:

            text = fetch_page(url)

            if len(text) < 200:
                print(
                    f"Skipped {name}: not enough useful content"
                )
                continue

            file_path = os.path.join(
                OUTPUT_DIR,
                f"{name}.txt"
            )

            with open(
                file_path,
                "w",
                encoding="utf-8"
            ) as file:

                file.write(text)

            print(
                f"✓ Saved {len(text)} characters"
            )

            success_count += 1

        except Exception as error:

            print(f"✗ Failed: {name}")
            print(error)

    return success_count


def main():

    os.makedirs(
        OUTPUT_DIR,
        exist_ok=True
    )

    print("\n🌾 Starting South India agriculture knowledge collection...")

    general_count = download_sources(
        SOURCES,
        "GENERAL FARMING KNOWLEDGE"
    )

    crop_count = download_sources(
        CROP_SOURCES,
        "SOUTH INDIAN CROP KNOWLEDGE"
    )

    total = general_count + crop_count

    print("\n--------------------------------")

    print(
        f"Successfully downloaded {total} sources"
    )

    print(
        "South India agriculture knowledge collection complete!"
    )

    print("--------------------------------\n")


if __name__ == "__main__":
    main()