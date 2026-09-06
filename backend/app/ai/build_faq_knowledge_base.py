import os
import shutil

from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma


DOCS_PATH = "app/data/faq_docs"
PERSIST_DIR = "chroma_db_faq"


def build_faq_knowledge_base():

    print("Loading marketplace FAQ documents...")

    loader = DirectoryLoader(
        DOCS_PATH,
        glob="**/*.txt",
        loader_cls=TextLoader,
        loader_kwargs={"encoding": "utf-8"},
    )

    documents = loader.load()

    print(f"Loaded {len(documents)} documents")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
    )

    chunks = splitter.split_documents(documents)

    print(f"Created {len(chunks)} FAQ chunks")

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    if os.path.exists(PERSIST_DIR):
        shutil.rmtree(PERSIST_DIR)

    print("Building FAQ ChromaDB...")

    Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=PERSIST_DIR,
    )

    print("FAQ knowledge base built successfully!")


if __name__ == "__main__":
    build_faq_knowledge_base()