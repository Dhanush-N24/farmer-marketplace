from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List

from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductOut
from app.dependencies import require_farmer
from app.models.user import User


router = APIRouter(
    prefix="/products",
    tags=["products"]
)


# CREATE PRODUCT
@router.post("/", response_model=ProductOut)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_farmer),
):
    new_product = Product(
        farmer_id=current_user.id,
        **product.dict()
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


# GET ALL PRODUCTS
@router.get("/", response_model=List[ProductOut])
def list_products(
    search: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Product)

    if search:
        query = query.filter(
            Product.name.ilike(f"%{search}%")
        )

    if category:
        query = query.filter(
            Product.category == category
        )

    return query.all()


# GET LOGGED-IN FARMER'S PRODUCTS
@router.get("/my-products", response_model=List[ProductOut])
def get_my_products(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_farmer),
):
    products = (
        db.query(Product)
        .filter(Product.farmer_id == current_user.id)
        .all()
    )

    return products


# DELETE FARMER'S PRODUCT
@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_farmer),
):
    product = (
        db.query(Product)
        .filter(
            Product.id == product_id,
            Product.farmer_id == current_user.id
        )
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }

@router.put("/{product_id}", response_model=ProductOut)
def update_product(
    product_id: int,
    product_data: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_farmer),
):
    product = (
        db.query(Product)
        .filter(
            Product.id == product_id,
            Product.farmer_id == current_user.id
        )
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    product.name = product_data.name
    product.description = product_data.description
    product.price = product_data.price
    product.quantity = product_data.quantity
    product.category = product_data.category

    db.commit()
    db.refresh(product)

    return product

# GET SINGLE PRODUCT
@router.get("/{product_id}", response_model=ProductOut)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    p = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not p:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return p