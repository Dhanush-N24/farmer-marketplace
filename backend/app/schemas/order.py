from pydantic import BaseModel
from typing import List


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    items: List[OrderItemCreate]


# Product details inside an order
class OrderItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    price_at_purchase: float

    class Config:
        from_attributes = True


class OrderOut(BaseModel):
    id: int
    total_amount: float
    status: str
    items: List[OrderItemOut] = []

    class Config:
        from_attributes = True