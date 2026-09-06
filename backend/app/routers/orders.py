from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.user import User, UserRole
from app.schemas.order import OrderCreate, OrderOut
from app.dependencies import get_current_user


router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)


# ==========================================
# CREATE ORDER
# ==========================================

@router.post("/", response_model=OrderOut)
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if current_user.role != UserRole.customer:
        raise HTTPException(
            status_code=403,
            detail="Only customers can place orders",
        )

    total = 0.0
    items_to_add = []

    for item in order.items:

        product = (
            db.query(Product)
            .filter(Product.id == item.product_id)
            .first()
        )

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product {item.product_id} not found",
            )

        if product.quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for product {item.product_id}",
            )

        total += product.price * item.quantity

        product.quantity -= item.quantity

        items_to_add.append(
            (product, item.quantity)
        )

    new_order = Order(
        customer_id=current_user.id,
        total_amount=total,
        status="pending",
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for product, qty in items_to_add:

        db.add(
            OrderItem(
                order_id=new_order.id,
                product_id=product.id,
                quantity=qty,
                price_at_purchase=product.price,
            )
        )

    db.commit()
    db.refresh(new_order)

    return new_order


# ==========================================
# GET MY ORDERS
# ==========================================

@router.get("/my-orders", response_model=list[OrderOut])
def get_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if current_user.role != UserRole.customer:
        raise HTTPException(
            status_code=403,
            detail="Only customers can view their orders",
        )

    orders = (
        db.query(Order)
        .filter(Order.customer_id == current_user.id)
        .order_by(Order.id.desc())
        .all()
    )

    return orders