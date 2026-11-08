import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BusinessPanel from '../components/BusinessPanel';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1100);
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
    }, 900);
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
              <span className="text-xs bg-[#EFF5FF] text-primary px-3 py-1 rounded-full font-semibold tracking-wide border border-primary/10">
                Business
              </span>
            </Link>
          </div>

          <div className="max-w-[420px] w-full mx-auto lg:mx-0">

            <AnimatePresence mode="wait">
              {!submitted ? (
                /* ── STATE 1: Request Password Reset ── */
                <motion.div
                  key="request-form"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Back to login shortcut */}
                  <Link
                    to="/business/login"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-navy transition-colors mb-6"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back to login
                  </Link>

                  <h1 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight font-heading mb-2">
                    Forgot password?
                  </h1>
                  <p className="text-base text-slate-500 leading-relaxed">
                    No worries. Enter your registered work email and we'll send you instructions to reset your password.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* Email */}
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">
                        Work email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@barbershop.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-13 sm:h-12 px-4 text-base text-navy placeholder:text-slate-400 rounded-xl border border-[#E5EAF2] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all bg-white"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-13 sm:h-12 mt-3 bg-navy hover:bg-[#0b1224] text-white font-semibold text-base rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending link…
                        </>
                      ) : (
                        <>
                          <span>Send reset link</span>
                          <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Help notice */}
                  <div className="mt-8 p-4 bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">info</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If you no longer have access to this email address, please contact our support team on WhatsApp at{' '}
                      <span className="font-semibold text-navy">+234 800 5888 59</span>.
                    </p>
                  </div>

                  <p className="mt-8 text-sm text-center text-slate-500">
                    Remember your password?{' '}
                    <Link to="/business/login" className="font-semibold text-primary hover:underline">
                      Log in
                    </Link>
                  </p>
                </motion.div>
              ) : (
                /* ── STATE 2: Confirmation / Success ── */
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Mail icon */}
                  <div className="size-16 rounded-2xl bg-[#EFF5FF] border border-primary/20 text-primary flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-3xl">mark_email_read</span>
                  </div>

                  <h1 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight font-heading mb-2">
                    Check your email
                  </h1>
                  <p className="text-base text-slate-600 leading-relaxed">
                    We've sent a password reset link to{' '}
                    <span className="font-semibold text-navy break-all">{email}</span>.
                  </p>

                  <div className="mt-6 p-4 bg-[#F7F9FC] border border-[#E5EAF2] rounded-xl space-y-2 text-xs text-slate-600 leading-relaxed">
                    <div className="flex items-center gap-2 font-semibold text-navy">
                      <span className="material-symbols-outlined text-emerald-600 text-sm">schedule</span>
                      <span>The link expires in 60 minutes</span>
                    </div>
                    <p>
                      Didn't receive the email? Check your spam or promotions folder, or request another link below.
                    </p>
                  </div>

                  {/* Resend status alert */}
                  <AnimatePresence>
                    {resendSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        A fresh reset link has been dispatched!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action buttons */}
                  <div className="mt-6 space-y-3">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resending}
                      className="w-full h-13 sm:h-12 bg-white border border-[#E5EAF2] rounded-xl font-semibold text-base text-navy hover:bg-[#F7F9FC] transition-all flex items-center justify-center gap-2 shadow-subtle cursor-pointer disabled:opacity-60"
                    >
                      {resending ? (
                        <>
                          <span className="size-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                          Resending…
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-lg">refresh</span>
                          Resend reset link
                        </>
                      )}
                    </button>

                    <Link
                      to="/business/login"
                      className="w-full h-13 sm:h-12 bg-navy hover:bg-[#0b1224] text-white font-semibold text-base rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">arrow_back</span>
                      Back to login
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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

