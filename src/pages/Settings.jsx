import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import UpgradeProModal from '../components/UpgradeProModal';
import { useBusiness } from '../context/BusinessContext';

export default function Settings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useBusiness();

  const [accountForm, setAccountForm] = useState({
    ownerName: settings.ownerName,
    ownerEmail: settings.ownerEmail,
    ownerPhone: settings.ownerPhone,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    smsBookingAlerts: settings.smsBookingAlerts,
    emailDailySummary: settings.emailDailySummary,
    smsCustomerReminders: settings.smsCustomerReminders,
  });

  const [twoFactor, setTwoFactor] = useState(settings.twoFactorAuth);
  const [saveToast, setSaveToast] = useState('');

  useEffect(() => {
    document.title = "Settings | Kuttly Business Basic";
  }, []);

  const handleAccountSave = (e) => {
    e.preventDefault();
    updateSettings({ ...accountForm });
    showToast('Account details updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showToast('Password changed successfully!');
  };

  const handleSaveNotifications = () => {
    updateSettings({ ...notificationPrefs });
    showToast('Notification preferences saved!');
  };

  const showToast = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F9FC] font-sans text-navy antialiased">
      <DashboardSidebar />
      <UpgradeProModal />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl">
        <DashboardHeader
          title="Account Settings"
          subtitle="Manage your business owner profile, security credentials, and system notifications."
        />

        <div className="space-y-6 max-w-4xl">
          {/* Section 1: Account Information */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-4">
              Owner Account Information
            </h2>

            <form onSubmit={handleAccountSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Owner Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={accountForm.ownerName}
                    onChange={(e) => setAccountForm({ ...accountForm, ownerName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={accountForm.ownerPhone}
                    onChange={(e) => setAccountForm({ ...accountForm, ownerPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Login & Billing Email
                </label>
                <input
                  type="email"
                  required
                  value={accountForm.ownerEmail}
                  onChange={(e) => setAccountForm({ ...accountForm, ownerEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#111B35] hover:bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-sm"
                >
                  Save Account Changes
                </button>
              </div>
            </form>
          </section>

          {/* Section 2: Change Password */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-4">
              Change Password
            </h2>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  placeholder="••••••••"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                    placeholder="Minimum 8 characters"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                    placeholder="Repeat new password"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-[#1048bc] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-sm"
                >
                  Update Password
                </button>
              </div>
            </form>
          </section>

          {/* Section 3: Notification Preferences */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-4">
              Notification Preferences
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-100">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Instant SMS Booking Alerts</span>
                  <span className="text-[11px] text-slate-400">Receive an SMS whenever a client books online</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationPrefs.smsBookingAlerts}
                  onChange={(e) => setNotificationPrefs({ ...notificationPrefs, smsBookingAlerts: e.target.checked })}
                  className="size-4 text-primary rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-100">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Daily Morning Summary Email</span>
                  <span className="text-[11px] text-slate-400">Get a daily morning email breakdown of today's bookings</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationPrefs.emailDailySummary}
                  onChange={(e) => setNotificationPrefs({ ...notificationPrefs, emailDailySummary: e.target.checked })}
                  className="size-4 text-primary rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-100">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Automated Client Reminders</span>
                  <span className="text-[11px] text-slate-400">Send automatic SMS reminder to clients 2 hours before cut</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationPrefs.smsCustomerReminders}
                  onChange={(e) => setNotificationPrefs({ ...notificationPrefs, smsCustomerReminders: e.target.checked })}
                  className="size-4 text-primary rounded"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotifications}
                  className="bg-[#111B35] hover:bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-sm"
                >
                  Save Notifications
                </button>
              </div>
            </div>
          </section>

          {/* Section 4: Account Security & Logout */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-1">
                Account Security & Sessions
              </h2>
              <p className="text-xs text-slate-500">
                Active session logged in from Lagos, Nigeria • Chrome on Windows
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setTwoFactor(!twoFactor);
                  showToast(twoFactor ? '2-Factor Auth disabled' : '2-Factor Auth enabled!');
                }}
                className={`px-4 py-2 rounded-full border text-xs font-bold transition-colors ${
                  twoFactor ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'border-slate-200 text-slate-600'
                }`}
              >
                {twoFactor ? '2FA Active' : 'Enable 2FA'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-5 py-2 rounded-full text-xs font-bold transition-colors"
              >
                Log Out
              </button>
            </div>
          </section>
        </div>

        {saveToast && (
          <div className="fixed bottom-6 right-6 bg-[#111B35] text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 z-50">
            <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
            <span>{saveToast}</span>
          </div>
        )}
      </main>
    </div>
  );
}
