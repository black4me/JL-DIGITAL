import React from 'react';
import { Calendar, Clock, User, Video } from 'lucide-react';
import { LIVE_SESSIONS } from '../constants';
import Button from '../components/Button';

const LiveSessions = () => {
  return (
    <div className="pt-24 min-h-screen pb-12">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-500 font-bold tracking-wider text-sm uppercase">وصول حصري</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">جلسات التدريب المباشر</h1>
          <p className="text-gray-400 text-lg">انضم لجلسات الماسترمايند الأسبوعية. اطرح أسئلتك واحصل على توجيه مباشر لتنمية أعمالك.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {LIVE_SESSIONS.map((session) => (
             <div key={session.id} className="bg-black-800 rounded-2xl overflow-hidden border border-white/5 group hover:border-gold-500/50 transition-colors">
               <div className="relative h-48">
                 <img src={session.thumbnail} alt={session.title} className="w-full h-full object-cover" />
                 <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center animate-pulse">
                   <div className="w-2 h-2 bg-white rounded-full ml-2"></div> مباشر
                 </div>
               </div>
               
               <div className="p-8">
                 <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                   <span className="flex items-center"><Calendar size={16} className="ml-1 text-gold-500" /> {new Date(session.date).toLocaleDateString('ar-OM')}</span>
                   <span className="flex items-center"><Clock size={16} className="ml-1 text-gold-500" /> {session.duration}</span>
                 </div>
                 
                 <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">{session.title}</h2>
                 
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                     <User size={16} className="text-white" />
                   </div>
                   <span className="text-gray-300 text-sm">المدرب: <span className="text-white font-semibold">{session.instructor}</span></span>
                 </div>

                 <Button className="w-full">حجز مقعد</Button>
               </div>
             </div>
          ))}

          {/* Past Recordings CTA */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10 flex flex-col justify-center items-center text-center">
             <div className="bg-white/5 p-4 rounded-full mb-6">
               <Video size={40} className="text-gold-500" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">هل فاتتك جلسة؟</h3>
             <p className="text-gray-400 mb-6">يمكنك الوصول لأرشيف يضم أكثر من 50 ساعة من الجلسات السابقة.</p>
             <Button variant="secondary">دخول الأرشيف</Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveSessions;