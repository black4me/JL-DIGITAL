import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSiteContent } from '../context/SiteContentContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, toggleCart } = useCart();
  const { settings } = useSiteContent(); // Use Settings
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الخدمات', path: '/services' },
    { name: 'المتجر', path: '/shop' },
    { name: 'جلسات مباشرة', path: '/live' },
    { name: 'تتبع طلبك', path: '/tracking' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black-900/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
          {/* Dynamic Logo Logic */}
          {settings.logo ? (
            <img src={settings.logo} alt={settings.brandName} className="h-10 w-auto object-contain" />
          ) : (
            <div className="bg-gold-500 w-8 h-8 rounded flex items-center justify-center text-black-900">
              <Zap size={20} fill="currentColor" />
            </div>
          )}
          <span>{settings.brandName.split(' ')[0]} <span className="text-gold-500">{settings.brandName.split(' ').slice(1).join(' ')}</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 space-x-reverse">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-sm font-medium transition-colors hover:text-gold-400 ${location.pathname === link.path ? 'text-gold-500' : 'text-gray-300'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-6 space-x-reverse">
           <button onClick={toggleCart} className="relative text-white hover:text-gold-400 transition-colors">
            <ShoppingBag size={24} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {items.length}
              </span>
            )}
          </button>
          <Link to="/dashboard">
            <div className="w-10 h-10 rounded-full bg-black-800 border border-gray-700 flex items-center justify-center hover:border-gold-500 transition-colors overflow-hidden">
               <User size={20} className="text-gold-500" />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black-900 border-b border-white/10 p-6 flex flex-col space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="text-lg font-medium text-gray-200 hover:text-gold-500"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-gray-800 my-2" />
          <button onClick={toggleCart} className="flex items-center space-x-2 text-gray-200">
            <ShoppingBag size={20} />
            <span>السلة ({items.length})</span>
          </button>
           <Link to="/dashboard" className="flex items-center space-x-2 text-gray-200">
            <User size={20} />
            <span>لوحة التحكم</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;