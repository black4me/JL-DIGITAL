import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';
import Button from '../components/Button';
import { ArrowRight } from 'lucide-react';

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { customPages } = useSiteContent();

  const page = customPages.find(p => p.slug === slug);

  if (!page) {
    return (
      <div className="pt-32 min-h-screen text-center text-white">
        <h1 className="text-4xl font-bold mb-4">404 - الصفحة غير موجودة</h1>
        <p className="text-gray-400 mb-8">عذراً، لم نتمكن من العثور على الصفحة المطلوبة.</p>
        <Link to="/">
          <Button variant="outline">العودة للرئيسية</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen pb-24 bg-black-900">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
           <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gold-500 mb-6 transition-colors">
              <ArrowRight size={16} className="ml-2" /> العودة للرئيسية
           </Link>
           <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{page.title}</h1>
           <p className="text-sm text-gray-500">آخر تحديث: {page.lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
           <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>

      </div>
    </div>
  );
};

export default DynamicPage;