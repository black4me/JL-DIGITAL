
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Megaphone, Zap, Globe, Smartphone, BarChart3, Star, Gift, Shield, DollarSign, Award, ShoppingCart, CheckCircle, Clock, Users, Target, Layout, PenTool, Coffee } from 'lucide-react';
import { Product, Service, SiteSettings, FooterLink, SocialLink, FeatureItem, CustomPage, TickerItem, VideoItem } from '../types';
import { MOCK_PRODUCTS, SERVICES } from '../constants';

// Initial Settings Default
const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'JL DIGITAL',
  logo: '', 
  primaryColor: '#00C853',
  heroTitle: 'قم بتطوير أعمالك مع التسويق المدعوم بالذكاء الاصطناعي',
  heroSubtitle: 'أتمتة تسويقك، وبناء قنوات تحويل عالية الأداء، وتنمية إيراداتك مع حلولنا الرقمية الشاملة.',
  heroImage: '', 
  contactEmail: 'support@jldigital.om',
  contactPhone: '+968 911 23456',
  contactAddress: 'مسقط، سلطنة عمان',
  footerLinks: [
    { id: 'f1', label: 'جميع المنتجات', url: '/shop', section: 'DISCOVERY' },
    { id: 'f2', label: 'الجلسات المباشرة', url: '/live', section: 'DISCOVERY' },
    { id: 'f3', label: 'الاستشارات', url: '/shop', section: 'DISCOVERY' },
    { id: 'f4', label: 'منطقة الأعضاء', url: '/dashboard', section: 'DISCOVERY' },
  ],
  socialLinks: [
    { platform: 'instagram', url: '#' },
    { platform: 'twitter', url: '#' },
    { platform: 'linkedin', url: '#' },
    { platform: 'facebook', url: '#' },
  ]
};

const DEFAULT_TICKER_ITEMS: TickerItem[] = [
  { id: '1', text: "إعلانات ممولة احترافية", icon: 'Megaphone' },
  { id: '2', text: "إنشاء أتمتة الأعمال (Automation)", icon: 'Zap' },
  { id: '3', text: "إنشاء متاجر ومواقع ويب", icon: 'Globe' },
  { id: '4', text: "إدارة حسابات التواصل الاجتماعي", icon: 'Smartphone' },
  { id: '5', text: "تطوير برمجيات مخصصة", icon: 'BarChart3' },
];

const DEFAULT_FEATURES: FeatureItem[] = [
  { id: 'ft1', title: 'جودة واحترافية', description: 'جميع خدماتنا ومنتجاتنا تخضع لمعايير جودة صارمة لضمان أفضل النتائج لعملائنا.', icon: 'Shield' },
  { id: 'ft2', title: 'عائد استثمار مرتفع', description: 'نركز على الحلول التي تزيد من أرباحك وتقلل من الجهد والوقت المستغرق.', icon: 'DollarSign' },
  { id: 'ft3', title: 'دعم فني متواصل', description: 'فريقنا متواجد دائماً لمساعدتك في حل أي مشكلة تقنية أو استراتيجية تواجهك.', icon: 'Users' },
];

const DEFAULT_VIDEOS: VideoItem[] = [
  { 
    id: 'v1', 
    title: 'استراتيجية وسائل التواصل الاجتماعي', 
    thumbnail: 'https://picsum.photos/seed/vid1/600/400', 
    videoUrl: '#', 
    isLive: true 
  },
  { 
    id: 'v2', 
    title: 'إدارة إعلانات فيسبوك', 
    thumbnail: 'https://picsum.photos/seed/vid2/600/400', 
    videoUrl: '#', 
    isLive: true 
  }
];

