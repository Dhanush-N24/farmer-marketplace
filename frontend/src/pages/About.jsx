import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">

      {/* BACKGROUND DECORATION */}
      <div className="about-orb orb-one"></div>
      <div className="about-orb orb-two"></div>
      <div className="about-orb orb-three"></div>

      {/* HERO */}

      <section className="about-hero">

        <div className="about-badge">
          <span></span>
          ABOUT HARVEST & CO.
        </div>

        <h1>
          Bringing farms
          <br />
          <span>closer to every home.</span>
        </h1>

        <p>
          Harvest & Co. is a modern farm-to-customer platform created to make
          fresh agricultural produce more accessible while helping farmers
          connect directly with customers.
        </p>

      </section>


      {/* STORY */}

      <section className="about-story">

        <div className="story-content">

          <span className="section-label">
            OUR STORY
          </span>

          <h2>
            Agriculture meets
            <span> modern technology.</span>
          </h2>

          <p>
            Farmers work hard to grow the food we depend on every day.
            However, connecting their produce directly with customers can
            often be difficult.
          </p>

          <p>
            Harvest & Co. was created with a simple idea — use technology to
            reduce the distance between farms and people. Our platform brings
            products, customers and intelligent farming assistance together
            in one connected digital experience.
          </p>

        </div>


        <div className="story-card">

          <div className="story-icon">
            🌾
          </div>

          <h3>
            From Farm to You
          </h3>

          <p>
            Fresh produce, direct connections and smarter farming — all in
            one place.
          </p>

          <div className="story-route">

            <div>
              👨‍🌾
              <span>Farmer</span>
            </div>

            <div className="route-line">
              →
            </div>

            <div>
              🛒
              <span>Harvest & Co.</span>
            </div>

            <div className="route-line">
              →
            </div>

            <div>
              🏡
              <span>Customer</span>
            </div>

          </div>

        </div>

      </section>


      {/* VALUES */}

      <section className="values-section">

        <div className="section-heading">

          <span className="section-label">
            WHY HARVEST & CO.
          </span>

          <h2>
            Built around what
            <span> matters most.</span>
          </h2>

        </div>


        <div className="values-grid">

          <div className="value-card">

            <div className="value-icon">
              🌱
            </div>

            <h3>
              Fresh Connections
            </h3>

            <p>
              Helping customers discover agricultural products directly from
              the people who grow them.
            </p>

          </div>


          <div className="value-card">

            <div className="value-icon">
              🤖
            </div>

            <h3>
              Intelligent Assistance
            </h3>

            <p>
              Our Farming AI helps users explore farming practices, crops,
              irrigation and agricultural knowledge.
            </p>

          </div>


          <div className="value-card">

            <div className="value-icon">
              🤝
            </div>

            <h3>
              Supporting Farmers
            </h3>

            <p>
              Creating a digital space where farmers and customers can be
              better connected.
            </p>

          </div>

        </div>

      </section>


      {/* MISSION */}

      <section className="mission-section">

        <div className="mission-card">

          <div className="mission-icon">
            ✦
          </div>

          <div>

            <span className="section-label">
              OUR MISSION
            </span>

            <h2>
              Make agriculture more
              <span> connected and accessible.</span>
            </h2>

            <p>
              We believe technology can make the journey from farm to customer
              simpler while providing useful digital tools that support
              agriculture and everyday consumers.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="about-cta">

        <h2>
          Ready to explore
          <span> Harvest & Co.?</span>
        </h2>

        <p>
          Discover fresh products and experience smarter farming technology.
        </p>

        <div className="about-buttons">

          <Link
            to="/products"
            className="about-primary-btn"
          >
            Explore Marketplace →
          </Link>

          <Link
            to="/chatbot"
            className="about-secondary-btn"
          >
            ✦ Ask Farming AI
          </Link>

        </div>

      </section>

    </div>
  );
}