import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BusinessPanel from '../components/BusinessPanel';

const steps = [
  { step: 1, label: 'Your account' },
  { step: 2, label: 'Your shop' },
  { step: 3, label: 'Done' },
];

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountType, setAccountType] = useState(
    location.pathname.startsWith('/business') ? 'business' : 'personal'
  );
  const [step, setStep] = useState(1);

  // Step 1
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Step 2
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  const [loading, setLoading] = useState(false);

  const passwordMatch = password && confirmPassword && password === confirmPassword;
  const passwordMismatch = confirmPassword && password !== confirmPassword;

  const handleStep1 = (e) => {
    e.preventDefault();
    if (passwordMismatch) return;
    if (accountType === 'business') {
      setStep(2);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 1200);
    }
  };

  const handleStep2 = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/business/dashboard');
    }, 1300);
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

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <h1 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight font-heading mb-2">
                {accountType === 'business'
                  ? (step === 1 ? 'Create your account' : 'Set up your shop')
                  : 'Create your account'}
              </h1>
              <p className="text-base text-slate-500 leading-relaxed">
                {accountType === 'business'
                  ? (step === 1
                      ? 'Join 500+ Nigerian barbers already on Kuttly.'
                      : 'Your shop goes live on the marketplace instantly.')
                  : 'Find and book top Nigerian barbers near you.'}
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
                onClick={() => { setAccountType('personal'); setStep(1); }}
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
                onClick={() => { setAccountType('business'); setStep(1); }}
                className={`w-1/2 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-xl transition-all cursor-pointer ${
                  accountType === 'business'
                    ? 'bg-white text-navy shadow-sm border border-black/5'
                    : 'text-slate-500 hover:text-navy'
                }`}
              >
                Business
              </button>
            </motion.div>

            {/* Step Indicator (Business Only) */}
            <AnimatePresence>
              {accountType === 'business' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-7 mb-2 flex items-center gap-0">
                    {steps.map((s, i) => (
                      <React.Fragment key={s.step}>
                        <div className="flex flex-col items-center">
                          <div
                            className={`size-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                              step > s.step
                                ? 'bg-primary border-primary text-white'
                                : step === s.step
                                ? 'border-primary text-primary bg-white ring-4 ring-primary/10'
                                : 'border-[#E5EAF2] text-slate-400 bg-white'
                            }`}
                          >
                            {step > s.step ? (
                              <span className="material-symbols-outlined text-base">check</span>
                            ) : (
                              s.step
                            )}
                          </div>
                          <span
                            className={`text-xs mt-1.5 font-semibold whitespace-nowrap transition-colors ${
                              step >= s.step ? 'text-primary' : 'text-slate-400'
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                        {i < steps.length - 1 && (
                          <div
                            className={`flex-1 h-0.5 mb-5 mx-2.5 transition-all duration-500 ${
                              step > s.step ? 'bg-primary' : 'bg-[#E5EAF2]'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── STEP 1 (Used for Personal & Business Step 1) ── */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form
                  key="step1"
                  onSubmit={handleStep1}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.22 }}
                  className="mt-6 space-y-5"
                >
                  {/* Full name */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tunde Adewale"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-13 sm:h-12 px-4 text-base text-navy placeholder:text-slate-400 rounded-xl border border-[#E5EAF2] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white"
                    />
                  </div>

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
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Min 8 characters"
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

                  {/* Confirm Password */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      Confirm password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        required
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full h-13 sm:h-12 px-4 pr-12 text-base text-navy placeholder:text-slate-400 rounded-xl border transition-all bg-white ${
                          passwordMismatch
                            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/15'
                            : passwordMatch
                            ? 'border-emerald-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/15'
                            : 'border-[#E5EAF2] focus:border-primary focus:ring-2 focus:ring-primary/15'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy transition-colors p-1"
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {showConfirm ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    <AnimatePresence>
                      {passwordMismatch && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                          className="text-sm text-red-500 mt-2 font-medium"
                        >
                          Passwords don't match
                        </motion.p>
                      )}
                      {passwordMatch && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                          className="text-sm text-emerald-600 mt-2 font-medium flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-base">check_circle</span>
                          Passwords match
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={!!passwordMismatch || loading}
                    className="w-full h-13 sm:h-12 mt-3 bg-navy hover:bg-[#0b1224] text-white font-semibold text-base rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {accountType === 'business' ? (
                      <>
                        Continue
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                      </>
                    ) : loading ? (
                      <>
                        <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account…
                      </>
                    ) : (
                      'Create account'
                    )}
                  </button>

                  <div className="relative flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-[#E5EAF2]" />
                    <span className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-[#E5EAF2]" />
                  </div>

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
                    Sign up with Google
                  </button>
                </motion.form>
              )}

              {/* ── STEP 2 (Business Only) ── */}
              {step === 2 && accountType === 'business' && (
                <motion.form
                  key="step2"
                  onSubmit={handleStep2}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="mt-6 space-y-5"
                >
                  {/* Info banner */}
                  <div className="flex items-start gap-3 p-4 bg-[#EFF5FF] border border-primary/20 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">storefront</span>
                    <p className="text-sm text-primary font-medium leading-relaxed">
                      Your shop goes live on the Kuttly marketplace as soon as you're done. Clients can find and book you immediately.
                    </p>
                  </div>

                  {/* Shop name */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      Shop / business name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The Fade Room"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="w-full h-13 sm:h-12 px-4 text-base text-navy placeholder:text-slate-400 rounded-xl border border-[#E5EAF2] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      WhatsApp / business phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <span className="flex items-center px-4 h-13 sm:h-12 bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl text-base text-slate-600 font-medium shrink-0">
                        🇳🇬 +234
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="803 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 h-13 sm:h-12 px-4 text-base text-navy placeholder:text-slate-400 rounded-xl border border-[#E5EAF2] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      City / area <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-13 sm:h-12 px-4 text-base text-navy focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white rounded-xl border border-[#E5EAF2]"
                    >
                      <option value="">Select your city</option>
                      {[
                        'Lagos — Lekki', 'Lagos — Victoria Island', 'Lagos — Ikeja',
                        'Lagos — Surulere', 'Abuja — Wuse', 'Abuja — Maitama',
                        'Port Harcourt', 'Ibadan', 'Kano', 'Enugu', 'Benin City',
                      ].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center justify-center gap-1.5 px-5 h-13 sm:h-12 bg-white border border-[#E5EAF2] text-navy font-semibold rounded-xl text-base hover:bg-[#F7F9FC] transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">arrow_back</span>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 h-13 sm:h-12 bg-navy hover:bg-[#0b1224] text-white font-semibold text-base rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Setting up your shop…
                        </>
                      ) : (
                        <>
                          Launch my shop
                          <span className="material-symbols-outlined text-lg">rocket_launch</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-sm text-center text-slate-500"
            >
              Already have an account?{' '}
              <Link
                to={accountType === 'business' ? '/business/login' : '/login'}
                className="font-semibold text-primary hover:underline"
              >
                Log in
              </Link>
            </motion.p>

            <p className="mt-4 text-xs text-center text-slate-400 leading-relaxed">
              By signing up you agree to our{' '}
              <Link to="/terms" className="underline hover:text-navy">Terms</Link> and{' '}
              <Link to="/privacy" className="underline hover:text-navy">Privacy Policy</Link>.
            </p>
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
