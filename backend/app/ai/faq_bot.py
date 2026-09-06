import os
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

PERSIST_DIR = "chroma_db_faq"
DOCS_PATH = "app/data/faq_docs"
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

def get_faq_vectorstore():
    if os.path.exists(PERSIST_DIR):
        return Chroma(persist_directory=PERSIST_DIR, embedding_function=embeddings)
    loader = DirectoryLoader(DOCS_PATH, glob="**/*.txt", loader_cls=TextLoader)
    docs = loader.load()
    chunks = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50).split_documents(docs)
    return Chroma.from_documents(chunks, embeddings, persist_directory=PERSIST_DIR)

llm = ChatOpenAI(
    model=os.getenv("OPENROUTER_MODEL", "meta-llama/llama-3.1-8b-instruct:free"),
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url=os.getenv("OPENROUTER_BASE_URL"),
    temperature=0.3,
)

def ask_faq_bot(question: str) -> str:
    vectordb = get_faq_vectorstore()
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=vectordb.as_retriever(search_kwargs={"k": 3}))
    return qa_chain.invoke({"query": question})["result"]