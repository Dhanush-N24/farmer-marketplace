import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <div className="cart-glow cart-glow-one"></div>
      <div className="cart-glow cart-glow-two"></div>

      <section className="cart-wrapper">

        {/* HEADER */}

        <div className="cart-heading">
          <div className="cart-badge">
            🛒 YOUR HARVEST
          </div>

          <h1>
            Shopping <span>Cart</span>
          </h1>

          <p>
            Review your fresh farm products before proceeding to checkout.
          </p>
        </div>


        {cartItems.length === 0 ? (

          /* EMPTY CART */

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Discover fresh produce directly from local farmers and
              add your favourites to your cart.
            </p>

            <Link
              to="/products"
              className="continue-shopping"
            >
              Explore Marketplace
              <span>→</span>
            </Link>

          </div>

        ) : (

          <div className="cart-layout">

            {/* CART ITEMS */}

            <section className="cart-items-section">

              <div className="cart-items-header">

                <h2>
                  Your Products
                </h2>

                <span>
                  {cartItems.length} item
                  {cartItems.length > 1 ? "s" : ""}
                </span>

              </div>


              <div className="cart-items-list">

                {cartItems.map((item, index) => (

                  <article
                    className="cart-item-card"
                    key={item.id}
                  >

                    {/* PRODUCT ICON */}

                    <div className="cart-product-icon">
                      🌱
                    </div>


                    {/* PRODUCT INFO */}

                    <div className="cart-product-info">

                      <span className="cart-lot">
                        LOT #{String(item.id).padStart(3, "0")}
                      </span>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.category || "Fresh Farm Produce"}
                      </p>

                    </div>


                    {/* PRICE */}

                    <div className="cart-price">

                      <span>UNIT PRICE</span>

                      <strong>
                        ₹{item.price}
                      </strong>

                      <small>/ kg</small>

                    </div>


                    {/* QUANTITY */}

                    <div className="cart-quantity">

                      <span className="quantity-label">
                        QUANTITY
                      </span>

                      <div className="quantity-controls">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <strong>
                          {item.quantity}
                        </strong>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                      </div>

                    </div>


                    {/* SUBTOTAL */}

                    <div className="cart-subtotal">

                      <span>SUBTOTAL</span>

                      <strong>
                        ₹{item.price * item.quantity}
                      </strong>

                    </div>

                  </article>

                ))}

              </div>


              <Link
                to="/products"
                className="back-to-products"
              >
                ← Continue Shopping
              </Link>

            </section>


            {/* ORDER SUMMARY */}

            <aside className="order-summary">

              <div className="summary-top">

                <span className="summary-label">
                  ORDER SUMMARY
                </span>

                <h2>
                  Your Harvest
                </h2>

              </div>


              <div className="summary-row">

                <span>
                  Products
                </span>

                <strong>
                  {cartItems.length}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Items
                </span>

                <strong>
                  {cartItems.reduce(
                    (sum, item) =>
                      sum + item.quantity,
                    0
                  )}
                </strong>

              </div>


              <div className="summary-divider"></div>


              <div className="summary-total">

                <span>Total Amount</span>

                <strong>
                  ₹{total}
                </strong>

              </div>


              <p className="summary-note">
                🌱 Fresh produce sourced directly from trusted farmers.
              </p>


              <Link
                to="/checkout"
                className="checkout-button"
              >
                Proceed to Checkout
                <span>→</span>
              </Link>


              <div className="secure-checkout">
                🔒 Secure checkout
              </div>

            </aside>

          </div>

        )}

      </section>
    </main>
  );
}