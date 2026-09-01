import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { Product } from '../types';
import { SlidersHorizontal, ArrowUpDown, X, Search, Sparkles } from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    settings,
  } = useStore();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Dynamic categories from existing products
  const productCategories = products
    .map((p) => p.category)
    .filter((cat, idx, arr) => Boolean(cat) && arr.indexOf(cat) === idx);
  const categories = ['all', ...productCategories];

  // Filter products
  let filtered = products.filter((product) => {
    // Category filter
    const matchesCategory =
      selectedCategory.toLowerCase() === 'all' ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    // Search query filter
    const matchesSearch =
      !searchQuery.trim() ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    // Stock filter
    const matchesStock = !onlyInStock || product.inStock;

    return matchesCategory && matchesSearch && matchesStock;
  });

  // Sort products
  filtered.sort((a, b) => {
    const priceA = a.salePrice ?? a.regularPrice;
    const priceB = b.salePrice ?? b.regularPrice;

    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0; // featured/default order
  });

  return (
    <div className="space-y-8">
      {/* Hero section */}
      {!searchQuery && selectedCategory.toLowerCase() === 'all' && (
        <HeroBanner onStartShopping={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />
      )}

      {/* Catalog Main Section */}
      <section id="catalog-section" className="space-y-6 pt-2">
        {/* Header and Filter Toolbar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-[#1f2922] tracking-tight">
                {selectedCategory.toLowerCase() === 'all' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-xs text-[#516453]">
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'} available for instant WhatsApp order
              </p>
            </div>

            {/* Sort & In-Stock toggle */}
            <div className="flex items-center gap-2 flex-wrap">
              <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#e8e2d8] bg-white text-xs font-bold text-[#1f2922] cursor-pointer shadow-2xs hover:bg-[#faf8f5]">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#2d6a4f] focus:ring-0"
                />
                <span>In Stock Only</span>
              </label>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products"
                  className="appearance-none bg-white border border-[#e8e2d8] text-xs font-bold text-[#1f2922] py-2 pl-3.5 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] cursor-pointer shadow-2xs"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#2d6a4f] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#2d6a4f] text-white shadow-xs'
                      : 'bg-white text-[#516453] border border-[#e8e2d8] hover:border-[#2d6a4f] hover:text-[#1f2922]'
                  }`}
                >
                  {cat === 'all' ? 'All Collections' : cat}
                </button>
              );
            })}
          </div>

          {/* Search Active Notification */}
          {searchQuery && (
            <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#e8e2d8] shadow-2xs">
              <span className="text-xs text-[#1f2922]">
                Searching for "<strong>{searchQuery}</strong>"
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#2d6a4f] hover:text-[#22553e] hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#e8e2d8] p-8 space-y-3 shadow-2xs">
            <Search className="w-10 h-10 text-[#2d6a4f] mx-auto opacity-50" />
            <h3 className="text-base font-bold text-[#1f2922]">
              No products found
            </h3>
            <p className="text-xs text-[#516453] max-w-sm mx-auto">
              We couldn't find any item matching your active filters. Try clearing filters or searching another keyword.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="bg-[#2d6a4f] hover:bg-[#22553e] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
