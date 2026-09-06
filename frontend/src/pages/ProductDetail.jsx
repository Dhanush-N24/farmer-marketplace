import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import client from "../api/client";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();

  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await client.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail-loading">
        <div className="loading-card">
          <span>🌱</span>
          <h2>Loading fresh product...</h2>
          <p>Please wait while we prepare the details.</p>
        </div>
      </div>
    );
  }

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  return (
    <div className="product-detail-page">

      {/* Decorative background */}
      <div className="detail-glow detail-glow-one"></div>
      <div className="detail-glow detail-glow-two"></div>

      <div className="product-detail-wrapper">

        <Link to="/products" className="back-products">
          ← Back to Marketplace
        </Link>

        <div className="product-detail-card">

          {/* LEFT SIDE */}
          <div className="product-visual-section">

            <div className="detail-lot">
              🌾 LOT #{String(product.id).padStart(3, "0")}
            </div>

            <div className="product-main-icon">
              🌱
            </div>

            <div className="organic-badge">
              🌱 100% Organic
            </div>

            <div className="farm-direct-label">
              🚜 FARM DIRECT
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="product-info-section">

            <div className="detail-category">
              {product.category || "Fresh Produce"}
            </div>

            <h1>{product.name}</h1>

            <p className="detail-description">
              {product.description}
            </p>

            <div className="detail-divider"></div>

            <div className="product-meta-grid">

              <div className="meta-card">
                <span className="meta-icon">💰</span>
                <div>
                  <small>PRICE</small>
                  <strong>₹{product.price}<span>/kg</span></strong>
                </div>
              </div>

              <div className="meta-card">
                <span className="meta-icon">📦</span>
                <div>
                  <small>AVAILABLE</small>
                  <strong>{product.quantity} <span>kg</span></strong>
                </div>
              </div>

              <div className="meta-card">
                <span className="meta-icon">🌿</span>
                <div>
                  <small>QUALITY</small>
                  <strong>Fresh <span>& Organic</span></strong>
                </div>
              </div>

            </div>

            <div className="detail-divider"></div>

            {/* CART SECTION */}

            <div className="cart-action-section">

              {!cartItem ? (
                <button
                  className="detail-add-cart"
                  onClick={() => addToCart(product)}
                >
                  <span>🛒</span>
                  Add to Cart
                  <span className="button-arrow">→</span>
                </button>
              ) : (
                <div className="quantity-control">

                  <button
                    className="quantity-btn"
                    onClick={() =>
                      decreaseQuantity(product.id)
                    }
                  >
                    −
                  </button>

                  <div className="quantity-display">
                    <small>IN CART</small>
                    <strong>{cartItem.quantity}</strong>
                  </div>

                  <button
                    className="quantity-btn"
                    onClick={() =>
                      increaseQuantity(product.id)
                    }
                  >
                    +
                  </button>

                </div>
              )}

            </div>

            <div className="detail-features">

              <div>
                <span>✓</span>
                Fresh from farmers
              </div>

              <div>
                <span>✓</span>
                Secure checkout
              </div>

              <div>
                <span>✓</span>
                Quality assured
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}