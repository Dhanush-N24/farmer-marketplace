# 🌾 Harvest & Co. — AI-Powered Farmer Marketplace

Harvest & Co. is a full-stack agriculture marketplace that directly connects farmers with customers while providing AI-powered agricultural assistance.

The project combines a React frontend, FastAPI backend, SQLAlchemy database layer, JWT authentication, role-based access control, shopping cart and order management, and an AI system built using LangChain, Retrieval-Augmented Generation (RAG), ChromaDB, embeddings, and semantic search.

---

## 🚀 Features

### 👨‍🌾 Farmer

- Farmer registration and login
- Dedicated farmer dashboard
- Add agricultural products
- Set product price and available quantity
- View listed products
- Delete products
- Automatic stock reduction when products are purchased

### 🛒 Customer

- Customer registration and login
- Browse agricultural products
- View product details
- Add products to cart
- Increase/decrease quantities
- Checkout and place orders
- View order history
- Track order status

### 🔐 Authentication

- JWT-based authentication
- Password hashing
- Role-based authorization
- Separate Farmer and Customer experiences
- Protected API endpoints

---

# 🤖 AI Agriculture Assistant

A major component of Harvest & Co. is its AI-powered agriculture assistant.

The AI system uses:

- **LangChain**
- **Retrieval-Augmented Generation (RAG)**
- **Embeddings**
- **ChromaDB**
- **Semantic Search**
- **Agriculture Knowledge Base**
- **FAQ Knowledge Base**
- **Agriculture Recommendation System**

The assistant is designed to answer agriculture-related questions using information retrieved from the project's agricultural knowledge base.

---

# 🧠 RAG Architecture

The project implements Retrieval-Augmented Generation to ground AI responses in agricultural documents.

```text
Agriculture Documents
        ↓
Document Processing
        ↓
Text Chunking
        ↓
Embeddings
        ↓
ChromaDB Vector Database
        ↓
Semantic Similarity Search
        ↓
Relevant Context
        ↓
LangChain / LLM
        ↓
AI Response
