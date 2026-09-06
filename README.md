# 🌾 Harvest & Co. — AI-Powered Farmer Marketplace

Harvest & Co. is a full-stack agricultural marketplace that directly connects farmers with customers.

The platform allows farmers to list and manage agricultural products, while customers can browse fresh produce, add products to a cart, place orders, and track their orders.

The project also integrates an **AI-powered agricultural assistant** using **LangChain, Retrieval-Augmented Generation (RAG), semantic search, and ChromaDB** to provide agriculture-related guidance from a curated knowledge base.

---

## 🚀 Project Overview

Traditional agricultural marketplaces often focus only on buying and selling products.

Harvest & Co. combines:

- 🧑‍🌾 Farmer-to-customer marketplace
- 🛒 Shopping cart and checkout
- 📦 Order management
- 🔐 JWT-based authentication
- 👨‍🌾 Farmer dashboard
- 🤖 AI agricultural assistant
- 📚 Retrieval-Augmented Generation (RAG)
- 🔎 Semantic search
- 🧠 LangChain
- 🗄️ ChromaDB vector database
- ❓ Agriculture FAQ chatbot
- 🌱 Agricultural recommendation features

The goal is to create a single platform where users can **purchase agricultural products and access intelligent farming information**.

---

# ✨ Key Features

## 👤 User Authentication

The platform supports two user roles:

### Customer
Customers can:

- Register
- Login
- Browse products
- View product details
- Add products to cart
- Increase/decrease quantities
- Checkout
- Place orders
- View previous orders

### Farmer

Farmers can:

- Register as a farmer
- Login securely
- Access the Farmer Dashboard
- Add agricultural products
- View their listed products
- Delete products
- Manage available stock

Authentication is implemented using **JWT (JSON Web Tokens)**.

---

# 🛍️ Marketplace

Customers can browse agricultural products listed by farmers.

Each product contains information such as:

- Product name
- Description
- Category
- Price
- Available quantity
- Unit
- Organic status
- Farmer association

The marketplace retrieves products from the FastAPI backend through REST APIs.

---

# 🧑‍🌾 Farmer Dashboard

The Farmer Dashboard provides farmers with a dedicated interface for managing their products.

Farmers can:

```text
Login
   ↓
Farmer Dashboard
   ↓
Add Product
   ↓
Product Stored in Database
   ↓
Product Appears in Marketplace
