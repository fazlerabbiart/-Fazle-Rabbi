import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, ShieldCheck, Zap, Phone, CheckCircle2, Star, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import heroImage from '../assets/images/hero_store_banner_1788247958170.jpg';

export const HeroBanner: React.FC<{ onStartShopping?: () => void }> = ({ onStartShopping }) => {
  const { settings, setIsChatOpen } = useStore();

  const handleScrollToProducts = () => {
    if (onStartShopping) {
      onStartShopping();
    } else {
      const catalogEl = document.getElementById('catalog-section');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Hero Card */}
      <section className="w-full bg-white rounded-3xl border border-[#e8e2d8] overflow-hidden relative shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#ebf3ea] blur-3xl opacity-70" />
          <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-[#fef3c7] blur-3xl opacity-40" />
          <div className="absolute left-10 top-10 w-72 h-72 rounded-full bg-[#f4efe6] blur-2xl opacity-50" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 md:p-10 lg:p-12">
          {/* Left Column: Compelling Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebf3ea] text-[#2d6a4f] border border-[#2d6a4f]/20 text-[11px] font-bold uppercase tracking-wider shadow-2xs">
                <MessageCircle className="w-3.5 h-3.5 text-[#25d366] fill-[#25d366]" />
                Direct WhatsApp Commerce
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#faf8f5] text-[#516453] border border-[#e8e2d8] text-[11px] font-semibold">
                <Star className="w-3 h-3 text-[#d97706] fill-[#d97706]" />
                Verified Store by Fazle Rabbi
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1f2922] tracking-tight leading-[1.15]">
              {settings.storeTagline || 'Discover Premium Products, Ordered in 1-Click via WhatsApp.'}
            </h1>

            <p className="text-sm md:text-base text-[#516453] leading-relaxed max-w-xl">
              Enjoy a hassle-free shopping experience. Browse top trending lifestyle and electronic items, connect directly with the seller, and receive your order with fast cash-on-delivery.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                onClick={handleScrollToProducts}
                className="w-full sm:w-auto bg-[#2d6a4f] hover:bg-[#22553e] text-white font-bold text-sm md:text-base px-6 py-3.5 rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href="https://wa.me/8801706259256?text=Hello%20Fazle%20Rabbi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#25d366] hover:bg-[#20b858] text-white font-bold text-sm md:text-base px-5 py-3.5 rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Order</span>
              </a>

              <button
                onClick={() => setIsChatOpen(true)}
                className="w-full sm:w-auto bg-[#faf8f5] hover:bg-[#f0eae0] text-[#1f2922] font-bold text-xs md:text-sm px-4 py-3.5 rounded-xl border border-[#e8e2d8] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-[#2d6a4f]" />
                <span>Live Chat Support</span>
              </button>
            </div>

            {/* Seller Contact Quick Pill */}
            <div className="flex items-center gap-3 pt-2 text-xs text-[#516453] border-t border-[#e8e2d8] w-full">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#25d366]" />
                <span className="font-semibold text-[#1f2922]">Direct Contact:</span>
              </div>
              <a 
                href="tel:01706259256" 
                className="text-[#2d6a4f] hover:underline font-bold"
              >
                01706259256
              </a>
              <span className="text-[#7e9180]">•</span>
              <span className="text-[#7e9180] hidden sm:inline">Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image with Floating Trust Badges */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#e8e2d8] shadow-lg group">
              <img
                src={heroImage}
                alt="Premium Curated Store Collection"
                className="w-full h-[260px] sm:h-[320px] lg:h-[380px] object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Scrim for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/60 shadow-md flex items-center gap-2 text-xs font-bold text-[#1f2922]">
                <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
                <span>Live WhatsApp Store</span>
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#2d6a4f]">Curated Collection</p>
                  <h4 className="text-xs font-extrabold text-[#1f2922] truncate">100% Genuine Quality Guaranteed</h4>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-[#ebf3ea] text-[#2d6a4f] text-[11px] font-black shrink-0">
                  Top Rated
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Item Trust Badges Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white rounded-2xl border border-[#e8e2d8] flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-[#ebf3ea] text-[#25d366] flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4 fill-current" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#1f2922] truncate">Instant WhatsApp</h4>
            <p className="text-[10px] text-[#7e9180] truncate">Fast 1-tap checkout</p>
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-2xl border border-[#e8e2d8] flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-[#ebf3ea] text-[#2d6a4f] flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#1f2922] truncate">Fast Delivery</h4>
            <p className="text-[10px] text-[#7e9180] truncate">All over Bangladesh</p>
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-2xl border border-[#e8e2d8] flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-[#ebf3ea] text-[#2d6a4f] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#1f2922] truncate">100% Genuine</h4>
            <p className="text-[10px] text-[#7e9180] truncate">Quality checked items</p>
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-2xl border border-[#e8e2d8] flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-[#ebf3ea] text-[#2d6a4f] flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#1f2922] truncate">Direct Call & Support</h4>
            <p className="text-[10px] text-[#7e9180] truncate">01706259256</p>
          </div>
        </div>
      </div>
    </div>
  );
};

