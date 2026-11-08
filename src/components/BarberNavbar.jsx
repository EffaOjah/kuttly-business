import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const BarberNavbar = ({ onJoinWaitlist }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', to: '/business/features' },
    { name: 'Pricing', href: '/business#pricing' },
    { name: 'Showcase', href: '/business#showcase' },
    { name: 'Testimonials', href: '/business#testimonials' },
    { name: 'Marketplace', to: '/' }
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md border-b border-[#E5EAF2] py-3.5 shadow-sm' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Link to="/business" className="flex items-center gap-2 text-primary group">
          <span className="material-symbols-outlined text-2xl font-bold transition-transform group-hover:rotate-12 text-primary">
            content_cut
          </span>
          <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-navy' : 'text-white'
          }`}>
            Kuttly
          </span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ml-1 uppercase tracking-wider transition-colors duration-300 ${
            scrolled ? 'bg-primary/10 text-primary' : 'bg-white/15 text-white'
          }`}>
            Business
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            link.to ? (
              <Link 
                key={link.name} 
                to={link.to}
                className={`text-[14px] font-medium transition-colors ${
                  scrolled ? 'text-slate-600 hover:text-navy' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ) : (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-[14px] font-medium transition-colors ${
                  scrolled ? 'text-slate-600 hover:text-navy' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            )
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/business/dashboard"
            className={`text-sm font-medium px-4 py-2 rounded-xl transition-all ${
              scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white/90 hover:bg-white/10'
            }`}
          >
            Dashboard demo
          </Link>
          <Link
            to="/business/login"
            className={`text-sm font-medium px-4 py-2 rounded-xl transition-all ${
              scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white/90 hover:bg-white/10'
            }`}
          >
            Log in
          </Link>
          <button 
            onClick={onJoinWaitlist}
            className="bg-primary hover:bg-[#1048bc] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
          >
            Join waitlist
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 rounded-xl transition-colors ${
            scrolled ? 'text-navy hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl">{isOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#E5EAF2] overflow-hidden shadow-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                link.to ? (
                  <Link 
                    key={link.name} 
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-semibold text-slate-800 hover:text-primary py-1"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-base font-semibold text-slate-800 hover:text-primary py-1"
                  >
                    {link.name}
                  </a>
                )
              ))}
              <hr className="border-[#E5EAF2] my-1" />
              <div className="flex flex-col gap-2.5">
                <Link
                  to="/business/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-center text-sm font-semibold text-navy bg-slate-100 rounded-xl"
                >
                  Dashboard demo
                </Link>
                <Link
                  to="/business/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-center text-sm font-semibold text-navy border border-[#E5EAF2] rounded-xl hover:bg-slate-50"
                >
                  Log in
                </Link>
                <button 
                  onClick={() => { setIsOpen(false); onJoinWaitlist(); }}
                  className="w-full py-3.5 text-center text-sm font-semibold text-white bg-primary rounded-xl"
                >
                  Join waitlist
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default BarberNavbar;