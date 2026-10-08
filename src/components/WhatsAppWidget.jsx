import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { storeInfo } from '../data/servicesData';

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.93C20.27 16.46 16.59 20.15 12.05 20.15ZM16.56 14.43C16.31 14.3 15.09 13.7 14.86 13.62C14.64 13.54 14.47 13.49 14.31 13.74C14.14 13.99 13.66 14.56 13.51 14.73C13.37 14.9 13.22 14.92 12.97 14.79C12.72 14.67 11.92 14.41 10.97 13.56C10.23 12.9 9.73 12.08 9.58 11.83C9.44 11.58 9.57 11.44 9.69 11.32C9.8 11.21 9.94 11.03 10.07 10.88C10.19 10.73 10.23 10.63 10.31 10.46C10.4 10.3 10.35 10.15 10.29 10.03C10.23 9.9 9.73 8.68 9.53 8.17C9.33 7.68 9.12 7.74 8.97 7.74C8.82 7.73 8.66 7.73 8.49 7.73C8.32 7.73 8.05 7.79 7.82 8.04C7.6 8.29 6.96 8.88 6.96 10.1C6.96 11.32 7.84 12.49 7.97 12.66C8.09 12.83 9.71 15.33 12.19 16.4C12.78 16.65 13.24 16.81 13.6 16.92C14.2 17.11 14.74 17.08 15.17 17.02C15.65 16.95 16.65 16.42 16.86 15.83C17.07 15.24 17.07 14.74 17.01 14.63C16.95 14.53 16.81 14.47 16.56 14.43Z" />
    </svg>
  );
}

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/10 p-5 shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-200 text-black">
          <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-3">
            <div className="flex items-center gap-2.5">
              <img src="/opal-logo.png" alt="Opal" className="w-9 h-9 object-contain rounded-full bg-white p-0.5 border border-sky-100" />
              <div>
                <h4 className="text-xs font-black text-black">Opal Concierge</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  <span className="text-[10px] text-black/60 font-bold block">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-black/50 hover:text-black transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-black/80 font-medium leading-relaxed mb-4">
            Hello! Have questions about frames, lenses, or booking? Chat directly with our optometrist.
          </p>

          <a
            href={storeInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-full bg-black hover:bg-slate-900 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Open WhatsApp</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Floating Trigger Pill - Luxury Monochrome Theme */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 hover:bg-black text-black hover:text-white border border-black/10 shadow-cloud transition-all duration-300 active:scale-95 hover:scale-105"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-4 h-4 text-black group-hover:text-white transition-colors" />
        <span className="hidden sm:inline font-black text-xs tracking-wide">WhatsApp</span>
      </button>
    </div>
  );
}
