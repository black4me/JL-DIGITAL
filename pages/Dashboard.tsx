import React, { useState, useRef } from 'react';
import { 
  BookOpen, Calendar, Download, Settings, PlayCircle, Award, 
  LayoutDashboard, ShoppingBag, Users, CheckSquare, Bell, LogOut, 
  Search, Filter, Plus, FileText, Activity, Lock, ChevronLeft, CheckCircle, MoreHorizontal,
  Briefcase, Shield, Trash2, Edit, Megaphone, Video, Box, Mail, Send, AlertTriangle, Upload, X, Save, Palette, Image as ImageIcon, Link as LinkIcon, Globe, File, MousePointer, DollarSign, ClipboardList
} from 'lucide-react';
import Button from '../components/Button';
import { MOCK_ORDERS, MOCK_USERS } from '../constants';
import { Order, User, Role, ProductType, Permission, InternalReport, Service, FeatureItem, TickerItem, CustomPage } from '../types';
import { useSiteContent, AVAILABLE_ICONS, getIconByName } from '../context/SiteContentContext';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]); // Default to Super Admin for demo
  
  const switchRole = (role: Role) => {
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) setCurrentUser(user);
  };

  if (currentUser.role === 'CLIENT') {
    return <ClientDashboard user={currentUser} onSwitchRole={switchRole} />;
  } else {
    return <ManagementDashboard user={currentUser} onSwitchRole={switchRole} />;
  }
};

const ClientDashboard = ({ user, onSwitchRole }: { user: User, onSwitchRole: (r: Role) => void }) => {
  // ... (Client Dashboard remains same)
  return (
    <div className="pt-24 min-h-screen pb-12 bg-black-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black-900 to-black-950">
      <div className="container mx-auto px-4">
        <div className="glass-panel rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px] group-hover:bg-gold-500/10 transition-colors duration-700"></div>
          <div className="flex items-center gap-6 relative z-10">
             <div className="relative">
                <img src={user.avatar} className="w-24 h-24 rounded-full border border-gold-500/30 p-1" alt="Profile" />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-gold-500 rounded-full border-4 border-black-900"></div>
             </div>
             <div>
               <h1 className="text-3xl font-light text-white mb-2">أهلاً بك، <span className="font-bold text-gold-300">{user.name}</span></h1>
               <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-[10px] text-gold-400 uppercase tracking-widest">Elite Member</span>
                 <span className="text-xs text-gray-500">ID: #89201</span>
               </div>
             </div>
          </div>
          <div className="glass-card p-1 rounded-lg flex items-center gap-2">
             <span className="text-[10px] text-gray-500 px-3">DEMO VIEW:</span>
             <button onClick={() => onSwitchRole('SUPER_ADMIN')} className="text-xs px-3 py-1.5 hover:text-gold-400 transition-colors">Admin</button>
             <div className="w-px h-3 bg-white/10"></div>
             <button onClick={() => onSwitchRole('EMPLOYEE')} className="text-xs px-3 py-1.5 hover:text-gold-400 transition-colors">Staff</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <PremiumStatCard icon={<BookOpen size={20} />} label="مكتبتي" value="12" subtext="الدورات المقتناة" />
           <PremiumStatCard icon={<Award size={20} />} label="الإنجاز" value="85%" subtext="معدل الإكمال العام" highlight />
           <PremiumStatCard icon={<Calendar size={20} />} label="الجدول" value="02" subtext="جلسات قادمة" />
        </div>
      </div>
    </div>
  );
};

