import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import UpgradeProModal from '../components/UpgradeProModal';
import { useBusiness } from '../context/BusinessContext';

export default function Customers() {
  const { customers, bookings, setIsUpgradeModalOpen } = useBusiness();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    document.title = "Customers | Kuttly Business Basic";
  }, []);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get booking history for selected customer
  const customerBookings = selectedCustomer
    ? bookings.filter(b => b.customer.toLowerCase() === selectedCustomer.name.toLowerCase())
    : [];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F9FC] font-sans text-navy antialiased">
      <DashboardSidebar />
      <UpgradeProModal />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl">
        <DashboardHeader
          title="Customer Management"
          subtitle="A clean directory of your clients, their booking totals, and contact records."
        />

        {/* Pro Marketing Callout */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-2xl border border-primary/20 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">loyalty</span>
            <div>
              <span className="font-bold text-navy block">Client Directory & Contact History</span>
              <span className="text-slate-500 text-[11px]">
                Basic includes full customer records and past visits. Automated re-engagement and loyalty stamps are in Kuttly Pro.
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="text-primary font-bold text-xs hover:underline shrink-0"
          >
            Explore Loyalty Pro →
          </button>
        </div>

        {/* Main Customers Directory Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs mb-6">
          {/* Header Search & Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
            <div className="relative max-w-md w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                search
              </span>
              <input
                type="text"
                placeholder="Search by client name, phone number, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
              />
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              {filteredCustomers.length} registered clients
            </span>
          </div>

          {/* Table */}
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-slate-100">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">person_search</span>
              <h3 className="text-sm font-bold text-slate-700">No clients found</h3>
              <p className="text-xs text-slate-400 mt-1">Try searching with a different name or phone number.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 pl-2">Customer Name</th>
                    <th className="pb-3">Phone Number</th>
                    <th className="pb-3">Email Address</th>
                    <th className="pb-3">Total Bookings</th>
                    <th className="pb-3">Last Booking</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((cust) => (
                    <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Name */}
                      <td className="py-4 pl-2 font-semibold text-slate-900 flex items-center gap-3">
                        <div className="size-9 rounded-full bg-[#EFF5FF] text-primary flex items-center justify-center font-bold text-xs shrink-0">
                          {cust.name[0]}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{cust.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">Fav: {cust.favoriteService}</span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-4 text-slate-600 font-medium">
                        {cust.phone}
                      </td>

                      {/* Email */}
                      <td className="py-4 text-slate-500 font-mono text-[11px]">
                        {cust.email || <span className="text-slate-300 italic">Not provided</span>}
                      </td>

                      {/* Total Bookings */}
                      <td className="py-4 font-bold text-slate-900">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-extrabold text-[11px]">
                          {cust.bookingsCount} visits
                        </span>
                      </td>

                      {/* Last Booking */}
                      <td className="py-4 text-slate-600 font-medium">
                        {cust.lastBookingDate}
                      </td>

                      {/* Actions */}
                      <td className="py-4 text-right pr-2 space-x-1">
                        <a
                          href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(cust.name)},%20from%20The%20Fade%20Room.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors inline-flex"
                          title="Message on WhatsApp"
                        >
                          <span className="material-symbols-outlined text-base">chat</span>
                        </a>
                        <button
                          onClick={() => setSelectedCustomer(cust)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Customer Profile & History Drawer/Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 text-xs max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-base">
                    {selectedCustomer.name[0]}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 font-heading">
                      {selectedCustomer.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">Customer Profile</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="size-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              {/* Contact Details */}
              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100 mb-5 space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <a href={`tel:${selectedCustomer.phone}`} className="font-bold text-primary">{selectedCustomer.phone}</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-mono text-slate-700">{selectedCustomer.email || 'None provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Favorite Service:</span>
                  <span className="font-semibold text-slate-900">{selectedCustomer.favoriteService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Visits:</span>
                  <span className="font-extrabold text-slate-900">{selectedCustomer.bookingsCount} haircuts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Appointment:</span>
                  <span className="font-medium text-slate-700">{selectedCustomer.lastBookingDate}</span>
                </div>
              </div>

              {/* Booking History */}
              <div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-3">
                  Visit & Booking History
                </h4>
                {customerBookings.length === 0 ? (
                  <p className="text-slate-400 italic py-2">No appointments on record yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {customerBookings.map((bk) => (
                      <div key={bk.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-[11px]">
                        <div>
                          <span className="font-bold text-slate-900 block">{bk.service}</span>
                          <span className="text-slate-400">{bk.date} at {bk.time}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-slate-900 block">{bk.price}</span>
                          <span className="text-[10px] font-semibold text-emerald-600">{bk.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={`tel:${selectedCustomer.phone}`}
                  className="flex-1 py-2 rounded-full border border-slate-200 text-center font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>Call Client</span>
                </a>
                <a
                  href={`https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

