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

Instead of relying only on the language model's general knowledge, the system retrieves relevant agricultural information and uses it as context for generating responses.

📚 Agriculture Knowledge Base

The knowledge base contains agricultural information covering topics such as:

Crop diseases
Crop protection
Integrated pest management
Irrigation
Nutrient management
Rice management
Horticulture
Indigenous crops
Crop production
Tomato diseases
Banana diseases
Chilli diseases
Agricultural FAQs

The project includes agriculture resources from sources such as TNAU and FAO along with crop-specific knowledge documents.

🔎 Semantic Search

Semantic search is used to find relevant agricultural information based on the meaning of a user's question.

For example:

User:
"My tomato plants have yellow leaves. What could be the problem?"

The system searches the vector database for semantically relevant information related to:

Tomato diseases
Crop protection
Nutrient management

The retrieved information is then supplied to the AI system as context.

❓ FAQ Bot

The project also contains a dedicated AI-powered FAQ bot.

It uses a separate FAQ knowledge base containing frequently asked questions related to the platform and agriculture.

User Question
      ↓
FAQ Retrieval
      ↓
Relevant FAQ Information
      ↓
AI Response
🌱 Agriculture Recommendation

The AI module also contains recommendation functionality that can be extended for:

Crop recommendations
Disease guidance
Farming practice recommendations
Crop-specific suggestions
Agricultural decision support
🏗️ System Architecture
                    ┌─────────────────────┐
                    │     React Frontend  │
                    │                     │
                    │ Marketplace          │
                    │ Cart                 │
                    │ Checkout             │
                    │ Farmer Dashboard     │
                    │ My Orders            │
                    │ AI Assistant         │
                    │ FAQ Bot              │
                    └──────────┬──────────┘
                               │
                            REST API
                               │
                               ↓
                    ┌─────────────────────┐
                    │    FastAPI Backend  │
                    │                     │
                    │ Authentication      │
                    │ Products            │
                    │ Orders              │
                    │ Cart                │
                    │ AI APIs             │
                    └───────┬─────────────┘
                            │
             ┌──────────────┼──────────────┐
             ↓              ↓              ↓
       ┌───────────┐  ┌─────────────┐  ┌───────────┐
       │ Database  │  │ AI / RAG    │  │ JWT Auth  │
       │           │  │             │  │           │
       │ Users     │  │ LangChain   │  │ Tokens    │
       │ Products  │  │ ChromaDB    │  │ Roles     │
       │ Orders    │  │ Embeddings  │  │           │
       │ OrderItems│  │ Semantic    │  │           │
       └───────────┘  │ Search      │  └───────────┘
                      └─────────────┘
💻 Technology Stack

Frontend

React
JavaScript
Vite
React Router
Axios
CSS

Backend

Python
FastAPI
SQLAlchemy
Pydantic
Uvicorn
JWT Authentication
Password Hashing
AI
LangChain
Retrieval-Augmented Generation (RAG)
Embeddings
ChromaDB
Semantic Search
AI Chatbot
FAQ Bot
Database
SQLAlchemy ORM
Users
Products
Orders
Order Items


🔄 Application Flow

Customer
Register
   ↓
Login as Customer
   ↓
Marketplace
   ↓
Browse Products
   ↓
Add to Cart
   ↓
Checkout
   ↓
Place Order
   ↓
Stock Updated
   ↓
My Orders
Farmer
Register
   ↓
Login as Farmer
   ↓
Farmer Dashboard
   ↓
Add Product
   ↓
Product Listed
   ↓
Customer Purchases
   ↓
Product Stock Reduced
AI
User Question
      ↓
AI API
      ↓
Semantic Search
      ↓
ChromaDB
      ↓
Relevant Documents
      ↓
RAG Context
      ↓
LangChain / LLM
      ↓
AI Response
📁 Project Structure
farmer-marketplace/
│
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   │   ├── build_faq_knowledge_base.py
│   │   │   ├── build_knowledge_base.py
│   │   │   ├── chatbot.py
│   │   │   ├── faq_bot.py
│   │   │   ├── recommender.py
│   │   │   └── semantic_search.py
│   │   │
│   │   ├── data/
│   │   │   ├── faq_docs/
│   │   │   └── farming_docs/
│   │   │
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── product.py
│   │   │   └── order.py
│   │   │
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── products.py
│   │   │   ├── orders.py
│   │   │   ├── cart.py
│   │   │   └── ai.py
│   │   │
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── database.py
│   │   ├── dependencies.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

📦 Order & Inventory Management

When a customer places an order:

Customer selects product
        ↓
Checkout
        ↓
Order API
        ↓
Validate product
        ↓
Check available stock
        ↓
Calculate total
        ↓
Reduce stock
        ↓
Create Order
        ↓
Create Order Items

This keeps marketplace inventory synchronized with customer purchases.

🔌 Main API Modules
/auth
/products
/orders
/cart
/ai

Examples:

POST   /auth/register
POST   /auth/login

GET    /products
POST   /products/
GET    /products/my-products
DELETE /products/{id}

POST   /orders/
GET    /orders/my-orders
⚙️ Run Locally
Backend
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py

Backend:

http://localhost:8000

API documentation:

http://localhost:8000/docs
Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Frontend:

http://localhost:5173
🔐 Security

The application uses:

JWT access tokens
Password hashing
Protected API routes
Role-based access control
Farmer/customer authorization
.gitignore for development-only files
🚀 Future Enhancements
Online payment integration
Farmer order management
Product image uploads
Farmer profiles
Reviews and ratings
Real-time notifications
Weather integration
Location-based farmer discovery
Crop recommendation models
Price prediction
Multilingual AI assistant
Voice-based agriculture assistant
Cloud deployment
🎯 Project Highlights

Harvest & Co. demonstrates the integration of:

Full-Stack Development
        +
REST APIs
        +
Authentication & Authorization
        +
E-Commerce
        +
Database Management
        +
LangChain
        +
RAG
        +
Vector Search
        +
Semantic Search
        +
AI Chatbot
        +
Agriculture Knowledge Base
👨‍💻 Author

Dhanush

GitHub:
https://github.com/Dhanush-N24

Repository:
https://github.com/Dhanush-N24/farmer-marketplace

🌾 Harvest & Co.

Connecting farmers, customers and intelligent agricultural assistance through technology.

