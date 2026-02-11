import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { ProductType } from '../types';

const Shop = () => {
  const [filter, setFilter] = useState<string>('الكل');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['الكل', ...Object.values(ProductType)];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = filter === 'الكل' || product.type === filter;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen pb-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">المتجر</h1>
            <p className="text-gray-400">اكتشف الأدوات لبناء إمبراطوريتك.</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="بحث عن منتجات..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black-800 border border-white/10 rounded-lg pr-10 pl-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
             <div className="bg-black-800 rounded-lg border border-white/5 p-6 sticky top-24">
               <div className="flex items-center gap-2 mb-6 text-gold-500 font-bold">
                 <Filter size={20} /> <span>تصنيفات</span>
               </div>
               
               <div className="space-y-2">
                 {categories.map((category) => (
                   <button
                     key={category}
                     onClick={() => setFilter(category)}
                     className={`w-full text-right px-4 py-2 rounded transition-colors ${filter === category ? 'bg-gold-500 text-black-900 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                   >
                     {category}
                   </button>
                 ))}
               </div>
             </div>
          </aside>

          {/* Grid */}
          <main className="lg:w-3/4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-black-800 rounded-lg border border-white/5">
                <p className="text-gray-400 text-lg">لا توجد منتجات تطابق بحثك.</p>
                <button 
                  onClick={() => {setFilter('الكل'); setSearchTerm('');}} 
                  className="text-gold-500 mt-4 hover:underline"
                >
                  مسح الفلاتر
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;