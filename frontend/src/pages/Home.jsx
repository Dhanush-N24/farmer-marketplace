import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import farm1 from "../assets/farm1.jpg";
import farm2 from "../assets/farm2.jpg";
import farm3 from "../assets/farm3.jpg";
import farm4 from "../assets/farm4.jpg";
import farm5 from "../assets/farm5.jpg";

import "./Home.css";

export default function Home() {
  // Requested order:
  // 4 → 2 → 1 → 3 → 5
  const backgroundImages = [
    farm1,
    farm2,
    farm3,
    farm4,
    farm5,
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        (prev + 1) % backgroundImages.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">

      {/* =========================
          CINEMATIC BACKGROUND
      ========================== */}

      <div className="home-slideshow">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`home-slide ${
              index === currentImage ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
      </div>

      {/* DARK CINEMATIC OVERLAY */}

      <div className="home-overlay" />

      {/* =========================
          FLOATING ELEMENTS
      ========================== */}

      <div className="floating-leaf leaf-one">🌿</div>
      <div className="floating-leaf leaf-two">🌱</div>
      <div className="floating-leaf leaf-three">🍃</div>

      {/* =========================
          HERO CONTENT
      ========================== */}

      <main className="home-content">

        {/* BADGE */}

        <div className="hero-badge">
          <span className="badge-dot"></span>
          SMART FARMING • REAL CONNECTION
        </div>


        {/* MAIN TITLE */}

        <h1 className="hero-title">
          Produce that still knows
          <span> whose hands grew it.</span>
        </h1>


        {/* DESCRIPTION */}

        <p className="hero-description">
          A modern farm-to-customer marketplace connecting
          farmers and customers directly — powered by
          intelligent AI assistance and South Indian
          agricultural knowledge.
        </p>


        {/* BUTTONS */}

        <div className="hero-buttons">

          <Link
            to="/products"
            className="primary-button"
          >
            <span>Explore Marketplace</span>
            <span className="button-arrow">→</span>
          </Link>


          <Link
            to="/chatbot"
            className="secondary-button"
          >
            <span className="ai-icon">✦</span>
            Ask Farming AI
          </Link>

        </div>


        {/* =========================
            STATS
        ========================== */}

        <div className="stats-container">

          <div className="stat-card">

            <div className="stat-icon">
              🌾
            </div>

            <div>
              <h3>South India</h3>
              <p>Farming Knowledge</p>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              🤖
            </div>

            <div>
              <h3>AI Powered</h3>
              <p>Smart Assistance</p>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              🛒
            </div>

            <div>
              <h3>Farm Direct</h3>
              <p>Marketplace</p>
            </div>

          </div>

        </div>

      </main>


      {/* =========================
          SLIDE INDICATORS
      ========================== */}

      <div className="slide-indicators">

        {backgroundImages.map((_, index) => (

          <span
            key={index}
            className={
              index === currentImage
                ? "indicator active"
                : "indicator"
            }
          />

        ))}

      </div>


      {/* =========================
          SCROLL INDICATOR
      ========================== */}

      <div className="scroll-indicator">

        <span>SCROLL TO EXPLORE</span>

        <div className="scroll-line"></div>

      </div>

    </div>
  );
}