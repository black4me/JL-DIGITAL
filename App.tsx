import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Dashboard from './pages/Dashboard';
import LiveSessions from './pages/LiveSessions';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import OrderBriefing from './pages/OrderBriefing';
import OrderTracking from './pages/OrderTracking';
import DynamicPage from './pages/DynamicPage'; // New Import
import { CartProvider } from './context/CartContext';
import { SiteContentProvider } from './context/SiteContentContext';

function App() {
  return (
    <SiteContentProvider>
      <CartProvider>
        <div className="bg-black-900 min-h-screen text-white font-sans selection:bg-gold-500 selection:text-black-900">
          <Navbar />
          <CartSidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live" element={<LiveSessions />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/briefing" element={<OrderBriefing />} />
            <Route path="/tracking" element={<OrderTracking />} />
            <Route path="/page/:slug" element={<DynamicPage />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </SiteContentProvider>
  );
}

export default App;