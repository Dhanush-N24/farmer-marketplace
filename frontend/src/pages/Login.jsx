import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../api/client";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await client.post("/auth/login", {
        email,
        password,
      });

      console.log(response.data);

      // Check whether selected role matches actual account role
      if (response.data.role !== selectedRole) {
        setMessage("role-error");
        return;
      }

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      setMessage("success");

      // Redirect based on role
      if (response.data.role === "farmer") {
        navigate("/farmer-dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error(error);
      setMessage("error");
    }
  };

  return (
    <main className="login-page">

      <section className="login-wrapper">

        {/* LEFT SIDE */}

        <div className="login-welcome">

          <div className="login-brand">
            🌾 Harvest & Co.
          </div>

          <div className="welcome-content">

            <div className="welcome-badge">
              🌱 WELCOME BACK TO HARVEST & CO.
            </div>

            <h1>
              Fresh from the
              <span> farm.</span>
            </h1>

            <p>
              Login to explore fresh produce, manage your
              marketplace experience and connect directly
              with farmers.
            </p>

            <div className="welcome-features">

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
                <p>Smart Farming</p>
              </div>

            </div>

          </div>

          <div className="welcome-footer">
            Grow with Harvest & Co. 🌱
          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="login-form-section">

          <div className="login-form-container">

            <div className="form-top">

              <div className="form-icon">
                🌱
              </div>

              <h2>Welcome back</h2>

              <p>
                Login to continue your journey with us.
              </p>

            </div>


            <form onSubmit={loginUser}>

              {/* LOGIN AS */}

              <div className="input-group">

                <label>Login As</label>

                <select
                  value={selectedRole}
                  onChange={(e) =>
                    setSelectedRole(e.target.value)
                  }
                >
                  <option value="customer">
                    🛒 Customer
                  </option>

                  <option value="farmer">
                    🌾 Farmer
                  </option>
                </select>

              </div>


              {/* EMAIL */}

              <div className="input-group">

                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>


              {/* PASSWORD */}

              <div className="input-group">

                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>


              <button
                type="submit"
                className="login-btn"
              >
                Login →
              </button>

            </form>


            {message === "success" && (
              <div className="login-message success">
                ✅ Login Successful!
              </div>
            )}

            {message === "error" && (
              <div className="login-message error">
                ❌ Login Failed. Please check your credentials.
              </div>
            )}

            {message === "role-error" && (
              <div className="login-message error">
                ❌ This account is not registered as a {selectedRole}.
              </div>
            )}


            <div className="register-link">

              Don't have an account?

              <Link to="/register">
                Create Account
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}