import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  User,
  Mail, 
  Phone, 
  MessageCircle, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  LogIn,
  LogOut
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, setIsAuthModalOpen, logout } = useStore();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const profile = {
    name: 'Fazle Rabbi',
    role: 'Store Owner & Admin',
    email: 'fazlerabbiart@gmail.com',
    phone: '01706259256',
    formattedPhone: '+880 1706-259256',
    whatsappUrl: 'https://wa.me/8801706259256?text=' + encodeURIComponent('Hello Fazle Rabbi, I am contacting you regarding your store.'),
    location: 'Bangladesh',
    bio: 'Hello! I am Fazle Rabbi, the owner of this WhatsApp Store. If you have any inquiries regarding our products, custom orders, or bulk purchasing, feel free to reach out directly.',
    status: 'Online & Available',
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#e8e2d8] overflow-hidden z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Top Decorative Banner */}
        <div className="h-20 bg-gradient-to-r from-[#2d6a4f] via-[#40916c] to-[#1b4332] relative shrink-0">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 pb-6 pt-0 relative bg-white overflow-y-auto">
          {/* Icon Avatar with Status Badge */}
          <div className="flex justify-between items-end -mt-10 mb-3">
            <div className="relative">
              <div className="w-18 h-18 rounded-2xl bg-white p-1 shadow-lg border-2 border-white">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#52b788] text-white flex items-center justify-center font-extrabold text-2xl shadow-inner">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <span 
                className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#25d366] border-2 border-white shadow-xs" 
                title="Active on WhatsApp"
              />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#ebf3ea] text-[#2d6a4f] rounded-full text-xs font-bold border border-[#2d6a4f]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{profile.status}</span>
            </div>
          </div>

          {/* Name & Role */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-[#1f2922]">
                {profile.name}
              </h2>
              <ShieldCheck className="w-5 h-5 text-[#2d6a4f]" title="Verified Owner" />
            </div>
            <p className="text-xs font-bold text-[#2d6a4f] flex items-center gap-1">
              <span>{profile.role}</span>
            </p>
            <div className="flex items-center gap-1 text-xs text-[#7e9180] mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Active Logged-In User Banner */}
          <div className="mb-4 p-3 bg-[#faf8f5] rounded-xl border border-[#e8e2d8] flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <p className="text-[10px] uppercase font-bold text-[#7e9180]">Your Account Session</p>
              {currentUser ? (
                <p className="text-xs font-bold text-[#1f2922] truncate">
                  {currentUser.displayName || currentUser.email} ({currentUser.role})
                </p>
              ) : (
                <p className="text-xs text-[#516453]">Not logged in (Browsing as guest)</p>
              )}
            </div>

            {currentUser ? (
              <button
                onClick={() => {
                  logout();
                }}
                className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-red-200"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  setIsAuthModalOpen(true);
                }}
                className="px-3 py-1 bg-[#2d6a4f] hover:bg-[#22553e] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
              >
                <LogIn className="w-3 h-3" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Short Bio */}
          <p className="text-xs text-[#516453] leading-relaxed mb-4 bg-[#faf8f5] p-3 rounded-xl border border-[#e8e2d8]">
            {profile.bio}
          </p>

          {/* Contact Details List */}
          <div className="space-y-2 mb-4">
            <h3 className="text-[11px] font-bold text-[#1f2922] uppercase tracking-wider">
              Store Owner Contact Channels
            </h3>

            {/* WhatsApp Item */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e8e2d8] hover:border-[#25d366] transition-colors shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#ebf3ea] text-[#25d366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-[#7e9180] font-medium">WhatsApp</p>
                  <p className="text-xs font-bold text-[#1f2922] truncate">
                    {profile.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(profile.phone, 'phone')}
                  className="p-1 text-[#7e9180] hover:text-[#2d6a4f] rounded-md transition-colors cursor-pointer"
                  title="Copy Phone Number"
                >
                  {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-[#25d366]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-[#25d366] hover:bg-[#20b858] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                >
                  <span>Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Email Item */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e8e2d8] hover:border-[#2d6a4f] transition-colors shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#ebf3ea] text-[#2d6a4f] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-[#7e9180] font-medium">Email</p>
                  <p className="text-xs font-bold text-[#1f2922] truncate">
                    {profile.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(profile.email, 'email')}
                  className="p-1 text-[#7e9180] hover:text-[#2d6a4f] rounded-md transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-[#25d366]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className="px-2.5 py-1 bg-[#faf8f5] hover:bg-[#f4efe6] text-[#1f2922] rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer border border-[#e8e2d8]"
                >
                  <span>Mail</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Direct Call Item */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e8e2d8] hover:border-[#2d6a4f] transition-colors shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#ebf3ea] text-[#2d6a4f] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-[#7e9180] font-medium">Call Directly</p>
                  <p className="text-xs font-bold text-[#1f2922] truncate">
                    {profile.formattedPhone}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${profile.phone}`}
                className="px-2.5 py-1 bg-[#faf8f5] hover:bg-[#f4efe6] text-[#1f2922] rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer border border-[#e8e2d8]"
              >
                <span>Call</span>
                <Phone className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Direct Action WhatsApp Button */}
          <a
            href={profile.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#25d366] hover:bg-[#20b858] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Direct WhatsApp Message</span>
          </a>
        </div>
      </div>
    </div>
  );
};

