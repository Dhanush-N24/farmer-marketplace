import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🌾</span>

          <div>
            <span className="logo-main">Harvest</span>
            <span className="logo-and">& Co.</span>

            <small>FARM TO YOU</small>
          </div>
        </Link>

        {/* NAVIGATION */}
        <div className="navbar-links">

          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/products" className="nav-link">
            Marketplace
          </Link>

          <Link to="/chatbot" className="nav-link">
            ✦ Farming AI
          </Link>

          <Link to="/faq" className="nav-link">
            Support
          </Link>

          <Link to="/about" className="nav-link">
            About Us
          </Link>

          <Link to="/contact" className="nav-link">
            Contact Us
          </Link>

          {/* FARMER DASHBOARD - ONLY FOR FARMERS */}
          {role === "farmer" && (
            <Link
              to="/farmer-dashboard"
              className="nav-link"
            >
              Farmer Dashboard
            </Link>
          )}

            {role === "customer" && (
  <Link to="/my-orders" className="nav-link">
    My Orders
  </Link>
)}
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-actions">

          {!token ? (
            <>
              <Link to="/login" className="login-link">
                Login
              </Link>

              <Link
                to="/register"
                className="register-button"
              >
                Join Us
              </Link>
            </>
          ) : (
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          {/* CART */}
          <Link
            to="/cart"
            className="cart-button"
          >
            <span className="cart-icon">
              🛒
            </span>

            <span className="cart-text">
              Cart
            </span>

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>

        </div>

      </div>
    </nav>
  );
}