import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import UpgradeProModal from '../components/UpgradeProModal';
import { useBusiness } from '../context/BusinessContext';

export default function BarberDashboard() {
  const navigate = useNavigate();
  const {
    profile,
    bookings,
    updateBookingStatus,
    reviews,
    totalBookingsCount,
    pendingBookingsCount,
    confirmedBookingsCount,
    totalCustomersCount,
    profileCompletion,
  } = useBusiness();

  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);

  useEffect(() => {
    document.title = "Dashboard | Kuttly Business Basic";
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://kuttly.com/shop/${profile.slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  // 4 Overview Cards (clean 4-card grid)
  const overviewCards = [
    { label: "Total Bookings", value: totalBookingsCount, icon: "event_available", color: "text-primary", bg: "bg-blue-50/80" },
    { label: "Pending Bookings", value: pendingBookingsCount, icon: "hourglass_top", color: "text-amber-600", bg: "bg-amber-50/80", alert: pendingBookingsCount > 0 },
    { label: "Confirmed Bookings", value: confirmedBookingsCount, icon: "verified", color: "text-emerald-600", bg: "bg-emerald-50/80" },
    { label: "Total Customers", value: totalCustomersCount, icon: "groups", color: "text-indigo-600", bg: "bg-indigo-50/80" },
  ];

  // Filter Today's appointments
  const todaysAppointments = bookings.filter(b => b.date === "Today");
  const recentBookings = bookings.slice(0, 5);

  const statusStyles = {
    Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Completed: "bg-blue-50 text-blue-700 border-blue-200",
    Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
    Rejected: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F9FC] font-sans text-navy antialiased">
      <DashboardSidebar />
      <UpgradeProModal />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl">
        <DashboardHeader
          title="Dashboard"
          subtitle="Welcome back. Here is your daily booking and shop overview."
        />

        {/* ========================================================= */}
        {/* 1. FOUR OVERVIEW CARDS                                    */}
        {/* ========================================================= */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
          {overviewCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {card.label}
                </span>
                <div className={`size-8 rounded-xl ${card.bg} ${card.color} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-lg">{card.icon}</span>
                </div>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading block">
                  {card.value}
                </span>
                {card.alert && (
                  <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1 mt-0.5">
                    <span className="size-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    Needs review
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </section>

        {/* ========================================================= */}
        {/* 2. QUICK ACTIONS & PROFILE COMPLETION                     */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Quick Actions (4 Actions strictly as specified) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                  Quick Actions
                </h2>
                <span className="text-xs text-slate-400">Basic essentials</span>
              </div>
              <p className="text-xs text-slate-500 mb-5">
                Fast shortcuts to manage your shop's services, portfolio, and working availability.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Add a service */}
                <button
                  onClick={() => navigate('/dashboard/services')}
                  className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-primary/50 bg-[#F8FAFC] hover:bg-white transition-all text-left group cursor-pointer"
                >
                  <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">content_cut</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 block font-heading leading-snug">
                    Add a service
                  </span>
                  <span className="text-[10px] text-slate-400">Set prices & duration</span>
                </button>

                {/* 2. Update availability */}
                <button
                  onClick={() => navigate('/dashboard/availability')}
                  className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-primary/50 bg-[#F8FAFC] hover:bg-white transition-all text-left group cursor-pointer"
                >
                  <div className="size-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">schedule</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 block font-heading leading-snug">
                    Update availability
                  </span>
                  <span className="text-[10px] text-slate-400">Set hours & holidays</span>
                </button>

                {/* 3. View public profile */}
                <a
                  href="http://localhost:5173"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-primary/50 bg-[#F8FAFC] hover:bg-white transition-all text-left group cursor-pointer block"
                >
                  <div className="size-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 block font-heading leading-snug">
                    View public profile
                  </span>
                  <span className="text-[10px] text-slate-400">How customers see you</span>
                </a>

                {/* 4. Upload portfolio image */}
                <button
                  onClick={() => navigate('/dashboard/portfolio')}
                  className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-primary/50 bg-[#F8FAFC] hover:bg-white transition-all text-left group cursor-pointer"
                >
                  <div className="size-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-xl">add_photo_alternate</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 block font-heading leading-snug">
                    Upload haircut
                  </span>
                  <span className="text-[10px] text-slate-400">Showcase your work</span>
                </button>
              </div>
            </div>

            {/* Share Public Profile Bar */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 truncate text-slate-500 font-mono text-[11px] bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="material-symbols-outlined text-sm text-slate-400">link</span>
                <span className="truncate">https://kuttly.com/shop/{profile.slug}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm">
                  {copiedLink ? 'check' : 'content_copy'}
                </span>
                <span>{copiedLink ? 'Copied!' : 'Copy link'}</span>
              </button>
            </div>
          </div>

          {/* Business Profile Completion Percentage */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Profile Status
                </span>
                <span className="text-sm font-extrabold text-primary font-heading">
                  {profileCompletion}% Complete
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 font-heading mb-1">
                Business Profile
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Complete all profile fields to rank higher on Kuttly search and gain customer trust.
              </p>

              {/* Progress Bar */}
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>

              {/* Checklist items */}
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-500">check_circle</span>
                  <span>Logo & cover image added</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-500">check_circle</span>
                  <span>Weekly availability set</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-500">check_circle</span>
                  <span>Active services & prices defined</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <Link
                to="/dashboard/profile"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Edit business profile</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. TODAY'S APPOINTMENTS & RECENT REVIEWS                  */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Today's Appointments */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/70 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                  Today's Appointments
                </h2>
                <p className="text-xs text-slate-500">Clients scheduled for haircut and grooming today</p>
              </div>
              <Link
                to="/dashboard/bookings"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>View all ({bookings.length})</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {todaysAppointments.length === 0 ? (
              <div className="text-center py-10 bg-slate-50/60 rounded-2xl border border-slate-100">
                <span className="material-symbols-outlined text-3xl text-slate-300 mb-2">event_busy</span>
                <p className="text-xs text-slate-500 font-medium">No appointments scheduled for today yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todaysAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-200/80 hover:border-primary/40 bg-[#F8FAFC]/70 transition-all gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-slate-200 border border-slate-300/80 overflow-hidden shrink-0 flex items-center justify-center font-bold text-primary text-sm">
                        {appt.customer[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-heading">{appt.customer}</h4>
                        <p className="text-slate-500 text-xs">{appt.service} • <span className="font-semibold text-slate-700">{appt.time}</span></p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      <span className="text-xs font-bold text-slate-900">{appt.price}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[appt.status]}`}>
                        {appt.status}
                      </span>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        {appt.status === 'Pending' && (
                          <button
                            onClick={() => updateBookingStatus(appt.id, 'Confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors"
                            title="Accept booking"
                          >
                            Accept
                          </button>
                        )}
                        {appt.status === 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(appt.id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-primary text-xs font-bold hover:bg-blue-100 transition-colors"
                            title="Mark as completed"
                          >
                            Done
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedBookingDetails(appt)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="View details"
                        >
                          <span className="material-symbols-outlined text-base">info</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Customer Reviews */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                  Customer Reviews
                </h2>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span>4.9</span>
                </div>
              </div>

              <div className="space-y-3">
                {reviews.slice(0, 2).map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-900">{rev.customer}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400 text-xs mb-1">
                      {'★'.repeat(rev.rating)}
                    </div>
                    <p className="text-slate-600 line-clamp-2 leading-relaxed text-[11px]">
                      "{rev.comment}"
                    </p>
                    {rev.businessResponse && (
                      <div className="mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">reply</span>
                        <span>Responded to client</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <Link
                to="/dashboard/reviews"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>View all reviews & respond</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. RECENT BOOKINGS TABLE                                  */}
        {/* ========================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
              Recent Bookings
            </h2>
            <Link to="/dashboard/bookings" className="text-xs font-bold text-primary hover:underline">
              Full bookings list →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Customer</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Date & Time</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pl-2 font-semibold text-slate-900">
                      <div>
                        <span>{b.customer}</span>
                        <span className="block text-[10px] text-slate-400 font-normal">{b.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-700">{b.service}</td>
                    <td className="py-3.5 text-slate-600">
                      {b.date}, {b.time}
                    </td>
                    <td className="py-3.5 font-bold text-slate-900">{b.price}</td>
                    <td className="py-3.5">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[b.status]}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <button
                        onClick={() => setSelectedBookingDetails(b)}
                        className="text-primary font-bold hover:underline"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBookingDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBookingDetails(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 z-10 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-extrabold text-base text-slate-900 font-heading">
                  Booking Details #{selectedBookingDetails.id}
                </h3>
                <button
                  onClick={() => setSelectedBookingDetails(null)}
                  className="size-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              <div className="space-y-3 text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Customer:</span>
                  <span className="font-bold text-slate-900">{selectedBookingDetails.customer}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Phone:</span>
                  <a href={`tel:${selectedBookingDetails.phone}`} className="text-primary font-semibold">{selectedBookingDetails.phone}</a>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-semibold text-slate-900">{selectedBookingDetails.service}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Schedule:</span>
                  <span className="font-semibold text-slate-900">{selectedBookingDetails.date} at {selectedBookingDetails.time}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Price:</span>
                  <span className="font-bold text-slate-900">{selectedBookingDetails.price}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Status:</span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[selectedBookingDetails.status]}`}>
                    {selectedBookingDetails.status}
                  </span>
                </div>
                {selectedBookingDetails.notes && (
                  <div className="p-3 bg-slate-50 rounded-xl mt-2 text-slate-600">
                    <span className="font-bold text-[10px] text-slate-400 uppercase block mb-0.5">Customer Notes</span>
                    {selectedBookingDetails.notes}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-2">
                {selectedBookingDetails.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBookingDetails.id, 'Rejected');
                        setSelectedBookingDetails(null);
                      }}
                      className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBookingDetails.id, 'Confirmed');
                        setSelectedBookingDetails(null);
                      }}
                      className="px-5 py-2 rounded-full bg-primary hover:bg-[#1048bc] text-white font-bold"
                    >
                      Accept Booking
                    </button>
                  </>
                )}
                {selectedBookingDetails.status === 'Confirmed' && (
                  <button
                    onClick={() => {
                      updateBookingStatus(selectedBookingDetails.id, 'Completed');
                      setSelectedBookingDetails(null);
                    }}
                    className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    Mark as Completed
                  </button>
                )}
                {(selectedBookingDetails.status === 'Completed' || selectedBookingDetails.status === 'Cancelled' || selectedBookingDetails.status === 'Rejected') && (
                  <button
                    onClick={() => setSelectedBookingDetails(null)}
                    className="px-5 py-2 rounded-full border border-slate-200 text-slate-700 font-bold"
                  >
                    Close
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
