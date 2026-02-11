import { Product, ProductType, LiveSession, Service, Order, User } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'ماستري الإمبراطورية الرقمية 2.0',
    description: 'المخطط الكامل لبناء وكالة رقمية ناجحة من الصفر في مسقط. يشمل تدريباً مباشراً أسبوعياً مع المؤسسين.',
    price: 115,
    originalPrice: 385,
    type: ProductType.COURSE_LIVE,
    image: 'https://picsum.photos/seed/empire/800/600',
    rating: 4.9,
    reviews: 124,
    features: ['أسئلة وأجوبة أسبوعية مباشرة', 'قوالب الوكالة الجاهزة', 'سكريبتات جلب العملاء'],
    isBestSeller: true
  },
  {
    id: '2',
    title: 'جلسة استشارة خاصة (1:1)',
    description: 'احصل على تحليل عميق لمشروعك وخطة عمل مخصصة من خلال جلسة فيديو مباشرة لمدة 60 دقيقة مع الخبراء.',
    price: 150,
    originalPrice: 200,
    type: ProductType.CONSULTATION,
    image: 'https://picsum.photos/seed/consult/800/600',
    rating: 5.0,
    reviews: 42,
    features: ['مكالمة فيديو 60 دقيقة', 'تسجيل للمكالمة', 'خطة عمل PDF'],
    isNew: true
  },
  {
    id: '3',
    title: 'استراتيجيات الثروة الرقمية',
    description: 'استراتيجيات تداول واستثمار حديثة للمستثمر العماني. تعلم التحليل الفني وإدارة المخاطر.',
    price: 55,
    type: ProductType.COURSE_RECORDED,
    image: 'https://picsum.photos/seed/crypto/800/600',
    rating: 4.7,
    reviews: 56,
    features: ['20 ساعة فيديو', 'مؤشرات تداول', 'دخول للمجتمع الخاص']
  },
  {
    id: '4',
    title: 'الكتاب الأسود للكتابة الإعلانية',
    description: 'اكتب كلمات تبيع. ماستر كلاس في الإقناع وعلم النفس للمسوقين الرقميين.',
    price: 18,
    type: ProductType.EBOOK,
    image: 'https://picsum.photos/seed/copywriting/800/600',
    rating: 5.0,
    reviews: 210,
    features: ['PDF & EPUB', 'ملفات Swipe', 'معادلات العناوين'],
    isBestSeller: true
  },
  {
    id: '5',
    title: 'عدة البراند الشخصي للمؤثرين',
    description: 'قوالب فوتوشوب وكانفا لتعزيز علامتك التجارية الشخصية على إنستغرام ولينكد إن.',
    price: 25,
    type: ProductType.TOOL,
    image: 'https://picsum.photos/seed/design/800/600',
    rating: 4.6,
    reviews: 45,
    features: ['100+ قالب', 'متوافق مع Canva', 'دليل الهوية']
  },
  {
    id: '6',
    title: 'خارطة طريق التجارة الإلكترونية 2025',
    description: 'أسس مشروعك في التجارة الإلكترونية باستخدام أدوات الذكاء الاصطناعي والأتمتة.',
    price: 49,
    originalPrice: 115,
    type: ProductType.COURSE_LIVE,
    image: 'https://picsum.photos/seed/ecom/800/600',
    rating: 4.8,
    reviews: 78,
    features: ['قائمة أدوات AI', 'دليل الموردين', 'مكالمة إعداد مباشرة']
  }
];

