import { useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await client.post("/auth/register", form);

      setMessage("success");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "customer",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-wrapper">

        {/* LEFT BRAND SECTION */}
        <div className="register-welcome">

          <div className="register-brand">
            🌾 Harvest & Co.
          </div>

          <div className="register-welcome-content">

            <div className="register-badge">
              🌱 JOIN THE FARM-TO-CUSTOMER MOVEMENT
            </div>

            <h1>
              Good food starts <span>at the farm.</span>
            </h1>

            <p>
              Create your Harvest & Co. account and connect
              directly with fresh produce, farmers and smart
              agricultural assistance.
            </p>

            <div className="register-features">

              <div>
                <span>🥬</span>
                <p>Fresh Marketplace</p>
              </div>

              <div>
                <span>🌾</span>
                <p>Farmer Connection</p>
              </div>

              <div>
                <span>✨</span>
                <p>Smart Experience</p>
              </div>

            </div>

          </div>

          <div className="register-footer">
            Grow with Harvest & Co. 🌱
          </div>

        </div>


        {/* RIGHT FORM SECTION */}
        <div className="register-form-section">

          <div className="register-form-container">

            <div className="register-form-top">

              <div className="register-icon">
                🌱
              </div>

              <h2>Create your account</h2>

              <p>
                Start your journey with fresh produce.
              </p>

            </div>


            <form onSubmit={registerUser}>

              <div className="register-input-group">
                <label>Full Name</label>

                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="register-input-group">
                <label>Email Address</label>

                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="register-input-group">
                <label>Phone Number</label>

                <input
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="register-input-group">
                <label>Password</label>

                <input
                  name="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-input-group">
  <label>Register As</label>

  <select
    name="role"
    value={form.role}
    onChange={handleChange}
  >
    <option value="customer">Customer</option>
    <option value="farmer">Farmer</option>
  </select>
</div>


              <button
                type="submit"
                className="register-btn"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account →"}
              </button>

            </form>


            {message === "success" && (
              <div className="register-message success">
                ✅ Registration Successful! You can now login.
              </div>
            )}

            {message === "error" && (
              <div className="register-message error">
                ❌ Registration Failed. Please try again.
              </div>
            )}


            <div className="login-link">
              Already have an account?

              <Link to="/login">
                Login
              </Link>
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}