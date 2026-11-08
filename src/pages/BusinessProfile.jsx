import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import UpgradeProModal from '../components/UpgradeProModal';
import { useBusiness } from '../context/BusinessContext';

export default function BusinessProfile() {
  const { profile, updateProfile } = useBusiness();
  const [formData, setFormData] = useState({ ...profile });
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    document.title = "Business Profile | Kuttly Business Basic";
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://kuttly.com/shop/${formData.slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F9FC] font-sans text-navy antialiased">
      <DashboardSidebar />
      <UpgradeProModal />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl">
        <DashboardHeader
          title="Business Profile"
          subtitle="Manage how your shop appears to customers on the Kuttly marketplace."
        />

        {/* Public Profile Share Banner */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/70 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">share</span>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                Your Public Booking Link
              </h3>
              <p className="text-xs text-slate-500">
                Share this link on your Instagram bio, TikTok, and WhatsApp business profile.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#F8FAFC] border border-slate-200 px-3 py-2 rounded-xl text-xs font-mono text-slate-600 truncate max-w-xs">
              https://kuttly.com/shop/{formData.slug}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="bg-primary hover:bg-[#1048bc] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-sm">
                {copiedLink ? 'check' : 'content_copy'}
              </span>
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>Preview</span>
            </a>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Visual Identity */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-4">
              Branding & Cover Images
            </h2>

            {/* Cover Image Banner */}
            <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-6 group">
              <img
                src={formData.coverImage}
                alt="Shop Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Enter new cover image URL:", formData.coverImage);
                    if (url) setFormData({ ...formData, coverImage: url });
                  }}
                  className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                  Change Cover Image
                </button>
              </div>
            </div>

            {/* Logo and Basic Info */}
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative group shrink-0">
                <div className="size-24 rounded-2xl overflow-hidden bg-slate-200 border-2 border-slate-300">
                  <img
                    src={formData.logo}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt("Enter logo image URL:", formData.logo);
                    if (url) setFormData({ ...formData, logo: url });
                  }}
                  className="absolute inset-0 bg-black/40 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-center p-1"
                >
                  Update Logo
                </button>
              </div>

              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Custom Public URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Business Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC] resize-none"
                    placeholder="Describe your barbershop, experience, and signature styles..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Contact & Location */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-4">
              Contact & Physical Location
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Public Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Public Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Street Address *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  City / Area *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                />
              </div>
            </div>

            {/* Map Coordinates */}
            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/80 mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">Map & Coordinates</span>
                <span className="text-[11px] text-slate-400">Used for client directions</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Latitude</label>
                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Longitude</label>
                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono bg-white"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Social Media Links */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-4">
              Business Social Links
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Instagram handle</label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  placeholder="@yourhandle"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">TikTok handle</label>
                <input
                  type="text"
                  value={formData.tiktok}
                  onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  placeholder="@yourhandle"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Facebook page</label>
                <input
                  type="text"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  placeholder="Page name"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Twitter / X handle</label>
                <input
                  type="text"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  placeholder="@yourhandle"
                />
              </div>
            </div>
          </section>

          {/* Section 4: Operating Hours Summary & Shortcut */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-1">
                Opening & Closing Hours
              </h2>
              <p className="text-xs text-slate-500">
                Currently open Mon - Sat: 9:00 AM - 8:00 PM. Configure day-by-day availability and blocked dates.
              </p>
            </div>
            <Link
              to="/dashboard/availability"
              className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Set Availability</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </section>

          {/* Submit Row */}
          <div className="flex items-center justify-between pt-2">
            <div>
              {saveSuccess && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Business profile updated successfully!
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-[#1048bc] text-white px-8 py-3 rounded-full text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
