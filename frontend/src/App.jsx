import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chatbot from "./pages/Chatbot";
import FaqBot from "./pages/FaqBot";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FarmerDashboard from "./pages/FarmerDashboard";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/faq" element={<FaqBot />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
  path="/farmer-dashboard"
  element={<FarmerDashboard />}
/>
        <Route
  path="/my-orders"
  element={<MyOrders />}
/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;