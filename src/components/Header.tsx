import React, { useState, useEffect } from 'react';
import { Gauge, Menu, X, ArrowRight, Bike } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onBookClick: () => void;
}

export default function Header({ onBookClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              id="header-logo"
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-black font-extrabold shadow-md shadow-yellow-400/20 group-hover:scale-105 transition-transform">
                <Gauge className="w-5.5 h-5.5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-zinc-950 uppercase">
                  Urban<span className="text-yellow-500 font-bold lowercase">Wheels</span>
                </span>
                <span className="block text-[8px] tracking-widest text-zinc-500 font-black uppercase">
                  Uttarkashi Mobility
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-wider text-zinc-600">
              <button
                id="nav-home"
                onClick={() => scrollToSection('hero')}
                className="hover:text-yellow-600 transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                id="nav-services"
                onClick={() => scrollToSection('services-list')}
                className="hover:text-yellow-600 transition-colors cursor-pointer"
              >
                Services
              </button>
              <button
                id="nav-fleet"
                onClick={() => scrollToSection('fleet')}
                className="hover:text-yellow-600 transition-colors cursor-pointer"
              >
                Our Fleet
              </button>
              <button
                id="nav-why"
                onClick={() => scrollToSection('why-choose-us')}
                className="hover:text-yellow-600 transition-colors cursor-pointer"
              >
                Why Us
              </button>
              <button
                id="nav-reviews"
                onClick={() => scrollToSection('testimonials')}
                className="hover:text-yellow-600 transition-colors cursor-pointer"
              >
                Reviews
              </button>
              <button
                id="nav-faq"
                onClick={() => scrollToSection('faq')}
                className="hover:text-yellow-600 transition-colors cursor-pointer"
              >
                FAQ
              </button>
            </nav>

            {/* Book Now Button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                id="header-book-btn"
                onClick={onBookClick}
                className="btn-yellow-premium px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                id="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-zinc-600 hover:text-zinc-950 p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[64px] z-40 md:hidden glass-premium border-b border-white/40 shadow-xl px-4 py-6 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-4">
              <button
                id="mobile-nav-home"
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 text-xs font-black text-zinc-700 hover:text-yellow-600 uppercase tracking-wider transition-colors border-b border-zinc-200/50"
              >
                Home
              </button>
              <button
                id="mobile-nav-services"
                onClick={() => scrollToSection('services-list')}
                className="text-left py-2 text-xs font-black text-zinc-700 hover:text-yellow-600 uppercase tracking-wider transition-colors border-b border-zinc-200/50"
              >
                Services
              </button>
              <button
                id="mobile-nav-fleet"
                onClick={() => scrollToSection('fleet')}
                className="text-left py-2 text-xs font-black text-zinc-700 hover:text-yellow-600 uppercase tracking-wider transition-colors border-b border-zinc-200/50"
              >
                Our Fleet
              </button>
              <button
                id="mobile-nav-why"
                onClick={() => scrollToSection('why-choose-us')}
                className="text-left py-2 text-xs font-black text-zinc-700 hover:text-yellow-600 uppercase tracking-wider transition-colors border-b border-zinc-200/50"
              >
                Why Us
              </button>
              <button
                id="mobile-nav-reviews"
                onClick={() => scrollToSection('testimonials')}
                className="text-left py-2 text-xs font-black text-zinc-700 hover:text-yellow-600 uppercase tracking-wider transition-colors border-b border-zinc-200/50"
              >
                Reviews
              </button>
              <button
                id="mobile-nav-faq"
                onClick={() => scrollToSection('faq')}
                className="text-left py-2 text-xs font-black text-zinc-700 hover:text-yellow-600 uppercase tracking-wider transition-colors"
              >
                FAQ
              </button>
            </div>
            <button
              id="mobile-book-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full btn-yellow-premium py-3 rounded-xl font-extrabold tracking-wider text-xs uppercase text-center shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <span>Book Your Rental</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
