/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ShopView } from './components/ShopView';
import { CategoriesView } from './components/CategoriesView';
import { TrackingView } from './components/TrackingView';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { ProductManagement } from './components/admin/ProductManagement';
import { LiveChatDrawer } from './components/LiveChatDrawer';
import { AuthModal } from './components/AuthModal';
import { Store, Package, CheckCircle2, Phone, MessageCircle, MessageSquare } from 'lucide-react';

function AppContent() {
  const { activeView, setActiveView, toast, setIsChatOpen } = useStore();

  const isAdmin =
    activeView === 'admin-products' ||
    activeView === 'admin-settings' ||
    activeView === 'admin-analytics';

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1f2922] font-sans antialiased selection:bg-[#2d6a4f] selection:text-white">
      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1f2922] text-[#faf8f5] px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200 border border-[#e8e2d8]">
          <CheckCircle2 className="w-4 h-4 text-[#25d366] shrink-0" />
          <span>{toast.text}</span>
        </div>
      )}

      {isAdmin ? (
        /* Admin View Layout - Product Management */
        <div className="flex flex-1 min-h-screen bg-[#faf8f5]">
          <AdminSidebar />

          {/* Admin Main Body */}
          <main className="flex-1 flex flex-col min-w-0 bg-[#faf8f5] p-4 md:p-8 lg:p-10 pb-20 md:pb-10">
            {/* Mobile Admin Navigation Header */}
            <div className="md:hidden flex items-center justify-between pb-4 mb-6 border-b border-[#e8e2d8]">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#2d6a4f]" />
                <span className="font-extrabold text-sm text-[#2d6a4f]">
                  Product Manager
                </span>
              </div>
              <button
                onClick={() => setActiveView('shop')}
                className="bg-[#2d6a4f] hover:bg-[#22553e] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
              >
                <Store className="w-3.5 h-3.5" />
                <span>View Store</span>
              </button>
            </div>

            {/* Admin Component */}
            <ProductManagement />
          </main>
        </div>
      ) : (
        /* Customer Storefront Layout */
        <>
          <Header />
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-6 pt-20">
            {activeView === 'shop' && <ShopView />}
            {activeView === 'categories' && <CategoriesView />}
            {activeView === 'tracking' && <TrackingView />}
          </main>
          <Footer />

          {/* Floating WhatsApp, Call & Live Chat Quick Access Bar */}
          <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2">
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-[#2d6a4f] hover:bg-[#22553e] text-white p-3 md:px-3.5 md:py-2.5 rounded-full shadow-lg flex items-center gap-1.5 font-bold text-xs active:scale-95 transition-all cursor-pointer group"
              title="Open Live Chat / Send Message"
            >
              <MessageSquare className="w-4 h-4 text-[#52b788] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Live Chat</span>
            </button>

            <a
              href="https://wa.me/8801706259256?text=Hello%20Fazle%20Rabbi%2C%20I%20would%20like%20to%20place%20an%20order%20from%20your%20store."
              target="_blank"
              rel="noreferrer"
              className="bg-[#25d366] hover:bg-[#20b858] text-white p-3 md:px-4 md:py-2.5 rounded-full shadow-lg flex items-center gap-2 font-bold text-xs active:scale-95 transition-all group"
              title="Order / Message on WhatsApp (01706259256)"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span className="hidden sm:inline">WhatsApp (01706259256)</span>
            </a>

            <a
              href="tel:01706259256"
              className="bg-white hover:bg-[#f4efe6] text-[#2d6a4f] p-3 md:px-3.5 md:py-2.5 rounded-full shadow-md flex items-center gap-1.5 font-bold text-xs border border-[#e8e2d8] active:scale-95 transition-all"
              title="Call 01706259256"
            >
              <Phone className="w-4 h-4 text-[#2d6a4f]" />
              <span className="hidden sm:inline">Call</span>
            </a>
          </div>
        </>
      )}

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Live Chat Drawer */}
      <LiveChatDrawer />

      {/* Authentication Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
