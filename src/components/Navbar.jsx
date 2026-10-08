import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { storeInfo } from '../data/servicesData';
import MobileView from './MobileView';

export default function Navbar({ activePage, setActivePage, onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'frames', label: 'Frames' },
    { id: 'lenses', label: 'Lenses' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 md:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Official Brand Logo from User Image */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2 sm:gap-3 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full bg-white/90 backdrop-blur-xl border border-white/80 shadow-cloud hover:scale-105 transition-all"
        >
          <img 
            src="/opal-logo.png" 
            alt="Opal Opticals Logo" 
            className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-contain bg-white shadow-sm" 
          />
          <div className="flex flex-col text-left pr-0.5 sm:pr-1">
            <span className="text-xs sm:text-base font-black tracking-wider sm:tracking-widest text-black uppercase leading-tight">
              OPAL
            </span>
            <span className="text-[8px] sm:text-[10px] tracking-wider sm:tracking-widest text-slate-800 uppercase font-bold -mt-0.5">
              OPTICALS
            </span>
          </div>
        </button>

        {/* Center Floating Pill Navigation - Clean Cloud Glass Pill */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-white/90 shadow-cloud">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-black text-white shadow-md'
                    : 'text-black hover:bg-black/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2">
          {/* Book Eye Exam CTA */}
          <button
            onClick={onOpenBooking}
            className="group flex items-center gap-1.5 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-black text-white hover:bg-slate-900 text-xs font-black transition-all shadow-pill-dark active:scale-95"
          >
            <span>Book<span className="hidden sm:inline"> Eye Test</span></span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 sm:p-2.5 rounded-full bg-white text-black shadow-cloud border border-white/80 active:scale-95"
            aria-label="Toggle Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dedicated Mobile View Drawer Component */}
      <MobileView
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenBooking={onOpenBooking}
      />
    </header>
  );
}
