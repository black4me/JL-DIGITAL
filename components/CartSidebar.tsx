import React from 'react';
import { X, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';

const CartSidebar = () => {
  const { isCartOpen, toggleCart, items, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black-900/80 backdrop-blur-sm" onClick={toggleCart} />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-black-800 h-full border-r border-white/10 flex flex-col shadow-2xl animate-fade-in">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">سلة المشتريات</h2>
          <button onClick={toggleCart} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">سلة المشتريات فارغة.</p>
              <Button variant="outline" onClick={toggleCart}>تابع التسوق</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded bg-gray-800" />
                <div className="flex-1">
                  <h3 className="text-white font-medium line-clamp-1">{item.title}</h3>
                  <p className="text-gold-400 text-sm mb-2">{item.price} ر.ع</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">الكمية: {item.quantity}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black-900">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">الإجمالي</span>
              <span className="text-xl font-bold text-white">{cartTotal.toFixed(2)} ر.ع</span>
            </div>
            <p className="text-xs text-gray-500 mb-6 text-center">الضرائب والشحن يتم حسابها عند الدفع.</p>
            <Button variant="primary" className="w-full flex items-center justify-center gap-2">
              <CreditCard size={18} /> إتمام الشراء بأمان
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;