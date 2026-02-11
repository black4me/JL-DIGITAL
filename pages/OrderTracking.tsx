import React, { useState } from 'react';
import { Search, Package, Clock, CheckCircle, Loader, Radar, Target } from 'lucide-react';
import Button from '../components/Button';
import { MOCK_ORDERS } from '../constants';
import { Order } from '../types';

const OrderTracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;
    setLoading(true);
    setOrder(null);
    setTimeout(() => {
      const foundOrder = MOCK_ORDERS.find(o => o.trackingId === trackingId);
      if (foundOrder) setOrder(foundOrder);
      setLoading(false);
    }, 1500);
  };

  const steps = [
    { label: 'Initiation', status: 0 },
    { label: 'Development', status: 1 },
    { label: 'Optimization', status: 2 },
    { label: 'Quality Assurance', status: 3 },
    { label: 'Completion', status: 4 },
  ];

  return (
    <div className="pt-32 min-h-screen pb-24 bg-black-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        <div className="text-center mb-16">
          <Target className="w-12 h-12 text-gold-500 mx-auto mb-6 animate-pulse-slow" strokeWidth={1} />
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">Project Radar</h1>
          <p className="text-silver font-light tracking-widest uppercase text-xs">Real-time production tracking system</p>
        </div>

        {/* Search Input - Minimal */}
        <div className="glass-panel p-2 rounded-full flex items-center max-w-xl mx-auto mb-16 border border-white/10 shadow-2xl">
          <input 
            type="text" 
            placeholder="ENTER TRACKING ID (e.g., TRK-9821)" 
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="flex-1 bg-transparent border-none text-white px-8 py-3 outline-none text-center tracking-widest placeholder-gray-600 font-mono uppercase"
          />
          <Button size="md" onClick={handleTrack} disabled={loading} className="rounded-full px-8 py-3">
            {loading ? <Loader className="animate-spin" size={18} /> : 'TRACK'}
          </Button>
        </div>

        {/* Result Area - Radar UI */}
        {order && (
          <div className="glass-card rounded-none border-t border-b border-gold-500/30 p-12 animate-fade-in relative">
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold-500"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold-500"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold-500"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold-500"></div>

             <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-8 mb-12">
                <div>
                  <span className="text-[10px] text-gold-500 uppercase tracking-[0.2em] mb-2 block">Project Designation</span>
                  <h2 className="text-3xl font-light text-white">{order.serviceName}</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Status Code</p>
                  <div className={`text-sm font-bold px-4 py-1 border ${order.status === 'COMPLETED' ? 'text-green-500 border-green-500/30 bg-green-500/5' : 'text-gold-500 border-gold-500/30 bg-gold-500/5'} inline-block uppercase tracking-widest`}>
                    {order.status}
                  </div>
                </div>
             </div>

             {/* Premium Timeline */}
             <div className="relative py-8">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2"></div>
                
                {/* Active Line (Gold Gradient) */}
                <div 
                  className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-gold-500 -translate-y-1/2 transition-all duration-1000"
                  style={{ width: `${(order.progressStep / 4) * 100}%` }}
                >
                   {/* Glowing Head */}
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gold-500 rounded-full shadow-[0_0_15px_#D4AF37]"></div>
                </div>

                <div className="flex justify-between relative z-10">
                  {steps.map((step, idx) => {
                    const isCompleted = order.progressStep >= step.status;
                    const isCurrent = order.progressStep === step.status;
                    
                    return (
                      <div key={idx} className="flex flex-col items-center gap-6 group">
                         {/* Node */}
                         <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${isCompleted ? 'bg-black-900 border-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'bg-black-900 border-white/10'}`}>
                           {isCompleted && <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>}
                         </div>
                         
                         {/* Label */}
                         <div className={`text-center transition-all duration-500 ${isCurrent ? 'transform -translate-y-2' : ''}`}>
                           <p className={`text-[10px] uppercase tracking-widest font-bold ${isCompleted ? 'text-white' : 'text-gray-600'}`}>{step.label}</p>
                           {isCurrent && <p className="text-[9px] text-gold-500 mt-1 animate-pulse tracking-widest">PROCESSING...</p>}
                         </div>
                      </div>
                    );
                  })}
                </div>
             </div>

             <div className="mt-16 grid grid-cols-2 gap-4 text-center opacity-60">
                <div className="border-r border-white/5">
                   <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Order ID</p>
                   <p className="font-mono text-xs text-white">#{order.id}</p>
                </div>
                <div>
                   <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Target Date</p>
                   <p className="font-mono text-xs text-white">{order.date}</p>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default OrderTracking;