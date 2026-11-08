import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import UpgradeProModal from '../components/UpgradeProModal';
import { useBusiness } from '../context/BusinessContext';

export default function Bookings() {
  const { bookings, updateBookingStatus, addBooking, services } = useBusiness();

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Booking Form State
  const [newBooking, setNewBooking] = useState({
    customer: '',
    phone: '',
    email: '',
    service: services[0]?.name || 'Haircut + Beard',
    price: services[0]?.price || '₦5,000',
    date: 'Today',
    time: '02:00 PM',
    notes: ''
  });

  useEffect(() => {
    document.title = "Bookings | Kuttly Business Basic";
  }, []);

  const filterTabs = ['All', 'Today', 'Upcoming', 'Pending', 'Completed', 'Cancelled'];

  const statusStyles = {
    Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Completed: "bg-blue-50 text-blue-700 border-blue-200",
    Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
    Rejected: "bg-slate-100 text-slate-600 border-slate-200",
  };

  const filteredBookings = bookings.filter((b) => {
    // Tab filters
    let matchesTab = true;
    if (activeFilter === 'Today') matchesTab = b.date === 'Today';
    else if (activeFilter === 'Upcoming') matchesTab = b.date === 'Tomorrow' || b.status === 'Confirmed';
    else if (activeFilter === 'Pending') matchesTab = b.status === 'Pending';
    else if (activeFilter === 'Completed') matchesTab = b.status === 'Completed';
    else if (activeFilter === 'Cancelled') matchesTab = b.status === 'Cancelled' || b.status === 'Rejected';

    // Search query filter
    const matchesSearch = b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.phone.includes(searchQuery) ||
                          b.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newBooking.customer.trim()) return;

    addBooking({
      id: `BK-${Math.floor(1090 + Math.random() * 900)}`,
      customer: newBooking.customer.trim(),
      phone: newBooking.phone || '+234 800 000 0000',
      email: newBooking.email || '',
      service: newBooking.service,
      price: newBooking.price,
      date: newBooking.date,
      time: newBooking.time,
      status: 'Confirmed',
      notes: newBooking.notes,
      createdAt: 'Just now'
    });

    setShowCreateModal(false);
    setNewBooking({
      customer: '',
      phone: '',
      email: '',
      service: services[0]?.name || 'Haircut + Beard',
      price: services[0]?.price || '₦5,000',
      date: 'Today',
      time: '02:00 PM',
      notes: ''
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F9FC] font-sans text-navy antialiased">
      <DashboardSidebar />
      <UpgradeProModal />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl">
        <DashboardHeader
          title="Bookings"
          subtitle="Manage appointments, review customer requests, and track visit history."
        />

        {/* Main Bookings Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs mb-6">
          {/* Filter Tabs & Search Header */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeFilter === tab
                      ? 'bg-[#111B35] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search + New Booking */}
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by customer, phone, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                />
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-[#111B35] hover:bg-slate-900 text-white px-3 py-2 rounded-xl font-bold text-xs tracking-wide shadow-sm flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>New Booking</span>
              </button>
            </div>
          </div>

          {/* Bookings Table */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-slate-100">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">event_busy</span>
              <h3 className="text-sm font-bold text-slate-700">No bookings found</h3>
              <p className="text-xs text-slate-400 mt-1">There are no appointments matching the selected filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 pl-2">Customer & Contact</th>
                    <th className="pb-3">Service</th>
                    <th className="pb-3">Appointment Date</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Customer Info */}
                      <td className="py-4 pl-2 font-semibold text-slate-900">
                        <div>
                          <span className="font-bold text-slate-900">{b.customer}</span>
                          <span className="block text-[11px] text-slate-400 font-normal">{b.phone}</span>
                          {b.email && (
                            <span className="block text-[10px] text-slate-400 font-mono">{b.email}</span>
                          )}
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-4 text-slate-700 font-medium">
                        {b.service}
                      </td>

                      {/* Date */}
                      <td className="py-4 text-slate-600 font-medium">
                        {b.date}
                      </td>

                      {/* Time */}
                      <td className="py-4 font-bold text-slate-900">
                        {b.time}
                      </td>

                      {/* Price */}
                      <td className="py-4 font-extrabold text-slate-900 font-heading">
                        {b.price}
                      </td>

                      {/* Status */}
                      <td className="py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[b.status]}`}>
                          {b.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 text-right pr-2 space-x-1">
                        {b.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold transition-colors cursor-pointer"
                              title="Accept booking"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => updateBookingStatus(b.id, 'Rejected')}
                              className="px-2 py-1 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 font-bold transition-colors cursor-pointer"
                              title="Reject booking"
                            >
                              Decline
                            </button>
                          </>
                        )}

                        {b.status === 'Confirmed' && (
                          <>
                            <button
                              onClick={() => updateBookingStatus(b.id, 'Completed')}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 text-primary hover:bg-blue-100 font-bold transition-colors cursor-pointer"
                              title="Mark as completed"
                            >
                              Done
                            </button>
                            <button
                              onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                              className="px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-50 font-bold transition-colors cursor-pointer"
                              title="Cancel booking"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="px-2 py-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center"
                          title="View booking details"
                        >
                          <span className="material-symbols-outlined text-base">visibility</span>
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

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 font-heading">
                    Booking Details
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">Ref: {selectedBooking.id}</span>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="size-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              <div className="space-y-3.5">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Customer Name:</span>
                  <span className="font-bold text-slate-900">{selectedBooking.customer}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Phone Number:</span>
                  <a href={`tel:${selectedBooking.phone}`} className="font-semibold text-primary">{selectedBooking.phone}</a>
                </div>
                {selectedBooking.email && (
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Email Address:</span>
                    <span className="font-mono text-slate-600">{selectedBooking.email}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Selected Service:</span>
                  <span className="font-bold text-slate-900">{selectedBooking.service}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="font-semibold text-slate-900">{selectedBooking.date} at {selectedBooking.time}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Total Price:</span>
                  <span className="font-extrabold text-slate-900 font-heading text-sm">{selectedBooking.price}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Booking Status:</span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[selectedBooking.status]}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                {selectedBooking.notes && (
                  <div className="p-3 bg-slate-50 rounded-xl mt-2 text-slate-600">
                    <span className="font-bold text-[10px] text-slate-400 uppercase block mb-0.5">Customer Instructions</span>
                    {selectedBooking.notes}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                {selectedBooking.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'Rejected');
                        setSelectedBooking(null);
                      }}
                      className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'Confirmed');
                        setSelectedBooking(null);
                      }}
                      className="px-5 py-2 rounded-full bg-primary hover:bg-[#1048bc] text-white font-bold"
                    >
                      Accept Booking
                    </button>
                  </>
                )}
                {selectedBooking.status === 'Confirmed' && (
                  <>
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'Cancelled');
                        setSelectedBooking(null);
                      }}
                      className="px-4 py-2 rounded-full border border-rose-200 text-rose-600 font-bold hover:bg-rose-50"
                    >
                      Cancel Booking
                    </button>
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'Completed');
                        setSelectedBooking(null);
                      }}
                      className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      Mark Completed
                    </button>
                  </>
                )}
                {(selectedBooking.status === 'Completed' || selectedBooking.status === 'Cancelled' || selectedBooking.status === 'Rejected') && (
                  <button
                    onClick={() => setSelectedBooking(null)}
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

      {/* New Booking Form Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                <h3 className="font-extrabold text-base text-slate-900 font-heading">
                  Create New Booking
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="size-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ebuka Obi"
                    value={newBooking.customer}
                    onChange={(e) => setNewBooking({ ...newBooking, customer: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 800 000 0000"
                      value={newBooking.phone}
                      onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="client@gmail.com"
                      value={newBooking.email}
                      onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Selected Service</label>
                  <select
                    value={newBooking.service}
                    onChange={(e) => {
                      const selected = services.find(s => s.name === e.target.value);
                      setNewBooking({
                        ...newBooking,
                        service: e.target.value,
                        price: selected ? selected.price : newBooking.price
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Today, Tomorrow"
                      value={newBooking.date}
                      onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 02:00 PM"
                      value={newBooking.time}
                      onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Special Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Any specific requests or haircut style..."
                    value={newBooking.notes}
                    onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC] resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#111B35] hover:bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-sm"
                  >
                    Save Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

