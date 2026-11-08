import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBusiness } from '../context/BusinessContext';

export default function DashboardHeader({ title, subtitle }) {
  const { profile, reviews, pendingBookingsCount, setMobileMenuOpen } = useBusiness();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <>
      {/* ── Mobile Top Bar (< lg) ── */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#F7F9FC]/95 backdrop-blur-md border-b border-slate-200/60 px-4 py-2.5 flex items-center justify-between -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 mb-5">
        {/* Left: Hamburger + Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="size-9 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-primary/40 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer shrink-0 group"
            aria-label="Open navigation menu"
          >
            <span className="w-4 h-[2px] bg-[#111B35] rounded-full group-hover:bg-primary transition-colors"></span>
            <span className="w-2.5 h-[2px] bg-[#111B35] rounded-full group-hover:w-4 group-hover:bg-primary transition-all self-start ml-2.5"></span>
            <span className="w-4 h-[2px] bg-[#111B35] rounded-full group-hover:bg-primary transition-colors"></span>
          </button>
          <h1 className="text-base font-extrabold text-slate-900 tracking-tight font-heading truncate">
            {title}
          </h1>
        </div>

        {/* Right: Notification + Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="size-9 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center text-slate-700 shadow-xs relative cursor-pointer"
              aria-label="View notifications"
            >
              <span className="material-symbols-outlined text-lg">notifications</span>
              {pendingBookingsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 size-2 bg-primary rounded-full ring-2 ring-white"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50 text-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="font-bold text-slate-900 text-sm font-heading">Notifications</span>
                    <span className="text-[11px] font-semibold text-primary">{pendingBookingsCount} pending</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">event</span>
                      <div>
                        <p className="font-semibold text-slate-900">New Booking Request</p>
                        <p className="text-slate-500 text-[11px]">Chukwudi Eze requested Low Cut for today 11:45 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                      <span className="material-symbols-outlined text-amber-500 text-lg mt-0.5">star</span>
                      <div>
                        <p className="font-semibold text-slate-900">New Review Received</p>
                        <p className="text-slate-500 text-[11px]">{reviews[0]?.comment || "Great service!"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-100 text-center">
                    <Link
                      to="/dashboard/bookings"
                      onClick={() => setShowNotifications(false)}
                      className="text-primary font-bold text-xs hover:underline"
                    >
                      View all bookings →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="size-9 rounded-full border border-slate-200/90 overflow-hidden hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer shadow-xs bg-slate-100 flex items-center justify-center"
              aria-label="User profile menu"
            >
              <img
                src={profile.logo}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 text-xs"
                >
                  <div className="p-2 border-b border-slate-100 mb-2">
                    <p className="font-bold text-slate-900 text-sm font-heading">{profile.name}</p>
                    <p className="text-slate-500 text-[11px] truncate">{profile.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      Kuttly Basic
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">storefront</span>
                      <span>Business Profile</span>
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">settings</span>
                      <span>Account Settings</span>
                    </Link>
                    <div className="pt-2 border-t border-slate-100">
                      <Link
                        to="/login"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">logout</span>
                        <span>Log out</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ── Desktop Header (>= lg) ── */}
      <header className="hidden lg:flex flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Cluster: Plan Pill, Notification Bell, Profile Icon */}
        <div className="flex items-center gap-3">
          {/* Plan Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/80 bg-white text-xs font-semibold text-slate-700 shadow-xs">
            <span className="size-2 rounded-full bg-emerald-500"></span>
            <span>Basic Plan</span>
            <span className="text-[10px] text-slate-400 font-normal">Free</span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="size-10 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center text-slate-700 shadow-xs relative cursor-pointer"
              aria-label="View notifications"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              {pendingBookingsCount > 0 && (
                <span className="absolute top-2 right-2 size-2 bg-primary rounded-full ring-2 ring-white"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-96 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50 text-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="font-bold text-slate-900 text-sm font-heading">Notifications</span>
                    <span className="text-[11px] font-semibold text-primary">{pendingBookingsCount} pending</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">event</span>
                      <div>
                        <p className="font-semibold text-slate-900">New Booking Request</p>
                        <p className="text-slate-500 text-[11px]">Chukwudi Eze requested Low Cut for today 11:45 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                      <span className="material-symbols-outlined text-amber-500 text-lg mt-0.5">star</span>
                      <div>
                        <p className="font-semibold text-slate-900">New Review Received</p>
                        <p className="text-slate-500 text-[11px]">{reviews[0]?.comment || "Great service!"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-100 text-center">
                    <Link
                      to="/dashboard/bookings"
                      onClick={() => setShowNotifications(false)}
                      className="text-primary font-bold text-xs hover:underline"
                    >
                      View all bookings →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="size-10 rounded-full border border-slate-200/90 overflow-hidden hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer shadow-xs bg-slate-100 flex items-center justify-center"
              aria-label="User profile menu"
            >
              <img
                src={profile.logo}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 text-xs"
                >
                  <div className="p-2 border-b border-slate-100 mb-2">
                    <p className="font-bold text-slate-900 text-sm font-heading">{profile.name}</p>
                    <p className="text-slate-500 text-[11px] truncate">{profile.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      Kuttly Basic
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">storefront</span>
                      <span>Business Profile</span>
                    </Link>
                    <Link
                      to="/dashboard/services"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">content_cut</span>
                      <span>Services & Pricing</span>
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">settings</span>
                      <span>Account Settings</span>
                    </Link>
                    <div className="pt-2 border-t border-slate-100">
                      <Link
                        to="/login"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">logout</span>
                        <span>Log out</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}
