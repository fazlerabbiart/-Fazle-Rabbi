import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, compact = false }) => {
  const { settings, createDirectWhatsAppUrl, addToCart } = useStore();

  const effectivePrice = product.salePrice ?? product.regularPrice;
  const hasDiscount = product.salePrice !== undefined && product.salePrice < product.regularPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - (product.salePrice ?? 0)) / product.regularPrice) * 100)
    : null;

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = createDirectWhatsAppUrl(product, 1);
    window.open(url, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="bg-white rounded-2xl border border-[#e8e2d8] overflow-hidden flex flex-col group hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:border-[#2d6a4f]/50 transition-all duration-300 cursor-pointer h-full relative"
    >
      {/* Product Image Area */}
      <div className="w-full aspect-square relative bg-[#f4efe6] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-[#d97706] text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs tracking-wide">
            -{discountPercent}%
          </span>
        )}

        {/* Out of Stock Overlay/Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-[#faf8f5]/85 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-[#1f2922] text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View Floating button on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-xs font-bold px-3.5 py-2 rounded-full shadow-md flex items-center gap-1.5 text-[#1f2922] border border-[#e8e2d8]">
            <Eye className="w-3.5 h-3.5 text-[#2d6a4f]" />
            Quick View
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 md:p-5 flex flex-col flex-1 gap-1.5 bg-white">
        {/* Category tag */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-[#2d6a4f] uppercase tracking-wider">
            {product.category}
          </span>
          {product.inStock ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[#516453] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
              In Stock
            </span>
          ) : (
            <span className="text-[11px] text-[#7e9180]">Sold out</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm md:text-[15px] text-[#1f2922] line-clamp-2 leading-snug group-hover:text-[#2d6a4f] transition-colors">
          {product.title}
        </h3>

        {/* Subtitle / specs */}
        {product.subtitle && (
          <p className="text-xs text-[#7e9180] line-clamp-1">
            {product.subtitle}
          </p>
        )}

        {/* Price & Actions Row */}
        <div className="mt-auto pt-3 flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-black text-lg text-[#1f2922]">
              {settings.currencySymbol}
              {effectivePrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs text-[#7e9180] line-through">
                {settings.currencySymbol}
                {product.regularPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
            <button
              onClick={handleWhatsAppOrder}
              disabled={!product.inStock}
              className={`sm:col-span-4 bg-[#2d6a4f] hover:bg-[#22553e] disabled:bg-[#e8e2d8] disabled:text-[#7e9180] text-white font-bold text-xs md:text-sm py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all shadow-xs ${
                !product.inStock ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
              }`}
              title="Order this product directly on WhatsApp"
            >
              {/* WhatsApp icon */}
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span>{compact ? 'Buy' : 'Order via WhatsApp'}</span>
            </button>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="sm:col-span-1 bg-[#faf8f5] hover:bg-[#f4efe6] text-[#1f2922] rounded-xl py-2.5 px-2 flex items-center justify-center transition-colors border border-[#e8e2d8] disabled:opacity-40 cursor-pointer shadow-2xs"
              title="Add to cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#2d6a4f]" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
