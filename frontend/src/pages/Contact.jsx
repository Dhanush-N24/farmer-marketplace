import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demo contact form
    setStatus("✅ Thank you! Your message has been received.");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      <div className="contact-orb contact-orb-one"></div>
      <div className="contact-orb contact-orb-two"></div>

      {/* HERO */}

      <section className="contact-hero">

        <div className="contact-badge">
          <span></span>
          GET IN TOUCH
        </div>

        <h1>
          Let's grow something
          <span> better together.</span>
        </h1>

        <p>
          Have a question about Harvest & Co., our marketplace,
          farming assistance, or your orders? We'd love to hear from you.
        </p>

      </section>


      {/* MAIN CONTENT */}

      <section className="contact-wrapper">

        {/* LEFT SIDE */}

        <div className="contact-info">

          <span className="contact-label">
            CONTACT HARVEST & CO.
          </span>

          <h2>
            We're always happy
            <span> to help.</span>
          </h2>

          <p className="contact-description">
            Whether you're a customer looking for fresh produce or someone
            exploring our farming technology, reach out to us and we'll
            get back to you.
          </p>


          <div className="contact-cards">

            <div className="contact-card">

              <div className="contact-icon">
                ✉️
              </div>

              <div>
                <span>Email Us</span>

                <strong>
                  support@harvestandco.com
                </strong>
              </div>

            </div>


            <div className="contact-card">

              <div className="contact-icon">
                📞
              </div>

              <div>
                <span>Call Us</span>

                <strong>
                  +91 98765 43210
                </strong>
              </div>

            </div>


            <div className="contact-card">

              <div className="contact-icon">
                📍
              </div>

              <div>
                <span>Based In</span>

                <strong>
                  India • Growing Digitally
                </strong>
              </div>

            </div>

          </div>


          <div className="contact-online">

            <span></span>

            HARVEST SUPPORT IS ONLINE

          </div>

        </div>


        {/* CONTACT FORM */}

        <div className="contact-form-container">

          <div className="form-top">

            <div className="form-icon">
              🌱
            </div>

            <div>
              <span>
                SEND A MESSAGE
              </span>

              <h3>
                How can we help?
              </h3>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-row">

              <div className="form-group">

                <label>Your Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="form-group">

              <label>Subject</label>

              <input
                type="text"
                name="subject"
                placeholder="What would you like to talk about?"
                value={form.subject}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>Your Message</label>

              <textarea
                name="message"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                required
              />

            </div>


            <button
              type="submit"
              className="contact-submit"
            >
              Send Message
              <span>→</span>
            </button>


            {status && (
              <div className="contact-status">
                {status}
              </div>
            )}

          </form>

        </div>

      </section>

    </div>
  );
}