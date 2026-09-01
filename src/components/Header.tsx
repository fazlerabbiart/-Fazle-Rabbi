import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  Shield, 
  ArrowRight, 
  Sparkles, 
  MessageSquare,
  LogIn,
  LogOut,
  User as UserIcon,
  UserCheck
} from 'lucide-react';
import { UserProfileModal } from './UserProfileModal';

export const Header: React.FC = () => {
  const {
    settings,
    cart,
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    setIsCartOpen,
    setIsChatOpen,
    currentUser,
    setIsAuthModalOpen,
    logout,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (view: 'shop' | 'categories' | 'tracking') => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#faf8f5]/90 border-b border-[#e8e2d8] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex justify-between items-center px-4 md:px-8 h-16 w-full max-w-7xl mx-auto">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-[#516453] hover:text-[#2d6a4f] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className="font-black text-xl md:text-2xl text-[#1f2922] tracking-tight flex items-center gap-2 text-left cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2d6a4f] to-[#25d366] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-[#1f2922] to-[#2d6a4f] bg-clip-text text-transparent">
                {settings.storeName}
              </span>
            </button>
          </div>

          {/* Search Bar (Center Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#7e9180]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, categories, specs..."
              className="w-full bg-white border border-[#e8e2d8] rounded-full py-2 pl-10 pr-4 text-sm text-[#1f2922] placeholder-[#7e9180] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7e9180] hover:text-[#1f2922] cursor-pointer font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Navigation Links & Actions */}
          <nav className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
              <button
                onClick={() => handleNavClick('shop')}
                className={`pb-1 transition-all cursor-pointer ${
                  activeView === 'shop'
                    ? 'text-[#2d6a4f] font-extrabold border-b-2 border-[#2d6a4f]'
                    : 'text-[#516453] hover:text-[#2d6a4f]'
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => handleNavClick('categories')}
                className={`pb-1 transition-all cursor-pointer ${
                  activeView === 'categories'
                    ? 'text-[#2d6a4f] font-extrabold border-b-2 border-[#2d6a4f]'
                    : 'text-[#516453] hover:text-[#2d6a4f]'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => handleNavClick('tracking')}
                className={`pb-1 transition-all cursor-pointer ${
                  activeView === 'tracking'
                    ? 'text-[#2d6a4f] font-extrabold border-b-2 border-[#2d6a4f]'
                    : 'text-[#516453] hover:text-[#2d6a4f]'
                }`}
              >
                Tracking
              </button>
            </div>

            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Live Chat Button */}
              <button
                onClick={() => setIsChatOpen(true)}
                className="p-2.5 text-[#1f2922] hover:text-[#2d6a4f] transition-all rounded-full bg-white hover:bg-[#f4efe6] border border-[#e8e2d8] relative active:scale-95 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                title="Live Store Chat (Firebase Synced)"
                aria-label="Live Store Chat"
              >
                <MessageSquare className="w-4 h-4 text-[#2d6a4f]" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#25d366] ring-2 ring-white" />
              </button>

              {/* Cart button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2.5 text-[#1f2922] hover:text-[#2d6a4f] transition-all rounded-full bg-white hover:bg-[#f4efe6] border border-[#e8e2d8] relative active:scale-95 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                title="View Shopping Cart"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-4 h-4 text-[#2d6a4f]" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d97706] text-white rounded-full min-w-5 h-5 px-1 flex items-center justify-center text-[10px] font-extrabold shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Login / Logout / User Profile Section */}
              {currentUser ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#ebf3ea] hover:bg-[#d8e9d6] text-[#2d6a4f] transition-all rounded-full border border-[#2d6a4f]/20 active:scale-95 cursor-pointer shadow-2xs"
                    title={`Logged in as ${currentUser.displayName || currentUser.email}`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-xs">
                      {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline text-xs font-bold truncate max-w-[100px]">
                      {currentUser.displayName?.split(' ')[0] || 'Account'}
                    </span>
                    <UserCheck className="w-3.5 h-3.5 text-[#25d366]" />
                  </button>

                  <button
                    onClick={logout}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 transition-all rounded-full border border-[#e8e2d8] hover:border-red-200 text-xs font-bold cursor-pointer active:scale-95 shadow-2xs"
                    title="Log Out (লগআউট)"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2d6a4f] hover:bg-[#22553e] text-white transition-all rounded-full text-xs font-bold active:scale-95 cursor-pointer shadow-xs"
                  title="Login / Sign In (লগইন)"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              )}

              {/* Fazle Rabbi User Profile Button */}
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-1.5 p-1 md:px-2.5 md:py-1.5 bg-white hover:bg-[#f4efe6] text-[#1f2922] transition-all rounded-full border border-[#e8e2d8] active:scale-95 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                title="Store Owner (Fazle Rabbi) Contact Details"
                aria-label="Fazle Rabbi Profile"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#2d6a4f] to-[#25d366] text-white flex items-center justify-center text-[9px] font-black shrink-0 shadow-xs">
                  FR
                </div>
                <span className="hidden lg:inline text-xs font-bold text-[#1f2922]">
                  Fazle Rabbi
                </span>
              </button>

              {/* Admin Panel Quick Switch Button */}
              <button
                onClick={() => setActiveView('admin-products')}
                className="ml-0.5 flex items-center gap-1.5 bg-[#f4efe6] hover:bg-[#ebd9c3] text-[#2d6a4f] px-2.5 md:px-3 py-1.5 rounded-full text-xs font-bold border border-[#e8e2d8] transition-all active:scale-95 cursor-pointer shadow-2xs"
                title="Switch to Store Manager Dashboard"
              >
                <Shield className="w-3.5 h-3.5 text-[#2d6a4f]" />
                <span className="hidden md:inline">Admin</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3 pt-1">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7e9180]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white border border-[#e8e2d8] rounded-full py-1.5 pl-9 pr-3 text-xs text-[#1f2922] placeholder-[#7e9180] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
            />
          </div>
        </div>
      </header>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#faf8f5] shadow-2xl p-6 flex flex-col z-50 border-r border-[#e8e2d8] animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#e8e2d8]">
              <span className="font-black text-lg text-[#1f2922] flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#2d6a4f] to-[#25d366] flex items-center justify-center text-white text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                {settings.storeName}
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-md text-[#516453] hover:bg-[#f4efe6] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Auth Section in Mobile Drawer */}
            <div className="py-4 border-b border-[#e8e2d8]">
              {currentUser ? (
                <div className="space-y-2">
                  <div 
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-3 bg-white border border-[#e8e2d8] rounded-xl flex items-center gap-3 cursor-pointer hover:bg-[#f4efe6] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#2d6a4f] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                      {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#1f2922] truncate">
                          {currentUser.displayName || 'Customer'}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#ebf3ea] text-[#2d6a4f] font-bold">
                          {currentUser.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7e9180] truncate">{currentUser.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-red-200"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out (লগআউট)</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 px-4 bg-[#2d6a4f] hover:bg-[#22553e] text-white rounded-xl font-bold flex items-center justify-center gap-2 text-xs shadow-xs cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login / Register (লগইন / সাইন আপ)</span>
                </button>
              )}
            </div>

            {/* Profile Quick Access in Mobile Drawer */}
            <div className="py-3 border-b border-[#e8e2d8]">
              <button
                onClick={() => {
                  setIsProfileOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full p-2.5 bg-white hover:bg-[#f4efe6] border border-[#e8e2d8] rounded-xl flex items-center gap-3 transition-all text-left cursor-pointer shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#25d366] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  FR
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-[#1f2922]">Fazle Rabbi</span>
                    <span className="w-2 h-2 rounded-full bg-[#25d366]" />
                  </div>
                  <p className="text-[10px] text-[#2d6a4f] font-semibold">Store Owner & WhatsApp (01706259256)</p>
                </div>
              </button>
            </div>

            <div className="flex flex-col gap-2 py-4 text-base font-semibold">
              <button
                onClick={() => handleNavClick('shop')}
                className={`flex items-center justify-between text-left p-3 rounded-xl cursor-pointer transition-all ${
                  activeView === 'shop'
                    ? 'bg-[#2d6a4f] text-white font-bold shadow-xs'
                    : 'text-[#1f2922] hover:bg-white'
                }`}
              >
                <span>Shop Catalog</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </button>
              <button
                onClick={() => handleNavClick('categories')}
                className={`flex items-center justify-between text-left p-3 rounded-xl cursor-pointer transition-all ${
                  activeView === 'categories'
                    ? 'bg-[#2d6a4f] text-white font-bold shadow-xs'
                    : 'text-[#1f2922] hover:bg-white'
                }`}
              >
                <span>Browse Categories</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </button>
              <button
                onClick={() => handleNavClick('tracking')}
                className={`flex items-center justify-between text-left p-3 rounded-xl cursor-pointer transition-all ${
                  activeView === 'tracking'
                    ? 'bg-[#2d6a4f] text-white font-bold shadow-xs'
                    : 'text-[#1f2922] hover:bg-white'
                }`}
              >
                <span>Track Order</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </button>
            </div>

            <div className="mt-auto pt-4 border-t border-[#e8e2d8]">
              <button
                onClick={() => {
                  setActiveView('admin-products');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 bg-[#2d6a4f] hover:bg-[#22553e] text-white rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer active:scale-95 transition-all"
              >
                <Shield className="w-4 h-4" />
                Product Manager (Admin)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

