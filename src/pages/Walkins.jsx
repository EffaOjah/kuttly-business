import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import UpgradeProModal from '../components/UpgradeProModal';
import { useBusiness } from '../context/BusinessContext';

export default function Walkins() {
  const { walkins, addWalkin, updateWalkinStatus, services } = useBusiness();

  const [showAddModal, setShowAddModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedService, setSelectedService] = useState(services[0]?.name || 'Low Cut');
  const [servicePrice, setServicePrice] = useState(services[0]?.priceNum?.toString() || '3000');

  useEffect(() => {
    document.title = "Walk-in Management | Kuttly Business Basic";
  }, []);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !servicePrice) return;

    addWalkin({
      customer: customerName.trim(),
      phone: customerPhone.trim(),
      service: selectedService,
      price: `₦${Number(servicePrice.replace(/[^0-9]/g, '')).toLocaleString()}`,
    });

    setCustomerName('');
    setCustomerPhone('');
    setShowAddModal(false);
  };

  const inProgressCount = walkins.filter(w => w.status === 'In Progress').length;
  const completedCount = walkins.filter(w => w.status === 'Completed').length;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F9FC] font-sans text-navy antialiased">
      <DashboardSidebar />
      <UpgradeProModal />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl">
        <DashboardHeader
          title="Walk-in Management"
          subtitle="Log walk-in clients, monitor chairs in progress, and track daily offline revenue."
        />

        {/* Walk-in Overview Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Currently In Chair
            </span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-primary font-heading">
                {inProgressCount}
              </span>
              <span className="size-8 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">chair</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Active haircuts in progress</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Completed Today
            </span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-emerald-600 font-heading">
                {completedCount}
              </span>
              <span className="size-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Walk-in clients serviced</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Total Walk-ins Recorded
            </span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-slate-900 font-heading">
                {walkins.length}
              </span>
              <span className="size-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">receipt_long</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Registered offline visits</p>
          </div>
        </section>

        {/* Walk-ins Queue List */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs mb-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                Today's Walk-in Log
              </h2>
              <p className="text-xs text-slate-500">
                Track cuts delivered without prior online appointments.
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#111B35] hover:bg-slate-900 text-white px-3 py-1.5 rounded-xl font-bold text-xs tracking-wide shadow-sm flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-sm">hail</span>
              <span>Add Walk-in</span>
            </button>
          </div>

          {walkins.length === 0 ? (
            <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-slate-100">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">person_off</span>
              <h3 className="text-sm font-bold text-slate-700">No walk-in clients logged today</h3>
              <p className="text-xs text-slate-400 mt-1">Click "Add Walk-in" to record clients walking straight into your shop.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 pl-2">Client Name</th>
                    <th className="pb-3">Phone (Optional)</th>
                    <th className="pb-3">Selected Service</th>
                    <th className="pb-3">Time In</th>
                    <th className="pb-3">Recorded Price</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {walkins.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 pl-2 font-bold text-slate-900">
                        {w.customer}
                      </td>
                      <td className="py-4 text-slate-600">
                        {w.phone || <span className="text-slate-300 italic">None</span>}
                      </td>
                      <td className="py-4 text-slate-700 font-medium">
                        {w.service}
                      </td>
                      <td className="py-4 text-slate-600 font-mono">
                        {w.time}
                      </td>
                      <td className="py-4 font-extrabold text-slate-900 font-heading">
                        {w.price}
                      </td>
                      <td className="py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          w.status === 'In Progress'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {w.status}
                        </span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        {w.status === 'In Progress' ? (
                          <button
                            onClick={() => updateWalkinStatus(w.id, 'Completed')}
                            className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                          >
                            Mark Completed
                          </button>
                        ) : (
                          <span className="text-slate-400 font-medium">Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Add Walk-in Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                <h3 className="font-extrabold text-base text-slate-900 font-heading">
                  Record Walk-in Customer
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="size-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kolawole"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Selected Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => {
                      setSelectedService(e.target.value);
                      const s = services.find(srv => srv.name === e.target.value);
                      if (s) setServicePrice(s.priceNum.toString());
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

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Recorded Price (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 rounded-full border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#111B35] hover:bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold shadow-sm"
                  >
                    Add to Queue
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

