import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Zap, Globe } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const Footer = () => {
  const { settings } = useSiteContent();

  const discoveryLinks = settings.footerLinks.filter(l => l.section === 'DISCOVERY');
  const legalLinks = settings.footerLinks.filter(l => l.section === 'LEGAL');

  const getSocialIcon = (platform: string) => {
    switch(platform) {
      case 'facebook': return <Facebook size={20} />;
      case 'twitter': return <Twitter size={20} />;
      case 'instagram': return <Instagram size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      default: return <Globe size={20} />;
    }
  };

  return (
    <footer className="bg-black-900 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
               {!settings.logo && <Zap size={24} className="text-gold-500" />}
               <span>{settings.brandName.split(' ')[0]} <span className="text-gold-500">{settings.brandName.split(' ').slice(1).join(' ')}</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              المنصة الرائدة للمنتجات الرقمية والكورسات الاحترافية. 
              ابنِ إمبراطوريتك الرقمية معنا.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              {settings.socialLinks.map((link, idx) => (
                 <a key={idx} href={link.url} className="text-gray-400 hover:text-gold-500 transition-colors" target="_blank" rel="noreferrer">
                   {getSocialIcon(link.platform)}
                 </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Discovery) */}
          <div>
            <h4 className="text-white font-bold mb-6">اكتشف</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {discoveryLinks.map(link => (
                <li key={link.id}>
                  {link.url.startsWith('http') ? (
                    <a href={link.url} className="hover:text-gold-500 transition-colors">{link.label}</a>
                  ) : (
                    <Link to={link.url} className="hover:text-gold-500 transition-colors">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-6">القانونية</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {legalLinks.map(link => (
                <li key={link.id}>
                  {link.url.startsWith('http') ? (
                    <a href={link.url} className="hover:text-gold-500 transition-colors">{link.label}</a>
                  ) : (
                    <Link to={link.url} className="hover:text-gold-500 transition-colors">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start space-x-3 space-x-reverse">
                <MapPin size={18} className="text-gold-500 mt-0.5" />
                <span>{settings.contactAddress}</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Mail size={18} className="text-gold-500" />
                <span>{settings.contactEmail}</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Phone size={18} className="text-gold-500" />
                <span dir="ltr">{settings.contactPhone}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {settings.brandName}. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;