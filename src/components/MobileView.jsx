import React, { useEffect } from 'react';
import { X, ChevronRight, Calendar } from 'lucide-react';

export default function MobileView({ 
  isOpen, 
  onClose, 
  activePage, 
  setActivePage, 
  onOpenBooking 
}) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'frames', label: 'Frames' },
    { id: 'lenses', label: 'Lenses' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (id) => {
    setActivePage(id);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end pointer-events-auto animate-fade-in">
      {/* Soft Blurred Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Slide-in Half-Page Sky Blue Drawer */}
      <div className="relative z-10 w-[60%] max-w-[280px] h-full flex flex-col bg-gradient-to-b from-[#BEE0F8] via-[#CFE7F9] to-[#DCEEFB] text-black shadow-[-12px_0_35px_rgba(30,80,120,0.2)] border-l border-white/60 animate-in slide-in-from-right duration-300">
        
        {/* Clean Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
          <div className="flex items-center gap-2">
            <img 
              src="/opal-logo.png" 
              alt="Opal Opticals" 
              className="w-7 h-7 object-contain rounded-full bg-white p-0.5 shadow-xs" 
            />
            <span className="text-xs font-bold tracking-wider text-black uppercase">
              Opal
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-black transition-colors shadow-xs"
            aria-label="Close Mobile Navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Page Names Only */}
        <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-start pt-6">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-black text-white font-bold shadow-sm'
                    : 'text-black font-semibold hover:bg-white/50 text-sm'
                }`}
              >
                <span className="text-sm">
                  {item.label}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                  isActive ? 'text-white translate-x-0.5' : 'text-black/40'
                }`} />
              </button>
            );
          })}

          {/* Elegant Book Appointment Button */}
          <div className="pt-4 mt-auto pb-4">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-black text-white hover:bg-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Eye Test</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
