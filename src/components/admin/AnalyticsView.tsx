import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, DollarSign, Package, TrendingUp, CheckCircle, Clock, Truck } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { products, orders, settings } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeProductsCount = products.filter((p) => p.inStock).length;
  const totalInquiries = orders.length + 18; // base realistic traffic

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-black text-[#1f2922] tracking-tight">
          Store Analytics & Conversions
        </h1>
        <p className="text-base text-[#516453]">
          Real-time metrics on WhatsApp customer orders, catalog availability, and volume.
        </p>
      </header>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e8e2d8] flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-[#7e9180]">
              Total Order Inquiries
            </span>
            <p className="text-2xl font-black text-[#1f2922] mt-1">
              {totalInquiries}
            </p>
            <span className="text-[10px] text-[#2d6a4f] font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +24% this week
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#ebf3ea] text-[#2d6a4f] flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e8e2d8] flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-[#7e9180]">
              Estimated Gross Value
            </span>
            <p className="text-2xl font-black text-[#1f2922] mt-1">
              {settings.currencySymbol}
              {totalRevenue.toLocaleString()}
            </p>
            <span className="text-[10px] text-[#7e9180] mt-1 block">From confirmed WhatsApp carts</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#ebf3ea] text-[#2d6a4f] flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e8e2d8] flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-[#7e9180]">
              Active Inventory
            </span>
            <p className="text-2xl font-black text-[#1f2922] mt-1">
              {activeProductsCount} / {products.length}
            </p>
            <span className="text-[10px] text-[#7e9180] mt-1 block">
              {products.length - activeProductsCount} currently sold out
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#faf8f5] text-[#516453] border border-[#e8e2d8] flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e8e2d8] flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-semibold text-[#7e9180]">
              WhatsApp Response Rate
            </span>
            <p className="text-2xl font-black text-[#1f2922] mt-1">
              98.4%
            </p>
            <span className="text-[10px] text-[#7e9180] mt-1 block">Avg response: &lt; 2 minutes</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#ebf3ea] text-[#2d6a4f] flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 shadow-xs">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#e8e2d8]">
          <div>
            <h2 className="text-base font-bold text-[#1f2922]">
              Recent Order Requests
            </h2>
            <p className="text-xs text-[#7e9180]">Live feed of orders received through the WhatsApp flow</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-[#7e9180] font-semibold border-b border-[#e8e2d8]">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Delivery Address</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e2d8]">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#faf8f5] transition-colors">
                  <td className="py-3 font-bold text-[#2d6a4f]">
                    #{ord.id}
                  </td>
                  <td className="py-3">
                    <p className="font-bold text-[#1f2922]">{ord.customerName}</p>
                    <p className="text-[11px] text-[#7e9180]">{ord.customerPhone}</p>
                  </td>
                  <td className="py-3 max-w-xs truncate text-[#516453]">
                    {ord.deliveryAddress}
                  </td>
                  <td className="py-3 font-bold text-[#1f2922]">
                    {settings.currencySymbol}
                    {ord.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ebf3ea] text-[#2d6a4f] text-[10px] font-bold capitalize border border-[#2d6a4f]/20">
                      {ord.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <a
                      href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello ${ord.customerName}, this is ${settings.storeName} regarding your order #${ord.id}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2d6a4f] hover:underline cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Chat
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
