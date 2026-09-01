import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, ShoppingCart, MessageSquare, Check, ShieldCheck, Truck, Phone } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { settings, createDirectWhatsAppUrl, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [customerNote, setCustomerNote] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset state on product change
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setCustomerNote('');
      setActiveImageIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.imageUrl];

  const effectivePrice = product.salePrice ?? product.regularPrice;
  const totalPrice = effectivePrice * quantity;
  const hasDiscount = product.salePrice !== undefined && product.salePrice < product.regularPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - (product.salePrice ?? 0)) / product.regularPrice) * 100)
    : null;

  const handleWhatsAppOrder = () => {
    const url = createDirectWhatsAppUrl(product, quantity, customerNote);
    window.open(url, '_blank');
    onClose();
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, customerNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal / Bottom Sheet */}
      <div className="relative w-full md:max-w-3xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row animate-in slide-in-from-bottom-5 duration-300 border border-[#e8e2d8]">
        {/* Mobile Pull Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 bg-[#e8e2d8] rounded-full" />
        </div>

        {/* Close button for desktop */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#516453] hover:text-[#1f2922] hover:bg-[#f4efe6] transition-colors border border-[#e8e2d8] shadow-sm cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 bg-[#f4efe6] relative flex flex-col justify-between p-5 shrink-0">
          <div className="w-full aspect-square relative rounded-2xl overflow-hidden flex items-center justify-center bg-white border border-[#e8e2d8] shadow-2xs">
            <img
              src={images[activeImageIndex] || product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-300"
              referrerPolicy="no-referrer"
            />

            {hasDiscount && (
              <span className="absolute top-3 left-3 bg-[#d97706] text-white text-xs font-black px-2.5 py-1 rounded-full shadow-xs">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Gallery Pagination Dots / Thumbnails */}
          {images.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'bg-[#2d6a4f] w-6'
                      : 'bg-[#d5ccbe] hover:bg-[#2d6a4f]'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details & Purchase Actions */}
        <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col overflow-y-auto max-h-[75vh] md:max-h-[85vh] bg-white">
          {/* Header Tags */}
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#ebf3ea] text-[#2d6a4f] text-[11px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-[#2d6a4f]/20">
              {product.category}
            </span>
            {product.inStock ? (
              <span className="flex items-center text-[#516453] text-[11px] font-semibold tracking-wider uppercase gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
                In Stock
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-red-500 uppercase tracking-wider">
                Out of Stock
              </span>
            )}
          </div>

          {/* Product Title */}
          <h2 className="text-xl md:text-2xl font-black text-[#1f2922] leading-tight mb-2">
            {product.title}
          </h2>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-4 flex-wrap">
            <span className="text-2xl font-black text-[#1f2922]">
              {settings.currencySymbol}
              {effectivePrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-[#7e9180] line-through">
                {settings.currencySymbol}
                {product.regularPrice.toLocaleString()}
              </span>
            )}
            {hasDiscount && (
              <span className="text-xs font-bold text-[#d97706] bg-[#fef3c7] px-2 py-0.5 rounded-md border border-[#d97706]/20">
                Save {settings.currencySymbol}
                {(product.regularPrice - (product.salePrice ?? 0)).toLocaleString()}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-[#e8e2d8] pt-3 mb-4">
            <p className="text-sm text-[#516453] leading-relaxed">
              {product.description}
            </p>
            {product.specs && (
              <div className="mt-3 p-3 bg-[#faf8f5] rounded-xl text-xs text-[#516453] border border-[#e8e2d8] font-mono">
                {product.specs}
              </div>
            )}
          </div>

          {/* Quantity and Custom Note */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1f2922]">Quantity</span>
              <div className="flex items-center border border-[#e8e2d8] rounded-xl overflow-hidden bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || !product.inStock}
                  className="px-3 py-1.5 text-[#516453] hover:bg-[#f4efe6] disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-1 text-sm font-bold text-[#1f2922]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  disabled={!product.inStock}
                  className="px-3 py-1.5 text-[#516453] hover:bg-[#f4efe6] disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Optional note */}
            <div>
              <label className="block text-xs font-bold text-[#1f2922] mb-1">
                Order Notes / Preferences (Optional)
              </label>
              <input
                type="text"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder="e.g. Size, Color, or Special requests..."
                className="w-full text-xs bg-[#faf8f5] border border-[#e8e2d8] rounded-xl p-3 text-[#1f2922] placeholder-[#7e9180] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
              />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-auto flex flex-col gap-2.5 pt-2">
            <button
              onClick={handleWhatsAppOrder}
              disabled={!product.inStock}
              className="w-full bg-[#2d6a4f] hover:bg-[#22553e] disabled:bg-[#e8e2d8] disabled:text-[#7e9180] text-white font-bold text-sm md:text-base py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 active:scale-98 transition-transform shadow-md cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span>
                Order via WhatsApp (01706259256) • {settings.currencySymbol}
                {totalPrice.toLocaleString()}
              </span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="bg-[#faf8f5] hover:bg-[#f4efe6] text-[#1f2922] font-bold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 border border-[#e8e2d8] transition-colors cursor-pointer shadow-2xs"
              >
                <ShoppingCart className="w-4 h-4 text-[#2d6a4f]" />
                <span>Add to Cart</span>
              </button>

              <a
                href="tel:01706259256"
                className="bg-[#ebf3ea] hover:bg-[#d8ebd6] text-[#2d6a4f] font-bold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 border border-[#2d6a4f]/20 transition-colors cursor-pointer shadow-2xs"
              >
                <Phone className="w-4 h-4 text-[#2d6a4f]" />
                <span>Call 01706259256</span>
              </a>
            </div>
          </div>

          {/* Assurance info */}
          <div className="mt-4 pt-3 border-t border-[#e8e2d8] flex items-center justify-around text-[11px] text-[#516453]">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span>Verified Store</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span>Fast Courier</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span>Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