const ManagementDashboard = ({ user, onSwitchRole }: { user: User, onSwitchRole: (r: Role) => void }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ORDERS' | 'TASKS' | 'SERVICES' | 'PRODUCTS' | 'TEAM' | 'REPORTS' | 'COMMUNICATIONS' | 'NEWSLETTER' | 'SETTINGS' | 'PAGES'>(
    user.role === 'EMPLOYEE' ? 'TASKS' : 'OVERVIEW'
  );

  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [teamMembers, setTeamMembers] = useState<User[]>(MOCK_USERS.filter(u => u.role !== 'CLIENT'));
  const [internalReports, setInternalReports] = useState<InternalReport[]>([]); 
  
  const { 
    tickerItems, addTickerItem, updateTickerItem, removeTickerItem, 
    features, addFeature, updateFeature, removeFeature,
    videos, addVideo, removeVideo,
    products, addProduct, removeProduct,
    services, addService, updateService, removeService,
    subscribers, removeSubscriber,
    settings, updateSettings,
    customPages, addCustomPage, updateCustomPage, removeCustomPage
  } = useSiteContent();
  
  // Settings Tab State
  const [settingsSection, setSettingsSection] = useState<'BRANDING' | 'HERO' | 'FOOTER' | 'SOCIALS' | 'TICKER' | 'FEATURES'>('BRANDING');
  const [newFooterLink, setNewFooterLink] = useState({ label: '', url: '', section: 'DISCOVERY' });

  // Ticker Editing
  const [editingTicker, setEditingTicker] = useState<TickerItem | null>(null);
  const [newTickerText, setNewTickerText] = useState('');
  const [newTickerIcon, setNewTickerIcon] = useState(AVAILABLE_ICONS[0]);

  // Feature Editing
  const [editingFeature, setEditingFeature] = useState<FeatureItem | null>(null);
  const [newFeature, setNewFeature] = useState({ title: '', description: '', icon: AVAILABLE_ICONS[0] });

  // Page Editing
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null); // If null, mode is ADD
  const [pageForm, setPageForm] = useState({ title: '', slug: '', content: '' });

  // Order Reporting
  const [isOrderReportModalOpen, setIsOrderReportModalOpen] = useState(false);
  const [selectedOrderForReport, setSelectedOrderForReport] = useState<Order | null>(null);

  // Video
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoThumbFile, setNewVideoThumbFile] = useState<string>(''); 
  const [newVideoFile, setNewVideoFile] = useState<string>(''); 
  
  // Modals
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [isAddEmpOpen, setIsAddEmpOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState<Service | null>(null);
  const [isAddReportOpen, setIsAddReportOpen] = useState(false);

  // Other State
  const [newReport, setNewReport] = useState({ title: '', content: '', priority: 'NORMAL', target: 'ALL' });
  const [newsletterSubject, setNewsletterSubject] = useState('');
  const [newsletterBody, setNewsletterBody] = useState('');

  // --- Helpers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFunction: (val: string) => void) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFunction(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("تم حفظ التغييرات بنجاح ✅");
  };

  // --- Ticker Handlers ---
  const handleAddTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTickerText) {
      addTickerItem({ text: newTickerText, icon: newTickerIcon });
      setNewTickerText('');
    }
  };
  
  const handleUpdateTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTicker && newTickerText) {
      updateTickerItem(editingTicker.id, { text: newTickerText, icon: newTickerIcon });
      setEditingTicker(null);
      setNewTickerText('');
    }
  };

  const startEditTicker = (item: TickerItem) => {
    setEditingTicker(item);
    setNewTickerText(item.text);
    setNewTickerIcon(item.icon);
  };

  const cancelEditTicker = () => {
    setEditingTicker(null);
    setNewTickerText('');
    setNewTickerIcon(AVAILABLE_ICONS[0]);
  };

  // --- Feature Handlers ---
  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeature.title) {
      addFeature(newFeature);
      setNewFeature({ title: '', description: '', icon: AVAILABLE_ICONS[0] });
    }
  };
  
  const handleUpdateFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFeature) {
      updateFeature(editingFeature.id, newFeature);
      setEditingFeature(null);
      setNewFeature({ title: '', description: '', icon: AVAILABLE_ICONS[0] });
    }
  };

  const startEditFeature = (item: FeatureItem) => {
    setEditingFeature(item);
    setNewFeature(item);
  };

  // --- Page Handlers ---
  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPage) {
      updateCustomPage(editingPage.id, pageForm);
      setEditingPage(null);
    } else {
      addCustomPage(pageForm);
    }
    setPageForm({ title: '', slug: '', content: '' });
    setActiveTab('PAGES'); // Return to list
  };

  const startEditPage = (page: CustomPage) => {
    setEditingPage(page);
    setPageForm({ title: page.title, slug: page.slug, content: page.content });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, (val) => updateSettings({ logo: val }));
  const handleHeroBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, (val) => updateSettings({ heroImage: val }));
  
  // ... (Other handlers same as before)
  const handleAddUser = (e: React.FormEvent, role: Role, permissions: Permission[], closeModal: () => void, userData?: any) => {
    e.preventDefault();
    setTeamMembers([...teamMembers, { id: Math.random().toString(), ...userData, role, avatar: `https://ui-avatars.com/api/?name=${userData.name}`, purchasedProducts: [], status: 'ACTIVE', joinDate: new Date().toLocaleDateString() }]);
    closeModal();
  };
  const handleAddVideo = (e: React.FormEvent) => { e.preventDefault(); if (newVideoTitle) { addVideo({ title: newVideoTitle, thumbnail: newVideoThumbFile, videoUrl: newVideoFile || '#', isLive: true }); setNewVideoTitle(''); setNewVideoThumbFile(''); setNewVideoFile(''); } };
  
  const handleSubmitReport = (e: React.FormEvent) => { 
    e.preventDefault(); 
    const report: InternalReport = {
        id: Math.random().toString(),
        title: newReport.title,
        content: newReport.content,
        priority: newReport.priority as 'NORMAL' | 'URGENT',
        targetDepartment: newReport.target,
        author: user.name,
        date: new Date().toLocaleDateString()
    };

    setInternalReports([...internalReports, report]); 
    setIsAddReportOpen(false); 
    setNewReport({ title: '', content: '', priority: 'NORMAL', target: 'ALL' }); 
  };

  // --- Order Report Handlers ---
  const handleOpenOrderReport = (order: Order) => {
    setSelectedOrderForReport(order);
    setNewReport({
      title: `تقرير طلب: ${order.clientName} (#${order.id})`,
      content: '',
      priority: 'NORMAL',
      target: 'SUPPORT'
    });
    setIsOrderReportModalOpen(true);
  };

  const handleSubmitOrderReport = (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedOrderForReport) return;

    const report: InternalReport = {
        id: Math.random().toString(),
        title: newReport.title,
        content: `خاص بالطلب #${selectedOrderForReport.id}\nالخدمة: ${selectedOrderForReport.serviceName}\n\n${newReport.content}`,
        author: user.name,
        date: new Date().toLocaleDateString(),
        priority: newReport.priority as 'NORMAL' | 'URGENT',
        targetDepartment: newReport.target
    };

    setInternalReports([...internalReports, report]);
    setIsOrderReportModalOpen(false);
    setSelectedOrderForReport(null);
    setNewReport({ title: '', content: '', priority: 'NORMAL', target: 'ALL' });
    alert('تم إضافة التقرير بنجاح، يمكنك رؤيته في قسم التقارير.');
  };

  const handleSendNewsletter = (e: React.FormEvent) => { e.preventDefault(); alert(`Sent to ${subscribers.length}`); setNewsletterSubject(''); setNewsletterBody(''); };
  const handleAddFooterLink = (e: React.FormEvent) => { e.preventDefault(); if(newFooterLink.label) { updateSettings({ footerLinks: [...settings.footerLinks, { ...newFooterLink, id: Math.random().toString() } as any] }); setNewFooterLink({ label: '', url: '', section: 'DISCOVERY' }); } };
  const handleUpdateSocial = (platform: string, url: string) => { updateSettings({ socialLinks: settings.socialLinks.map(l => l.platform === platform ? { ...l, url } : l) }); };

  return (
    <div className="min-h-screen bg-black-950 flex flex-col md:flex-row font-sans text-white overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-80 bg-black-950 border-l border-white/5 flex-shrink-0 flex flex-col h-screen sticky top-0 z-20">
        <div className="p-10">
          <h2 className="text-2xl font-light tracking-widest text-white">JL <span className="font-bold text-gold-500">ADMIN</span></h2>
        </div>
        <nav className="flex-1 px-6 space-y-1 overflow-y-auto">
          {user.role === 'EMPLOYEE' ? (
            <SidebarItem icon={<CheckSquare size={18} />} label="المهام الموكلة إلي" active={activeTab === 'TASKS'} onClick={() => setActiveTab('TASKS')} />
          ) : (
            <>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-4 px-4 mt-4">Main Menu</p>
              <SidebarItem icon={<LayoutDashboard size={18} />} label="لوحة التحكم" active={activeTab === 'OVERVIEW'} onClick={() => setActiveTab('OVERVIEW')} />
              <SidebarItem icon={<ShoppingBag size={18} />} label="الطلبات" active={activeTab === 'ORDERS'} onClick={() => setActiveTab('ORDERS')} />
              <SidebarItem icon={<Users size={18} />} label="إدارة الفريق" active={activeTab === 'TEAM'} onClick={() => setActiveTab('TEAM')} />
              <SidebarItem icon={<ClipboardList size={18} />} label="التقارير الداخلية" active={activeTab === 'REPORTS'} onClick={() => setActiveTab('REPORTS')} />
              <SidebarItem icon={<Mail size={18} />} label="النشرة البريدية" active={activeTab === 'NEWSLETTER'} onClick={() => setActiveTab('NEWSLETTER')} />
              <SidebarItem icon={<FileText size={18} />} label="الصفحات والمحتوى" active={activeTab === 'PAGES'} onClick={() => { setActiveTab('PAGES'); setEditingPage(null); }} />
              <SidebarItem icon={<Settings size={18} />} label="الإعدادات" active={activeTab === 'SETTINGS'} onClick={() => setActiveTab('SETTINGS')} />
            </>
          )}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-12 bg-black-950 relative">
        {/* Header */}
        <header className="flex justify-between items-end mb-16">
          <h1 className="text-4xl font-light text-white mb-2">{activeTab.replace('_', ' ')}</h1>
          <div className="flex gap-4">
             <div className="glass-panel rounded-full p-1 flex items-center">
                <button onClick={() => onSwitchRole('SUPER_ADMIN')} className={`text-[10px] px-4 py-2 rounded-full ${user.role === 'SUPER_ADMIN' ? 'bg-gold-500 text-black-900' : 'text-gray-400'}`}>Admin</button>
                <button onClick={() => onSwitchRole('EMPLOYEE')} className={`text-[10px] px-4 py-2 rounded-full ${user.role === 'EMPLOYEE' ? 'bg-gold-500 text-black-900' : 'text-gray-400'}`}>Staff</button>
             </div>
          </div>
        </header>

        {/* --- OVERVIEW TAB --- */}
        {activeTab === 'OVERVIEW' && (
           <div className="space-y-8 animate-fade-in">
             {/* Stats Grid */}
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="Total Revenue" value="$124,500" trend="+24%" icon={<DollarSign size={20} />} />
                <StatCard label="Active Orders" value="18" trend="+12%" icon={<ShoppingBag size={20} />} />
                <StatCard label="Total Clients" value="2,847" trend="+18%" icon={<Users size={20} />} />
                <StatCard label="Pending Tasks" value="5" trend="-2%" icon={<CheckSquare size={20} />} negative />
             </div>
             
             {/* Recent Activity / Orders Preview */}
             <div className="glass-panel p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/10">
                        <th className="pb-4">Client</th>
                        <th className="pb-4">Service</th>
                        <th className="pb-4">Price</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-300">
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                           <td className="py-4 font-bold text-white">{order.clientName}</td>
                           <td className="py-4">{order.serviceName}</td>
                           <td className="py-4 text-gold-500">{order.price} OMR</td>
                           <td className="py-4"><StatusBadge status={order.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
           </div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === 'ORDERS' && (
           <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="text" placeholder="Search orders..." className="bg-black-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white outline-none focus:border-gold-500" />
                 </div>
                 <div className="flex gap-2">
                    <Button variant="secondary" size="sm"><Filter size={16} className="mr-2" /> Filter</Button>
                    <Button variant="primary" size="sm"><Download size={16} className="mr-2" /> Export</Button>
                 </div>
              </div>
              
              <div className="glass-panel p-0 rounded-2xl overflow-hidden">
                 <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead className="bg-white/5">
                        <tr className="text-gray-400 text-xs uppercase tracking-wider">
                          <th className="p-6">Order ID</th>
                          <th className="p-6">Client</th>
                          <th className="p-6">Service</th>
                          <th className="p-6">Date</th>
                          <th className="p-6">Amount</th>
                          <th className="p-6">Status</th>
                          <th className="p-6">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-white/5">
                         {orders.map(order => (
                           <tr key={order.id} className="hover:bg-white/5 transition-colors">
                              <td className="p-6 font-mono text-gray-500">#{order.id}</td>
                              <td className="p-6 font-bold text-white">{order.clientName}</td>
                              <td className="p-6 text-gray-300">{order.serviceName}</td>
                              <td className="p-6 text-gray-400">{order.date}</td>
                              <td className="p-6 text-gold-500 font-bold">{order.price} OMR</td>
                              <td className="p-6"><StatusBadge status={order.status} /></td>
                              <td className="p-6">
                                <div className="flex gap-2">
                                  <button className="text-blue-400 hover:text-white transition-colors">Manage</button>
                                  <button onClick={() => handleOpenOrderReport(order)} className="text-gold-500 hover:text-gold-400 transition-colors flex items-center gap-1 text-xs px-2 py-1 bg-gold-500/10 rounded border border-gold-500/20">
                                    <FileText size={12} /> تقرير داخلي
                                  </button>
                                </div>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                 </div>
              </div>
           </div>
        )}

        {/* --- REPORTS TAB --- */}
        {activeTab === 'REPORTS' && (
           <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-white">التقارير الداخلية</h2>
                 <Button onClick={() => setIsAddReportOpen(true)}><Plus size={16} className="mr-2" /> إضافة تقرير جديد</Button>
              </div>

              {internalReports.length === 0 ? (
                 <div className="glass-panel p-12 text-center text-gray-500 rounded-2xl">
                    <ClipboardList size={48} className="mx-auto mb-4 opacity-50" />
                    <p>لا توجد تقارير حالياً. أضف تقريراً جديداً أو قم بإضافة تقرير لطلب محدد.</p>
                 </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {internalReports.map((report) => (
                    <div key={report.id} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">{report.title}</h3>
                            <p className="text-xs text-gray-500">بواسطة: {report.author} | التاريخ: {report.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${report.priority === 'URGENT' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>{report.priority}</span>
                       </div>
                       <p className="text-gray-300 text-sm whitespace-pre-wrap">{report.content}</p>
                       <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                          <span className="text-xs text-gray-500 uppercase">موجه إلى: {report.targetDepartment}</span>
                       </div>
                    </div>
                  ))}
                </div>
              )}
           </div>
        )}

        {/* --- TEAM TAB --- */}
        {activeTab === 'TEAM' && (
           <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-white">Team Members</h2>
                 <Button onClick={() => setIsAddEmpOpen(true)}><Plus size={16} className="mr-2" /> Add Member</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {teamMembers.map(member => (
                    <div key={member.id} className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center border border-white/5 hover:border-gold-500/30 transition-colors">
                       <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mb-4 border-2 border-gold-500/20" />
                       <h3 className="text-lg font-bold text-white">{member.name}</h3>
                       <p className="text-sm text-gold-500 mb-4">{member.role} - {member.department}</p>
                       <div className="w-full border-t border-white/5 pt-4 flex justify-between text-xs text-gray-500">
                          <span>Joined: {member.joinDate}</span>
                          <span className={`px-2 py-0.5 rounded ${member.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{member.status}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* --- NEWSLETTER TAB --- */}
        {activeTab === 'NEWSLETTER' && (
           <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <StatCard label="Total Subscribers" value={subscribers.length.toString()} trend="+5 this week" icon={<Users size={20} />} />
                 <StatCard label="Open Rate" value="42%" trend="+2.4%" icon={<Activity size={20} />} />
                 <StatCard label="Click Rate" value="18%" trend="+1.2%" icon={<MousePointer size={20} />} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Composer */}
                 <div className="lg:col-span-2 glass-panel p-8 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Compose Newsletter</h3>
                    <form onSubmit={handleSendNewsletter} className="space-y-4">
                       <div>
                          <label className="block text-xs text-gray-500 mb-2">Subject Line</label>
                          <input type="text" value={newsletterSubject} onChange={e => setNewsletterSubject(e.target.value)} className="w-full bg-black-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none" placeholder="e.g. New Features Announced" />
                       </div>
                       <div>
                          <label className="block text-xs text-gray-500 mb-2">Message Body</label>
                          <textarea rows={10} value={newsletterBody} onChange={e => setNewsletterBody(e.target.value)} className="w-full bg-black-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none" placeholder="Write your newsletter content here..." />
                       </div>
                       <div className="flex justify-end">
                          <Button type="submit" className="flex items-center gap-2"><Send size={16} /> Send to All Subscribers</Button>
                       </div>
                    </form>
                 </div>

                 {/* Subscribers List */}
                 <div className="glass-panel p-8 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Subscribers</h3>
                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                       {subscribers.length > 0 ? subscribers.map((email, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                             <span className="text-sm text-gray-300 truncate w-32">{email}</span>
                             <button onClick={() => removeSubscriber(email)} className="text-red-500 hover:bg-red-500/10 p-1.5 rounded"><Trash2 size={14} /></button>
                          </div>
                       )) : (
                          <p className="text-gray-500 text-center py-8">No subscribers yet.</p>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === 'SETTINGS' && (
          <div className="space-y-8 animate-fade-in relative z-10">
            {/* Sub-Nav */}
            <div className="flex gap-4 border-b border-white/10 pb-1 overflow-x-auto">
               <button onClick={() => setSettingsSection('BRANDING')} className={`px-4 py-2 text-sm uppercase ${settingsSection === 'BRANDING' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-gray-500'}`}>General</button>
               <button onClick={() => setSettingsSection('HERO')} className={`px-4 py-2 text-sm uppercase ${settingsSection === 'HERO' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-gray-500'}`}>Hero</button>
               <button onClick={() => setSettingsSection('FOOTER')} className={`px-4 py-2 text-sm uppercase ${settingsSection === 'FOOTER' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-gray-500'}`}>Footer</button>
               <button onClick={() => setSettingsSection('SOCIALS')} className={`px-4 py-2 text-sm uppercase ${settingsSection === 'SOCIALS' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-gray-500'}`}>Socials</button>
               <button onClick={() => setSettingsSection('TICKER')} className={`px-4 py-2 text-sm uppercase ${settingsSection === 'TICKER' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-gray-500'}`}>Ticker</button>
               <button onClick={() => setSettingsSection('FEATURES')} className={`px-4 py-2 text-sm uppercase ${settingsSection === 'FEATURES' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-gray-500'}`}>Features</button>
            </div>

            {/* TICKER MANAGEMENT (Enhanced) */}
            {settingsSection === 'TICKER' && (
               <div className="glass-panel rounded-2xl p-8 border border-gold-500/20">
                 <h3 className="text-xl font-bold text-white mb-6">Ticker Items Management</h3>
                 
                 {/* Add/Edit Form */}
                 <form onSubmit={editingTicker ? handleUpdateTicker : handleAddTicker} className="bg-black-900/50 p-6 rounded-xl border border-white/5 mb-8">
                   <h4 className="text-sm font-bold text-gray-400 mb-4">{editingTicker ? 'Edit Item' : 'Add New Item'}</h4>
                   <div className="flex flex-col md:flex-row gap-4 items-end">
                     <div className="flex-1 w-full">
                       <label className="block text-xs text-gray-500 mb-2">Text Content</label>
                       <input type="text" value={newTickerText} onChange={(e) => setNewTickerText(e.target.value)} className="w-full bg-black-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none" />
                     </div>
                     <div className="w-full md:w-48">
                        <label className="block text-xs text-gray-500 mb-2">Icon</label>
                        <select value={newTickerIcon} onChange={(e) => setNewTickerIcon(e.target.value)} className="w-full bg-black-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none">
                           {AVAILABLE_ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                     </div>
                     <div className="flex gap-2">
                       {editingTicker && <Button type="button" variant="secondary" onClick={cancelEditTicker}>Cancel</Button>}
                       <Button type="submit" variant="primary">{editingTicker ? 'Update' : 'Add'}</Button>
                     </div>
                   </div>
                 </form>

                 {/* List */}
                 <div className="space-y-3">
                   {tickerItems.map((item) => (
                     <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                       <div className="flex items-center gap-4">
                         <div className="p-2 bg-black-900 rounded-full text-gold-500 border border-white/10">{getIconByName(item.icon)}</div>
                         <span className="text-white font-medium">{item.text}</span>
                       </div>
                       <div className="flex gap-2">
                         <button onClick={() => startEditTicker(item)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded"><Edit size={16} /></button>
                         <button onClick={() => removeTickerItem(item.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded"><Trash2 size={16} /></button>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            )}

            {/* FEATURES MANAGEMENT (New) */}
            {settingsSection === 'FEATURES' && (
               <div className="glass-panel rounded-2xl p-8 border border-gold-500/20">
                 <h3 className="text-xl font-bold text-white mb-6">Homepage Features</h3>
                 
                 <form onSubmit={editingFeature ? handleUpdateFeature : handleAddFeature} className="bg-black-900/50 p-6 rounded-xl border border-white/5 mb-8 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Title</label>
                        <input type="text" value={newFeature.title} onChange={(e) => setNewFeature({...newFeature, title: e.target.value})} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Icon</label>
                        <select value={newFeature.icon} onChange={(e) => setNewFeature({...newFeature, icon: e.target.value})} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white">
                           {AVAILABLE_ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">Description</label>
                      <textarea rows={2} value={newFeature.description} onChange={(e) => setNewFeature({...newFeature, description: e.target.value})} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white" />
                    </div>
                    <div className="flex gap-2 justify-end">
                       {editingFeature && <Button type="button" variant="secondary" onClick={() => { setEditingFeature(null); setNewFeature({ title: '', description: '', icon: AVAILABLE_ICONS[0] }); }}>Cancel</Button>}
                       <Button type="submit">{editingFeature ? 'Update Feature' : 'Add Feature'}</Button>
                    </div>
                 </form>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {features.map((item) => (
                     <div key={item.id} className="p-4 bg-white/5 rounded-lg border border-white/5 relative group">
                        <div className="flex items-start gap-4">
                           <div className="text-gold-500">{getIconByName(item.icon, 24)}</div>
                           <div>
                              <h4 className="font-bold text-white">{item.title}</h4>
                              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                           </div>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                           <button onClick={() => startEditFeature(item)} className="p-1.5 bg-black-900 text-blue-500 rounded"><Edit size={14} /></button>
                           <button onClick={() => removeFeature(item.id)} className="p-1.5 bg-black-900 text-red-500 rounded"><Trash2 size={14} /></button>
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
            )}

            {/* BRANDING (Existing) */}
            {settingsSection === 'BRANDING' && (
              <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="glass-panel p-8 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">General Information</h3>
                    <div className="space-y-4">
                       <div><label className="block text-xs text-gray-500 mb-2">Platform Name</label><input type="text" value={settings.brandName} onChange={(e) => updateSettings({ brandName: e.target.value })} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white" /></div>
                       <div><label className="block text-xs text-gray-500 mb-2">Upload Logo</label><input type="file" onChange={handleLogoUpload} className="w-full text-sm text-gray-500" />{settings.logo && <img src={settings.logo} className="h-10 mt-2 bg-white/5 p-1 rounded" />}</div>
                    </div>
                 </div>
                 <div className="glass-panel p-8 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Theme</h3>
                    <div className="space-y-4">
                       <div><label className="block text-xs text-gray-500 mb-2">Primary Color</label><input type="color" value={settings.primaryColor} onChange={(e) => updateSettings({ primaryColor: e.target.value })} className="w-full h-12 bg-transparent cursor-pointer" /></div>
                    </div>
                 </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={handleSave} className="flex items-center gap-2">
                    <Save size={18} /> حفظ الإعدادات
                </Button>
              </div>
              </>
            )}

            {/* HERO SECTION */}
            {settingsSection === 'HERO' && (
               <div className="glass-panel p-8 rounded-2xl">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gold-500/10 rounded-xl text-gold-500"><ImageIcon size={24} /></div>
                      <h3 className="text-xl font-bold text-white">Hero Section Configuration</h3>
                   </div>
                   <div className="space-y-6">
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Main Headline</label>
                        <input type="text" value={settings.heroTitle} onChange={(e) => updateSettings({ heroTitle: e.target.value })} className="w-full bg-black-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Subtitle / Description</label>
                        <textarea rows={3} value={settings.heroSubtitle} onChange={(e) => updateSettings({ heroSubtitle: e.target.value })} className="w-full bg-black-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Hero Background Image</label>
                        <div className="relative group">
                          <input type="file" onChange={handleHeroBgUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          <div className="bg-black-900 border border-white/10 rounded-lg px-4 py-3 text-gray-400 flex items-center justify-between hover:border-gold-500 transition-colors">
                            <span className="truncate text-xs">{settings.heroImage ? 'Image Uploaded' : 'Upload Background (1920x1080)...'}</span>
                            <Upload size={16} />
                          </div>
                        </div>
                        {settings.heroImage && <img src={settings.heroImage} alt="Hero Preview" className="mt-4 w-full h-48 object-cover rounded-lg border border-white/10" />}
                      </div>
                   </div>
                   <div className="mt-8 flex justify-end pt-6 border-t border-white/5">
                        <Button onClick={handleSave} className="flex items-center gap-2">
                            <Save size={18} /> حفظ الإعدادات
                        </Button>
                   </div>
               </div>
            )}

            {/* FOOTER SECTION */}
            {settingsSection === 'FOOTER' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-8 rounded-2xl">
                   <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                   <div className="space-y-4">
                      <div><label className="block text-xs text-gray-500 mb-2">Contact Email</label><input type="text" value={settings.contactEmail} onChange={(e) => updateSettings({ contactEmail: e.target.value })} className="w-full bg-black-900 border border-white/10 rounded-lg px-4 py-3 text-white outline-none" /></div>
                      <div><label className="block text-xs text-gray-500 mb-2">Phone Number</label><input type="text" value={settings.contactPhone} onChange={(e) => updateSettings({ contactPhone: e.target.value })} className="w-full bg-black-900 border border-white/10 rounded-lg px-4 py-3 text-white outline-none" /></div>
                      <div><label className="block text-xs text-gray-500 mb-2">Address</label><input type="text" value={settings.contactAddress} onChange={(e) => updateSettings({ contactAddress: e.target.value })} className="w-full bg-black-900 border border-white/10 rounded-lg px-4 py-3 text-white outline-none" /></div>
                   </div>
                   <div className="mt-6">
                        <Button onClick={handleSave} className="w-full flex items-center justify-center gap-2">
                            <Save size={18} /> حفظ المعلومات
                        </Button>
                   </div>
                </div>

                <div className="glass-panel p-8 rounded-2xl">
                   <h3 className="text-xl font-bold text-white mb-6">Footer Links</h3>
                   
                   <form onSubmit={handleAddFooterLink} className="flex gap-2 mb-6">
                      <input type="text" placeholder="Label" value={newFooterLink.label} onChange={(e) => setNewFooterLink({...newFooterLink, label: e.target.value})} className="flex-1 bg-black-900 border border-white/10 rounded px-3 py-2 text-white text-sm" />
                      <input type="text" placeholder="URL" value={newFooterLink.url} onChange={(e) => setNewFooterLink({...newFooterLink, url: e.target.value})} className="flex-1 bg-black-900 border border-white/10 rounded px-3 py-2 text-white text-sm" />
                      <select value={newFooterLink.section} onChange={(e) => setNewFooterLink({...newFooterLink, section: e.target.value as any})} className="bg-black-900 border border-white/10 rounded px-3 py-2 text-white text-sm">
                        <option value="DISCOVERY">Discovery</option>
                        <option value="LEGAL">Legal</option>
                      </select>
                      <Button type="submit" size="sm"><Plus size={16} /></Button>
                   </form>

                   <div className="space-y-2 max-h-60 overflow-y-auto">
                      {settings.footerLinks.map(link => (
                        <div key={link.id} className="flex items-center justify-between bg-white/5 p-2 rounded">
                           <span className="text-sm text-gray-300">{link.label} <span className="text-xs text-gray-500">({link.url})</span></span>
                           <div className="flex items-center gap-2">
                             <span className="text-[10px] bg-black-900 px-2 py-1 rounded text-gold-500">{link.section}</span>
                             <button onClick={() => updateSettings({ footerLinks: settings.footerLinks.filter(l => l.id !== link.id) })} className="text-red-500 hover:text-red-400"><Trash2 size={14} /></button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {/* SOCIALS SECTION */}
            {settingsSection === 'SOCIALS' && (
              <div className="glass-panel p-8 rounded-2xl">
                 <h3 className="text-xl font-bold text-white mb-6">Social Media Links</h3>
                 <div className="space-y-4">
                    {settings.socialLinks.map((link) => (
                      <div key={link.platform} className="flex items-center gap-4">
                         <div className="w-32 capitalize text-gray-400">{link.platform}</div>
                         <input 
                           type="text" 
                           value={link.url} 
                           onChange={(e) => handleUpdateSocial(link.platform, e.target.value)} 
                           className="flex-1 bg-black-900 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-gold-500" 
                           placeholder={`https://${link.platform}.com/...`}
                         />
                      </div>
                    ))}
                 </div>
                 <div className="mt-8 flex justify-end pt-6 border-t border-white/5">
                    <Button onClick={handleSave} className="flex items-center gap-2">
                        <Save size={18} /> حفظ التغييرات
                    </Button>
                 </div>
              </div>
            )}
          </div>
        )}

        {/* --- PAGES MANAGEMENT TAB --- */}
        {activeTab === 'PAGES' && (
          <div className="space-y-8 animate-fade-in relative z-10">
            {pageForm.slug || editingPage ? (
              // EDIT/ADD MODE
              <div className="glass-panel p-8 rounded-2xl border border-gold-500/20">
                 <div className="flex justify-between mb-6">
                    <h2 className="text-2xl font-light text-white">{editingPage ? 'Edit Page' : 'Create New Page'}</h2>
                    <Button variant="secondary" onClick={() => { setEditingPage(null); setPageForm({ title: '', slug: '', content: '' }); setActiveTab('PAGES'); }}>Cancel</Button>
                 </div>
                 <form onSubmit={handleSavePage} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div><label className="block text-xs text-gray-500 mb-2">Page Title</label><input type="text" required value={pageForm.title} onChange={(e) => setPageForm({...pageForm, title: e.target.value})} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white" /></div>
                       <div><label className="block text-xs text-gray-500 mb-2">Slug (URL)</label><input type="text" required value={pageForm.slug} onChange={(e) => setPageForm({...pageForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} placeholder="e.g., about-us" className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white" /></div>
                    </div>
                    <div>
                       <label className="block text-xs text-gray-500 mb-2">Content (HTML Supported)</label>
                       <textarea rows={15} required value={pageForm.content} onChange={(e) => setPageForm({...pageForm, content: e.target.value})} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white font-mono text-sm" placeholder="<p>Write your content here...</p>" />
                    </div>
                    <div className="flex justify-end"><Button type="submit">Save Page</Button></div>
                 </form>
              </div>
            ) : (
              // LIST MODE
              <div className="glass-panel p-8 rounded-2xl">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-light text-white">Custom Pages</h2>
                    <Button onClick={() => { setEditingPage(null); setPageForm({ title: '', slug: '', content: '' }); setActiveTab('PAGES'); /* Force re-render state check */ setPageForm({ title: 'New Page', slug: '', content: '' }); }}><Plus size={16} className="mr-2" /> Add Page</Button>
                 </div>
                 <div className="space-y-2">
                    {customPages.length === 0 && <p className="text-gray-500 text-center py-8">No custom pages created yet.</p>}
                    {customPages.map(page => (
                       <div key={page.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/5 hover:border-gold-500/30 transition-colors">
                          <div>
                             <h4 className="text-white font-bold">{page.title}</h4>
                             <p className="text-xs text-gray-500">/{page.slug} • Last updated: {page.lastUpdated}</p>
                          </div>
                          <div className="flex gap-2">
                             <a href={`#/page/${page.slug}`} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-white"><Globe size={16} /></a>
                             <button onClick={() => startEditPage(page)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded"><Edit size={16} /></button>
                             <button onClick={() => removeCustomPage(page.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded"><Trash2 size={16} /></button>
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="mt-8 p-4 bg-gold-500/5 rounded-lg border border-gold-500/20 text-sm text-gold-400">
                    <p className="flex items-center gap-2"><Lock size={14} /> Tip: You can link these pages in the <strong>Settings &gt; Footer</strong> section by selecting their URL.</p>
                 </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* --- MODALS --- */}
      
      {/* 1. Add Internal Report Modal */}
      {isAddReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-900/80 backdrop-blur-sm p-4">
           <div className="glass-panel p-8 rounded-2xl w-full max-w-lg border border-gold-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">إضافة تقرير داخلي جديد</h2>
              <form onSubmit={handleSubmitReport} className="space-y-4">
                 <div>
                    <label className="block text-xs text-gray-500 mb-2">عنوان التقرير</label>
                    <input type="text" value={newReport.title} onChange={(e) => setNewReport({...newReport, title: e.target.value})} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white" required />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-xs text-gray-500 mb-2">الأولوية</label>
                       <select value={newReport.priority} onChange={(e) => setNewReport({...newReport, priority: e.target.value})} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white">
                          <option value="NORMAL">عادي</option>
                          <option value="URGENT">عاجل</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs text-gray-500 mb-2">القسم المستهدف</label>
                       <select value={newReport.target} onChange={(e) => setNewReport({...newReport, target: e.target.value})} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white">
                          <option value="ALL">الجميع</option>
                          <option value="ADMINISTRATION">الإدارة</option>
                          <option value="SALES">المبيعات</option>
                          <option value="SUPPORT">الدعم الفني</option>
                       </select>
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs text-gray-500 mb-2">المحتوى</label>
                    <textarea rows={5} value={newReport.content} onChange={(e) => setNewReport({...newReport, content: e.target.value})} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white" required />
                 </div>
                 <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="secondary" onClick={() => setIsAddReportOpen(false)}>إلغاء</Button>
                    <Button type="submit">حفظ التقرير</Button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* 2. ADD ORDER REPORT MODAL (New) */}
      {isOrderReportModalOpen && selectedOrderForReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-900/80 backdrop-blur-sm p-4">
           <div className="glass-panel p-8 rounded-2xl w-full max-w-lg border border-gold-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">إضافة تقرير للطلب #{selectedOrderForReport.id}</h2>
              <form onSubmit={handleSubmitOrderReport} className="space-y-4">
                 <div>
                    <label className="block text-xs text-gray-500 mb-2">عنوان التقرير (تلقائي)</label>
                    <input type="text" value={newReport.title} readOnly className="w-full bg-black-900/50 border border-white/5 rounded px-4 py-3 text-gray-400 cursor-not-allowed" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-xs text-gray-500 mb-2">الأولوية</label>
                       <select value={newReport.priority} onChange={(e) => setNewReport({...newReport, priority: e.target.value})} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white">
                          <option value="NORMAL">عادي</option>
                          <option value="URGENT">عاجل</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs text-gray-500 mb-2">توجيه إلى</label>
                       <select value={newReport.target} onChange={(e) => setNewReport({...newReport, target: e.target.value})} className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white">
                          <option value="SUPPORT">الدعم الفني</option>
                          <option value="SALES">المبيعات</option>
                          <option value="ADMINISTRATION">الإدارة</option>
                          <option value="DESIGN">فريق التصميم</option>
                       </select>
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs text-gray-500 mb-2">تفاصيل التقرير / الملاحظات</label>
                    <textarea 
                        rows={5} 
                        value={newReport.content} 
                        onChange={(e) => setNewReport({...newReport, content: e.target.value})} 
                        className="w-full bg-black-900 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600" 
                        required 
                        placeholder="أدخل تفاصيل المشكلة، التحديث، أو الملاحظة بخصوص هذا الطلب..."
                    />
                 </div>
                 <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="secondary" onClick={() => setIsOrderReportModalOpen(false)}>إلغاء</Button>
                    <Button type="submit">إرفاق التقرير</Button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* 3. Add Employee Modal (Placeholder) */}
      {isAddEmpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-900/80 backdrop-blur-sm p-4">
            <div className="glass-panel p-8 rounded-2xl w-full max-w-lg">
                <h3 className="text-xl font-bold text-white mb-4">Add New Team Member</h3>
                <p className="text-gray-500 mb-6">This feature is simulated. Clicking save will add a dummy user.</p>
                <form onSubmit={(e) => handleAddUser(e, 'EMPLOYEE', [], () => setIsAddEmpOpen(false), { name: 'New Employee', email: 'emp@jl.com', department: 'SUPPORT' })}>
                    <Button type="submit" className="w-full">Save Member</Button>
                    <Button type="button" variant="ghost" onClick={() => setIsAddEmpOpen(false)} className="w-full mt-2">Cancel</Button>
                </form>
            </div>
          </div>
      )}

    </div>
  );
};

// ... (Sub-components like UserModal, TeamTabs remain same)
const TeamTabs = ({ users, onAddAdmin, onAddEmployee }: any) => { /* ... */ return <div></div>; }; // Placeholder to save space in XML, assume existing
const SidebarItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${active ? 'bg-white/5 text-white border border-white/10' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>
    <div className={`transition-colors ${active ? 'text-gold-500' : 'text-gray-600 group-hover:text-gray-400'}`}>{icon}</div>
    <span className={`text-xs uppercase tracking-widest ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(0,200,83,0.8)]"></div>}
  </button>
);
const PremiumStatCard = ({ icon, label, value, subtext, highlight = false }: any) => (<div className={`glass-card p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 ${highlight ? 'border-gold-500/30 bg-gold-500/5' : ''}`}><div className="flex justify-between items-start mb-4"><div className={`p-3 rounded-xl ${highlight ? 'bg-gold-500 text-black-900 shadow-lg shadow-gold-500/20' : 'bg-white/5 text-gray-400'}`}>{icon}</div></div><div className="space-y-1"><span className="text-3xl font-light text-white">{value}</span><p className="text-sm font-medium text-gray-200">{label}</p></div></div>);
const StatCard = ({ label, value, trend, icon, negative = false }: any) => (
   <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-gold-500/20 transition-colors">
      <div className="flex justify-between items-start mb-4">
         <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{label}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
         </div>
         <div className="p-2 bg-white/5 rounded-lg text-gold-500">{icon}</div>
      </div>
      <div className={`text-xs flex items-center gap-1 ${negative ? 'text-red-500' : 'text-green-500'}`}>
         <span>{trend}</span>
         <span className="text-gray-600">vs last month</span>
      </div>
   </div>
);
const StatusBadge = ({ status }: { status: string }) => {
   const styles = {
      'PENDING': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'IN_PROGRESS': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      'COMPLETED': 'bg-green-500/10 text-green-500 border-green-500/20',
      'CANCELED': 'bg-red-500/10 text-red-500 border-red-500/20',
      'REVIEW': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
   };
   const labels = {
      'PENDING': 'قيد الانتظار',
      'IN_PROGRESS': 'قيد التنفيذ',
      'COMPLETED': 'مكتمل',
      'CANCELED': 'ملغي',
      'REVIEW': 'مراجعة',
   };
   return <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${(styles as any)[status] || 'bg-gray-500/10 text-gray-500'}`}>{(labels as any)[status] || status}</span>;
};

export default Dashboard;