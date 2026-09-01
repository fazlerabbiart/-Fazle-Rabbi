import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import {
  UploadCloud,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  PlusCircle,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';

export const ProductManagement: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleStock, settings } = useStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [regularPrice, setRegularPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);
  const [imageUrl, setImageUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB_MGLAiAzfpmcWR2BNPr7dGL9mQ58a11iQ28nq17YkokfUUGHxlDKld7RvgNW4xDON7ML4XUFxEUpisBdpG8sUdZGeI_gI78zwCGbZ429GJu9tMKicLYcnuowJ5AVQxSKL37YD6Jd-4WcRHj5Ih2nenHFPDTFDX6KyZn4NiAsYgUo2rF6L3rxp19nrbCZkAQKK_E7qNUgds50IlXaMjZEb3PLswQci9ysgiYHj_iFjLJuq8AJNaVJx8Q'
  );
  const [adminSearch, setAdminSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  const presetImages = [
    { label: 'Ceramic Mug', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_MGLAiAzfpmcWR2BNPr7dGL9mQ58a11iQ28nq17YkokfUUGHxlDKld7RvgNW4xDON7ML4XUFxEUpisBdpG8sUdZGeI_gI78zwCGbZ429GJu9tMKicLYcnuowJ5AVQxSKL37YD6Jd-4WcRHj5Ih2nenHFPDTFDX6KyZn4NiAsYgUo2rF6L3rxp19nrbCZkAQKK_E7qNUgds50IlXaMjZEb3PLswQci9ysgiYHj_iFjLJuq8AJNaVJx8Q' },
    { label: 'Headphones', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRnXb2aRPaWpizont8f0GLeS8zoZFAmGKrZNkmodkFPQF1vfRNZhBpTXQ8wP2ah5GnydT22bQeNXrTFWMXhWvGgJIqaEJpKPEOwKiHTu3fkDWdMvVc4FL_Wcz3WHUrNEh92yAag7HL9iWYvY-fbLObim9Fju370Xl9i_7mDM-CR0305lDbtiEMRKchdDHfPhsOkFogP5kNTWDY-1O4J22KH2FeFIkFOlwzuOuJZwAuRYYkdr6v4hcDmw' },
    { label: 'Smartwatch', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNRPTcNDkJGvotQCjortT_zvV4wXUrJbM6bc9-rzZOQMWBZXNXe0mywWIIVC4z59EK4HlJxDUAnRVYvLxCCM2vk4Lmi-gZX0Mw5bHd_ovbdg4wbkXRG1xMOYcc6ISX2md5WsaMn0B_Ts0urE9UEAWEi1LY70Xds1rkwR_GyhLLHReiExabsL4Ki9zvoa5rt0_9NiGxUl2dBK2qkG0hTu6Qu5Zn-JTWXGB13D6cB7NfZBD4BFmxBfdfMA' },
    { label: 'Tote Bag', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOpjugeDjQCTG7TvHYFG7cx7MRfZfCGhEK2ma9LwUyw289MsglI2i82hvPCygYXJYc7MAl4HS7TVOjvDYXBm56JULpdYDHUecJovF8ZX7U1UA710JfJ-nvPtYpSQZT7FlIFD386iVISI7ykCw8EXXEjPbmKcqu3Avcg0XKgLrFMVIjPu51w_iE7l81mMGX6-l7WyY4zFUJF2IBrtoQli3XCDybkQAH0u9YtWkSWtdY0ivXfkN79K4QaA' },
    { label: 'Sneakers', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD5CVRyV-wReIfi2bNWiPRVmUPJHRU_JK4ZH0lR_PaY0soKNRgvrFoC0PgXlRrMN1nd_km_i5aIneoVxEORBcY9ZXosPmm6eexYAoYeq-g7YsyHwUvDXOpbgqXgpFO0jJK1ZTf4nP3xuvADUrHnHbDWmPNORdKJK2952phAMgBf56dBymeOUJzNu8oGo4p75LgJU1ML1auJzZWbm5fCOC6EzBwVp93fCPMgNDh4WnwfJm8vUmWWlVJaQ' },
    { label: 'Water Bottle', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDctSlb2VCi6pRPRFpzlqYp0kLgr_cYjLZqf9_SiGyVgqQrbKLyI1hPHiBwMUkiiGnNQp8ANudoHVurTMDGN6MAhdf7gQTBnzYtpD6U4B9Flidf2B3dmpUytxMPfm2hneNFGcU1cVWIQTpo18DKQT1PLoZuc7WHKrP-LgLKmVWPPCAOG5w8O21fVZWfO4VHLaGeVKJnLwxUSh6yhfEIMb95AprUTMacRolwvWSAEX51RJVl-kt-i-LuEQ' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setCategory(product.category);
    setRegularPrice(product.regularPrice.toString());
    setSalePrice(product.salePrice ? product.salePrice.toString() : '');
    setDescription(product.description);
    setInStock(product.inStock);
    setImageUrl(product.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Electronics');
    setRegularPrice('');
    setSalePrice('');
    setDescription('');
    setInStock(true);
    setImageUrl(presetImages[0].url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedRegular = parseFloat(regularPrice) || 0;
    const parsedSale = salePrice ? parseFloat(salePrice) : undefined;

    if (editingId) {
      updateProduct(editingId, {
        title,
        category,
        regularPrice: parsedRegular,
        salePrice: parsedSale,
        description,
        inStock,
        imageUrl,
      });
      cancelEdit();
    } else {
      addProduct({
        title,
        category,
        regularPrice: parsedRegular,
        salePrice: parsedSale,
        description,
        inStock,
        imageUrl,
      });
      cancelEdit();
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(adminSearch.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === 'all' || p.category.toLowerCase() === selectedCategoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#1f2922] tracking-tight">
            Product Management
          </h1>
          <p className="text-base text-[#516453]">
            Add new products or remove existing items from your store catalog.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#ebf3ea] border border-[#2d6a4f]/20 rounded-full text-xs font-bold text-[#2d6a4f] self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
          <span>Firebase Firestore Connected</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Add/Edit Product Form (4 cols) */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1f2922]">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-[#1f2922] mb-1.5">
                  Product Image
                </label>
                <label
                  htmlFor="admin-file-upload"
                  className="border-2 border-dashed border-[#e8e2d8] rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2d6a4f] transition-colors bg-[#faf8f5] relative overflow-hidden group"
                >
                  {imageUrl ? (
                    <div className="w-full h-32 relative rounded-lg overflow-hidden flex items-center justify-center bg-white border border-[#e8e2d8]">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                        Click to change image
                      </div>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-[#7e9180] mb-2" />
                      <p className="text-xs font-bold text-[#1f2922]">
                        Click to upload image
                      </p>
                      <p className="text-[11px] text-[#7e9180]">
                        SVG, PNG, JPG or GIF (max. 800×400px)
                      </p>
                    </>
                  )}
                  <input
                    id="admin-file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Preset image quick selector */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-[#7e9180] w-full">Quick sample presets:</span>
                  {presetImages.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                        imageUrl === preset.url
                          ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                          : 'bg-white text-[#516453] border-[#e8e2d8] hover:bg-[#faf8f5]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-semibold text-[#1f2922] mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Minimalist Coffee Mug"
                  className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-lg p-2.5 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-xs font-semibold text-[#1f2922] mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-lg p-2.5 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] cursor-pointer"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home Goods">Home Goods</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Apparel">Apparel</option>
                </select>
              </div>

              {/* Price Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1f2922] mb-1">
                    Regular Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7e9180]">
                      {settings.currencySymbol}
                    </span>
                    <input
                      type="number"
                      required
                      value={regularPrice}
                      onChange={(e) => setRegularPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-lg py-2.5 pl-7 pr-2.5 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1f2922] mb-1">
                    Sale Price (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7e9180]">
                      {settings.currencySymbol}
                    </span>
                    <input
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-lg py-2.5 pl-7 pr-2.5 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#1f2922] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product materials, specs, features..."
                  className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-lg p-2.5 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] resize-none"
                />
              </div>

              {/* Stock Toggle */}
              <div className="flex items-center justify-between py-2 border-t border-[#e8e2d8]">
                <div>
                  <span className="text-xs font-bold text-[#1f2922] block">
                    In Stock
                  </span>
                  <span className="text-[11px] text-[#7e9180]">
                    Available for customer WhatsApp ordering
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#e8e2d8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2d6a4f]" />
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-[#2d6a4f] hover:bg-[#22553e] text-white py-3 rounded-xl text-xs font-bold tracking-wide transition-all shadow-xs cursor-pointer active:scale-98"
              >
                {editingId ? 'Update Product' : 'Publish Product'}
              </button>
            </form>
          </div>
        </section>

        {/* Right Column: Existing Products List (8 cols) */}
        <section className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 shadow-xs flex-1 flex flex-col">
            {/* Table Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-4 border-b border-[#e8e2d8]">
              <div>
                <h2 className="text-lg font-bold text-[#1f2922]">
                  Existing Products ({filteredProducts.length})
                </h2>
                <p className="text-xs text-[#7e9180]">Live catalog synced with WhatsApp storefront</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7e9180]" />
                  <input
                    type="text"
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-8 pr-3 py-1.5 bg-[#faf8f5] border border-[#e8e2d8] rounded-full text-xs text-[#1f2922] placeholder-[#7e9180] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] font-bold text-[#7e9180] uppercase tracking-wider border-b border-[#e8e2d8]">
                    <th className="pb-3 font-semibold">Product</th>
                    <th className="pb-3 font-semibold">Price</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e2d8] text-xs">
                  {filteredProducts.map((p) => {
                    const isDiscounted = p.salePrice && p.salePrice < p.regularPrice;
                    return (
                      <tr
                        key={p.id}
                        className={`hover:bg-[#faf8f5] transition-colors group ${
                          !p.inStock ? 'opacity-65' : ''
                        }`}
                      >
                        {/* Product Info */}
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-[#faf8f5] border border-[#e8e2d8] overflow-hidden shrink-0">
                              <img
                                src={p.imageUrl}
                                alt={p.title}
                                className={`w-full h-full object-cover ${
                                  !p.inStock ? 'grayscale' : ''
                                }`}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0 max-w-xs">
                              <p className="font-bold text-[#1f2922] truncate">
                                {p.title}
                              </p>
                              <p className="text-[11px] text-[#7e9180]">
                                {p.category}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-3 align-middle">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-bold text-[#1f2922]">
                              {settings.currencySymbol}
                              {(p.salePrice ?? p.regularPrice).toLocaleString()}
                            </span>
                            {isDiscounted && (
                              <span className="text-[10px] text-[#7e9180] line-through">
                                {settings.currencySymbol}
                                {p.regularPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 align-middle">
                          {p.inStock ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ebf3ea] text-[#2d6a4f] text-[11px] font-bold border border-[#2d6a4f]/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f4efe6] text-[#7e9180] text-[11px] font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                              Out of Stock
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 align-middle text-right">
                          <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEdit(p)}
                              className="text-[#7e9180] hover:text-[#2d6a4f] p-1.5 rounded-md hover:bg-[#faf8f5] transition-colors cursor-pointer"
                              title="Edit product details"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toggleStock(p.id)}
                              className="text-[#7e9180] hover:text-[#1f2922] p-1.5 rounded-md hover:bg-[#faf8f5] transition-colors cursor-pointer"
                              title={p.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                            >
                              {p.inStock ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5 text-[#2d6a4f]" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${p.title}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="text-[#7e9180] hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="py-12 text-center text-xs text-[#7e9180]">
                  No products found matching your search.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
