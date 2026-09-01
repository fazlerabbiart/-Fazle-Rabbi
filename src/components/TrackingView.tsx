import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Package, CheckCircle2, Truck, Clock, MapPin, MessageCircle, AlertCircle } from 'lucide-react';

export const TrackingView: React.FC = () => {
  const { orders, settings } = useStore();
  const [searchCode, setSearchCode] = useState('');
  const [searched, setSearched] = useState(false);

  const matchedOrder = orders.find(
    (o) =>
      o.id.toLowerCase() === searchCode.trim().toLowerCase() ||
      o.customerPhone.replace(/[^0-9]/g, '').includes(searchCode.replace(/[^0-9]/g, ''))
  );

  const activeOrder = searched ? matchedOrder : orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const steps = [
    { key: 'pending', label: 'Order Received', icon: Clock },
    { key: 'confirmed', label: 'WhatsApp Confirmed', icon: CheckCircle2 },
    { key: 'dispatched', label: 'Dispatched to Courier', icon: Package },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: MapPin },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'dispatched':
        return 2;
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = activeOrder ? getStepIndex(activeOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-black text-[#1f2922]">
          Track Your WhatsApp Order
        </h1>
        <p className="text-sm text-[#516453] max-w-md mx-auto">
          Enter your Order ID (e.g. ORD-9821) or WhatsApp phone number to check current dispatch status.
        </p>
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7e9180]" />
          <input
            type="text"
            value={searchCode}
            onChange={(e) => {
              setSearchCode(e.target.value);
              if (!e.target.value) setSearched(false);
            }}
            placeholder="e.g. ORD-9821 or phone number"
            className="w-full bg-white border border-[#e8e2d8] rounded-xl py-3 pl-10 pr-4 text-sm text-[#1f2922] placeholder-[#7e9180] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] shadow-2xs"
          />
        </div>
        <button
          type="submit"
          className="bg-[#2d6a4f] hover:bg-[#22553e] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          Track
        </button>
      </form>

      {/* Result Container */}
      {searched && !matchedOrder ? (
        <div className="p-8 bg-white rounded-2xl border border-[#e8e2d8] text-center space-y-3 shadow-2xs">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="font-bold text-base text-[#1f2922]">
            No order found matching "{searchCode}"
          </h3>
          <p className="text-xs text-[#516453] max-w-sm mx-auto">
            Please check your receipt in WhatsApp or contact our support directly.
          </p>
        </div>
      ) : activeOrder ? (
        <div className="bg-white rounded-2xl border border-[#e8e2d8] p-6 md:p-8 space-y-8 shadow-xs">
          {/* Order Header Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#e8e2d8]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-[#1f2922]">
                  Order #{activeOrder.id}
                </span>
                <span className="bg-[#ebf3ea] text-[#2d6a4f] text-xs font-bold px-2.5 py-0.5 rounded-full capitalize border border-[#2d6a4f]/20">
                  {activeOrder.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-[#7e9180] mt-1">
                Placed on {new Date(activeOrder.createdAt).toLocaleDateString()} for {activeOrder.customerName}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#7e9180] block">Total Amount</span>
              <span className="text-lg font-black text-[#1f2922]">
                {settings.currencySymbol}
                {activeOrder.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#516453] mb-6">
              Delivery Progress
            </h3>

            <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-0">
              {steps.map((step, idx) => {
                const IconComponent = step.icon;
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div
                    key={step.key}
                    className="flex md:flex-col items-center gap-4 md:gap-2 flex-1 relative z-10"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isPassed
                          ? 'bg-[#2d6a4f] text-white shadow-xs'
                          : 'bg-[#faf8f5] text-[#7e9180] border border-[#e8e2d8]'
                      } ${isCurrent ? 'ring-4 ring-[#2d6a4f]/20' : ''}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="text-left md:text-center">
                      <p
                        className={`text-xs font-bold ${
                          isPassed
                            ? 'text-[#1f2922]'
                            : 'text-[#7e9180]'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-[10px] text-[#7e9180]">
                        {isPassed ? (isCurrent ? 'In progress' : 'Completed') : 'Pending'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ordered Products list */}
          <div className="border-t border-[#e8e2d8] pt-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#516453]">
              Items in this Package
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeOrder.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-xl border border-[#e8e2d8]"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-12 h-12 rounded-lg object-cover bg-white border border-[#e8e2d8]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#1f2922] truncate">
                      {item.product.title}
                    </p>
                    <p className="text-[11px] text-[#516453]">
                      Qty: {item.quantity} • {settings.currencySymbol}
                      {((item.product.salePrice ?? item.product.regularPrice) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & WhatsApp Support */}
          <div className="bg-[#ebf3ea] border border-[#2d6a4f]/20 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#25d366] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#1f2922]">
                  Need order updates on WhatsApp?
                </p>
                <p className="text-[11px] text-[#516453]">
                  Chat with our support agent quoting #{activeOrder.id}
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hello, I would like an update on my order #${activeOrder.id}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25d366] hover:bg-[#20b858] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs"
            >
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};
