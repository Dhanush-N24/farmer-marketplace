import { useEffect, useState } from "react";
import client from "../api/client";
import "./FarmerDashboard.css";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [adding, setAdding] = useState(false);

  // EDIT STATES
  const [editingProduct, setEditingProduct] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const loadProducts = async () => {
    try {
      const response = await client.get("/products/my-products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ADD PRODUCT FORM CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setAdding(true);
      setMessage("");

      await client.post("/products/", {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      setMessage("✅ Product added successfully!");

      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
      });

      loadProducts();

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.detail ||
        "❌ Failed to add product"
      );

    } finally {
      setAdding(false);
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setMessage("");

      await client.delete(`/products/${productId}`);

      setMessage("🗑️ Product deleted successfully!");

      loadProducts();

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.detail ||
        "❌ Failed to delete product"
      );
    }
  };

  // START EDITING
  const startEditing = (product) => {
    setEditingProduct(product.id);

    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
    });

    setMessage("");
  };

  // EDIT FORM CHANGE
  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE EDITED PRODUCT
  const handleUpdate = async (e, productId) => {
    e.preventDefault();

    try {
      setMessage("");

      await client.put(`/products/${productId}`, {
        ...editForm,
        price: Number(editForm.price),
        quantity: Number(editForm.quantity),
      });

      setMessage("✏️ Product updated successfully!");

      setEditingProduct(null);

      loadProducts();

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.detail ||
        "❌ Failed to update product"
      );
    }
  };

  return (
    <div className="farmer-dashboard">

      {/* HERO */}

      <section className="farmer-hero">

        <div>

          <span className="farmer-badge">
            🌾 FARMER DASHBOARD
          </span>

          <h1>
            Grow your
            <span> marketplace.</span>
          </h1>

          <p>
            Manage your agricultural products and add fresh
            produce directly to the Harvest & Co. marketplace.
          </p>

        </div>

        <div className="farmer-hero-icon">
          👨‍🌾
        </div>

      </section>


      {/* STATS */}

      <section className="farmer-stats">

        <div className="farmer-stat-card">

          <span>📦</span>

          <div>
            <small>Total Products</small>
            <h2>{products.length}</h2>
          </div>

        </div>


        <div className="farmer-stat-card">

          <span>🌱</span>

          <div>

            <small>Total Stock</small>

            <h2>
              {products.reduce(
                (sum, product) =>
                  sum + Number(product.quantity || 0),
                0
              )}
            </h2>

          </div>

        </div>


        <div className="farmer-stat-card">

          <span>💰</span>

          <div>
            <small>Products Listed</small>
            <h2>{products.length}</h2>
          </div>

        </div>

      </section>


      <section className="farmer-content">


        {/* ADD PRODUCT */}

        <div className="add-product-card">

          <div className="dashboard-section-title">

            <div>

              <span>ADD NEW PRODUCT</span>

              <h2>
                List fresh produce 🌱
              </h2>

            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="dashboard-form-row">

              <div className="dashboard-form-group">

                <label>Product Name</label>

                <input
                  name="name"
                  placeholder="Example: Fresh Tomatoes"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="dashboard-form-group">

                <label>Category</label>

                <input
                  name="category"
                  placeholder="Example: vegetable"
                  value={form.category}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="dashboard-form-group">

              <label>Description</label>

              <textarea
                name="description"
                placeholder="Describe your product..."
                value={form.description}
                onChange={handleChange}
                required
              />

            </div>


            <div className="dashboard-form-row">

              <div className="dashboard-form-group">

                <label>Price (₹)</label>

                <input
                  type="number"
                  name="price"
                  placeholder="40"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="1"
                />

              </div>


              <div className="dashboard-form-group">

                <label>Available Quantity (kg)</label>

                <input
                  type="number"
                  name="quantity"
                  placeholder="100"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                />

              </div>

            </div>


            <button
              type="submit"
              className="add-product-button"
              disabled={adding}
            >
              {adding
                ? "Adding Product..."
                : "🌾 Add Product"}
            </button>

          </form>

        </div>


        {/* PRODUCT LIST */}

        <div className="dashboard-products">

          <div className="dashboard-section-title">

            <div>

              <span>YOUR MARKETPLACE</span>

              <h2>
                Available Products
              </h2>

            </div>

            <span className="product-count">
              {products.length} products
            </span>

          </div>


          {message && (
            <p className="dashboard-message">
              {message}
            </p>
          )}


          {loading ? (

            <p className="dashboard-loading">
              Loading products...
            </p>

          ) : products.length === 0 ? (

            <div className="dashboard-empty">

              🌱

              <h3>No products yet</h3>

              <p>
                Add your first product to start selling.
              </p>

            </div>

          ) : (

            <div className="dashboard-product-list">

              {products.map((product) => (

                <div
                  className="dashboard-product-item"
                  key={product.id}
                >

                  {/* EDIT MODE */}

                  {editingProduct === product.id ? (

                    <form
                      className="edit-product-form"
                      onSubmit={(e) =>
                        handleUpdate(e, product.id)
                      }
                    >

                      <input
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        required
                      />

                      <input
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        required
                      />

                      <textarea
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        required
                      />

                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditChange}
                        required
                      />

                      <input
                        type="number"
                        name="quantity"
                        value={editForm.quantity}
                        onChange={handleEditChange}
                        required
                      />

                      <div className="edit-buttons">

                        <button
                          type="submit"
                          className="save-product-button"
                        >
                          💾 Save
                        </button>

                        <button
                          type="button"
                          className="cancel-edit-button"
                          onClick={() =>
                            setEditingProduct(null)
                          }
                        >
                          Cancel
                        </button>

                      </div>

                    </form>

                  ) : (

                    <>
                      <div className="dashboard-product-icon">
                        🌱
                      </div>


                      <div className="dashboard-product-info">

                        <h3>
                          {product.name}
                        </h3>

                        <span>
                          {product.category}
                        </span>

                      </div>


                      <div className="dashboard-product-actions">

                        <div className="dashboard-product-price">

                          <strong>
                            ₹{product.price}
                          </strong>

                          <small>
                            {product.quantity} kg available
                          </small>

                        </div>


                        <button
                          className="edit-product-button"
                          onClick={() =>
                            startEditing(product)
                          }
                        >
                          ✏️ Edit
                        </button>


                        <button
                          className="delete-product-button"
                          onClick={() =>
                            handleDelete(product.id)
                          }
                        >
                          🗑 Delete
                        </button>

                      </div>
                    </>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </div>
  );
}