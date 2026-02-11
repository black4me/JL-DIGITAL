import React, { useState } from 'react';
import { ArrowLeft, Shield, TrendingUp, Users, VolumeX, Play, Mail, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { TESTIMONIALS } from '../constants';
import { useSiteContent, getIconByName } from '../context/SiteContentContext';

const Home = () => {
  const { tickerItems, videos, products, addSubscriber, settings, features } = useSiteContent();
  const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 3);
  
  // Newsletter State
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      addSubscriber(email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-black-900 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          {settings.heroImage ? (
            <>
               <img src={settings.heroImage} className="w-full h-full object-cover opacity-30" alt="Hero Background" />
               <div className="absolute inset-0 bg-gradient-to-t from-black-900 via-transparent to-transparent"></div>
            </>
          ) : (
            <>
               <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gold-600/10 rounded-full blur-[120px]" />
               <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold-900/10 rounded-full blur-[100px]" />
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
            </>
          )}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="space-y-8 animate-slide-up order-1 lg:order-1 text-right">
              <div className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                </span>
                <span>ثورة في عالم التسويق الرقمي</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.15]">
                 {settings.heroTitle}
              </h1>
              
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                {settings.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/shop">
                  <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                    استكشف خدماتنا
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg border-white/20 text-white hover:bg-white/5 hover:border-gold-500 hover:text-gold-500">
                    احجز استشارة &larr;
                  </Button>
                </Link>
              </div>

              <div className="pt-8 flex items-center gap-8 border-t border-white/5 mt-8">
                 <div>
                    <h4 className="text-2xl font-bold text-gold-500">500+</h4>
                    <p className="text-sm text-gray-500">مشروع ناجح</p>
                 </div>
                 <div>
                    <h4 className="text-2xl font-bold text-gold-500">10M$+</h4>
                    <p className="text-sm text-gray-500">مبيعات للعملاء</p>
                 </div>
                 <div>
                    <h4 className="text-2xl font-bold text-gold-500">98%</h4>
                    <p className="text-sm text-gray-500">نسبة رضا</p>
                 </div>
              </div>
            </div>

            {/* Dashboard Visual */}
            <div className="relative animate-fade-in order-2 lg:order-2 lg:mr-auto w-full">
               <div className="relative z-10 bg-[#161b19] border border-white/10 rounded-2xl p-6 shadow-2xl shadow-gold-900/50 transform hover:scale-[1.01] transition-transform duration-500">
                  <div className="flex justify-between items-center mb-8">
                     <div className="flex space-x-2 space-x-reverse">
                        <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                     </div>
                     <span className="text-xs text-gray-500 font-mono tracking-widest">JUMP LEADS DASHBOARD</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                     <div className="bg-[#1F2937]/50 p-4 rounded-lg border border-white/5">
                        <p className="text-xs text-gray-400 mb-2 text-center">التحويلات</p>
                        <p className="text-2xl font-bold text-gold-500 text-center">12.4%</p>
                        <p className="text-xs text-gold-500 text-center mt-1">+5%</p>
                     </div>
                     <div className="bg-[#1F2937]/50 p-4 rounded-lg border border-white/5">
                        <p className="text-xs text-gray-400 mb-2 text-center">العملاء</p>
                        <p className="text-2xl font-bold text-[#F59E0B] text-center">2,847</p>
                        <p className="text-xs text-[#F59E0B] text-center mt-1">+18%</p>
                     </div>
                     <div className="bg-[#1F2937]/50 p-4 rounded-lg border border-white/5">
                        <p className="text-xs text-gray-400 mb-2 text-center">الإيرادات</p>
                        <p className="text-2xl font-bold text-gold-500 text-center">124,500$</p>
                        <p className="text-xs text-gold-500 text-center mt-1">+24%</p>
                     </div>
                  </div>

                  <div className="bg-[#1F2937]/30 rounded-xl p-4 border border-white/5">
                    <div className="h-32 flex items-end justify-between gap-3 px-2">
                       <div className="w-full bg-[#10B981] h-[40%] rounded-sm opacity-90"></div>
                       <div className="w-full bg-[#10B981] h-[60%] rounded-sm opacity-90"></div>
                       <div className="w-full bg-[#10B981] h-[45%] rounded-sm opacity-90"></div>
                       <div className="w-full bg-[#F59E0B] h-[80%] rounded-sm opacity-90"></div> 
                       <div className="w-full bg-[#10B981] h-[55%] rounded-sm opacity-90"></div>
                       <div className="w-full bg-[#10B981] h-[90%] rounded-sm opacity-90"></div>
                       <div className="w-full bg-[#10B981] h-[30%] rounded-sm opacity-90"></div>
                    </div>
                  </div>
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gold-500/10 blur-[90px] -z-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker / Marquee Section */}
      <section className="bg-gold-600 border-y border-gold-500 text-white py-4 overflow-hidden relative z-20 shadow-[0_0_30px_rgba(0,200,83,0.3)]">
        <div className="flex animate-scroll w-max" dir="ltr">
          <div className="flex gap-16 items-center whitespace-nowrap px-8 flex-shrink-0">
            {tickerItems.map((item, index) => (
              <div key={`s1-${index}`} className="flex items-center gap-3 font-bold text-lg md:text-xl">
                 <span className="bg-black-900 text-gold-500 p-2 rounded-full border border-black-900/50">{getIconByName(item.icon)}</span>
                 <span className="text-white drop-shadow-sm">{item.text}</span>
                 <span className="text-black-900/30 text-2xl mx-4">•</span>
              </div>
            ))}
          </div>
          <div className="flex gap-16 items-center whitespace-nowrap px-8 flex-shrink-0">
            {tickerItems.map((item, index) => (
              <div key={`s2-${index}`} className="flex items-center gap-3 font-bold text-lg md:text-xl">
                 <span className="bg-black-900 text-gold-500 p-2 rounded-full border border-black-900/50">{getIconByName(item.icon)}</span>
                 <span className="text-white drop-shadow-sm">{item.text}</span>
                 <span className="text-black-900/30 text-2xl mx-4">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Stripe (Dynamic) */}
      <section className="bg-black-800 border-y border-white/5 py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
             <div key={feature.id} className="bg-black-900/50 p-6 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors">
               <div className="p-4 bg-black-800 rounded-xl text-gold-500 w-fit mb-4">{getIconByName(feature.icon, 32)}</div>
               <h3 className="text-white font-bold text-xl mb-2">{feature.title}</h3>
               <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
             </div>
          ))}
        </div>
      </section>

      {/* NEW SECTION: Live Marketing Sessions */}
      <section className="py-20 bg-black-950 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-2">جلسات التسويق المباشرة</h2>
            <p className="text-gray-400 text-lg">شاهد خبراؤنا في العمل</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="relative group rounded-2xl overflow-hidden bg-black-900 border border-white/10 hover:border-gold-500/50 transition-all duration-300 shadow-2xl">
                <div className="aspect-video relative overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black-900/40 group-hover:bg-black-900/20 transition-colors"></div>
                  {video.isLive && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center animate-pulse">
                      <div className="w-1.5 h-1.5 bg-white rounded-full ml-1.5"></div>
                      LIVE
                    </div>
                  )}
                  <div className="absolute top-4 right-4 text-white/70 bg-black-900/50 p-1.5 rounded-lg backdrop-blur-sm">
                    <VolumeX size={16} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <a href={video.videoUrl} className="w-16 h-16 bg-gold-500/90 rounded-full flex items-center justify-center text-black-900 transform scale-75 group-hover:scale-100 transition-transform">
                       <Play size={24} fill="currentColor" className="ml-1" />
                     </a>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-t from-black-900 via-black-900/95 to-black-900/80 absolute bottom-0 left-0 right-0">
                  <h3 className="text-white font-bold text-lg leading-tight">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative bg-black-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-right">
              <span className="text-gold-500 font-bold tracking-wider uppercase mb-2 block">منتجاتنا</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">مجموعات مختارة لنموك</h2>
              <p className="text-gray-400 max-w-lg">أفضل الأصول الرقمية التي تحتاجها لبناء عملك وتطوير مهاراتك.</p>
            </div>
            <Link to="/shop">
               <Button variant="ghost" className="hidden sm:inline-flex items-center gap-2 border border-white/10 hover:border-gold-500">عرض جميع المنتجات <ArrowLeft size={16} /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
           <div className="mt-12 text-center sm:hidden">
              <Link to="/shop"><Button variant="outline" className="w-full">عرض كل المنتجات</Button></Link>
           </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="glass-panel rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-gold-500/20 shadow-[0_0_30px_rgba(0,200,83,0.05)]">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-[40px]" />
             <div className="flex items-center gap-5 relative z-10">
                {isSubscribed ? (
                  <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/20 animate-pulse"><CheckCircle size={24} strokeWidth={2.5} /></div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-black-900 shadow-lg shadow-gold-500/20 transform hover:scale-110 transition-transform duration-300"><Mail size={24} strokeWidth={2.5} /></div>
                )}
                <div>
                   <h3 className="text-xl font-bold text-white">{isSubscribed ? 'تم الاشتراك بنجاح!' : 'النشرة البريدية الحصرية'}</h3>
                   <p className="text-sm text-gray-400">{isSubscribed ? 'شكراً لانضمامك إلينا. تفقد بريدك قريباً.' : 'انضم للقائمة البريدية واحصل على نصائح مجانية أسبوعياً.'}</p>
                </div>
             </div>
             <form className="flex w-full md:w-auto gap-3 relative z-10" onSubmit={handleSubscribe}>
                <input type="email" required placeholder="أدخل بريدك الإلكتروني..." value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubscribed} className="bg-black-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white w-full md:w-80 focus:border-gold-500 outline-none transition-colors disabled:opacity-50" />
                <Button size="md" className="whitespace-nowrap" disabled={isSubscribed}>{isSubscribed ? 'مشترك' : 'اشترك الآن'}</Button>
             </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;