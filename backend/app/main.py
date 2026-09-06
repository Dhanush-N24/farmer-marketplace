from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import auth, products, orders
from app.routers import ai
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Farmer Marketplace")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(ai.router)
 

@app.get("/")
def root():
    return {"message": "AI Farmer Marketplace API running"}