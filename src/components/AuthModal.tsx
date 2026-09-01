import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  Shield,
  Sparkles,
  CheckCircle2,
  LogIn,
  UserPlus,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginAsDemoAdmin,
    loginAsDemoCustomer,
    logout
  } = useStore();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (authMode === 'login') {
        if (!email || !password) {
          setErrorMessage('Please provide both email and password.');
          setIsLoading(false);
          return;
        }
        await loginWithEmail(email, password);
      } else {
        if (!email || !password || !name) {
          setErrorMessage('Please fill in your name, email, and password.');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setErrorMessage('Password must be at least 6 characters.');
          setIsLoading(false);
          return;
        }
        await registerWithEmail(email, password, name, phone);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message.replace('Firebase: ', ''));
      } else {
        setErrorMessage('Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message.replace('Firebase: ', ''));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#e8e2d8] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#2d6a4f] via-[#40916c] to-[#1b4332] p-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold tracking-wide flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#25d366]" />
              WhatsApp Store Account
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight">
            {currentUser ? 'User Account' : authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-xs text-white/80 mt-1">
            {currentUser
              ? `Signed in as ${currentUser.displayName || currentUser.email}`
              : authMode === 'login'
              ? 'Log in to track your orders, save preferences, and chat live'
              : 'Register to manage fast WhatsApp orders and checkout'}
          </p>
        </div>

        {/* If user is already logged in, show User Card with Logout */}
        {currentUser ? (
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-2xl border border-[#e8e2d8]">
              <div className="w-12 h-12 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center font-bold text-lg">
                {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-[#1f2922] truncate">{currentUser.displayName || 'User'}</h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#ebf3ea] text-[#2d6a4f] border border-[#2d6a4f]/20">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-[#7e9180] truncate">{currentUser.email}</p>
                {currentUser.phone && (
                  <p className="text-xs text-[#516453] font-medium mt-0.5">📞 {currentUser.phone}</p>
                )}
              </div>
            </div>

            <div className="p-3.5 bg-[#ebf3ea] rounded-xl text-xs text-[#2d6a4f] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#25d366] shrink-0" />
              <span>You are currently authenticated. Your contact details will auto-fill in checkout.</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsAuthModalOpen(false);
                }}
                className="flex-1 py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-red-200"
              >
                <span>Log Out</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(false)}
                className="flex-1 py-2.5 px-4 bg-[#2d6a4f] hover:bg-[#22553e] text-white font-bold rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Mode Switch Tabs */}
            <div className="flex bg-[#faf8f5] p-1 rounded-xl border border-[#e8e2d8] mb-5">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  authMode === 'login'
                    ? 'bg-white text-[#1f2922] shadow-xs'
                    : 'text-[#7e9180] hover:text-[#1f2922]'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In (লগইন)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  authMode === 'register'
                    ? 'bg-white text-[#1f2922] shadow-xs'
                    : 'text-[#7e9180] hover:text-[#1f2922]'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register (নতুন একাউন্ট)</span>
              </button>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2 animate-in fade-in duration-150">
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-[#1f2922] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7e9180] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-xl pl-9.5 pr-3 py-2.5 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#1f2922] mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#7e9180] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-xl pl-9.5 pr-3 py-2.5 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                  />
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-[#1f2922] mb-1">
                    Phone / WhatsApp Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#7e9180] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017xxxxxxxx"
                      className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-xl pl-9.5 pr-3 py-2.5 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#1f2922] mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#7e9180] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={authMode === 'register' ? 'At least 6 characters' : 'Enter your password'}
                    className="w-full bg-[#faf8f5] border border-[#e8e2d8] rounded-xl pl-9.5 pr-10 py-2.5 text-xs text-[#1f2922] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7e9180] hover:text-[#1f2922] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 bg-[#2d6a4f] hover:bg-[#22553e] disabled:bg-[#7e9180] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{authMode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e8e2d8]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-[#7e9180]">
                <span className="bg-white px-2">Or quick sign in</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#faf8f5] text-[#1f2922] font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#e8e2d8] shadow-2xs mb-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Quick Demo Logins for easy testing */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={loginAsDemoAdmin}
                className="py-2 px-2.5 bg-[#ebf3ea] hover:bg-[#d8e9d6] text-[#2d6a4f] font-bold rounded-lg text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer border border-[#2d6a4f]/20"
                title="Log in as Store Owner / Admin"
              >
                <Shield className="w-3 h-3" />
                <span>Admin Demo</span>
              </button>

              <button
                type="button"
                onClick={() => loginAsDemoCustomer()}
                className="py-2 px-2.5 bg-[#faf8f5] hover:bg-[#f0eae0] text-[#516453] font-bold rounded-lg text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer border border-[#e8e2d8]"
                title="Log in as Sample Customer"
              >
                <User className="w-3 h-3" />
                <span>Customer Demo</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
