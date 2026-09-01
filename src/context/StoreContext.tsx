import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, SiteSettings, CartItem, Order, AppView, ChatMessage, CustomerProfile, AuthUser } from '../types';
import { initialProducts, initialSiteSettings, sampleOrderHistory } from '../data/initialData';
import { db, auth, handleFirestoreError, OperationType, testFirestoreConnection } from '../lib/firebase';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';

interface Toast {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  products: Product[];
  settings: SiteSettings;
  cart: CartItem[];
  orders: Order[];
  chatMessages: ChatMessage[];
  customerProfile: CustomerProfile | null;
  currentUser: AuthUser | null;
  isAuthLoading: boolean;
  isAuthModalOpen: boolean;
  activeView: AppView;
  selectedCategory: string;
  searchQuery: string;
  selectedProductForModal: Product | null;
  isCartOpen: boolean;
  isChatOpen: boolean;
  isDarkMode: boolean;
  toast: Toast | null;
  isFirebaseConnected: boolean;
  
  setActiveView: (view: AppView) => void;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedProductForModal: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsChatOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  
  // Auth actions
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string, phone?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsDemoAdmin: () => Promise<void>;
  loginAsDemoCustomer: (name?: string, email?: string) => Promise<void>;
  logout: () => Promise<void>;

  // Product actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleStock: (id: string) => Promise<void>;
  
  // Settings actions
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number, note?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // WhatsApp order actions
  createWhatsAppOrderUrl: (
    items: CartItem[],
    customerInfo?: { name: string; phone: string; address: string; note?: string }
  ) => string;
  createDirectWhatsAppUrl: (product: Product, quantity?: number, note?: string) => string;
  checkoutAndPlaceOrder: (customerInfo: { name: string; phone: string; address: string; note?: string }) => Promise<Order>;
  
