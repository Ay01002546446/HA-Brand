import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import CartDrawer from './components/CartDrawer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import CollectionPage from './pages/CollectionPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import NotFound from './pages/NotFound';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="relative bg-black text-white overflow-x-hidden">
          <Header onOpenCart={() => setIsDrawerOpen(true)} />
          <Breadcrumb />
          <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
          <WhatsAppButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<Cart onOpenDrawer={() => setIsDrawerOpen(true)} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </Router>
    </CartProvider>
  );
}

export default App;
