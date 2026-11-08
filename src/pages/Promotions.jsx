import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import UpgradeProModal from '../components/UpgradeProModal';
import { useBusiness } from '../context/BusinessContext';

export default function Promotions() {
  const { promotions, purchasePromotion } = useBusiness();
  const [activeTab, setActiveTab] = useState('Packages'); // Packages, Active, History
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [targetLocation, setTargetLocation] = useState('Lagos - Lekki Phase 1');
  const [duration, setDuration] = useState('7 Days');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  useEffect(() => {
    document.title = "Promotions & Boosts | Kuttly Business Basic";
  }, []);

  const promoPackages = [
    {
      id: 'pkg-1',
      name: 'Homepage Hero Spotlight',
      badge: 'Highest Reach',
      tagline: 'Top carousel placement right on the Kuttly consumer homepage.',
      price: '₦15,000',
      duration: '7 Days',
      reach: '5,000+ local clients',
      icon: 'local_fire_department',
      color: 'bg-amber-500',
    },
    {
      id: 'pkg-2',
      name: 'City Search Top Placement',
      badge: 'Best Conversion',
      tagline: 'Rank #1 at the top of search results whenever someone searches in your area.',
      price: '₦8,500',
      duration: '7 Days',
      reach: '2,200+ active searchers',
      icon: 'trending_up',
      color: 'bg-primary',
    },
    {
      id: 'pkg-3',
      name: 'Weekend Surge Boost',
      badge: 'Fast Results',
      tagline: 'Intensive Friday - Sunday boost to fill empty weekend morning & afternoon slots.',
      price: '₦5,000',
      duration: '3 Days',
      reach: '1,500+ weekend bookers',
      icon: 'bolt',
      color: 'bg-emerald-500',
    },
    {
      id: 'pkg-4',
      name: 'Instagram & Social Feature Blast',
      badge: 'Brand Builder',
      tagline: 'Dedicated carousel post and story feature on @kuttly_ng official socials.',
      price: '₦12,000',
      duration: 'Permanent Post',
      reach: '18,000+ followers',
      icon: 'campaign',
      color: 'bg-purple-600',
    },
  ];

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsPurchasing(true);

    setTimeout(() => {
      purchasePromotion({
        package: selectedPackage.name,
        location: targetLocation,
        duration: duration,
        price: selectedPackage.price,
      });

      setIsPurchasing(false);
      setPurchaseSuccess(true);
      setSelectedPackage(null);
      setActiveTab('Active');

      setTimeout(() => setPurchaseSuccess(false), 4000);
    }, 1200);
  };

  const activePromos = promotions.filter(p => p.status === 'Active');
  const historyPromos = promotions.filter(p => p.status === 'Expired' || p.status === 'Active');

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F9FC] font-sans text-navy antialiased">
      <DashboardSidebar />
      <UpgradeProModal />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl">
        <DashboardHeader
          title="Promotions & Visibility"
          subtitle="Boost your barbershop to the top of Kuttly search and get discovered by thousands of clients."
        />

        {/* Independence Callout Note */}
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50/70 rounded-2xl border border-emerald-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-600 text-xl">verified</span>
            <div>
              <span className="font-bold text-emerald-900 block">Available to All Basic Businesses</span>
              <span className="text-emerald-700 text-[11px]">
                You do not need to upgrade to Pro to purchase promotions. Every business can purchase standalone placement boosts anytime.
              </span>
            </div>
          </div>
          <span className="text-emerald-800 font-extrabold text-xs px-3 py-1 bg-white rounded-full border border-emerald-200">
            Pay Per Boost
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-slate-200/80 pb-4">
          {[
            { id: 'Packages', label: 'Promotion Packages', icon: 'campaign' },
            { id: 'Active', label: `Active Promotions (${activePromos.length})`, icon: 'bolt' },
            { id: 'History', label: 'Purchase History', icon: 'history' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#111B35] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: AVAILABLE PROMOTION PACKAGES */}
        {activeTab === 'Packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {promoPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {pkg.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Duration: {pkg.duration}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div className={`size-11 rounded-2xl ${pkg.color} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                      <span className="material-symbols-outlined text-2xl">{pkg.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 font-heading">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                        {pkg.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-100 mb-6 text-xs text-slate-600 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">visibility</span>
                    <span>Estimated Reach: <strong>{pkg.reach}</strong></span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Price</span>
                    <span className="text-2xl font-black text-slate-900 font-heading">
                      {pkg.price}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="bg-[#111B35] hover:bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Select Boost</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: ACTIVE PROMOTIONS */}
        {activeTab === 'Active' && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs mb-6">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-4">
              Live Running Campaigns
            </h2>

            {activePromos.length === 0 ? (
              <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-slate-100">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">campaign</span>
                <h3 className="text-sm font-bold text-slate-700">No active promotions running</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">Choose a package to put your shop in front of thousands of customers.</p>
                <button
                  onClick={() => setActiveTab('Packages')}
                  className="bg-primary hover:bg-[#1048bc] text-white px-5 py-2 rounded-full text-xs font-bold"
                >
                  Browse Packages
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {activePromos.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h4 className="font-extrabold text-sm text-slate-900 font-heading">{p.package}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Active
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs">
                        Target: <strong className="text-slate-700">{p.location}</strong> • Duration: {p.duration}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <span className="text-slate-400 text-[10px] font-semibold block uppercase">Views</span>
                        <span className="text-base font-extrabold text-slate-900 font-heading">{p.impressions}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-slate-400 text-[10px] font-semibold block uppercase">Clicks</span>
                        <span className="text-base font-extrabold text-primary font-heading">{p.clicks}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] font-semibold block uppercase">Price</span>
                        <span className="text-sm font-extrabold text-slate-900 font-heading">{p.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB 3: PROMOTION PURCHASE HISTORY */}
        {activeTab === 'History' && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs mb-6">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mb-4">
              Promotion Order Ledger
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 pl-2">Ref ID</th>
                    <th className="pb-3">Package Name</th>
                    <th className="pb-3">Target Location</th>
                    <th className="pb-3">Duration</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3 text-right pr-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {historyPromos.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 pl-2 font-mono font-bold text-slate-600">{p.id}</td>
                      <td className="py-4 font-bold text-slate-900">{p.package}</td>
                      <td className="py-4 text-slate-600">{p.location}</td>
                      <td className="py-4 text-slate-600">{p.duration}</td>
                      <td className="py-4 font-extrabold text-slate-900 font-heading">{p.price}</td>
                      <td className="py-4 text-right pr-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          p.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Buy Promotion Modal */}
        <AnimatePresence>
          {selectedPackage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPackage(null)}
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
                      Purchase Promotion Boost
                    </h3>
                    <span className="text-[11px] text-slate-400">Instant activation on Kuttly</span>
                  </div>
                  <button
                    onClick={() => setSelectedPackage(null)}
                    className="size-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Selected Package</span>
                    <h4 className="font-extrabold text-sm text-slate-900 font-heading">{selectedPackage.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{selectedPackage.tagline}</p>
                    <div className="mt-3 pt-2 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700">Total Due:</span>
                      <span className="text-xl font-black text-slate-900 font-heading">{selectedPackage.price}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Target Location</label>
                    <select
                      value={targetLocation}
                      onChange={(e) => setTargetLocation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                    >
                      <option value="Lagos - Lekki Phase 1">Lagos - Lekki Phase 1</option>
                      <option value="Lagos - Victoria Island / Ikoyi">Lagos - Victoria Island / Ikoyi</option>
                      <option value="Lagos - Ikeja / Mainland">Lagos - Ikeja / Mainland</option>
                      <option value="Abuja - Wuse / Maitama">Abuja - Wuse / Maitama</option>
                      <option value="Port Harcourt">Port Harcourt</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Duration</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                    >
                      <option value="3 Days">3 Days</option>
                      <option value="7 Days">7 Days</option>
                      <option value="14 Days">14 Days</option>
                      <option value="30 Days">30 Days</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPackage(null)}
                      className="px-5 py-2.5 rounded-full border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isPurchasing}
                      className="bg-primary hover:bg-[#1048bc] text-white px-6 py-2.5 rounded-full font-bold shadow-sm flex items-center gap-1.5"
                    >
                      {isPurchasing ? 'Processing...' : `Pay ${selectedPackage.price}`}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {purchaseSuccess && (
          <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 z-50">
            <span className="material-symbols-outlined text-base">verified</span>
            <span>Promotion purchased and activated live on Kuttly!</span>
          </div>
        )}
      </main>
    </div>
  );
}