const DEFAULT_PAGES: CustomPage[] = [
  {
    id: 'p1',
    slug: 'about-us',
    title: 'من نحن',
    content: 'نحن وكالة رقمية رائدة مقرها مسقط، سلطنة عمان. نهدف إلى تمكين الشركات من خلال التكنولوجيا والتسويق الحديث.',
    lastUpdated: new Date().toLocaleDateString()
  },
  {
    id: 'p2',
    slug: 'privacy-policy',
    title: 'سياسة الخصوصية',
    content: 'نحن نلتزم بحماية خصوصية بياناتك. لا نشارك معلوماتك مع أي طرف ثالث دون موافقتك الصريحة.',
    lastUpdated: new Date().toLocaleDateString()
  }
];

interface SiteContentContextType {
  tickerItems: TickerItem[];
  addTickerItem: (item: Omit<TickerItem, 'id'>) => void;
  updateTickerItem: (id: string, item: Partial<TickerItem>) => void;
  removeTickerItem: (id: string) => void;
  
  features: FeatureItem[];
  addFeature: (item: Omit<FeatureItem, 'id'>) => void;
  updateFeature: (id: string, item: Partial<FeatureItem>) => void;
  removeFeature: (id: string) => void;

  videos: VideoItem[];
  addVideo: (item: Omit<VideoItem, 'id'>) => void;
  removeVideo: (id: string) => void;
  
  products: Product[];
  addProduct: (item: Product) => void;
  removeProduct: (id: string) => void;
  
  services: Service[];
  addService: (item: Service) => void;
  updateService: (id: string, updatedData: Partial<Service>) => void;
  removeService: (id: string) => void;

  subscribers: string[];
  addSubscriber: (email: string) => void;
  removeSubscriber: (email: string) => void;

  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;

