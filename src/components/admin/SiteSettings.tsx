import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Phone, Image as ImageIcon, Check, RotateCcw, Sparkles } from 'lucide-react';
import { SiteSettings as SiteSettingsType } from '../../types';

export const SiteSettings: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useStore();

  const [formState, setFormState] = useState<SiteSettingsType>({ ...settings });
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: keyof SiteSettingsType, value: any) => {
    setFormState((prev) => {
      const next = { ...prev, [field]: value };
      setHasChanges(true);
      return next;
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleChange('logoUrl', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateSettings(formState);
    setHasChanges(false);
  };

  const handleDiscard = () => {
    setFormState({ ...settings });
    setHasChanges(false);
  };

  const colorOptions = [
    { name: 'green' as const, hex: '#25D366', label: 'WhatsApp Green' },
    { name: 'darkgreen' as const, hex: '#006d2f', label: 'Deep Forest' },
    { name: 'blue' as const, hex: '#3B82F6', label: 'Royal Blue' },
    { name: 'black' as const, hex: '#111827', label: 'Midnight Black' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-black text-[#1f2922] tracking-tight">
          Website Settings
        </h1>
        <p className="text-base text-[#516453]">
          Manage your storefront's branding and communication preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Settings Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Store Branding Card */}
          <section className="bg-white border border-[#e8e2d8] rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#1f2922]">Store Branding</h2>
              <p className="text-xs text-[#516453] mt-1">
                Upload your primary logo and customize the public storefront name.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-28 h-28 rounded-xl border-2 border-dashed border-[#e8e2d8] bg-[#faf8f5] flex items-center justify-center shrink-0 overflow-hidden relative group">
                  {formState.logoUrl ? (
                    <img
                      src={formState.logoUrl}
                      alt="Logo Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-[#7e9180]" />
                  )}
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <label className="block text-xs font-semibold text-[#1f2922]">
                    Upload New Logo
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <label
                      htmlFor="logo-upload"
                      className="inline-flex items-center justify-center px-4 py-2 border border-[#e8e2d8] rounded-xl bg-white text-xs font-bold text-[#1f2922] cursor-pointer hover:bg-[#faf8f5] transition-colors shadow-2xs"
                    >
                      Choose File
                    </label>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <span className="text-xs text-[#7e9180]">
                      PNG, JPG up to 2MB
                    </span>
                  </div>
                </div>
              </div>

              {/* Store Name & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1f2922] mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={formState.storeName}
                    onChange={(e) => handleChange('storeName', e.target.value)}
                    placeholder="e.g. WhatsApp Store"
                    className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-xl p-3 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1f2922] mb-1">
                    Store Tagline / Hero Headline
                  </label>
                  <input
                    type="text"
                    value={formState.storeTagline}
                    onChange={(e) => handleChange('storeTagline', e.target.value)}
                    placeholder="e.g. Discover Quality Products, instantly on WhatsApp."
                    className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-xl p-3 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Communication Card */}
          <section className="bg-white border border-[#e8e2d8] rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#1f2922]">Communication</h2>
              <p className="text-xs text-[#516453] mt-1">
                Configure the WhatsApp phone number and currency where customer orders will be sent.
              </p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-semibold text-[#1f2922] mb-1">
                  WhatsApp Phone Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-[#7e9180]">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    value={formState.whatsappNumber}
                    onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                    placeholder="01706259256 or +8801706259256"
                    className="w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#e8e2d8] rounded-xl text-xs text-[#1f2922] focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-[#7e9180] mt-1.5">
                  Include country code. Example: +1234567890 or +8801712345678
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1f2922] mb-1">
                    Currency Code
                  </label>
                  <select
                    value={formState.currency}
                    onChange={(e) => {
                      const code = e.target.value;
                      let sym = '৳';
                      if (code === 'USD') sym = '$';
                      if (code === 'EUR') sym = '€';
                      if (code === 'GBP') sym = '£';
                      if (code === 'INR') sym = '₹';
                      handleChange('currency', code);
                      handleChange('currencySymbol', sym);
                    }}
                    className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-xl p-3 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] cursor-pointer"
                  >
                    <option value="BDT">BDT (Bangladeshi Taka)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                    <option value="GBP">GBP (British Pound)</option>
                    <option value="INR">INR (Indian Rupee)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1f2922] mb-1">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    value={formState.currencySymbol}
                    onChange={(e) => handleChange('currencySymbol', e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-xl p-3 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Settings Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Theme Customization Card */}
          <section className="bg-white border border-[#e8e2d8] rounded-2xl p-6 shadow-xs">
            <div className="mb-4">
              <h2 className="text-base font-bold text-[#1f2922]">Theme Customization</h2>
              <p className="text-xs text-[#516453] mt-1">
                Select a primary accent color for buttons and highlights.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#1f2922]">
                Brand Color
              </label>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((opt) => {
                  const isSelected = formState.brandColor === opt.hex;
                  return (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => {
                        handleChange('brandColor', opt.hex);
                        handleChange('brandColorName', opt.name);
                      }}
                      className={`w-10 h-10 rounded-full transition-transform focus:outline-none flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-[#2d6a4f] ring-offset-2 scale-105 shadow-sm'
                          : 'hover:scale-110 opacity-90'
                      }`}
                      style={{ backgroundColor: opt.hex }}
                      title={opt.label}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow-xs" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Save Action Sticky Card */}
          <section className="bg-white border border-[#e8e2d8] rounded-2xl p-6 flex flex-col gap-3 sticky top-6 shadow-xs">
            <p className="text-xs text-[#516453]">
              {hasChanges ? '⚠️ Unsaved changes to settings.' : '✓ All changes are currently up to date.'}
            </p>

            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="w-full py-3.5 px-6 bg-[#2d6a4f] hover:bg-[#22553e] disabled:bg-[#e8e2d8] text-white font-bold text-sm rounded-xl active:scale-98 transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
            >
              Save Changes
            </button>

            <button
              onClick={handleDiscard}
              disabled={!hasChanges}
              className="w-full py-3 px-6 bg-transparent border border-[#e8e2d8] hover:bg-[#faf8f5] text-[#1f2922] font-semibold text-xs rounded-xl active:scale-98 transition-all disabled:opacity-40 cursor-pointer"
            >
              Discard
            </button>

            <button
              onClick={resetSettings}
              className="text-[11px] text-[#7e9180] hover:text-[#1f2922] text-center mt-2 cursor-pointer transition-colors"
            >
              Restore Original Defaults
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
