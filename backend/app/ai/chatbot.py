import os

from dotenv import load_dotenv

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain


load_dotenv()


PERSIST_DIR = "chroma_db_farming"

embeddings = None


def get_embeddings():

    global embeddings

    if embeddings is None:

        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

    return embeddings


def get_vectorstore():

    return Chroma(
        persist_directory=PERSIST_DIR,
        embedding_function=get_embeddings()
    )


def get_llm():

    return ChatOpenAI(
        model=os.getenv(
            "OPENROUTER_MODEL",
            "meta-llama/llama-3.1-8b-instruct:free"
        ),
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url=os.getenv("OPENROUTER_BASE_URL"),
        temperature=0.1,
    )


def ask_farming_assistant(question: str) -> str:

    vectordb = get_vectorstore()

    retriever = vectordb.as_retriever(
        search_kwargs={"k": 5}
    )

    prompt = ChatPromptTemplate.from_template("""
You are an agricultural assistant specializing in South Indian farming.

Answer the farmer's question using ONLY the information provided
in the context below.

IMPORTANT RULES:

1. Do NOT use outside or general knowledge.
2. Do NOT invent fertilizer quantities, pesticide names, crop spacing,
   temperatures, or other agricultural recommendations.
3. Prefer recommendations relevant to South India and India when
   present in the context.
4. If the context does not contain enough information, clearly say:
   "I don't have enough information in my farming knowledge base to answer this accurately."
5. Give a clear, practical answer using simple language.
6. Do not mention "the context" or "the documents" in your answer.

CONTEXT:
{context}

QUESTION:
{input}

ANSWER:
""")

    document_chain = create_stuff_documents_chain(
        get_llm(),
        prompt
    )

    retrieval_chain = create_retrieval_chain(
        retriever,
        document_chain
    )

    result = retrieval_chain.invoke({
        "input": question
    })

    return result["answer"]