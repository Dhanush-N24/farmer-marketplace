# 🌾 Harvest & Co. — AI-Powered Farmer Marketplace

Harvest & Co. is a full-stack agriculture marketplace that connects farmers directly with customers while providing AI-powered agricultural assistance.

The platform combines a modern React frontend, FastAPI backend, JWT-based authentication, product and order management, shopping cart functionality, and an AI assistant built using LangChain, Retrieval-Augmented Generation (RAG), vector search, semantic search, and an agriculture-focused knowledge base.

---

## 🚀 Project Overview

Traditional agricultural marketplaces often separate farmers from customers and provide limited access to reliable farming information.

Harvest & Co. addresses this by combining:

- 👨‍🌾 Farmer-to-customer marketplace
- 🛒 Online shopping and cart management
- 📦 Order placement and order tracking
- 🔐 Role-based authentication
- 🤖 AI-powered agriculture assistant
- 📚 RAG-based agricultural knowledge retrieval
- ❓ AI-powered FAQ chatbot
- 🔎 Semantic search over agricultural documents
- 🌱 Crop and farming recommendations

The goal is to create a single platform where farmers can list their produce, customers can purchase directly, and users can obtain agriculture-related information through an AI assistant.

---

# ✨ Key Features

## 👨‍🌾 Farmer Features

- Farmer registration and login
- Dedicated farmer dashboard
- Add agricultural products
- Specify:
  - Product name
  - Description
  - Category
  - Price
  - Available quantity
- View listed products
- Delete products
- Automatic stock management after orders

---

## 🛒 Customer Features

- Customer registration and login
- Browse marketplace products
- View individual product details
- Add products to cart
- Increase/decrease cart quantity
- Automatic cart total calculation
- Checkout
- Place orders
- View previous orders
- Track order status

---

## 🔐 Authentication & Authorization

The backend implements authentication using:

- JWT (JSON Web Tokens)
- Password hashing
- Role-based access control
- Protected API endpoints

Two primary user roles are supported:

```text
Farmer
Customer
