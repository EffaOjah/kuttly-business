import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BarberNavbar from '../components/BarberNavbar';
import BarberFooter from '../components/BarberFooter';

const BarberFeatures = () => {
  const [showModal, setShowModal] = useState(false);
  const [formStep, setFormStep] = useState('form');

  useEffect(() => {
    document.title = "Kuttly Business - Precision Tools for Master Barbers";
  }, []);

  const features = [
    {
      title: 'Precision Scheduling',
      icon: 'calendar_month',
      desc: 'Real-time slot management with automated conflict resolution. Let your clients book 24/7 without the headache of overlaps or missed calls.',
      details: ['Automated SMS & WhatsApp reminders', 'Custom buffer times between cuts', 'Multi-barber staff synchronization', 'No-show protection & deposit options'],
      img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Digital Portfolio & Showcase',
      icon: 'content_cut',
      desc: 'A dedicated portfolio that lives where your clients are looking. High-resolution galleries categorized by style to let your craft sell itself.',
      details: ['Categorized haircut styles', 'Client before/after showcases', 'Direct booking from style photos', 'Shareable profile link (kuttly.com/yourshop)'],
      img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Financial Intelligence',
      icon: 'payments',
      desc: 'Know exactly where your barbershop stands. Detailed revenue tracking, popular service breakdown, and payout reports built for Nigerian entrepreneurs.',
      details: ['Daily, weekly and monthly earnings', 'Cash vs card/transfer breakdown', 'Individual barber commission reports', 'Tax-ready transaction summaries'],
      img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Client Relationships & CRM',
      icon: 'groups',
      desc: 'Turn one-time walk-ins into lifelong loyal regulars. Track cut history, individual style notes, and re-engage inactive customers.',
      details: ['Customer booking history', 'Personalized grooming notes', 'Automated return reminders', 'VIP customer status indicators'],
      img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="bg-navy min-h-screen font-sans text-white">
      <BarberNavbar onJoinWaitlist={() => setShowModal(true)} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 px-6 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-primary-light text-xs font-semibold mb-6"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            Kuttly Business Suite
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] mb-6 font-heading text-white"
          >
            Tools built specifically for the <span className="text-primary-light">modern barber.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Every feature is designed to eliminate operational chaos so you and your team can focus on what you do best: delivering exceptional haircuts.
          </motion.p>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-12">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`py-16 sm:py-24 px-6 border-b border-white/10 ${
              idx % 2 === 1 ? 'bg-navy-dark' : 'bg-navy'
            }`}
          >
            <div className={`max-w-7xl mx-auto flex flex-col ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } items-center gap-12 lg:gap-20`}>
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 1 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex-1 space-y-6 text-left"
              >
                <div className="size-12 rounded-xl bg-primary/20 text-primary-light flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-heading text-white">
                  {feature.title}
                </h2>

                <p className="text-base text-slate-300 leading-relaxed font-normal">
                  {feature.desc}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                   {feature.details.map((detail, dIdx) => (
                     <li key={dIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                        <span className="material-symbols-outlined text-primary text-base">verified</span>
                        <span>{detail}</span>
                     </li>
                   ))}
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 w-full max-w-xl"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 shadow-card">
                   <img
                     src={feature.img}
                     alt={feature.title}
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden bg-navy-dark border-t border-white/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-white">
            Elevate your barbershop standard.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Join the network of professional Nigerian barbers scaling their businesses with Kuttly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button 
              onClick={() => setShowModal(true)}
              className="px-7 py-3.5 bg-primary hover:bg-[#1048bc] text-white font-semibold rounded-xl shadow-md transition-all text-sm"
            >
              Claim free beta access
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all text-sm"
            >
              Request a demo
            </button>
          </div>
        </div>
      </section>

      <BarberFooter />

      {/* Waitlist Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E5EAF2] text-navy"
            >
              <button 
                onClick={() => { setShowModal(false); setFormStep('form'); }}
                className="absolute top-5 right-5 size-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              <div className="p-6 sm:p-8">
                {formStep === 'form' ? (
                  <div>
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#EFF5FF] text-primary text-xs font-semibold mb-2">
                        Early Access
                      </div>
                      <h2 className="text-2xl font-bold text-navy tracking-tight font-heading">
                        Join Kuttly Business
                      </h2>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1">
                        Become one of the first 1,000 barbershops to scale with Kuttly.
                      </p>
                    </div>

                    <form className="space-y-3.5" onSubmit={(e) => { e.preventDefault(); setFormStep('success'); }}>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Full name</label>
                          <input required type="text" placeholder="John Doe" className="w-full h-11 px-3.5 rounded-xl border border-[#E5EAF2] text-sm text-navy focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Shop name</label>
                          <input required type="text" placeholder="Gents Studio" className="w-full h-11 px-3.5 rounded-xl border border-[#E5EAF2] text-sm text-navy focus:outline-none focus:border-primary" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Work email</label>
                        <input required type="email" placeholder="john@example.com" className="w-full h-11 px-3.5 rounded-xl border border-[#E5EAF2] text-sm text-navy focus:outline-none focus:border-primary" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Phone (WhatsApp)</label>
                          <input required type="tel" placeholder="+234..." className="w-full h-11 px-3.5 rounded-xl border border-[#E5EAF2] text-sm text-navy focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">City</label>
                          <input required type="text" placeholder="Lagos, Abuja, etc." className="w-full h-11 px-3.5 rounded-xl border border-[#E5EAF2] text-sm text-navy focus:outline-none focus:border-primary" />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button type="submit" className="w-full py-3 bg-primary hover:bg-[#1048bc] text-white font-semibold rounded-xl shadow-sm text-sm transition-all">
                          Claim early access
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="size-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-3xl font-bold">check_circle</span>
                    </div>
                    <h3 className="text-2xl font-bold text-navy font-heading mb-2">You're on the list!</h3>
                    <p className="text-slate-600 text-sm mb-6 max-w-sm mx-auto">
                      Thank you for joining Kuttly Business. Our team will contact you shortly to activate your digital shop.
                    </p>
                    <button 
                      onClick={() => { setShowModal(false); setFormStep('form'); }}
                      className="px-6 py-2.5 bg-navy text-white rounded-xl font-semibold text-sm"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BarberFeatures;