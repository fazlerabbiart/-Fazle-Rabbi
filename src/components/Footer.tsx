import React, { useState } from 'react';
import { Mail, Share2, MessageCircle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings, showToast } = useStore();
  const [modalType, setModalType] = useState<'contact' | 'privacy' | 'terms' | null>(null);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: settings.storeName,
          text: settings.storeTagline,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Store link copied to clipboard!');
    }
  };

  return (
    <>
      <footer className="w-full py-12 bg-white border-t border-[#e8e2d8] mt-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 gap-6">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xl font-black text-[#1f2922]">
              {settings.storeName}
            </span>
            <span className="text-xs text-[#7e9180]">
              © {new Date().getFullYear()} {settings.storeName}. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-xs font-bold text-[#516453]">
            <button
              onClick={() => setModalType('contact')}
              className="hover:text-[#2d6a4f] transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-[#2d6a4f] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-[#2d6a4f] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${settings.email || 'contact@whatsappstore.com'}`}
              className="p-2.5 text-[#516453] hover:text-[#2d6a4f] transition-colors rounded-full hover:bg-[#f4efe6] border border-[#e8e2d8]"
              title="Email support"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={handleShare}
              className="p-2.5 text-[#516453] hover:text-[#2d6a4f] transition-colors rounded-full hover:bg-[#f4efe6] border border-[#e8e2d8] cursor-pointer"
              title="Share store link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Info Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setModalType(null)}
          />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 border border-[#e8e2d8] animate-in fade-in-50 zoom-in-95 duration-200">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-1.5 text-[#7e9180] hover:text-[#1f2922] hover:bg-[#f4efe6] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'contact' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#1f2922]">Contact Us</h3>
                <p className="text-xs text-[#516453] leading-relaxed">
                  Have questions regarding your order or our catalog? We are directly available on WhatsApp and email.
                </p>
                <div className="space-y-2 text-xs bg-[#faf8f5] p-4 rounded-xl border border-[#e8e2d8]">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#2d6a4f]" />
                    <span className="font-bold text-[#1f2922]">WhatsApp:</span>
                    <span className="text-[#516453]">{settings.whatsappNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#2d6a4f]" />
                    <span className="font-bold text-[#1f2922]">Email:</span>
                    <span className="text-[#516453]">{settings.email || 'contact@whatsappstore.com'}</span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '').replace(/^01/, '8801') || '8801706259256'}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#2d6a4f] hover:bg-[#22553e] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with Customer Representative
                </a>
              </div>
            )}

            {modalType === 'privacy' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#1f2922]">Privacy Policy</h3>
                <div className="text-xs text-[#516453] space-y-2 max-h-60 overflow-y-auto pr-2">
                  <p>
                    At {settings.storeName}, your personal details (name, delivery address, phone number) are only utilized to process your purchases via end-to-end encrypted WhatsApp communication.
                  </p>
                  <p>
                    We do not sell, distribute, or share customer contact records with third-party advertising networks.
                  </p>
                </div>
              </div>
            )}

            {modalType === 'terms' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#1f2922]">Terms of Service</h3>
                <div className="text-xs text-[#516453] space-y-2 max-h-60 overflow-y-auto pr-2">
                  <p>
                    1. <strong>Orders & Verification:</strong> All orders submitted through our storefront are verified manually with the customer over official WhatsApp chat prior to shipment dispatch.
                  </p>
                  <p>
                    2. <strong>Payment Options:</strong> Cash on Delivery (COD) and direct mobile banking / bank transfer are confirmed via chat.
                  </p>
                  <p>
                    3. <strong>Return Policy:</strong> Defective or damaged items reported within 48 hours of courier delivery are eligible for replacement.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
