from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from app.database import Base

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(150), index=True)
    description = Column(Text)
    category = Column(String(100))       # e.g. vegetable, fruit, grain
    price = Column(Float)
    quantity = Column(Integer, default=0)
    unit = Column(String(20), default="kg")
    image_url = Column(String(255), nullable=True)
    is_organic = Column(Integer, default=0)  # 0/1