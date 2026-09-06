from langchain_huggingface import HuggingFaceEmbeddings
from sqlalchemy.orm import Session
from app.models.product import Product
import numpy as np

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

def _cosine_sim(a, b):
    a, b = np.array(a), np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-8))

def semantic_product_search(query: str, db: Session, top_k: int = 10):
    products = db.query(Product).all()
    if not products:
        return []
    query_vec = embeddings.embed_query(query)
    product_texts = [f"{p.name} {p.description} {p.category}" for p in products]
    product_vecs = embeddings.embed_documents(product_texts)

    scored = [(p, _cosine_sim(query_vec, vec)) for p, vec in zip(products, product_vecs)]
    scored.sort(key=lambda x: x[1], reverse=True)
    return [p for p, score in scored[:top_k] if score > 0.2]

def recommend_similar_products(query: str, db: Session, top_k: int = 5):
    # Same mechanism as search — semantically closest products to the query/category
    return semantic_product_search(query, db, top_k)