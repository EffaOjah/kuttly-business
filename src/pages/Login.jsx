import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import BusinessPanel from '../components/BusinessPanel';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountType, setAccountType] = useState(
    location.pathname.startsWith('/business') ? 'business' : 'personal'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (accountType === 'business') {
        navigate('/business/dashboard');
      } else {
        navigate('/');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex font-sans">

      {/* ── LEFT: Form Panel (Scrollable) ────────────────────────────── */}
      <div className="flex-1 overflow-y-auto h-full min-h-screen lg:min-h-0 bg-white">
        <div className="min-h-full flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-10 lg:py-14">

          {/* Logo (Mobile View Only) */}
          <div className="mb-8 sm:mb-10 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <span className="material-symbols-outlined text-2xl bg-primary text-white p-2 rounded-xl transition-transform group-hover:rotate-12 shadow-sm">
                content_cut
              </span>
              <span className="text-2xl font-bold tracking-tight text-navy font-heading">Kuttly</span>
              <span className="text-xs bg-[#EFF5FF] text-primary px-3 py-1 rounded-full font-semibold tracking-wide border border-primary/10 capitalize">
                {accountType === 'business' ? 'Business' : 'Personal'}
              </span>
            </Link>
          </div>

          <div className="max-w-[420px] w-full mx-auto lg:mx-0">

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <h1 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight font-heading mb-2">
                Log in
              </h1>
              <p className="text-base text-slate-500 leading-relaxed">
                {accountType === 'business'
                  ? 'Welcome back. Access your shop dashboard and tools.'
                  : 'Welcome back. Book appointments and manage haircuts.'}
              </p>
            </motion.div>

            {/* ── Tab Switcher: Personal | Business ── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="mt-6 p-1.5 bg-[#F4F6FA] border border-[#E5EAF2] rounded-2xl flex gap-1.5"
            >
              <button
                type="button"
                onClick={() => setAccountType('personal')}
                className={`w-1/2 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-xl transition-all cursor-pointer ${
                  accountType === 'personal'
                    ? 'bg-white text-navy shadow-sm border border-black/5'
                    : 'text-slate-500 hover:text-navy'
                }`}
              >
                Personal
              </button>
              <button
                type="button"
                onClick={() => setAccountType('business')}
                className={`w-1/2 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-xl transition-all cursor-pointer ${
                  accountType === 'business'
                    ? 'bg-white text-navy shadow-sm border border-black/5'
                    : 'text-slate-500 hover:text-navy'
                }`}
              >
                Business
              </button>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="mt-7 space-y-5"
            >
              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={accountType === 'business' ? 'you@barbershop.com' : 'you@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-13 sm:h-12 px-4 text-base text-navy placeholder:text-slate-400 rounded-xl border border-[#E5EAF2] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <Link
                    to={accountType === 'business' ? '/business/forgot-password' : '/forgot-password'}
                    className="text-sm font-semibold text-primary hover:text-[#1048bc] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-13 sm:h-12 px-4 pr-12 text-base text-navy placeholder:text-slate-400 rounded-xl border border-[#E5EAF2] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-13 sm:h-12 mt-3 bg-navy hover:bg-[#0b1224] text-white font-semibold text-base rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  'Log in'
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-[#E5EAF2]" />
                <span className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-[#E5EAF2]" />
              </div>

              {/* Google */}
              <button
                type="button"
                className="w-full h-13 sm:h-12 bg-white border border-[#E5EAF2] rounded-xl font-semibold text-base text-navy hover:bg-[#F7F9FC] transition-all flex items-center justify-center gap-3 shadow-subtle cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.4-.1-2.7-.5-4z" fill="#FFC107"/>
                  <path d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3c-7.6 0-14.3 4.3-17.7 11.7z" fill="#FF3D00"/>
                  <path d="M24 45c5.5 0 10.5-1.9 14.3-5.1l-6.6-5.6C29.6 35.7 26.9 37 24 37c-5.8 0-10.6-3.9-11.8-9.3l-7 5.4C8 40.6 15.4 45 24 45z" fill="#4CAF50"/>
                  <path d="M44.5 20H24v8.5h11.8c-.6 2.6-2.1 4.8-4.1 6.3l6.6 5.6C41.8 36.8 44.5 31 44.5 24c0-1.4-.1-2.7-.5-4z" fill="#1976D2"/>
                </svg>
                Continue with Google
              </button>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-sm text-center text-slate-500"
            >
              Don't have an account?{' '}
              <Link
                to={accountType === 'business' ? '/business/signup' : '/signup'}
                className="font-semibold text-primary hover:underline"
              >
                Get started free
              </Link>
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Visual Panel (Fixed) ──────────────────────────────── */}
      <div className="hidden lg:block lg:w-[48%] xl:w-1/2 h-full shrink-0">
        <BusinessPanel />
      </div>
    </div>
  );
}
