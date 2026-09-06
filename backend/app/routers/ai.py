from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.ai.chatbot import ask_farming_assistant
from app.ai.faq_bot import ask_faq_bot
from app.ai.semantic_search import semantic_product_search, recommend_similar_products

router = APIRouter(prefix="/ai", tags=["ai"])

class QuestionRequest(BaseModel):
    question: str

class QueryRequest(BaseModel):
    query: str

@router.post("/chatbot")
def farming_assistant(req: QuestionRequest):
    answer = ask_farming_assistant(req.question)
    return {"answer": answer}

@router.post("/faq")
def farmer_faq(req: QuestionRequest):
    answer = ask_faq_bot(req.question)
    return {"answer": answer}

@router.post("/search")
def ai_search(req: QueryRequest, db: Session = Depends(get_db)):
    results = semantic_product_search(req.query, db)
    return {"results": [{"id": p.id, "name": p.name, "price": p.price} for p in results]}

@router.post("/recommend")
def recommend(req: QueryRequest, db: Session = Depends(get_db)):
    results = recommend_similar_products(req.query, db)
    return {"recommendations": [{"id": p.id, "name": p.name, "price": p.price} for p in results]}