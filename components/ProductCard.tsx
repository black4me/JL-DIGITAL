import React from 'react';
import { Product } from '../types';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    // SOP 11.2.2: Glass Card style
    <div className="group relative glass-card rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/5 hover:border-gold-500/30">
      {/* Badges */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        {product.isBestSeller && (
          <span className="bg-gold-500/90 backdrop-blur text-black-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Best Seller
          </span>
        )}
        {product.isNew && (
          <span className="bg-white/90 backdrop-blur text-black-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            New Arrival
          </span>
        )}
      </div>

      {/* Image with Dark Gradient Overlay */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/20 to-transparent opacity-90" />
        
        {/* Quick Add Overlay - Slide Up */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-black-900/80 backdrop-blur-xl border-t border-white/10">
          <Button 
            variant="primary" 
            className="w-full text-sm py-3" 
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={16} className="ml-2" /> إضافة للسلة
          </Button>
        </div>
      </div>

      {/* Content - Minimal & Elegant */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest border border-gold-500/20 px-2 py-0.5 rounded">{product.type}</span>
          <div className="flex items-center text-gold-400 text-xs gap-1">
            <span>{product.rating}</span>
            <Star size={12} fill="currentColor" />
          </div>
        </div>
        
        {/* SOP 11.3: Big & Thin Typography */}
        <h3 className="text-xl font-light text-pearl mb-3 leading-tight group-hover:text-white transition-colors">
          {product.title}
        </h3>
        
        <p className="text-silver text-sm mb-6 line-clamp-2 font-light leading-relaxed opacity-80">
          {product.description}
        </p>

        <div className="flex items-end justify-between border-t border-white/5 pt-4">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gray-600 line-through mb-1">{product.originalPrice} ر.ع</span>
            )}
            <span className="text-2xl font-light text-gold-300">{product.price} <span className="text-xs text-gold-500/50">ر.ع</span></span>
          </div>
          <button className="text-xs text-silver hover:text-gold-400 transition-colors uppercase tracking-widest border-b border-transparent hover:border-gold-400 pb-0.5">
            عرض التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;