from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    description: str
    category: str
    price: float
    quantity: int
    unit: str = "kg"
    is_organic: bool = False

class ProductOut(ProductCreate):
    id: int
    farmer_id: int
    class Config:
        from_attributes = True