  customPages: CustomPage[];
  addCustomPage: (page: Omit<CustomPage, 'id' | 'lastUpdated'>) => void;
  updateCustomPage: (id: string, page: Partial<CustomPage>) => void;
  removeCustomPage: (id: string) => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider = ({ children }: { children: React.ReactNode }) => {
  // --- States ---
  const [tickerItems, setTickerItems] = useState<TickerItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('jl_ticker_items') || 'null') || DEFAULT_TICKER_ITEMS; } catch { return DEFAULT_TICKER_ITEMS; }
  });
  const [features, setFeatures] = useState<FeatureItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('jl_features') || 'null') || DEFAULT_FEATURES; } catch { return DEFAULT_FEATURES; }
  });
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('jl_videos') || 'null') || DEFAULT_VIDEOS; } catch { return DEFAULT_VIDEOS; }
  });
  const [products, setProducts] = useState<Product[]>(() => {
    try { return JSON.parse(localStorage.getItem('jl_products') || 'null') || MOCK_PRODUCTS; } catch { return MOCK_PRODUCTS; }
  });
  const [services, setServices] = useState<Service[]>(() => {
    try { return JSON.parse(localStorage.getItem('jl_services') || 'null') || SERVICES; } catch { return SERVICES; }
  });
  const [subscribers, setSubscribers] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('jl_subscribers') || 'null') || []; } catch { return []; }
  });
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try { return JSON.parse(localStorage.getItem('jl_site_settings') || 'null') || DEFAULT_SETTINGS; } catch { return DEFAULT_SETTINGS; }
  });
  const [customPages, setCustomPages] = useState<CustomPage[]>(() => {
    try { return JSON.parse(localStorage.getItem('jl_custom_pages') || 'null') || DEFAULT_PAGES; } catch { return DEFAULT_PAGES; }
  });

  // --- Effects for Persistence ---
  useEffect(() => localStorage.setItem('jl_ticker_items', JSON.stringify(tickerItems)), [tickerItems]);
  useEffect(() => localStorage.setItem('jl_features', JSON.stringify(features)), [features]);
  useEffect(() => localStorage.setItem('jl_videos', JSON.stringify(videos)), [videos]);
  useEffect(() => localStorage.setItem('jl_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('jl_services', JSON.stringify(services)), [services]);
  useEffect(() => localStorage.setItem('jl_subscribers', JSON.stringify(subscribers)), [subscribers]);
  useEffect(() => localStorage.setItem('jl_site_settings', JSON.stringify(settings)), [settings]);
  useEffect(() => localStorage.setItem('jl_custom_pages', JSON.stringify(customPages)), [customPages]);

  // --- Effect for Dynamic Color Theme ---
  useEffect(() => {
    const root = document.documentElement;
    const hex = settings.primaryColor;
    root.style.setProperty('--color-primary-500', hex);
    root.style.setProperty('--color-primary-400', hex); 
    root.style.setProperty('--color-primary-600', hex);
  }, [settings.primaryColor]);

  // --- Actions ---
  const addTickerItem = (item: Omit<TickerItem, 'id'>) => setTickerItems(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
  const updateTickerItem = (id: string, item: Partial<TickerItem>) => setTickerItems(prev => prev.map(i => i.id === id ? { ...i, ...item } : i));
  const removeTickerItem = (id: string) => setTickerItems(prev => prev.filter(i => i.id !== id));
  
  const addFeature = (item: Omit<FeatureItem, 'id'>) => setFeatures(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
  const updateFeature = (id: string, item: Partial<FeatureItem>) => setFeatures(prev => prev.map(i => i.id === id ? { ...i, ...item } : i));
  const removeFeature = (id: string) => setFeatures(prev => prev.filter(i => i.id !== id));

  const addVideo = (item: Omit<VideoItem, 'id'>) => setVideos(prev => [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }]);
  const removeVideo = (id: string) => setVideos(prev => prev.filter(i => i.id !== id));
  
  const addProduct = (item: Product) => setProducts(prev => [...prev, item]);
  const removeProduct = (id: string) => setProducts(prev => prev.filter(i => i.id !== id));
  
  const addService = (item: Service) => setServices(prev => [...prev, item]);
  const updateService = (id: string, d: Partial<Service>) => setServices(prev => prev.map(s => s.id === id ? { ...s, ...d } : s));
  const removeService = (id: string) => setServices(prev => prev.filter(i => i.id !== id));

  const addSubscriber = (email: string) => { if (!subscribers.includes(email)) setSubscribers(prev => [...prev, email]); };
  const removeSubscriber = (email: string) => setSubscribers(prev => prev.filter(e => e !== email));

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addCustomPage = (page: Omit<CustomPage, 'id' | 'lastUpdated'>) => setCustomPages(prev => [...prev, { ...page, id: Math.random().toString(36).substr(2, 9), lastUpdated: new Date().toLocaleDateString() }]);
  const updateCustomPage = (id: string, page: Partial<CustomPage>) => setCustomPages(prev => prev.map(p => p.id === id ? { ...p, ...page, lastUpdated: new Date().toLocaleDateString() } : p));
  const removeCustomPage = (id: string) => setCustomPages(prev => prev.filter(p => p.id !== id));

  return (
    <SiteContentContext.Provider value={{ 
      tickerItems, addTickerItem, updateTickerItem, removeTickerItem,
      features, addFeature, updateFeature, removeFeature,
      videos, addVideo, removeVideo,
      products, addProduct, removeProduct,
      services, addService, updateService, removeService,
      subscribers, addSubscriber, removeSubscriber,
      settings, updateSettings,
      customPages, addCustomPage, updateCustomPage, removeCustomPage
    }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) throw new Error('useSiteContent must be used within SiteContentProvider');
  return context;
};

export const getIconByName = (name: string, size: number = 20) => {
  const icons: any = { 
    Megaphone, Zap, Globe, Smartphone, BarChart3, Star, Gift, Shield, DollarSign, Award, ShoppingCart, 
    CheckCircle, Clock, Users, Target, Layout, PenTool, Coffee 
  };
  const IconComponent = icons[name] || Star;
  return <IconComponent size={size} />;
};

export const AVAILABLE_ICONS = [
  'Megaphone', 'Zap', 'Globe', 'Smartphone', 'BarChart3', 'Star', 'Gift', 'Shield', 'DollarSign', 
  'Award', 'ShoppingCart', 'CheckCircle', 'Clock', 'Users', 'Target', 'Layout', 'PenTool', 'Coffee'
];
