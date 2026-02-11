import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import Button from '../components/Button';
import { CheckCircle, Clock, Globe, ShieldCheck } from 'lucide-react';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  if (!service) {
    return <div className="text-white text-center pt-40">الخدمة غير موجودة</div>;
  }

  const handleProceed = () => {
    if (!selectedPackage || !selectedDuration || !websiteUrl) return;
    
    const pkg = service.packages.find(p => p.id === selectedPackage);
    
    // Navigate to briefing with state
    navigate('/briefing', { 
      state: { 
        serviceName: service.title,
        package: pkg,
        duration: selectedDuration,
        websiteUrl
      } 
    });
  };

  return (
    <div className="pt-24 min-h-screen pb-12 bg-black-900">
      <div className="container mx-auto px-4">
        
        {/* Service Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="rounded-2xl overflow-hidden h-[400px] border border-white/10">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-gold-500 font-bold tracking-wider uppercase mb-2">تفاصيل الخدمة</span>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-6">{service.title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 border-r-4 border-gold-500 pr-6">
              {service.fullDescription}
            </p>
            <div className="flex gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-gold-500" />
                <span>ضمان الجودة</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-gold-500" />
                <span>التزام بالوقت</span>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Section (SOP 9.2) */}
        <div className="bg-black-800 rounded-3xl p-8 lg:p-12 border border-white/5">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">قم بتخصيص باقتك</h2>
          
          {/* 1. Choose Package */}
          <div className="mb-12">
            <h3 className="text-xl text-white font-bold mb-6 flex items-center gap-2">
              <span className="bg-gold-500 text-black-900 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              اختر الباقة المناسبة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 relative ${selectedPackage === pkg.id ? 'border-gold-500 bg-gold-500/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'border-white/10 hover:border-white/30 bg-black-900'}`}
                >
                  {selectedPackage === pkg.id && (
                    <div className="absolute top-4 left-4 text-gold-500"><CheckCircle size={24} fill="currentColor" className="text-black-900" /></div>
                  )}
                  <h4 className="text-2xl font-bold text-white mb-2">{pkg.name}</h4>
                  <p className="text-3xl font-black text-gold-500 mb-6">{pkg.price}$</p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 2. Choose Duration */}
            <div>
              <h3 className="text-xl text-white font-bold mb-6 flex items-center gap-2">
                <span className="bg-gold-500 text-black-900 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                اختر المدة
              </h3>
              <div className="flex flex-wrap gap-4">
                {service.availableDurations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={`px-6 py-3 rounded-lg font-medium border transition-colors ${selectedDuration === duration ? 'bg-gold-500 text-black-900 border-gold-500' : 'bg-transparent text-gray-400 border-white/20 hover:border-white'}`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Website URL (Mandatory) */}
            <div>
              <h3 className="text-xl text-white font-bold mb-6 flex items-center gap-2">
                <span className="bg-gold-500 text-black-900 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                رابط موقعك (للمعاينة والتحليل)
              </h3>
              <div className="relative">
                <Globe className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="url" 
                  placeholder="https://example.com" 
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full bg-black-900 border border-white/20 rounded-xl pr-12 pl-4 py-4 text-white focus:border-gold-500 outline-none transition-colors"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">* هذا الحقل إجباري لنتمكن من تحليل مشروعك قبل البدء.</p>
            </div>
          </div>

          {/* Action */}
          <div className="mt-16 text-center border-t border-white/10 pt-8">
            <Button 
              size="lg" 
              onClick={handleProceed}
              disabled={!selectedPackage || !selectedDuration || !websiteUrl}
              className="w-full md:w-1/3 text-xl"
            >
              اختيار هذه الباقة والاستمرار
            </Button>
            {(!selectedPackage || !selectedDuration || !websiteUrl) && (
              <p className="text-red-500 text-sm mt-4 animate-pulse">يرجى إكمال جميع الخيارات للمتابعة</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;