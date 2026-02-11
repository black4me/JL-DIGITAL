
export enum ProductType {
  COURSE_LIVE = 'دورة مباشرة',
  COURSE_RECORDED = 'دورة مسجلة',
  EBOOK = 'كتاب إلكتروني',
  CONSULTATION = 'استشارة',
  TOOL = 'أداة رقمية'
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  type: ProductType;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'EMPLOYEE' | 'CLIENT';

export type Permission = 'MANAGE_ORDERS' | 'CUSTOMER_SUPPORT' | 'SEND_EMAILS';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role; 
  avatar: string;
  purchasedProducts: string[];
  department?: 'SALES' | 'DESIGN' | 'MARKETING' | 'SUPPORT' | 'ADMINISTRATION';
  permissions?: Permission[];
  joinDate?: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface InternalReport {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  targetDepartment: string;
  priority: 'NORMAL' | 'URGENT';
}

export interface LiveSession {
  id: string;
  title: string;
  date: string;
  instructor: string;
  duration: string;
  thumbnail: string;
  zoomLink?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  packages: ServicePackage[];
  availableDurations: string[];
}

export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'CANCELED';

export interface Order {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceName: string;
  packageName: string;
  price: number;
  projectDescription: string;
  websiteUrl?: string;
  status: OrderStatus;
  date: string;
  trackingId?: string;
  assignedTo?: string;
  progressStep: number;
}

export interface Task {
  orderId: string;
  serviceName: string;
  packageName: string;
  projectDescription: string;
  websiteUrl?: string;
  status: OrderStatus;
  deadline: string;
  progressStep: number;
}

// --- NEW TYPES FOR SITE SETTINGS & CMS ---

export interface FooterLink {
  id: string;
  label: string;
  url: string;
  section: 'DISCOVERY' | 'LEGAL';
}

export interface SocialLink {
  platform: 'instagram' | 'twitter' | 'linkedin' | 'facebook';
  url: string;
}

export interface SiteSettings {
  brandName: string;
  logo: string; // Base64 or URL
  primaryColor: string; // Hex Code
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string; // Base64 or URL
  
  // Footer & Contact
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CustomPage {
  id: string;
  slug: string; // e.g. 'about-us'
  title: string;
  content: string; // HTML or Text
  lastUpdated: string;
}

export interface TickerItem {
  id: string;
  text: string;
  icon: string; // Icon name
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string; // Can be URL or Base64
  videoUrl: string; // Can be URL or Base64
  isLive: boolean;
}
