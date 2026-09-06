import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import client from "../api/client";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setMessage("❌ Your cart is empty.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before placing an order.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const orderData = {
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      await client.post("/orders/", orderData);

      clearCart();

      setMessage("success");

      setTimeout(() => {
        navigate("/");
      }, 2500);

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.detail ||
        "❌ Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page">

      <section className="checkout-container">

        <div className="checkout-header">

          <span className="checkout-badge">
            🌾 SECURE CHECKOUT
          </span>

          <h1>
            Complete Your <span>Order</span>
          </h1>

          <p>
            Review your fresh farm products and place your order.
          </p>

        </div>


        {message === "success" ? (

          <div className="checkout-success">

            <div className="success-icon">
              ✅
            </div>

            <h2>Order Placed Successfully!</h2>

            <p>
              Thank you for supporting local farmers 🌱
            </p>

            <p>
              Redirecting you to the marketplace...
            </p>

          </div>

        ) : (

          <div className="checkout-layout">

            {/* ORDER ITEMS */}

            <section className="checkout-items">

              <h2>Your Order</h2>

              {cartItems.map((item) => (

                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <div className="checkout-item-icon">
                    🌱
                  </div>

                  <div className="checkout-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.quantity} kg × ₹{item.price}
                    </p>

                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                </div>

              ))}

            </section>


            {/* PAYMENT SUMMARY */}

            <aside className="checkout-summary">

              <h2>Order Summary</h2>

              <div className="checkout-summary-row">

                <span>Total Items</span>

                <strong>
                  {cartItems.reduce(
                    (sum, item) =>
                      sum + item.quantity,
                    0
                  )}
                </strong>

              </div>


              <div className="checkout-summary-row">

                <span>Total Amount</span>

                <strong>
                  ₹{total}
                </strong>

              </div>


              <div className="checkout-divider"></div>


              <div className="checkout-total">

                <span>Amount Payable</span>

                <strong>
                  ₹{total}
                </strong>

              </div>


              <button
                className="place-order-button"
                onClick={handlePlaceOrder}
                disabled={loading}
              >

                {loading
                  ? "Placing Order..."
                  : "🌾 Place Order"}

              </button>


              {message && message !== "success" && (

                <p className="checkout-error">
                  {message}
                </p>

              )}

            </aside>

          </div>

        )}

      </section>

    </main>
  );
}