  // Chat & Customer profile actions
  sendChatMessage: (msg: { text: string; senderName?: string; senderPhone?: string; productId?: string; productTitle?: string }) => Promise<void>;
  saveCustomerProfile: (profile: CustomerProfile) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ws_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If parsed is older version (e.g. contains 'prod-1' old headphone, 'prod-3' tote, or 'prod-8'), upgrade to new catalog
        const hasLegacy = parsed.some((p: Product) => p.id === 'prod-1' || p.id === 'prod-3' || p.id === 'prod-5' || p.id === 'prod-8');
        if (!hasLegacy && Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      localStorage.setItem('ws_products', JSON.stringify(initialProducts));
      return initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('ws_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.whatsappNumber || parsed.whatsappNumber === '+1 (555) 123-4567' || parsed.whatsappNumber === '15551234567' || !parsed.whatsappNumber.includes('01706259256')) {
          parsed.whatsappNumber = '01706259256';
        }
        return parsed;
      }
      return initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ws_cart');
      return saved ? JSON.parse(saved) : [
        { product: initialProducts[0], quantity: 1 },
        { product: initialProducts[1], quantity: 1 }
      ];
    } catch {
      return [
        { product: initialProducts[0], quantity: 1 },
        { product: initialProducts[1], quantity: 1 }
      ];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ws_orders');
      return saved ? JSON.parse(saved) : sampleOrderHistory;
    } catch {
      return sampleOrderHistory;
    }
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      senderName: 'Fazle Rabbi (Store Support)',
      message: '👋 Welcome to our store! You can ask questions about our products, place custom requests, or message us on WhatsApp (01706259256).',
      timestamp: new Date().toISOString()
    }
  ]);

  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ws_customer_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('ws_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<AppView>('shop');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(true);

  // Auth state listener with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const isAdmin = 
          fbUser.email?.toLowerCase() === 'fazlerabbiart@gmail.com' ||
          fbUser.email?.toLowerCase().includes('admin');

        const userObj: AuthUser = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          photoURL: fbUser.photoURL,
          role: isAdmin ? 'admin' : 'customer',
        };

        setCurrentUser(userObj);
        localStorage.setItem('ws_auth_user', JSON.stringify(userObj));

        // Auto-update customer profile if not already set
        if (fbUser.displayName) {
          setCustomerProfile((prev) => ({
            name: fbUser.displayName || prev?.name || 'Customer',
            phone: prev?.phone || '',
            address: prev?.address || '',
            notes: prev?.notes,
            updatedAt: new Date().toISOString()
          }));
        }
      } else {
        // If not authenticated via Firebase SDK, check localStorage fallback
        const saved = localStorage.getItem('ws_auth_user');
        if (!saved) {
          setCurrentUser(null);
        }
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Initial connection test
  useEffect(() => {
    testFirestoreConnection().then((connected) => {
      setIsFirebaseConnected(connected);
    });
  }, []);

  // 1. Real-time Firestore Sync: Products Collection
  useEffect(() => {
    const productsRef = collection(db, 'products');
    const unsubscribe = onSnapshot(
      productsRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedProducts: Product[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            loadedProducts.push({
              id: docSnap.id,
              title: data.title || 'Untitled Product',
              subtitle: data.subtitle,
              category: data.category || 'General',
              regularPrice: Number(data.regularPrice) || 0,
              salePrice: data.salePrice ? Number(data.salePrice) : undefined,
              description: data.description || '',
              inStock: data.inStock !== false,
              imageUrl: data.imageUrl || initialProducts[0].imageUrl,
              galleryImages: data.galleryImages,
              specs: data.specs,
              discountBadge: data.discountBadge,
              createdAt: data.createdAt || new Date().toISOString(),
            });
          });
          // Sort by creation date descending
          loadedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setProducts(loadedProducts);
          localStorage.setItem('ws_products', JSON.stringify(loadedProducts));
        } else {
          // If Firestore collection is empty, seed initial products to Firestore
          initialProducts.forEach(async (prod) => {
            try {
              await setDoc(doc(db, 'products', prod.id), prod);
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `products/${prod.id}`);
            }
          });
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'products');
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. Real-time Firestore Sync: Site Settings Document
  useEffect(() => {
    const settingsDocRef = doc(db, 'settings', 'site');
    const unsubscribe = onSnapshot(
      settingsDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as Partial<SiteSettings>;
          setSettings((prev) => {
            const updated = {
              ...prev,
              ...data,
              whatsappNumber: data.whatsappNumber || '01706259256'
            };
            localStorage.setItem('ws_settings', JSON.stringify(updated));
            return updated;
          });
        } else {
          // Seed initial settings document
          const initial = { ...initialSiteSettings, whatsappNumber: '01706259256' };
          setDoc(settingsDocRef, initial).catch((err) => {
            handleFirestoreError(err, OperationType.WRITE, 'settings/site');
          });
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'settings/site');
      }
    );

    return () => unsubscribe();
  }, []);

  // 3. Real-time Firestore Sync: Orders Collection
  useEffect(() => {
    const ordersRef = collection(db, 'orders');
    const unsubscribe = onSnapshot(
      ordersRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedOrders: Order[] = [];
          snapshot.forEach((docSnap) => {
            const d = docSnap.data();
            loadedOrders.push({
              id: docSnap.id,
              items: d.items || [],
              totalAmount: Number(d.totalAmount) || 0,
              customerName: d.customerName || 'Customer',
              customerPhone: d.customerPhone || '',
              deliveryAddress: d.deliveryAddress || '',
              customerNote: d.customerNote || '',
              status: d.status || 'pending',
              createdAt: d.createdAt || new Date().toISOString(),
              whatsappMessage: d.whatsappMessage || '',
            });
          });
          loadedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setOrders(loadedOrders);
          localStorage.setItem('ws_orders', JSON.stringify(loadedOrders));
        } else {
          // Seed sample order history to Firestore if empty
          sampleOrderHistory.forEach(async (order) => {
            try {
              await setDoc(doc(db, 'orders', order.id), order);
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `orders/${order.id}`);
            }
          });
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'orders');
      }
    );

    return () => unsubscribe();
  }, []);

  // 4. Real-time Firestore Sync: Chat Messages & Customer Inquiries
  useEffect(() => {
    const chatRef = collection(db, 'chat_messages');
    const unsubscribe = onSnapshot(
      chatRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedMessages: ChatMessage[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            loadedMessages.push({
              id: docSnap.id,
              sender: data.sender || 'customer',
              senderName: data.senderName || 'Visitor',
              senderPhone: data.senderPhone,
              message: data.message || '',
              timestamp: data.timestamp || new Date().toISOString(),
              productId: data.productId,
              productTitle: data.productTitle,
            });
          });
          loadedMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          setChatMessages(loadedMessages);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'chat_messages');
      }
    );

    return () => unsubscribe();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('ws_cart', JSON.stringify(cart));
  }, [cart]);

  // Dark mode effect on html class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3500);
  };

  // Authentication action handlers
  const loginWithEmail = async (email: string, pass: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email.trim(), pass);
      const isAdmin = 
        res.user.email?.toLowerCase() === 'fazlerabbiart@gmail.com' ||
        res.user.email?.toLowerCase().includes('admin');

      const userObj: AuthUser = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName || res.user.email?.split('@')[0] || 'User',
        photoURL: res.user.photoURL,
        role: isAdmin ? 'admin' : 'customer',
      };
      setCurrentUser(userObj);
      localStorage.setItem('ws_auth_user', JSON.stringify(userObj));
      setIsAuthModalOpen(false);
      showToast(`Welcome back, ${userObj.displayName}!`, 'success');
    } catch (err: unknown) {
      console.warn('Firebase email login error:', err);
      // If Firebase Auth throws (e.g. invalid credential or user-not-found), give clear notification
      const message = err instanceof Error ? err.message : 'Login failed';
      showToast(message.replace('Firebase: ', ''), 'error');
      throw err;
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string, phone?: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (name) {
        await updateProfile(res.user, { displayName: name });
      }

      const isAdmin = 
        res.user.email?.toLowerCase() === 'fazlerabbiart@gmail.com' ||
        res.user.email?.toLowerCase().includes('admin');

      const userObj: AuthUser = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: name || res.user.email?.split('@')[0] || 'User',
        photoURL: res.user.photoURL,
        role: isAdmin ? 'admin' : 'customer',
        phone: phone || '',
      };

      setCurrentUser(userObj);
      localStorage.setItem('ws_auth_user', JSON.stringify(userObj));

      // Save customer profile
      const prof: CustomerProfile = {
        name: name || 'Customer',
        phone: phone || '',
        address: '',
        updatedAt: new Date().toISOString()
      };
      setCustomerProfile(prof);
      localStorage.setItem('ws_customer_profile', JSON.stringify(prof));

      if (phone) {
        setDoc(doc(db, 'customers', phone.replace(/[^0-9]/g, '') || res.user.uid), prof, { merge: true }).catch(() => {});
      }

      setIsAuthModalOpen(false);
      showToast(`Account created successfully! Welcome, ${name || 'User'}.`, 'success');
    } catch (err: unknown) {
      console.warn('Firebase register error:', err);
      const message = err instanceof Error ? err.message : 'Registration failed';
      showToast(message.replace('Firebase: ', ''), 'error');
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const isAdmin = 
        res.user.email?.toLowerCase() === 'fazlerabbiart@gmail.com' ||
        res.user.email?.toLowerCase().includes('admin');

      const userObj: AuthUser = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName || 'Google User',
        photoURL: res.user.photoURL,
        role: isAdmin ? 'admin' : 'customer',
      };
      setCurrentUser(userObj);
      localStorage.setItem('ws_auth_user', JSON.stringify(userObj));
      setIsAuthModalOpen(false);
      showToast(`Signed in as ${userObj.displayName}!`, 'success');
    } catch (err: unknown) {
      console.warn('Google sign-in error:', err);
      const message = err instanceof Error ? err.message : 'Google sign-in failed';
      showToast(message.replace('Firebase: ', ''), 'error');
      throw err;
    }
  };

  const loginAsDemoAdmin = async () => {
    const adminUser: AuthUser = {
      uid: 'admin-fazle-rabbi',
      email: 'fazlerabbiart@gmail.com',
      displayName: 'Fazle Rabbi',
      role: 'admin',
      phone: '01706259256',
    };
    setCurrentUser(adminUser);
    localStorage.setItem('ws_auth_user', JSON.stringify(adminUser));
    setIsAuthModalOpen(false);
    showToast('Logged in as Store Owner / Admin (Fazle Rabbi)', 'success');
  };

  const loginAsDemoCustomer = async (name = 'Tanvir Ahmed', email = 'tanvir.customer@gmail.com') => {
    const custUser: AuthUser = {
      uid: `cust-${Date.now()}`,
      email,
      displayName: name,
      role: 'customer',
      phone: '01712345678',
    };
    setCurrentUser(custUser);
    localStorage.setItem('ws_auth_user', JSON.stringify(custUser));
    
    // Also fill customer profile
    const prof: CustomerProfile = {
      name,
      phone: '01712345678',
      address: 'House 14, Road 5, Dhanmondi, Dhaka',
      notes: 'Please call before arrival',
      updatedAt: new Date().toISOString(),
    };
    setCustomerProfile(prof);
    localStorage.setItem('ws_customer_profile', JSON.stringify(prof));

    setIsAuthModalOpen(false);
    showToast(`Logged in as customer (${name})!`, 'success');
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // Ignore
    }
    setCurrentUser(null);
    localStorage.removeItem('ws_auth_user');
    showToast('You have been logged out successfully.', 'info');
  };

  // Product actions writing to Firestore
  const addProduct = async (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const newId = `prod-${Date.now()}`;
    const product: Product = {
      ...newProd,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    // Update optimistic state
    setProducts((prev) => [product, ...prev]);
    showToast(`Saving "${product.title}" to Firebase...`);

    try {
      await setDoc(doc(db, 'products', newId), product);
      showToast(`Published "${product.title}" to Firebase successfully!`);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `products/${newId}`);
      showToast(`Product saved locally (Firestore offline)`, 'info');
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );

    try {
      await updateDoc(doc(db, 'products', id), updates);
      showToast('Product updated in Firebase!');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `products/${id}`);
      showToast('Updated locally', 'info');
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));

    try {
      await deleteDoc(doc(db, 'products', id));
      showToast('Product removed from Firebase Firestore', 'info');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `products/${id}`);
      showToast('Deleted locally', 'info');
    }
  };

  const toggleStock = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const nextStock = !target.inStock;

    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inStock: nextStock } : item))
    );

    try {
      await updateDoc(doc(db, 'products', id), { inStock: nextStock });
      showToast(`Marked "${target.title}" as ${nextStock ? 'In Stock' : 'Out of Stock'}`);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `products/${id}`);
    }
  };

  // Settings actions with Firestore
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('ws_settings', JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'settings', 'site'), updated, { merge: true });
      showToast('Store settings saved to Firebase!');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'settings/site');
      showToast('Saved locally', 'info');
    }
  };

  const resetSettings = async () => {
    const initial = { ...initialSiteSettings, whatsappNumber: '01706259256' };
    setSettings(initial);

    try {
      await setDoc(doc(db, 'settings', 'site'), initial);
      showToast('Settings restored in Firebase', 'info');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings/site');
    }
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, note?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, customerNote: note || item.customerNote }
            : item
        );
      }
      return [...prev, { product, quantity, customerNote: note }];
    });
    showToast(`Added ${quantity}x "${product.title}" to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Helper to clean phone number for wa.me URL
  const sanitizePhone = (rawPhone: string) => {
    let digits = (rawPhone || '').replace(/[^0-9]/g, '');
    if (!digits) return '8801706259256';
    if (digits === '01706259256') return '8801706259256';
    if (digits.startsWith('01') && digits.length === 11) {
      digits = '88' + digits;
    } else if (digits.startsWith('0') && digits.length === 10) {
      digits = '88' + digits;
    }
    return digits;
  };

  const createDirectWhatsAppUrl = (product: Product, quantity = 1, note?: string): string => {
    const phone = sanitizePhone(settings.whatsappNumber) || '8801706259256';
    const effectivePrice = product.salePrice ?? product.regularPrice;
    const total = effectivePrice * quantity;
    const symbol = settings.currencySymbol;

    const messageLines = [
      `👋 *Hello ${settings.storeName}!*`,
      `I would like to place an order directly from your store:`,
      ``,
      `🛍️ *Product:* ${product.title}`,
      `🏷️ *Category:* ${product.category}`,
      `🔢 *Quantity:* ${quantity}`,
      `💵 *Unit Price:* ${symbol}${effectivePrice.toLocaleString()}`,
      `💰 *Total Amount:* ${symbol}${total.toLocaleString()}`,
      ...(note ? [`📝 *Customer Note:* ${note}`] : []),
      ``,
      `📞 *Order to Phone / WhatsApp:* 01706259256`,
      `Please confirm availability, delivery fee, and payment details. Thank you!`
    ];

    const encoded = encodeURIComponent(messageLines.join('\n'));
    return `https://wa.me/${phone}?text=${encoded}`;
  };

  const createWhatsAppOrderUrl = (
    items: CartItem[],
    customerInfo?: { name: string; phone: string; address: string; note?: string }
  ): string => {
    const phone = sanitizePhone(settings.whatsappNumber) || '8801706259256';
    const symbol = settings.currencySymbol;
    const totalAmount = items.reduce(
      (sum, item) => sum + (item.product.salePrice ?? item.product.regularPrice) * item.quantity,
      0
    );

    const itemsSummary = items
      .map((item, idx) => {
        const p = item.product;
        const price = p.salePrice ?? p.regularPrice;
        return `${idx + 1}. *${p.title}* x ${item.quantity} = ${symbol}${(price * item.quantity).toLocaleString()}`;
      })
      .join('\n');

    const messageLines = [
      `🛒 *New Order from ${settings.storeName} Storefront*`,
      `----------------------------------------`,
      `📦 *Items Ordered:*`,
      itemsSummary,
      ``,
      `💰 *Total Order Value:* ${symbol}${totalAmount.toLocaleString()}`,
      `----------------------------------------`,
      ...(customerInfo?.name ? [`👤 *Customer Name:* ${customerInfo.name}`] : []),
      ...(customerInfo?.phone ? [`📱 *Contact Number:* ${customerInfo.phone}`] : []),
      ...(customerInfo?.address ? [`📍 *Delivery Address:* ${customerInfo.address}`] : []),
      ...(customerInfo?.note ? [`📝 *Special Instructions:* ${customerInfo.note}`] : []),
      ``,
      `📞 *Store Contact Number:* 01706259256`,
      `Please send me order confirmation and delivery timeframe. Thank you!`
    ];

    const encoded = encodeURIComponent(messageLines.join('\n'));
    return `https://wa.me/${phone}?text=${encoded}`;
  };

  const checkoutAndPlaceOrder = async (customerInfo: {
    name: string;
    phone: string;
    address: string;
    note?: string;
  }): Promise<Order> => {
    const totalAmount = cart.reduce(
      (sum, item) => sum + (item.product.salePrice ?? item.product.regularPrice) * item.quantity,
      0
    );
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      totalAmount,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      deliveryAddress: customerInfo.address,
      customerNote: customerInfo.note,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      whatsappMessage: `Order ${orderId} sent to WhatsApp`,
    };

    // Save order to state and localStorage
    setOrders((prev) => [newOrder, ...prev]);

    // Save to Firebase Firestore `orders` collection
    try {
      await setDoc(doc(db, 'orders', orderId), newOrder);
      console.log(`Order #${orderId} saved to Firebase Firestore`);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `orders/${orderId}`);
    }

    // Save customer profile into Firestore `customers`
    if (customerInfo.phone) {
      const cleanPhone = customerInfo.phone.replace(/[^0-9]/g, '');
      const profile: CustomerProfile = {
        name: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address,
        notes: customerInfo.note,
        updatedAt: new Date().toISOString(),
      };
      setCustomerProfile(profile);
      localStorage.setItem('ws_customer_profile', JSON.stringify(profile));

      try {
        await setDoc(doc(db, 'customers', cleanPhone || 'customer'), profile, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `customers/${cleanPhone}`);
      }
    }

    const url = createWhatsAppOrderUrl(cart, customerInfo);
    clearCart();
    setIsCartOpen(false);
    showToast(`Order #${orderId} saved to Firebase! Opening WhatsApp...`);
    window.open(url, '_blank');
    return newOrder;
  };

  // Send message to Firestore `chat_messages`
  const sendChatMessage = async (msg: {
    text: string;
    senderName?: string;
    senderPhone?: string;
    productId?: string;
    productTitle?: string;
  }) => {
    if (!msg.text.trim()) return;

    const msgId = `chat-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: msgId,
      sender: 'customer',
      senderName: msg.senderName || customerProfile?.name || 'Customer',
      senderPhone: msg.senderPhone || customerProfile?.phone || '',
      message: msg.text.trim(),
      timestamp: new Date().toISOString(),
      productId: msg.productId,
      productTitle: msg.productTitle,
    };

    // Optimistic UI update
    setChatMessages((prev) => [...prev, newMsg]);

    try {
      await setDoc(doc(db, 'chat_messages', msgId), newMsg);
      showToast('Message saved to Firebase Firestore!');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `chat_messages/${msgId}`);
      showToast('Message sent locally', 'info');
    }
  };

  const saveCustomerProfile = async (profile: CustomerProfile) => {
    setCustomerProfile(profile);
    localStorage.setItem('ws_customer_profile', JSON.stringify(profile));

    const cleanPhone = profile.phone.replace(/[^0-9]/g, '');
    try {
      await setDoc(doc(db, 'customers', cleanPhone || 'customer'), profile, { merge: true });
      showToast('Profile saved to Firebase Firestore!');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `customers/${cleanPhone}`);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        cart,
        orders,
        chatMessages,
        customerProfile,
        currentUser,
        isAuthLoading,
        isAuthModalOpen,
        activeView,
        selectedCategory,
        searchQuery,
        selectedProductForModal,
        isCartOpen,
        isChatOpen,
        isDarkMode,
        toast,
        isFirebaseConnected,
        setActiveView,
        setSelectedCategory,
        setSearchQuery,
        setSelectedProductForModal,
        setIsCartOpen,
        setIsChatOpen,
        setIsAuthModalOpen,
        toggleDarkMode,
        showToast,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginAsDemoAdmin,
        loginAsDemoCustomer,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        updateSettings,
        resetSettings,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createWhatsAppOrderUrl,
        createDirectWhatsAppUrl,
        checkoutAndPlaceOrder,
        sendChatMessage,
        saveCustomerProfile,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
