import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Package, Store, LogOut, ShieldCheck } from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { activeView, setActiveView, products } = useStore();

  return (
    <aside className="hidden md:flex flex-col h-screen sticky top-0 bg-white text-[#2d6a4f] w-64 border-r border-[#e8e2d8] transition-all duration-200 ease-in-out shrink-0 z-40">
      {/* Header Profile */}
      <div className="p-5 border-b border-[#e8e2d8] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#40916c] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
          FR
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h2 className="font-extrabold text-sm text-[#1f2922] truncate">Fazle Rabbi</h2>
            <ShieldCheck className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
          </div>
          <p className="text-xs text-[#2d6a4f] font-semibold truncate">Store Owner & Admin</p>
        </div>
      </div>

      {/* Navigation Links - Exclusively Product Add & Remove */}
      <div className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto">
        <button
          onClick={() => setActiveView('admin-products')}
          className="flex items-center justify-between px-6 py-3.5 text-xs font-bold transition-colors text-left text-[#2d6a4f] bg-[#faf8f5] border-l-4 border-[#2d6a4f]"
        >
          <div className="flex items-center gap-3">
            <Package className="w-4 h-4" />
            <span>Manage Products</span>
          </div>
          <span className="text-[11px] font-semibold bg-[#ebf3ea] text-[#2d6a4f] px-2 py-0.5 rounded-full border border-[#2d6a4f]/20">
            {products.length}
          </span>
        </button>

        <div className="px-6 py-3 text-[11px] text-[#516453] space-y-1">
          <p className="font-semibold text-[#1f2922]">Quick Actions:</p>
          <ul className="list-disc list-inside space-y-0.5 text-[11px]">
            <li>Add new products</li>
            <li>Edit details & prices</li>
            <li>Toggle stock availability</li>
            <li>Delete / Remove products</li>
          </ul>
        </div>

        {/* Storefront switch button */}
        <div className="mt-auto px-4 py-4 border-t border-[#e8e2d8]">
          <button
            onClick={() => setActiveView('shop')}
            className="w-full bg-[#2d6a4f] hover:bg-[#22553e] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
          >
            <Store className="w-4 h-4" />
            <span>Back to Storefront</span>
          </button>
        </div>
      </div>

      {/* Footer Exit */}
      <div className="border-t border-[#e8e2d8] p-3">
        <button
          onClick={() => setActiveView('shop')}
          className="flex items-center gap-3 w-full px-4 py-2 text-xs text-[#516453] hover:bg-[#faf8f5] hover:text-[#1f2922] rounded-lg transition-colors text-left cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin</span>
        </button>
      </div>
    </aside>
  );
};
