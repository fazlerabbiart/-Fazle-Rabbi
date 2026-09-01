export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  regularPrice: number;
  salePrice?: number;
  description: string;
  inStock: boolean;
  imageUrl: string;
  galleryImages?: string[];
  specs?: string;
  discountBadge?: string;
  createdAt: string;
}

export type Category = 'All Products' | 'Electronics' | 'Fashion' | 'Home Goods' | 'Accessories' | 'Lifestyle' | 'Apparel';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  customerNote?: string;
}

export interface SiteSettings {
  storeName: string;
  storeTagline: string;
  logoUrl: string;
  whatsappNumber: string;
  currency: string;
  currencySymbol: string;
  brandColor: string; // Hex color code
  brandColorName: 'green' | 'darkgreen' | 'blue' | 'black' | 'custom';
  address?: string;
  email?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  customerNote?: string;
  status: 'pending' | 'confirmed' | 'dispatched' | 'out_for_delivery' | 'delivered';
  createdAt: string;
  whatsappMessage: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'admin' | 'bot';
  senderName: string;
  senderPhone?: string;
  message: string;
  timestamp: string;
  productId?: string;
  productTitle?: string;
}

export interface CustomerProfile {
  name: string;
  phone: string;
  address: string;
  notes?: string;
  updatedAt?: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  role: 'admin' | 'customer';
  phone?: string;
}

export type AppView = 'shop' | 'categories' | 'tracking' | 'admin-products' | 'admin-settings' | 'admin-analytics';
