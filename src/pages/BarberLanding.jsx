import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import BarberNavbar from '../components/BarberNavbar';
import BarberFooter from '../components/BarberFooter';

const BarberLanding = () => {
  const { hash } = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [formStep, setFormStep] = useState('form'); // 'form' or 'success'

  // Handle hash scroll on mount or hash change
  React.useEffect(() => {
    document.title = "Kuttly Business - Scale Your Barbering Business";
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  const portfolioStyles = [
    { title: 'Textured Skin Fade', author: "Tunde's Grooming", category: 'Fades', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARVam1XJMiG4u4TiOym7_ZGCKB_xJ1IVUOeo2GZsMtqR36QnvNv0J76ckBU3wtUdylwhUdxWCjeYTJ9K8Hd65RzWtMqHW0fOAzVGap9eTzvdEIbjORRQz-Zyu8C2zkNEQfEFzhWFYll0uVYfKQIMXu2PI1E8E7TOwlOiPtPsHY5n94_82PLzD5ty27Z1EDh30WsNs0X9Vrh-Y5Z1nKKwe8RmFHuNjFwVauYRC8BAM1zg7SNi354-Mr6xfJgAINtOGL-cPewjkyEAIH' },
    { title: 'Dreadlock Maintenance', author: 'Stylz Empire', category: 'Dreadlocks', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHnExzFliDajG6gPe6rHjx2gQo9nKF58WWdYk-6ytXZkM-ygxWc5ZAWtj9X_yS8bFB66qHwk_Txmx7cLmTT7Ob6AlqTanF6tlXlz4udgoDMMItS9KPZhhKzZDpXDK6A-YergUf0qJTEy4BWKay06aQ4JcNvj1nR24KoEabMEQHq0iynq2vDcYv16kMIymtYUoixZiPpRNlHyPicck63feViS3U8SaoozExe9joTqqQrwBmxyw7blLR08yaUMkRSucmcpXXcZv5ysjk' },
    { title: 'Beard Sculpting', author: 'The Sharp One', category: 'Beard Trim', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_1Lvj6wWaTlUOnJaZH5ABo8132WAH0PP82wF7RtxJNI5AIVyLgdkUG70AG2eEUvld9dAbU6QYZnghgf3XYWmHvfx3Y7Pyv9-fL34iHDLIfrF3Jh-XmOLuSVan0cRPVYTiwFj1eJRx5yfT6C2-C1tS3QEF7qkWcSiXGlzwX3a7bFEswX1J-YFdASvLOt03vNuXz8bCKR0DoTW876oXsuf3Q3rJraFEjFxvwAMvAEviSHWIAanStzUuURRQCXV3IHeMtFza_oVRqR2a' },
    { title: 'Burst Fade', author: "King's Palace", category: 'Fades', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZET7y6rd8q3GlkQ5tJZowN6nHf0Onh3YeTf3dYNi7HuPrKJ9Cmdo2ibFfc_sz9A6qCc0XadrwdlcZJxbiEJVpoCC4ACuu8zXuqpXspvY6hu7Ig06GkcA5LS5ZEexrG3kevpuGJoH2S_4QwdzOff-YE_ANBm-Izaq0-4o50kLWDWeKsD52uOCTQLe292Nan1bc5xCsS5h82HMqKpp4M-EYiosFNvefMr6BJnFPOWhbH7WAnlmaVjnrQlb6sJC4wigQwWQBqYBxhiJs' }
  ];

  return (
    <div className="bg-[#F7F9FC] min-h-screen text-navy font-sans">
      <BarberNavbar onJoinWaitlist={() => setShowModal(true)} />

      {/* 1. HERO SECTION - Deep Navy */}
      <section className="relative pt-32 pb-24 lg:pt-36 lg:pb-32 px-6 overflow-hidden bg-navy">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-primary-light text-xs font-semibold">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Trusted by 500+ Nigerian Shop Owners
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight font-heading">
              The modern way to manage & grow your barbershop.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Streamline appointments, showcase verified haircut portfolios, manage staff schedules, and attract high-value clients across Nigeria.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md pt-2">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                <input 
                  type="email" 
                  placeholder="Enter your work email" 
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:bg-white/15 focus:border-primary outline-none text-sm font-medium transition-all"
                />
              </div>
              <button 
                onClick={() => setShowModal(true)}
                className="h-12 px-6 bg-primary hover:bg-[#1048bc] text-white font-semibold rounded-xl shadow-md transition-all whitespace-nowrap text-sm flex items-center justify-center gap-1.5"
              >
                <span>Get early access</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
              <span>Free during beta • Zero commission on bookings • Easy setup</span>
            </div>
          </motion.div>

          {/* Right: Operations Mockup Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div className="relative bg-white rounded-2xl shadow-premium border border-[#E5EAF2] overflow-hidden p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E5EAF2]">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Monthly Revenue
                  </span>
                  <h3 className="text-3xl font-bold text-navy tracking-tight font-heading">
                    ₦842,500
                  </h3>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-100">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  +18.4%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF2]">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Today's Bookings
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-navy">14 cuts</span>
                    <span className="size-8 rounded-lg bg-[#EFF5FF] text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-base">calendar_today</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF2]">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Repeat Customers
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-navy">82%</span>
                    <span className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-base">group</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Today Appointments List in Preview */}
              <div className="space-y-2.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Live Queue Preview
                </span>
                {[
                  { name: 'Emmanuel N.', service: 'Skin Fade + Beard', time: '10:30 AM', status: 'Confirmed' },
                  { name: 'Chukwudi E.', service: 'Classic Cut', time: '11:45 AM', status: 'Pending' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-[#E5EAF2] bg-white text-xs">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-[#EFF5FF] text-primary flex items-center justify-center font-bold">
                        {item.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-navy">{item.name}</p>
                        <p className="text-slate-400 text-[11px]">{item.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-navy block">{item.time}</span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        item.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE FEATURES SECTION */}
      <section className="py-20 px-6 bg-white border-b border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-xs font-semibold uppercase tracking-wider mb-2 block">
              Business Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight font-heading">
              Everything you need to run your shop
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Say goodbye to double-bookings, confusing paper ledgers, and crowded waiting rooms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Online appointment scheduling',
                icon: 'calendar_month',
                desc: 'Let clients book directly 24/7. Automatically allocate chair slots, buffer times, and send SMS reminders.'
              },
              {
                title: 'Digital portfolio & reviews',
                icon: 'photo_camera',
                desc: 'Showcase your real work in high resolution. Verified clients leave reviews that boost your local ranking.'
              },
              {
                title: 'Revenue & staff management',
                icon: 'trending_up',
                desc: 'Track daily earnings, manage multiple barbers, set commissions, and understand your most profitable cuts.'
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl bg-white border border-[#E5EAF2] shadow-subtle hover:shadow-card transition-all text-left flex flex-col"
              >
                <div className="size-12 rounded-xl bg-[#EFF5FF] text-primary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-navy mb-3 font-heading">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE - Hall of Fame */}
      <section id="showcase" className="py-20 bg-[#F7F9FC] border-b border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-primary text-xs font-semibold uppercase tracking-wider mb-2 block">
                Barber Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight font-heading">
                The Kuttly Hall of Fame
              </h2>
              <p className="text-slate-600 mt-2 text-base">
                Discover master barbers and premier shops scaling their brand through Kuttly.
              </p>
            </div>
            <Link 
              to="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#E5EAF2] text-sm font-semibold text-navy hover:text-primary transition-all shadow-subtle"
            >
              <span>Explore Marketplace</span>
              <span className="material-symbols-outlined text-base">north_east</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioStyles.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-navy/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="font-bold text-base text-navy font-heading mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-auto">Crafted by {item.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PLANS & PRICING */}
      <section id="pricing" className="py-20 px-6 bg-white border-b border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-xs font-semibold uppercase tracking-wider mb-2 block">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight font-heading">
              Plans built for every stage of your business
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Simple subscription model. No hidden commissions taken from your haircut fees.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Solo Barber Plan */}
            <div className="p-7 rounded-2xl bg-white border border-[#E5EAF2] shadow-subtle flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Solo Plan
                </span>
                <h3 className="text-xl font-bold text-navy mb-2 font-heading">Starter</h3>
                <p className="text-slate-500 text-xs mb-6">For independent chairs & solo barbers</p>
                
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-navy font-heading">Free</span>
                  <span className="text-xs text-slate-400">/ beta period</span>
                </div>

                <ul className="space-y-3 mb-8 text-xs text-slate-600">
                  {['Digital portfolio & shop link', 'Online booking calendar', 'Client SMS reminders', 'Standard email support'].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">check</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setShowModal(true)}
                className="w-full py-2.5 rounded-xl border border-[#E5EAF2] text-navy font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Get started free
              </button>
            </div>

            {/* Pro Plan - Featured */}
            <div className="p-7 rounded-2xl bg-navy text-white shadow-card flex flex-col justify-between relative border border-navy">
              <div className="absolute top-4 right-4 bg-primary text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Most Popular
              </div>
              
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-light block mb-1">
                  Shop Owner
                </span>
                <h3 className="text-xl font-bold text-white mb-2 font-heading">Kuttly Pro</h3>
                <p className="text-slate-300 text-xs mb-6">For growing barbershops with teams</p>
                
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white font-heading">₦10,000</span>
                  <span className="text-xs text-slate-400">/ month (Free in Beta)</span>
                </div>

                <ul className="space-y-3 mb-8 text-xs text-slate-200">
                  {[
                    'Everything in Starter',
                    'Up to 6 barber chairs/staff',
                    'Automated conflict resolution',
                    'Featured marketplace ranking',
                    'Daily revenue analytics',
                    'Priority WhatsApp support'
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">verified</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setShowModal(true)}
                className="w-full py-3 rounded-xl bg-primary hover:bg-[#1048bc] text-white font-semibold text-sm shadow-md transition-all"
              >
                Join Pro waitlist
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-7 rounded-2xl bg-white border border-[#E5EAF2] shadow-subtle flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Franchise
                </span>
                <h3 className="text-xl font-bold text-navy mb-2 font-heading">Multi-Location</h3>
                <p className="text-slate-500 text-xs mb-6">For barbershop chains & luxury salons</p>
                
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-navy font-heading">Custom</span>
                  <span className="text-xs text-slate-400">/ tiered billing</span>
                </div>

                <ul className="space-y-3 mb-8 text-xs text-slate-600">
                  {['Unlimited staff & branches', 'Centralized owner dashboard', 'Custom POS & accounting export', 'Dedicated account manager'].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">check</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setShowModal(true)}
                className="w-full py-2.5 rounded-xl border border-[#E5EAF2] text-navy font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section id="testimonials" className="py-20 px-6 bg-[#F7F9FC] border-b border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-primary text-xs font-semibold uppercase tracking-wider mb-2 block">
              Real Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight font-heading">
              Voices of the craft
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Hear from shop owners who transformed their operations with Kuttly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Chidi Okafor',
                role: 'Owner, Lagos Gents (Lekki)',
                avatar: '/images/avatar-black-1.png',
                text: "Since moving to Kuttly, my booking efficiency improved by 40%. No more 'who is next' confusion in the shop. The clients love it!"
              },
              {
                name: 'Femi Adebayo',
                role: 'Master Barber, Wuse II Abuja',
                avatar: '/images/avatar-black-2.png',
                text: "The portfolio feature is a game changer. I've gained so many premium clients just by showcasing my work through my Kuttly profile link."
              },
              {
                name: 'Ibrahim Musa',
                role: "Owner, Ibro's Cut (Port Harcourt)",
                avatar: '/images/avatar-black-3.png',
                text: "Managing my schedule used to be a headache. Now it's automated. I focus 100% on the art of cutting hair while Kuttly handles appointments."
              }
            ].map((voice, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E5EAF2] shadow-subtle flex flex-col justify-between"
              >
                <div className="flex text-amber-500 gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  ))}
                </div>
                <blockquote className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  "{voice.text}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E5EAF2]">
                  <div className="size-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={voice.avatar} alt={voice.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy font-heading">{voice.name}</h4>
                    <p className="text-xs text-slate-500">{voice.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto rounded-3xl bg-navy p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-card">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-white">
              Ready to modernize your barbershop?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Join hundreds of forward-thinking Nigerian barbers using Kuttly to manage bookings and expand their reach.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button 
                onClick={() => setShowModal(true)}
                className="px-8 py-3.5 bg-primary hover:bg-[#1048bc] text-white rounded-xl font-semibold text-sm shadow-md transition-all"
              >
                Join Kuttly Business
              </button>
              <Link 
                to="/business/dashboard"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl font-semibold text-sm transition-all text-center"
              >
                Preview Demo Dashboard
              </Link>
            </div>
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
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E5EAF2]"
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
                          <input required type="tel" placeholder="+234 800 000 0000" className="w-full h-11 px-3.5 rounded-xl border border-[#E5EAF2] text-sm text-navy focus:outline-none focus:border-primary" />
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
                        <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-sm text-emerald-600">verified_user</span> 
                          <span>No credit card required • Zero setup fees</span>
                        </p>
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

export default BarberLanding;