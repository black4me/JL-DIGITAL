import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

const OrderBriefing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state as { serviceName: string, package: any, duration: string, websiteUrl: string } | null;

  const [formData, setFormData] = useState({
    firstName: '',
    fatherName: '',
    country: '',
    email: '',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Redirect if no order data (user accessed directly)
  if (!orderData && !submitted) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        <p className="mb-4">لا يوجد طلب نشط.</p>
        <Link to="/services" className="text-gold-500 underline">تصفح الخدمات</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation for description length (approx 5 lines ~ 150 chars)
    if (formData.description.length < 150) {
      alert('الرجاء كتابة وصف تفصيلي للمشروع (5 أسطر على الأقل) لنتمكن من فهم طلبك بدقة.');
      return;
    }

    // Simulation of order submission (SOP 9.4 logic would happen on backend)
    console.log('Order Submitted:', { ...formData, ...orderData });
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen pb-12 bg-black-900 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="bg-black-800 border border-gold-500/30 p-12 rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.1)]">
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-black text-white mb-4">تم استلام طلبك بنجاح!</h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              شكراً لاختيارك JL DIGITAL. سيقوم فريقنا بمراجعة تفاصيل مشروعك وتحليل موقعك.
              <br /><br />
              ستصلك رسالة عبر البريد الإلكتروني <span className="text-gold-500 font-bold">{formData.email}</span> تتضمن الموافقة والفاتورة وتفاصيل الدفع قريباً.
            </p>
            <Link to="/">
              <Button size="lg">العودة للرئيسية</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen pb-12 bg-black-900">
      <div className="container mx-auto px-4">
        
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">إتمام الطلب</h1>
            <p className="text-gray-400">الخطوة الأخيرة: أخبرنا المزيد عنك وعن تفاصيل مشروعك.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Order Summary Sidebar */}
            <div className="md:w-1/3 order-2 md:order-1">
              <div className="bg-black-800 border border-white/10 rounded-2xl p-6 sticky top-28">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">ملخص الطلب</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">الخدمة</span>
                    <span className="text-white font-medium">{orderData?.serviceName}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">الباقة المختارة</span>
                    <span className="text-gold-500 font-bold">{orderData?.package.name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">السعر</span>
                    <span className="text-white font-bold">{orderData?.package.price}$</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">المدة</span>
                    <span className="text-white">{orderData?.duration}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">الموقع للمعاينة</span>
                    <a href={orderData?.websiteUrl} target="_blank" rel="noreferrer" className="text-blue-400 text-sm truncate block hover:underline">
                      {orderData?.websiteUrl}
                    </a>
                  </div>
                </div>

                <div className="bg-gold-500/10 border border-gold-500/20 rounded p-4 text-xs text-gold-400 leading-relaxed">
                  <AlertCircle size={16} className="inline ml-1 mb-1" />
                  سيتم إرسال فاتورة عرض سعر بناءً على هذه البيانات إلى بريدك الإلكتروني بعد المراجعة.
                </div>
              </div>
            </div>

            {/* Briefing Form */}
            <div className="md:w-2/3 order-1 md:order-2">
              <form onSubmit={handleSubmit} className="bg-black-800 border border-white/10 rounded-2xl p-8 space-y-6">
                
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText size={20} className="text-gold-500" /> المعلومات الشخصية
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">الاسم الأول *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white focus:border-gold-500 outline-none"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">اسم الأب *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white focus:border-gold-500 outline-none"
                        value={formData.fatherName}
                        onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">البلد *</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white focus:border-gold-500 outline-none"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">البريد الإلكتروني (للفواتير) *</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white focus:border-gold-500 outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText size={20} className="text-gold-500" /> تفاصيل المشروع
                  </h3>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">وصف المشروع / الفكرة (5 أسطر على الأقل) *</label>
                    <textarea 
                      required
                      rows={8}
                      className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white focus:border-gold-500 outline-none"
                      placeholder="اشرح لنا فكرتك، أهدافك، والجمهور المستهدف بالتفصيل..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                    <div className="flex justify-between mt-2">
                      <span className={`text-xs ${formData.description.length < 150 ? 'text-red-400' : 'text-green-500'}`}>
                        {formData.description.length} حرف (المطلوب: شرح مفصل)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full">إتمام المهمة وإرسال الطلب</Button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBriefing;