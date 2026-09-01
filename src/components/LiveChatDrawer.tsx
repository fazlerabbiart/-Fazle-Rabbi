import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Send,
  MessageCircle,
  Phone,
  CheckCircle2,
  Database,
  Sparkles,
  User,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export const LiveChatDrawer: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    sendChatMessage,
    settings,
    customerProfile,
    isFirebaseConnected
  } = useStore();

  const [inputMessage, setInputMessage] = useState('');
  const [senderName, setSenderName] = useState(customerProfile?.name || '');
  const [senderPhone, setSenderPhone] = useState(customerProfile?.phone || '');
  const [showProfileInputs, setShowProfileInputs] = useState(!customerProfile?.name);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  if (!isChatOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setIsSending(true);
    await sendChatMessage({
      text: inputMessage,
      senderName: senderName || 'Customer',
      senderPhone: senderPhone || undefined,
    });

    setInputMessage('');
    setIsSending(false);
  };

  const whatsappDirectUrl = `https://wa.me/8801706259256?text=${encodeURIComponent(
    `Hello Fazle Rabbi, I am contacting you from your online store.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsChatOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <MessageCircle className="w-5 h-5 text-[#25d366]" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25d366] border-2 border-[#1b4332]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-black tracking-wide">Live Store Chat</h2>
                <span className="flex items-center gap-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white/90">
                  <Database className="w-2.5 h-2.5 text-[#52b788]" />
                  Firebase Synced
                </span>
              </div>
              <p className="text-[11px] text-white/80">
                Fazle Rabbi • 01706259256 (WhatsApp Active)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsChatOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
            aria-label="Close live chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Quick Action Bar */}
        <div className="bg-[#ebf3ea] px-4 py-2.5 border-b border-[#2d6a4f]/20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[#2d6a4f] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#25d366]" />
            <span>Direct WhatsApp & Call:</span>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 bg-[#25d366] hover:bg-[#20b858] text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-all"
            >
              <span>WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="tel:01706259256"
              className="px-2.5 py-1 bg-white hover:bg-[#faf8f5] text-[#2d6a4f] border border-[#2d6a4f]/20 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all"
            >
              <Phone className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>
        </div>

        {/* Sender profile toggle bar */}
        <div className="px-4 py-2 bg-[#faf8f5] border-b border-[#e8e2d8] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-[#7e9180]" />
            <span className="text-[#516453] text-[11px]">
              Chatting as: <strong className="text-[#1f2922]">{senderName || 'Customer'}</strong>
            </span>
          </div>
          <button
            onClick={() => setShowProfileInputs(!showProfileInputs)}
            className="text-[11px] text-[#2d6a4f] hover:underline font-semibold cursor-pointer"
          >
            {showProfileInputs ? 'Hide info' : 'Edit info'}
          </button>
        </div>

        {/* Optional Customer Profile Inputs */}
        {showProfileInputs && (
          <div className="p-3 bg-[#f4efe6]/50 border-b border-[#e8e2d8] grid grid-cols-2 gap-2 animate-in fade-in duration-150">
            <div>
              <label className="block text-[10px] font-semibold text-[#516453] mb-0.5">Your Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Tanvir"
                className="w-full bg-white border border-[#e8e2d8] rounded-md px-2 py-1 text-xs text-[#1f2922] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-[#516453] mb-0.5">Your Phone (Optional)</label>
              <input
                type="tel"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="017xxxxxxxx"
                className="w-full bg-white border border-[#e8e2d8] rounded-md px-2 py-1 text-xs text-[#1f2922] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
              />
            </div>
          </div>
        )}

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf8f5]">
          <div className="text-center my-2">
            <span className="text-[10px] bg-white text-[#7e9180] px-3 py-1 rounded-full border border-[#e8e2d8] shadow-2xs">
              Messages are saved to Firebase Firestore in real-time
            </span>
          </div>

          {chatMessages.map((msg) => {
            const isCustomer = msg.sender === 'customer';
            const isBot = msg.sender === 'bot';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'} max-w-full`}
              >
                <div className="flex items-center gap-1 mb-1 px-1">
                  <span className="text-[10px] font-bold text-[#516453]">
                    {msg.senderName}
                  </span>
                  {msg.senderPhone && (
                    <span className="text-[9px] text-[#7e9180]">({msg.senderPhone})</span>
                  )}
                  <span className="text-[9px] text-[#7e9180]">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div
                  className={`p-3 rounded-2xl text-xs max-w-[85%] shadow-2xs ${
                    isCustomer
                      ? 'bg-[#2d6a4f] text-white rounded-tr-xs'
                      : isBot
                      ? 'bg-white text-[#1f2922] border border-[#e8e2d8] rounded-tl-xs'
                      : 'bg-[#ebf3ea] text-[#1f2922] border border-[#2d6a4f]/20 rounded-tl-xs'
                  }`}
                >
                  {msg.productTitle && (
                    <div className="mb-1.5 p-1.5 bg-black/10 rounded-lg text-[10px] flex items-center gap-1 font-semibold">
                      <ShoppingBag className="w-3 h-3 shrink-0" />
                      <span className="truncate">Inquiry: {msg.productTitle}</span>
                    </div>
                  )}
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#e8e2d8] flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your question or order request..."
            className="flex-1 bg-[#faf8f5] border border-[#e8e2d8] rounded-xl px-3.5 py-2.5 text-xs text-[#1f2922] placeholder-[#7e9180] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isSending}
            className="w-10 h-10 bg-[#2d6a4f] hover:bg-[#22553e] disabled:bg-[#e8e2d8] text-white rounded-xl flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 shadow-2xs active:scale-95"
            title="Send Message to Firebase"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
