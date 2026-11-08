import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import UpgradeProModal from '../components/UpgradeProModal';
import { useBusiness } from '../context/BusinessContext';

export default function Portfolio() {
  const {
    portfolio,
    addPortfolioImage,
    deletePortfolioImage,
    setCoverImage,
    setIsUpgradeModalOpen
  } = useBusiness();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    document.title = "Portfolio / Gallery | Kuttly Business Basic";
  }, []);

  const MAX_BASIC_IMAGES = 10;
  const isAtLimit = portfolio.length >= MAX_BASIC_IMAGES;

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    const success = addPortfolioImage({
      url: newImageUrl.trim(),
      title: newImageTitle.trim() || 'Signature Haircut',
      isCover: portfolio.length === 0
    });

    if (success) {
      setNewImageUrl('');
      setNewImageTitle('');
      setShowUploadModal(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F9FC] font-sans text-navy antialiased">
      <DashboardSidebar />
      <UpgradeProModal />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl">
        <DashboardHeader
          title="Portfolio & Gallery"
          subtitle="Showcase your haircut styles and grooming craftsmanship to potential customers."
        />

        {/* Upload Limit Progress Banner (Basic: 10 images) */}
        <section className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900 font-heading">
                  Basic Plan Portfolio Capacity
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                  {portfolio.length} / {MAX_BASIC_IMAGES} Photos
                </span>
              </div>
              <span className="text-xs font-bold text-slate-500">
                {MAX_BASIC_IMAGES - portfolio.length} slots available
              </span>
            </div>

            {/* Capacity Progress Bar */}
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isAtLimit ? 'bg-amber-500' : 'bg-primary'
                }`}
                style={{ width: `${(portfolio.length / MAX_BASIC_IMAGES) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isAtLimit && (
              <span className="text-xs font-bold text-amber-700">Limit reached</span>
            )}
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="px-4 py-2 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm text-amber-600">stars</span>
              <span>Unlock Unlimited on Pro</span>
            </button>
          </div>
        </section>

        {/* Portfolio Gallery Grid */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                Uploaded Work ({portfolio.length})
              </h2>
              <p className="text-xs text-slate-500">
                Photos are displayed in high resolution on your public business profile.
              </p>
            </div>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View live shop gallery</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
            <button
              onClick={() => {
                if (isAtLimit) {
                  setIsUpgradeModalOpen(true);
                } else {
                  setShowUploadModal(true);
                }
              }}
              className="bg-[#111B35] hover:bg-slate-900 text-white px-3 py-1.5 rounded-xl font-bold text-xs tracking-wide shadow-sm flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
              <span>Upload Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolio.map((img) => (
              <div
                key={img.id}
                className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Cover Badge */}
                {img.isCover && (
                  <div className="absolute top-2.5 left-2.5 bg-[#111B35] text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-amber-400">star</span>
                    Featured Cover
                  </div>
                )}

                {/* Hover Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => setPreviewImage(img)}
                      className="size-8 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 flex items-center justify-center transition-colors"
                      title="Enlarge photo"
                    >
                      <span className="material-symbols-outlined text-sm">zoom_in</span>
                    </button>
                    <button
                      onClick={() => deletePortfolioImage(img.id)}
                      className="size-8 rounded-full bg-rose-600/80 backdrop-blur-sm text-white hover:bg-rose-700 flex items-center justify-center transition-colors"
                      title="Delete photo"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>

                  <div>
                    <span className="text-white font-bold text-xs block truncate mb-1">
                      {img.title}
                    </span>
                    {!img.isCover && (
                      <button
                        onClick={() => setCoverImage(img.id)}
                        className="text-[10px] font-bold text-slate-200 hover:text-white underline"
                      >
                        Set as featured cover
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Upload Button Placeholder Card */}
            {!isAtLimit && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/50 bg-[#F8FAFC]/60 hover:bg-white aspect-square flex flex-col items-center justify-center gap-2 p-4 transition-all cursor-pointer group"
              >
                <div className="size-11 rounded-2xl bg-white border border-slate-200 text-primary flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <span className="material-symbols-outlined text-2xl font-bold">add</span>
                </div>
                <span className="text-xs font-bold text-slate-800 font-heading">Add Photo</span>
                <span className="text-[10px] text-slate-400">JPEG, PNG or WebP</span>
              </button>
            )}
          </div>
        </section>
      </main>

      {/* Upload Image Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadModal(false)}
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
                  Upload Haircut Photo
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="size-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Paste an image web URL or cloud storage link.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Haircut Style / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Skin Fade with Razor Line"
                    value={newImageTitle}
                    onChange={(e) => setNewImageTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 bg-[#F8FAFC]"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-5 py-2 rounded-full border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-[#1048bc] text-white px-6 py-2 rounded-full font-bold shadow-sm"
                  >
                    Upload Photo
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Zoom Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImage(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl max-h-[85vh] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl z-10"
            >
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="w-full h-full object-contain max-h-[75vh]"
              />
              <div className="p-4 bg-slate-900/90 text-white flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm block">{previewImage.title}</span>
                  <span className="text-[11px] text-slate-400">Uploaded {previewImage.uploadedAt}</span>
                </div>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

