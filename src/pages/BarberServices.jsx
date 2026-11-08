import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import UpgradeProModal from '../components/UpgradeProModal';
import { useBusiness } from '../context/BusinessContext';

export default function BarberServices() {
  const { services, addService, updateService, deleteService, toggleService } = useBusiness();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingServiceId, setDeletingServiceId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '30 mins',
    category: 'Haircut',
    description: '',
    image: '',
    active: true
  });

  useEffect(() => {
    document.title = "Services & Pricing | Kuttly Business Basic";
  }, []);

  const openAddModal = () => {
    setFormData({
      name: '',
      price: '',
      duration: '30 mins',
      category: 'Haircut',
      description: '',
      image: '',
      active: true
    });
    setEditingService(null);
    setShowAddModal(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      price: service.price.replace(/[^0-9]/g, ''),
      duration: service.duration,
      category: service.category,
      description: service.description,
      image: service.image || '',
      active: service.active
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    const formattedPrice = `₦${Number(formData.price.replace(/[^0-9]/g, '')).toLocaleString()}`;
    const payload = {
      name: formData.name.trim(),
      price: formattedPrice,
      priceNum: Number(formData.price.replace(/[^0-9]/g, '')),
      duration: formData.duration,
      category: formData.category,
      description: formData.description.trim() || 'Custom professional haircut service.',
      image: formData.image || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400',
      active: formData.active
    };

    if (editingService) {
      updateService(editingService.id, payload);
    } else {
      addService(payload);
    }

    setShowAddModal(false);
  };

  const categories = ['All', 'Haircut', 'Combo', 'Color', 'Shave', 'Beard'];

  const filteredServices = services.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F7F9FC] font-sans text-navy antialiased">
      <DashboardSidebar />
      <UpgradeProModal />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto max-w-7xl">
        <DashboardHeader
          title="Services & Pricing"
          subtitle="Define transparent prices, cut durations, and availability for clients booking online."
        />

        {/* Main Services Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs mb-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-100">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#111B35] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input + Add Service */}
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-56">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                />
              </div>
              <button
                onClick={openAddModal}
                className="bg-[#111B35] hover:bg-slate-900 text-white px-3 py-2 rounded-xl font-bold text-xs tracking-wide shadow-sm flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Add Service</span>
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                className={`bg-[#F8FAFC] rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  service.active ? 'border-slate-200 hover:border-slate-300' : 'border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-primary px-3 py-1 bg-white border border-primary/20 rounded-full shadow-2xs">
                      {service.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {service.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1 font-heading">
                    {service.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Price</span>
                      <span className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">
                        {service.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 font-medium">
                        {service.active ? 'Active' : 'Disabled'}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                          service.active ? 'bg-primary' : 'bg-slate-300'
                        }`}
                        aria-label={`Toggle ${service.name}`}
                      >
                        <span
                          className={`block size-3.5 rounded-full bg-white transition-transform shadow-xs ${
                            service.active ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Edit / Delete Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => openEditModal(service)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeletingServiceId(service.id)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add Service Placeholder Card */}
            <motion.button
              onClick={openAddModal}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15 }}
              className="border-2 border-dashed border-slate-200 hover:border-primary/50 bg-[#F8FAFC]/50 hover:bg-white rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer min-h-[200px]"
            >
              <div className="size-12 rounded-2xl bg-white text-primary border border-slate-200/80 flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-2xl font-bold">add</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-sm text-slate-900 block font-heading">Add a service</span>
                <span className="text-xs text-slate-500">Configure prices and cut duration</span>
              </div>
            </motion.button>
          </div>
        </div>
      </main>

      {/* Add / Edit Service Modal */}
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
              className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 z-10 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="size-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Low Cut, Haircut + Beard"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Price (₦) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 5000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Estimated Duration
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                    >
                      <option value="20 mins">20 mins</option>
                      <option value="30 mins">30 mins</option>
                      <option value="45 mins">45 mins</option>
                      <option value="60 mins">60 mins</option>
                      <option value="75 mins">75 mins</option>
                      <option value="90 mins">90 mins</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC]"
                  >
                    <option value="Haircut">Haircut</option>
                    <option value="Combo">Combo</option>
                    <option value="Beard">Beard</option>
                    <option value="Shave">Shave</option>
                    <option value="Color">Color</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Short description of what the service includes..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary bg-[#F8FAFC] resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-[#1048bc] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-sm"
                  >
                    {editingService ? 'Update Service' : 'Add Service'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingServiceId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingServiceId(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 z-10 text-xs text-center"
            >
              <div className="size-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-2xl">delete</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 font-heading mb-1">
                Delete Service?
              </h3>
              <p className="text-slate-500 mb-5">
                Are you sure you want to delete this service? Clients will no longer be able to select it online.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeletingServiceId(null)}
                  className="px-4 py-2 rounded-full border border-slate-200 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteService(deletingServiceId);
                    setDeletingServiceId(null);
                  }}
                  className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
