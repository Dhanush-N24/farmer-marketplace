import { useEffect, useState } from "react";
import client from "../api/client";
import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await client.get("/orders/my-orders");
      setOrders(response.data);
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.detail ||
        "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          Loading your orders... 🌾
        </div>
      </div>
    );
  }

  return (
    <main className="orders-page">

      <section className="orders-container">

        <div className="orders-header">

          <span className="orders-badge">
            📦 MY ORDERS
          </span>

          <h1>
            Your <span>Orders</span>
          </h1>

          <p>
            Track all the fresh products you have ordered.
          </p>

        </div>


        {message ? (

          <div className="orders-error">
            ❌ {message}
          </div>

        ) : orders.length === 0 ? (

          <div className="orders-empty">

            <div className="orders-empty-icon">
              📦
            </div>

            <h2>No orders yet</h2>

            <p>
              Your placed orders will appear here.
            </p>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                <div className="order-icon">
                  🌾
                </div>


                <div className="order-info">

  <span>
    ORDER #{order.id}
  </span>

  <h3>
    Fresh Harvest Order
  </h3>

  <div className="order-items">
    {order.items && order.items.map((item) => (
      <p key={item.id}>
        🌱 Product ID: {item.product_id} |
        Quantity: {item.quantity} kg |
        ₹{item.price_at_purchase}
      </p>
    ))}
  </div>

</div>

                <div className="order-status">

                  <span>Status</span>

                  <strong>
                    {order.status}
                  </strong>

                </div>


                <div className="order-total">

                  <span>Total Amount</span>

                  <strong>
                    ₹{order.total_amount}
                  </strong>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}