import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle, HelpCircle } from 'lucide-react';
import { SERVICES } from '../constants';
import Button from '../components/Button';

const Services = () => {
  const [customRequest, setCustomRequest] = useState({ email: '', description: '' });

  return (
    <div className="pt-32 min-h-screen pb-24 bg-black-950">
      <div className="container mx-auto px-4">
        
        {/* Gallery Header */}
        <div className="text-center max-w-4xl mx-auto mb-24 animate-fade-in">
          <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase border border-gold-500/20 px-4 py-2 rounded-full mb-6 inline-block">Elite Solutions</span>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
            Crafting <span className="text-gold-gradient bg-clip-text text-transparent font-normal">Digital Legacies</span>
          </h1>
          <p className="text-silver text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Premium services designed for those who demand excellence. Select a domain to begin your transformation.
          </p>
        </div>

        {/* Services Gallery (SOP 11.5: Gallery Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {SERVICES.map((service, index) => (
            <Link to={`/services/${service.id}`} key={service.id} className="group relative h-[500px] w-full block animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              {/* Card Container */}
              <div className="absolute inset-0 bg-black-900 border border-white/5 group-hover:border-gold-500/50 transition-all duration-700 overflow-hidden rounded-none">
                
                {/* Background Image (Dark & Artistic) */}
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-20 grayscale group-hover:grayscale-0" 
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/50 to-transparent"></div>
                
                {/* Content - Bottom Aligned */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-1 bg-gold-500 mb-6 w-0 group-hover:w-12 transition-all duration-500"></div>
                  
                  <h3 className="text-3xl font-light text-white mb-4 leading-none">
                    {service.title}
                  </h3>
                  
                  <p className="text-silver/80 font-light text-sm mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-white/10 pt-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs text-gold-400 uppercase tracking-widest">
                      Starting at <span className="text-lg text-white ml-2 font-light">{service.packages[0].price} OMR</span>
                    </span>
                    <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-black-900 transition-all">
                      <ArrowLeft size={14} />
                    </span>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Custom Request - Minimalist */}
        <div className="glass-panel border border-white/5 rounded-none p-12 md:p-24 text-center max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold-500/50"></div>
          
          <h2 className="text-3xl font-light text-white mb-6">Unique Vision?</h2>
          <p className="text-silver font-light mb-12 max-w-xl mx-auto">
            For bespoke projects that defy categorization, our elite team offers private consultations.
          </p>
          
          <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
             <input 
               type="email" 
               placeholder="Your Private Email" 
               className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-white focus:border-gold-500 outline-none transition-colors text-center md:text-right"
             />
             <Button variant="primary" className="whitespace-nowrap">Request Callback</Button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Services;