import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBusiness } from '../context/BusinessContext';

export default function DashboardSidebar() {
  const location = useLocation();
  const { setIsUpgradeModalOpen, pendingBookingsCount, mobileMenuOpen, setMobileMenuOpen } = useBusiness();

  const navItems = [
    { name: 'Dashboard', icon: 'grid_view', path: '/dashboard' },
    { name: 'Business Profile', icon: 'storefront', path: '/dashboard/profile' },
    { name: 'Services & Pricing', icon: 'content_cut', path: '/dashboard/services' },
    { name: 'Bookings', icon: 'calendar_month', path: '/dashboard/bookings', badge: pendingBookingsCount > 0 ? pendingBookingsCount : null },
    { name: 'Availability', icon: 'schedule', path: '/dashboard/availability' },
    { name: 'Customers', icon: 'group', path: '/dashboard/customers' },
    { name: 'Portfolio', icon: 'photo_library', path: '/dashboard/portfolio' },
    { name: 'Reviews & Ratings', icon: 'star', path: '/dashboard/reviews' },
    { name: 'Walk-ins', icon: 'hail', path: '/dashboard/walkins' },
    { name: 'Promotions', icon: 'campaign', path: '/dashboard/promotions', tag: 'Monetize' },
    { name: 'Settings', icon: 'settings', path: '/dashboard/settings' },
  ];

  const isItemActive = (itemPath) => {
    if (itemPath === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/' || location.pathname === '/business' || location.pathname === '/business/dashboard';
    }
    const cleanPath = itemPath.replace('/dashboard/', '');
    return location.pathname.includes(cleanPath);
  };

  return (
    <>
      {/* ── Mobile Drawer (< lg) ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-navy/40 backdrop-blur-xs"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col p-5 shadow-2xl z-10 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-xl">content_cut</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-base text-navy font-heading">Kuttly</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full border border-slate-200">
                        Basic
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Business dashboard
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-navy rounded-lg"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1 flex-1">
                {navItems.map((item) => {
                  const active = isItemActive(item.path);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                        active
                          ? 'bg-[#111B35] text-white shadow-xs'
                          : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="size-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                      {item.tag && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.tag}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Upgrade to Pro Card */}
              <div className="pt-4 border-t border-slate-100 mt-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#111B35] to-[#1e2f5d] text-white">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="material-symbols-outlined text-amber-400 text-sm">stars</span>
                    <span className="font-bold text-xs font-heading">Upgrade to Pro</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug mb-3">
                    Unlock advanced business management tools and grow your business.
                  </p>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsUpgradeModalOpen(true);
                    }}
                    className="w-full bg-primary hover:bg-[#1048bc] text-white text-xs font-bold py-2 rounded-xl transition-colors shadow-xs"
                  >
                    Explore Pro features →
                  </button>
                </div>

                <a
                  href="http://localhost:5173"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-primary transition-colors mt-2"
                >
                  <span className="material-symbols-outlined text-base">storefront</span>
                  <span>View Customer Marketplace</span>
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* ── Desktop Permanent Sidebar (>= lg) ── */}
      <aside className="hidden lg:flex w-64 xl:w-70 flex-col bg-white border-r border-slate-200/80 h-screen sticky top-0 shrink-0 z-30 justify-between p-5 overflow-y-auto">
        {/* Top: Brand & Title */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <Link to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="size-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl font-bold">content_cut</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-navy font-heading">
                    Kuttly
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#F1F5F9] text-slate-700 border border-slate-200">
                    Basic
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold block -mt-0.5">
                  Business dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isItemActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-semibold text-xs transition-all ${
                    active
                      ? 'bg-[#111B35] text-white shadow-xs'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-xl ${active ? 'text-white' : 'text-slate-400'}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="size-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  {item.tag && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.tag}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Upgrade to Pro & Marketplace Link */}
        <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#111B35] to-[#1e2f5d] text-white shadow-xs">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="material-symbols-outlined text-amber-400 text-base">stars</span>
              <span className="font-extrabold text-xs font-heading">Upgrade to Pro</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug mb-3">
              Unlock advanced business management tools and grow your business.
            </p>
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="w-full bg-primary hover:bg-[#1048bc] text-white text-xs font-bold py-2 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Explore Pro features</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">storefront</span>
            <span>Client Marketplace</span>
          </a>
        </div>
      </aside>
    </>
  );
}
