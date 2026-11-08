import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import UpgradeProModal from '../components/UpgradeProModal';
import { useBusiness } from '../context/BusinessContext';

export default function Reviews() {
  const { reviews, replyToReview } = useBusiness();
  const [replyInputs, setReplyInputs] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);

  useEffect(() => {
    document.title = "Reviews & Ratings | Kuttly Business Basic";
  }, []);

  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (totalReviews || 1)).toFixed(1);

  const starCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const handleSendReply = (reviewId) => {
    const text = replyInputs[reviewId];
    if (!text || !text.trim()) return;

    replyToReview(reviewId, text.trim());
    setActiveReplyId(null);
    setReplyInputs({ ...replyInputs, [reviewId]: '' });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F9FC] font-sans text-navy antialiased">
      <DashboardSidebar />
      <UpgradeProModal />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl">
        <DashboardHeader
          title="Reviews & Ratings"
          subtitle="Verified feedback from clients who booked haircuts through Kuttly."
        />

        {/* Rating Overview Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs mb-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Average Rating Score */}
          <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Overall Shop Rating
            </span>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 font-heading">
                {avgRating}
              </span>
              <div className="text-amber-400 text-xl">
                {'★'.repeat(5)}
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Based on <strong className="text-slate-800">{totalReviews} verified bookings</strong>
            </p>
          </div>

          {/* Star Breakdown Bars */}
          <div className="md:col-span-2 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = starCounts[stars] || 0;
              const percentage = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <span className="w-10 text-slate-600 font-bold flex items-center gap-0.5">
                    {stars} <span className="text-amber-400">★</span>
                  </span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-slate-400 font-medium">
                    {count} ({percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Reviews List */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
              Client Feedback
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              Only verified clients can review
            </span>
          </div>

          <div className="space-y-5">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 bg-[#F8FAFC]/50 hover:bg-white hover:border-slate-300 transition-all text-xs"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                      {rev.customer[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm font-heading">{rev.customer}</span>
                        {rev.verifiedBooking && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            <span className="material-symbols-outlined text-xs">verified</span>
                            Verified Booking
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">Service: {rev.service}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-amber-400 text-sm">
                      {'★'.repeat(rev.rating)}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                  </div>
                </div>

                {/* Comment body */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed my-3 pl-10">
                  "{rev.comment}"
                </p>

                {/* Business Response (if exists) */}
                {rev.businessResponse ? (
                  <div className="ml-10 mt-3 p-3.5 bg-blue-50/60 rounded-xl border border-primary/20 text-xs text-navy">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-primary flex items-center gap-1 text-[11px]">
                        <span className="material-symbols-outlined text-sm">storefront</span>
                        Business Response
                      </span>
                      <span className="text-[10px] text-slate-400">{rev.responseDate}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {rev.businessResponse}
                    </p>
                  </div>
                ) : (
                  <div className="ml-10 mt-2">
                    {activeReplyId === rev.id ? (
                      <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                        <textarea
                          rows={2}
                          placeholder="Write a public polite reply to this customer..."
                          value={replyInputs[rev.id] || ''}
                          onChange={(e) => setReplyInputs({ ...replyInputs, [rev.id]: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary resize-none"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setActiveReplyId(null)}
                            className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSendReply(rev.id)}
                            className="px-4 py-1 rounded-lg bg-primary hover:bg-[#1048bc] text-white font-bold text-xs"
                          >
                            Post Reply
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveReplyId(rev.id)}
                        className="text-primary font-bold text-xs hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">reply</span>
                        <span>Reply to this review</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

