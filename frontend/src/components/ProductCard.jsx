import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import "./ProductCard.css";

export default function ProductCard({ product }) {

  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();


  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );


  return (

    <div className="product-card">

      {/* TOP GLOW */}

      <div className="product-card-glow"></div>


      {/* CARD HEADER */}

      <Link
        to={`/product/${product.id}`}
        className="product-card-link"
      >

        <div className="product-top-row">

          <span className="product-lot">

            🌾 LOT #
            {String(product.id).padStart(3, "0")}

          </span>


          <span className="organic-badge">

            🌱 Organic

          </span>

        </div>


        {/* PRODUCT ICON */}

        <div className="product-visual">

          <div className="product-emoji">

            🌾

          </div>

          <div className="product-circle"></div>

        </div>


        {/* PRODUCT NAME */}

        <h2>

          {product.name}

        </h2>


        {/* DESCRIPTION */}

        <p className="product-description">

          {product.description}

        </p>


        {/* CATEGORY */}

        <div className="product-meta">

          <span className="product-category">

            {product.category}

          </span>


          <strong>

            ₹{product.price}

            <small>/kg</small>

          </strong>

        </div>

      </Link>


      {/* CART */}

      <div className="product-cart">

        {!cartItem ? (

          <button
            className="add-cart-button"
            onClick={() => addToCart(product)}
          >

            <span>Add to Cart</span>

            <span className="cart-arrow">
              →
            </span>

          </button>

        ) : (

          <div className="quantity-control">

            <button
              onClick={() =>
                decreaseQuantity(product.id)
              }
            >
              −
            </button>


            <div className="quantity-number">

              {cartItem.quantity}

            </div>


            <button
              onClick={() =>
                increaseQuantity(product.id)
              }
            >
              +
            </button>

          </div>

        )}

      </div>

    </div>

  );
}