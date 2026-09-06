import { useEffect, useState } from "react";
import client from "../api/client";
import ProductCard from "../components/ProductCard";

import "./ProductList.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const response = await client.get("/products");
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

  if (loading) {
    return (
      <div className="marketplace-page">
        <div className="marketplace-loading">
          <div className="loader-ring"></div>
          <h2>Harvesting the marketplace...</h2>
          <p>Loading fresh products for you 🌾</p>
        </div>
      </div>
    );
  }

  return (
    <div className="marketplace-page">

      {/* BACKGROUND DECORATION */}

      <div className="marketplace-glow glow-one"></div>
      <div className="marketplace-glow glow-two"></div>

      <div className="marketplace-leaf leaf-left">
        🌿
      </div>

      <div className="marketplace-leaf leaf-right">
        🌾
      </div>


      {/* HERO */}

      <section className="marketplace-hero">

        <div className="marketplace-badge">
          <span className="badge-pulse"></span>
          FARM TO YOUR DOORSTEP
        </div>

        <h1>
          Fresh from the
          <span> hands that grew it.</span>
        </h1>

        <p>
          Discover fresh produce directly from farmers.
          Transparent prices, quality products and a
          marketplace built around real agriculture.
        </p>

        <div className="marketplace-info">

          <div className="marketplace-info-card">
            <span>🌾</span>
            <div>
              <strong>Farm Direct</strong>
              <small>From real farmers</small>
            </div>
          </div>

          <div className="marketplace-info-card">
            <span>🌱</span>
            <div>
              <strong>Fresh Produce</strong>
              <small>Quality checked</small>
            </div>
          </div>

          <div className="marketplace-info-card">
            <span>🛒</span>
            <div>
              <strong>{products.length} Products</strong>
              <small>Available now</small>
            </div>
          </div>

        </div>

      </section>


      {/* PRODUCTS */}

      <section className="products-section">

        <div className="products-heading">

          <div>
            <span className="section-label">
              MARKETPLACE
            </span>

            <h2>
              Explore Fresh Produce
            </h2>

            <p>
              Straight from farms to your kitchen.
            </p>
          </div>

          <div className="product-count">
            <span></span>
            {products.length} Available
          </div>

        </div>


        {products.length === 0 ? (

          <div className="empty-products">

            <div>🌱</div>

            <h2>No products found</h2>

            <p>
              Farmers will be adding fresh produce soon.
            </p>

          </div>

        ) : (

          <div className="products-grid">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        )}

      </section>

    </div>
  );
}