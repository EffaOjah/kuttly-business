import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBusiness } from '../context/BusinessContext';

export default function UpgradeProModal() {
  const { isUpgradeModalOpen, setIsUpgradeModalOpen } = useBusiness();

  if (!isUpgradeModalOpen) return null;

  const proFeatures = [
    { title: "Multiple staff management", desc: "Add and assign multiple barbers with custom role permissions." },
    { title: "Individual staff schedules", desc: "Custom shifts, breaks, and commission tracking per barber." },
    { title: "Staff performance reports", desc: "Detailed breakdown of cuts, tips, and daily revenue by barber." },
    { title: "Advanced analytics", desc: "Revenue trends, peak booking hours, and retention rate metrics." },
    { title: "Digital queue management", desc: "Real-time TV/tablet display showing waiting client queues." },
    { title: "Customer loyalty programme", desc: "Reward repeat clients with points, 5th-cut free stamps, or perks." },
    { title: "Automated marketing campaigns", desc: "Re-engage clients who haven't visited in 30 days automatically." },
    { title: "Discount & referral campaigns", desc: "Generate custom promo codes and track referral rewards." },
    { title: "Advanced booking automation", desc: "Custom deposit policies, cancellation fees, and buffer times." },
    { title: "Multiple branches", desc: "Manage 2+ shop locations from one central administrative master login." },
    { title: "Advanced revenue reports", desc: "Exportable P&L statements, tax receipts, and payment method splits." },
    { title: "Bulk customer messaging", desc: "Broadcast holiday hours or special offers via WhatsApp & SMS." },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsUpgradeModalOpen(false)}
          className="fixed inset-0 bg-navy/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-[#111B35] to-[#1e2f5d] text-white relative">
            <button
              onClick={() => setIsUpgradeModalOpen(false)}
              className="absolute top-6 right-6 size-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/30 border border-primary/40 text-primary-light text-xs font-bold mb-3">
              <span className="material-symbols-outlined text-sm">stars</span>
              Kuttly Pro Plan
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              Scale Your Barbershop With Pro
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
              Unlock advanced multi-staff scheduling, automated client re-engagement, and multi-branch management.
            </p>
          </div>

          {/* Body Features Grid */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Comparison Pill Banner */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Current Plan</span>
                <span className="text-base font-extrabold text-navy font-heading">Kuttly Basic (Free forever)</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">Pro Tier</span>
                <span className="text-base font-extrabold text-primary font-heading">₦15,000 / month</span>
              </div>
            </div>

            {/* Feature List */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Features Reserved for Pro:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {proFeatures.map((feat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                    <div>
                      <h4 className="font-bold text-navy text-xs font-heading">{feat.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promotions note */}
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-600 text-base shrink-0">info</span>
              <span>
                <strong>Note:</strong> Kuttly Promotions can be purchased individually on <strong>both</strong> Basic and Pro plans.
              </span>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              14-day free trial on Pro. Cancel anytime with zero penalty.
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsUpgradeModalOpen(false)}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Keep Basic
              </button>
              <button
                onClick={() => {
                  alert('Thank you for your interest! Kuttly Pro is launching shortly. Your shop is on the priority early-access list.');
                  setIsUpgradeModalOpen(false);
                }}
                className="flex-1 sm:flex-initial bg-primary hover:bg-[#1048bc] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all"
              >
                Join Pro Waitlist
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

