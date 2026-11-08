import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Went from sticky-note bookings to a fully organised schedule in one week.",
    name: "Tunde Adewale",
    role: "Owner, The Fade Room · Lekki",
    initials: "TA",
  },
  {
    quote: "No more missed calls, no more double-bookings. Revenue is up 30% this quarter.",
    name: "Chidi Okonkwo",
    role: "Owner, King's Palace · Ikeja",
    initials: "CO",
  },
  {
    quote: "I post a cut, and the bookings come in automatically. It just works.",
    name: "Ibrahim Sule",
    role: "Master Barber, Stylz Empire · Abuja",
    initials: "IS",
  },
];

const avatars = [
  "https://ui-avatars.com/api/?name=T+A&background=155EEF&color=fff&bold=true&size=36",
  "https://ui-avatars.com/api/?name=C+O&background=EFF5FF&color=155EEF&bold=true&size=36",
  "https://ui-avatars.com/api/?name=I+S&background=111B35&color=fff&bold=true&size=36",
  "https://ui-avatars.com/api/?name=D+A&background=155EEF&color=fff&bold=true&size=36",
];

export default function BusinessPanel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[idx];

  return (
    <div className="relative w-full h-full min-h-screen lg:min-h-0 overflow-hidden bg-navy">

      {/* ── Full-panel photo ── */}
      <img
        src="/images/hero-barber.png"
        alt="Barbershop"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* ── Gradient overlay: transparent top → navy bottom ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />

      {/* ── Subtle colour wash at top (matches reference style) ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />

      {/* ── Brand — top left ── */}
      <div className="absolute top-8 left-8 z-10 flex items-center gap-2.5">
        <span className="material-symbols-outlined text-2xl bg-primary text-white p-1.5 rounded-xl">
          content_cut
        </span>
        <span className="text-xl font-bold tracking-tight text-white font-heading">Kuttly</span>
      </div>

      {/* ── Bottom content ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 pb-8">

        {/* Quote + attribution */}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <p className="text-white text-xl font-bold font-heading leading-snug tracking-tight mb-3 max-w-sm">
              "{t.quote}"
            </p>
            <p className="text-slate-400 text-sm font-medium">
              — {t.name}, <span className="text-slate-500">{t.role}</span>
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Social proof row + arrows */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Stacked avatars */}
            <div className="flex -space-x-2.5">
              {avatars.map((av, i) => (
                <img
                  key={i}
                  src={av}
                  alt="shop owner"
                  className="size-9 rounded-full border-2 border-navy object-cover"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm leading-none">★</span>
                ))}
                <span className="text-white text-sm font-bold ml-1">5.0</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-0.5">From 500+ verified shops</p>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="flex gap-2">
            <button
              onClick={() => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1))}
              className="size-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center backdrop-blur-sm"
              aria-label="Previous"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
              className="size-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center backdrop-blur-sm"
              aria-label="Next"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
