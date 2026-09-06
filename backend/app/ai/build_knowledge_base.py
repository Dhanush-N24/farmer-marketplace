import os

from langchain_community.document_loaders import (
    DirectoryLoader,
    TextLoader,
    PyPDFLoader,
)

from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_huggingface import HuggingFaceEmbeddings

from langchain_chroma import Chroma


DOCS_PATH = "app/data/farming_docs"
PERSIST_DIR = "chroma_db_farming"


def build_knowledge_base():

    print("Loading agricultural documents...")

    # Load TXT files
    txt_loader = DirectoryLoader(
        DOCS_PATH,
        glob="**/*.txt",
        loader_cls=TextLoader,
        loader_kwargs={"encoding": "utf-8"},
    )

    txt_documents = txt_loader.load()

    # Load PDF files
    pdf_loader = DirectoryLoader(
        DOCS_PATH,
        glob="**/*.pdf",
        loader_cls=PyPDFLoader,
    )

    pdf_documents = pdf_loader.load()

    # Combine both
    documents = txt_documents + pdf_documents

    print(f"Loaded {len(documents)} documents/pages")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100,
    )

    chunks = splitter.split_documents(documents)

    print(f"Created {len(chunks)} knowledge chunks")

    print("Loading embedding model...")

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    # Remove old database so duplicates don't accumulate
    if os.path.exists(PERSIST_DIR):
        import shutil
        shutil.rmtree(PERSIST_DIR)

    print("Building ChromaDB...")

    Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=PERSIST_DIR,
    )

    print("Knowledge base built successfully!")


if __name__ == "__main__":
    build_knowledge_base()