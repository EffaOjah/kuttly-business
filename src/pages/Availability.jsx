import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import UpgradeProModal from '../components/UpgradeProModal';
import { useBusiness } from '../context/BusinessContext';

export default function Availability() {
  const {
    workingHours,
    updateWorkingDay,
    blockedDates,
    addBlockedDate,
    removeBlockedDate,
    profile,
    toggleOnlineBookings,
    bookingInterval,
    setBookingInterval,
    setIsUpgradeModalOpen
  } = useBusiness();

  const [newBlockDate, setNewBlockDate] = useState('');
  const [newBlockReason, setNewBlockReason] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    document.title = "Availability & Hours | Kuttly Business Basic";
  }, []);

  const handleAddBlockedDate = (e) => {
    e.preventDefault();
    if (!newBlockDate) return;
    addBlockedDate({
      date: newBlockDate,
      reason: newBlockReason || 'Holiday / Shop Maintenance'
    });
    setNewBlockDate('');
    setNewBlockReason('');
  };

  const handleSaveAll = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F9FC] font-sans text-navy antialiased">
      <DashboardSidebar />
      <UpgradeProModal />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl">
        <DashboardHeader
          title="Availability & Working Hours"
          subtitle="Set your shop's weekly schedule, block holiday dates, and manage online booking status."
        />

        {/* Master Online Booking Switch */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/70 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`size-2.5 rounded-full ${profile.onlineBookingEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              <h2 className="text-base font-extrabold text-slate-900 font-heading">
                Online Booking Status
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              When enabled, clients can discover your profile on the marketplace and book available appointment slots automatically.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">
              {profile.onlineBookingEnabled ? 'Accepting Online Bookings' : 'Bookings Paused'}
            </span>
            <button
              type="button"
              onClick={toggleOnlineBookings}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                profile.onlineBookingEnabled ? 'bg-primary' : 'bg-slate-300'
              }`}
            >
              <span
                className={`block size-4 rounded-full bg-white transition-transform shadow-xs ${
                  profile.onlineBookingEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        {/* Pro Staff Schedule Callout */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-2xl border border-primary/20 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-xl">info</span>
            <div>
              <span className="font-bold text-navy block">Basic Plan Availability</span>
              <span className="text-slate-500 text-[11px]">
                Your Basic plan covers shop-level opening hours. Individual barber shifts & staff rotas are included in Kuttly Pro.
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="text-primary font-bold text-xs hover:underline shrink-0"
          >
            Learn about Pro schedules →
          </button>
        </div>

        {/* Weekly Day-by-Day Hours */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs mb-6">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-4">
            Weekly Operating Hours
          </h2>

          <div className="space-y-3.5">
            {workingHours.map((wh) => (
              <div
                key={wh.day}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all gap-3 ${
                  wh.isOpen ? 'bg-[#F8FAFC] border-slate-200/80' : 'bg-slate-50 border-slate-100 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 w-36">
                  <button
                    type="button"
                    onClick={() => updateWorkingDay(wh.day, { isOpen: !wh.isOpen })}
                    className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                      wh.isOpen ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`block size-3 rounded-full bg-white transition-transform shadow-xs ${
                        wh.isOpen ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="font-bold text-xs text-slate-900 font-heading">{wh.day}</span>
                </div>

                <div className="flex items-center gap-3">
                  {wh.isOpen ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-medium">Opens</span>
                        <input
                          type="time"
                          value={wh.open}
                          onChange={(e) => updateWorkingDay(wh.day, { open: e.target.value })}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
                        />
                      </div>
                      <span className="text-slate-300">—</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-medium">Closes</span>
                        <input
                          type="time"
                          value={wh.close}
                          onChange={(e) => updateWorkingDay(wh.day, { close: e.target.value })}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
                        />
                      </div>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 py-1.5 px-3 rounded-lg bg-slate-100">
                      Shop Closed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* General Booking Availability & Blocked Dates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Slot Duration */}
          <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 font-heading mb-1">
                Booking Slot Interval
              </h2>
              <p className="text-xs text-slate-500 mb-5">
                Determine the frequency of time slots offered to clients on your booking calendar.
              </p>

              <div className="space-y-3">
                {[
                  { value: '30', label: 'Every 30 minutes', desc: 'Recommended for fast trims, low cuts, and beard touch-ups' },
                  { value: '45', label: 'Every 45 minutes', desc: 'Ideal for detailed skin fades and luxury packages' },
                  { value: '60', label: 'Every 60 minutes', desc: 'Best for leisurely appointments and thorough scalp treatments' },
                ].map((item) => (
                  <label
                    key={item.value}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      bookingInterval === item.value
                        ? 'border-primary bg-[#EFF5FF]/40 text-navy'
                        : 'border-slate-200/80 bg-[#F8FAFC] text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="bookingInterval"
                      value={item.value}
                      checked={bookingInterval === item.value}
                      onChange={(e) => setBookingInterval(e.target.value)}
                      className="mt-0.5 text-primary"
                    />
                    <div>
                      <span className="text-xs font-bold block">{item.label}</span>
                      <span className="text-[11px] text-slate-400">{item.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Block Specific Dates */}
          <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/70 shadow-xs">
            <h2 className="text-base font-extrabold text-slate-900 font-heading mb-1">
              Block Specific Dates
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Block out public holidays, shop renovations, or staff training days.
            </p>

            <form onSubmit={handleAddBlockedDate} className="space-y-3 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="date"
                  required
                  value={newBlockDate}
                  onChange={(e) => setNewBlockDate(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                />
                <input
                  type="text"
                  placeholder="Reason (e.g. Christmas)"
                  value={newBlockReason}
                  onChange={(e) => setNewBlockReason(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#111B35] hover:bg-slate-900 text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">block</span>
                <span>Block Selected Date</span>
              </button>
            </form>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Currently Blocked Dates:
              </span>
              {blockedDates.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 block font-mono">{d.date}</span>
                    <span className="text-slate-500 text-[11px]">{d.reason}</span>
                  </div>
                  <button
                    onClick={() => removeBlockedDate(d.id)}
                    className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Remove blocked date"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Save Row */}
        <div className="flex items-center justify-end pt-2 pb-6">
          <button
            onClick={handleSaveAll}
            className="bg-[#111B35] hover:bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold text-xs tracking-wide shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            <span>Save Schedule</span>
          </button>
        </div>

        {saveToast && (
          <div className="fixed bottom-6 right-6 bg-[#111B35] text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 z-50">
            <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
            <span>Availability settings saved successfully!</span>
          </div>
        )}
      </main>
    </div>
  );
}