export const LIVE_SESSIONS: LiveSession[] = [
  {
    id: '101',
    title: 'كيف تصل لـ 3000 ر.ع شهرياً',
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    instructor: 'جاسم محمد',
    duration: '90 دقيقة',
    thumbnail: 'https://picsum.photos/seed/live1/600/400'
  },
  {
    id: '102',
    title: 'س و ج: تحسين مسارات البيع (Funnels)',
    date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    instructor: 'ليث أحمد',
    duration: '60 دقيقة',
    thumbnail: 'https://picsum.photos/seed/live2/600/400'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'إعلانات ممولة (Paid Ads)',
    shortDescription: 'حملات إعلانية عالية التحويل على فيسبوك، انستغرام، وجوجل.',
    fullDescription: 'نحن لا نطلق الإعلانات فقط، بل نبني أنظمة جلب عملاء. خدمة شاملة تتضمن كتابة النصوص الإعلانية، تصميم الكرييتف، إطلاق الحملات، والتحسين المستمر (Optimization) لضمان أعلى عائد استثمار (ROAS).',
    image: 'https://picsum.photos/seed/ads/800/600',
    availableDurations: ['شهر واحد', '3 أشهر', '6 أشهر'],
    packages: [
      {
        id: 'p1_basic',
        name: 'الباقة الأساسية',
        price: 150,
        features: ['منصة إعلانية واحدة', 'إدارة ميزانية حتى 500$', 'تقارير شهرية']
      },
      {
        id: 'p1_pro',
        name: 'الباقة الاحترافية',
        price: 300,
        features: ['منصتين إعلانيتين', 'إدارة ميزانية حتى 1500$', 'تقارير نصف شهرية', 'تصميم 3 إعلانات']
      },
      {
        id: 'p1_elite',
        name: 'باقة النخبة',
        price: 600,
        features: ['كل المنصات', 'ميزانية مفتوحة', 'تقارير أسبوعية', 'فريق مخصص', 'تصاميم غير محدودة']
      }
    ]
  },
  {
    id: 's2',
    title: 'تطوير المواقع والمتاجر',
    shortDescription: 'متاجر إلكترونية سريعة ومصممة للبيع، وصفحات هبوط احترافية.',
    fullDescription: 'نحول زوار موقعك إلى عملاء. تصميم وتطوير مواقع ومتاجر إلكترونية متجاوبة بالكامل، سريعة التحميل، ومجهزة بأحدث تقنيات الـ SEO لتحسين الظهور في محركات البحث.',
    image: 'https://picsum.photos/seed/webdev/800/600',
    availableDurations: ['مشروع واحد'],
    packages: [
      {
        id: 'p2_landing',
        name: 'صفحة هبوط (Landing Page)',
        price: 100,
        features: ['صفحة واحدة طويلة', 'تصميم متجاوب', 'ربط الدومين', 'نموذج تواصل']
      },
      {
        id: 'p2_store',
        name: 'متجر إلكتروني متكامل',
        price: 450,
        features: ['حتى 50 منتج', 'بوابات دفع', 'لوحة تحكم', 'لغتين (عربي/إنجليزي)']
      }
    ]
  },
  {
    id: 's3',
    title: 'أتمتة الأعمال (Automation)',
    shortDescription: 'وفر وقتك وجهدك عبر ربط تطبيقاتك وأتمتة المهام المتكررة.',
    fullDescription: 'نقوم ببناء أنظمة أتمتة تربط بين أدواتك المختلفة (CRM, Email, Sheets) لتقليل العمل اليدوي، وتقليل الأخطاء البشرية، وزيادة كفاءة فريق العمل.',
    image: 'https://picsum.photos/seed/auto/800/600',
    availableDurations: ['مشروع واحد', 'صيانة شهرية'],
    packages: [
      {
        id: 'p3_setup',
        name: 'إعداد سيناريو واحد',
        price: 80,
        features: ['ربط تطبيقين', 'اختبار النظام', 'فيديو شرح']
      },
      {
        id: 'p3_system',
        name: 'نظام أتمتة كامل',
        price: 250,
        features: ['ربط غير محدود', 'لوحة تحكم مخصصة', 'دعم فني لمدة شهر']
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "سالم البلوشي",
    role: "صاحب وكالة",
    content: "JL DIGITAL غيرت حياتي المهنية. جلسة الاستشارة وحدها وفرت علي سنوات من المحاولات الفاشلة.",
    avatar: "https://picsum.photos/seed/user1/100/100"
  },
  {
    id: 2,
    name: "منى السعدي",
    role: "صانعة محتوى",
    content: "جودة الدورات المباشرة لا تضاهى. أشعر وكأنني في جلسة تدريب خاصة مع جاسم وليث.",
    avatar: "https://picsum.photos/seed/user2/100/100"
  },
  {
    id: 3,
    name: "خالد المعمري",
    role: "رائد أعمال",
    content: "احترافية، جودة عالية، وأرباح حقيقية. هذا بالضبط ما كنت أبحث عنه في السوق العماني.",
    avatar: "https://picsum.photos/seed/user3/100/100"
  }
];

// --- MOCK DATA FOR MANAGEMENT DASHBOARD ---

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'جاسم محمد',
    email: 'jassim@jldigital.om',
    role: 'SUPER_ADMIN',
    avatar: 'https://picsum.photos/seed/admin1/100/100',
    purchasedProducts: [],
    department: 'ADMINISTRATION',
    status: 'ACTIVE',
    joinDate: '2023-01-01'
  },
  {
    id: 'u2',
    name: 'سارة العلي',
    email: 'sara@jldigital.om',
    role: 'EMPLOYEE',
    avatar: 'https://picsum.photos/seed/emp1/100/100',
    purchasedProducts: [],
    department: 'DESIGN',
    status: 'ACTIVE',
    joinDate: '2023-05-15'
  },
  {
    id: 'u3',
    name: 'علي الحبسي',
    email: 'ali.h@example.com',
    role: 'CLIENT',
    avatar: 'https://picsum.photos/seed/client1/100/100',
    purchasedProducts: ['1', '4'],
    status: 'ACTIVE',
    joinDate: '2023-08-20'
  },
  {
    id: 'u4',
    name: 'خالد السالمي',
    email: 'khaled@jldigital.om',
    role: 'ADMIN',
    avatar: 'https://picsum.photos/seed/admin2/100/100',
    purchasedProducts: [],
    department: 'ADMINISTRATION',
    status: 'ACTIVE',
    joinDate: '2024-01-10'
  },
  {
    id: 'u5',
    name: 'منى الزدجالي',
    email: 'muna@jldigital.om',
    role: 'EMPLOYEE',
    avatar: 'https://picsum.photos/seed/emp2/100/100',
    purchasedProducts: [],
    department: 'SUPPORT',
    status: 'ACTIVE',
    joinDate: '2024-02-01'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_123',
    clientName: 'شركة النور للتجارة',
    clientEmail: 'contact@alnoor.om',
    clientPhone: '+968 9999 8888',
    serviceName: 'تطوير المواقع والمتاجر',
    packageName: 'متجر إلكتروني متكامل',
    price: 450,
    projectDescription: 'نريد متجراً لبيع العطور الفاخرة، يدعم الدفع الإلكتروني والشحن للمحافظات. التصميم يجب أن يكون أسود وذهبي.',
    websiteUrl: 'https://instagram.com/alnoor_perfumes',
    status: 'IN_PROGRESS',
    date: '2024-02-20',
    trackingId: 'TRK-9821',
    assignedTo: 'u2', // Sara (Employee)
    progressStep: 2
  },
  {
    id: 'ord_124',
    clientName: 'محمد الكندي',
    clientEmail: 'm.kindi@gmail.com',
    clientPhone: '+968 9123 4567',
    serviceName: 'إعلانات ممولة',
    packageName: 'الباقة الاحترافية',
    price: 300,
    projectDescription: 'حملة إعلانية لمنتج قهوة جديد. نستهدف الشباب في مسقط. الميزانية 50 ر.ع يومياً.',
    websiteUrl: 'https://mk-coffee.com',
    status: 'PENDING',
    date: '2024-02-22',
    progressStep: 0
  }
];