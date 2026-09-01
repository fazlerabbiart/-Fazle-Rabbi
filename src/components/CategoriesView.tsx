import React from 'react';
import { useStore } from '../context/StoreContext';
import { Headphones, Shirt, Home, Sparkles, Watch, ShoppingBag, ArrowRight } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const { products, setSelectedCategory, setActiveView } = useStore();

  const categories = [
    {
      name: 'Electronics',
      icon: Headphones,
      description: 'Headphones, Smartwatches, and modern gadgets',
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      name: 'Fashion',
      icon: Shirt,
      description: 'Urban footwear, tote bags, and everyday essentials',
      color: 'from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      name: 'Home Goods',
      icon: Home,
      description: 'Ceramic mugs, pour-over coffee sets, and decor',
      color: 'from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      name: 'Lifestyle',
      icon: Sparkles,
      description: 'Eco-glass water bottles, wellness and hydration',
      color: 'from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      name: 'Apparel',
      icon: Watch,
      description: 'Organic cotton basics, minimalist tees & wear',
      color: 'from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400',
    },
  ];

  const handleSelectCategory = (catName: string) => {
    setSelectedCategory(catName);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-black text-[#1f2922]">
          Explore Product Categories
        </h1>
        <p className="text-sm text-[#516453]">
          Discover our curated collection crafted for direct WhatsApp checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const count = products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
          const sampleProd = products.find((p) => p.category.toLowerCase() === cat.name.toLowerCase());

          return (
            <div
              key={cat.name}
              onClick={() => handleSelectCategory(cat.name)}
              className="bg-white rounded-2xl border border-[#e8e2d8] overflow-hidden group hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:border-[#2d6a4f]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between p-6 relative shadow-2xs"
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-2xs`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#faf8f5] text-[#516453] border border-[#e8e2d8]">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1f2922] group-hover:text-[#2d6a4f] transition-colors mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#7e9180] mb-6 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              {sampleProd && (
                <div className="flex items-center gap-3 pt-4 border-t border-[#e8e2d8]">
                  <img
                    src={sampleProd.imageUrl}
                    alt={sampleProd.title}
                    className="w-10 h-10 rounded-lg object-cover bg-[#f4efe6]"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-[#2d6a4f] font-extrabold block uppercase">Featured</span>
                    <span className="text-xs font-semibold text-[#1f2922] truncate block">
                      {sampleProd.title}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#faf8f5] flex items-center justify-center text-[#2d6a4f] group-hover:text-white group-hover:bg-[#2d6a4f] group-hover:translate-x-1 transition-all border border-[#e8e2d8]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
