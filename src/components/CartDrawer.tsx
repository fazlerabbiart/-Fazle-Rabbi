import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Phone, LogIn, UserCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    settings,
    checkoutAndPlaceOrder,
    currentUser,
    customerProfile,
    setIsAuthModalOpen,
  } = useStore();

  const [customerName, setCustomerName] = useState(currentUser?.displayName || customerProfile?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || customerProfile?.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState(customerProfile?.address || '');
  const [customerNote, setCustomerNote] = useState('');
  const [formError, setFormError] = useState('');

  // Sync with currentUser or customerProfile when opened
  useEffect(() => {
    if (currentUser?.displayName && !customerName) {
      setCustomerName(currentUser.displayName);
    }
    if (currentUser?.phone && !customerPhone) {
      setCustomerPhone(currentUser.phone);
    }
    if (customerProfile?.address && !deliveryAddress) {
      setDeliveryAddress(customerProfile.address);
    }
  }, [currentUser, customerProfile]);

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.product.salePrice ?? item.product.regularPrice) * item.quantity,
    0
  );

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!customerPhone.trim()) {
      setFormError('Please enter your WhatsApp contact phone number');
      return;
    }
    if (!deliveryAddress.trim()) {
      setFormError('Please provide your delivery address');
      return;
    }

    setFormError('');
    checkoutAndPlaceOrder({
      name: customerName,
      phone: customerPhone,
      address: deliveryAddress,
      note: customerNote,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-50">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#e8e2d8] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#e8e2d8] flex items-center justify-between bg-[#faf8f5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2d6a4f]" />
              <h2 className="text-lg font-bold text-[#1f2922]">Shopping Cart</h2>
              <span className="bg-[#ebf3ea] text-[#2d6a4f] text-xs font-bold px-2 py-0.5 rounded-full border border-[#2d6a4f]/20">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#516453] hover:bg-[#f4efe6] hover:text-[#1f2922] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
              <div className="w-16 h-16 rounded-full bg-[#f4efe6] flex items-center justify-center text-[#2d6a4f] mb-4 border border-[#e8e2d8]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-[#1f2922] mb-1">
                Your cart is empty
              </h3>
              <p className="text-xs text-[#7e9180] max-w-xs mb-6">
                Explore our catalog to find premium electronics, fashion, and home goods.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#2d6a4f] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#22553e] transition-colors cursor-pointer shadow-xs"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-white">
              {/* Product items list */}
              <div className="space-y-3">
                {cart.map((item) => {
                  const effectivePrice = item.product.salePrice ?? item.product.regularPrice;
                  return (
                    <div
                      key={item.product.id}
                      className="flex gap-3 p-3 bg-[#faf8f5] rounded-xl border border-[#e8e2d8]"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded-lg bg-white shrink-0 border border-[#e8e2d8]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#1f2922] truncate">
                          {item.product.title}
                        </h4>
                        <p className="text-[11px] text-[#516453] font-medium">
                          {settings.currencySymbol}
                          {effectivePrice.toLocaleString()} each
                        </p>
                        {item.customerNote && (
                          <p className="text-[10px] text-[#2d6a4f] italic truncate mt-0.5">
                            Note: {item.customerNote}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#e8e2d8] rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-[#516453] hover:bg-[#f4efe6] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-[#1f2922]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-[#516453] hover:bg-[#f4efe6] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-black text-[#1f2922]">
                            {settings.currencySymbol}
                            {(effectivePrice * item.quantity).toLocaleString()}
                          </span>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#7e9180] hover:text-red-600 p-1 cursor-pointer transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customer details form */}
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#1f2922] uppercase tracking-wider">
                    Delivery Details for WhatsApp Order
                  </h3>

                  {currentUser ? (
                    <span className="text-[11px] text-[#2d6a4f] font-bold flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-[#25d366]" />
                      <span>{currentUser.displayName || 'Logged In'}</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAuthModalOpen(true)}
                      className="text-[11px] text-[#2d6a4f] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <LogIn className="w-3 h-3" />
                      <span>Login to Auto-fill</span>
                    </button>
                  )}
                </div>

                {formError && (
                  <div className="p-2.5 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-[#1f2922] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full text-xs bg-[#faf8f5] border border-[#e8e2d8] rounded-xl p-2.5 text-[#1f2922] placeholder-[#7e9180] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1f2922] mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +880 1712 345678"
                    className="w-full text-xs bg-[#faf8f5] border border-[#e8e2d8] rounded-xl p-2.5 text-[#1f2922] placeholder-[#7e9180] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1f2922] mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="House/Apartment, Street, City/Area"
                    className="w-full text-xs bg-[#faf8f5] border border-[#e8e2d8] rounded-xl p-2.5 text-[#1f2922] placeholder-[#7e9180] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1f2922] mb-1">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="e.g. Call before delivery, morning preferred"
                    className="w-full text-xs bg-[#faf8f5] border border-[#e8e2d8] rounded-xl p-2.5 text-[#1f2922] placeholder-[#7e9180] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                  />
                </div>
              </form>
            </div>
          )}

          {/* Footer & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#e8e2d8] bg-[#faf8f5] space-y-3">
              <div className="space-y-1.5 text-xs text-[#516453]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1f2922]">
                    {settings.currencySymbol}
                    {totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="text-[#2d6a4f] font-semibold">Free / Standard</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1f2922] pt-2 border-t border-[#e8e2d8]">
                  <span>Total Amount</span>
                  <span className="text-base font-black text-[#1f2922]">
                    {settings.currencySymbol}
                    {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-[#2d6a4f] hover:bg-[#22553e] text-white font-bold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span>Complete Order via WhatsApp (01706259256)</span>
              </button>

              <a
                href="tel:01706259256"
                className="w-full bg-[#ebf3ea] hover:bg-[#d8ebd6] text-[#2d6a4f] font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 border border-[#2d6a4f]/20 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Store Owner (01706259256)</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
