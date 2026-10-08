import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function VisionSimulator() {
  const [activeFilter, setActiveFilter] = useState('blue-light');

  const filters = [
    {
      id: 'clear',
      name: 'Standard Lens',
      glare: 'No filter',
      uv: 'Basic UV',
      overlay: 'backdrop-brightness-105',
    },
    {
      id: 'blue-light',
      name: 'ScreenShield™ Blue Cut',
      glare: '65% HEV Cut',
      uv: '100% UV400',
      overlay: 'bg-amber-500/15 backdrop-contrast-105 backdrop-brightness-95',
    },
    {
      id: 'polarized',
      name: 'Polarized HD Sun',
      glare: '99.9% Anti-Glare',
      uv: '100% UV400',
      overlay: 'bg-slate-900/35 backdrop-contrast-125 backdrop-saturate-110',
    },
  ];

  const current = filters.find((f) => f.id === activeFilter) || filters[0];

  return (
    <section className="py-5 sm:py-8 px-4 sm:px-6 max-w-3xl mx-auto text-black flex flex-col items-center">
      <div className="w-full cloud-card rounded-3xl p-4 sm:p-6 space-y-3.5 shadow-cloud flex flex-col items-center">
        
        {/* Compact Center Header */}
        <div className="text-center max-w-md mx-auto space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-black/70 block">
            Interactive Lens Lab
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-black">
            Test Lens Filter Clarity
          </h2>
          <p className="text-xs text-black/80 font-semibold">
            Simulate how Opal coatings reduce screen fatigue and window glare.
          </p>
        </div>

        {/* Compact Filter Switcher Pills - Centered */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === filter.id
                  ? 'bg-black text-white shadow-pill-dark scale-105'
                  : 'bg-white/80 text-black hover:bg-white border border-black/15'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Perfectly Centered Compact Viewport Box */}
        <div className="w-full max-w-xl mx-auto relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] max-h-[300px] border border-black/15 shadow-inner bg-slate-100 flex items-center justify-center">
          <img
            src="/vision-lab-bg.png"
            alt="Workspace with Laptop and City View"
            className="w-full h-full object-cover object-center transition-all duration-500"
          />

          {/* Dynamic Filter Overlay */}
          <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${current.overlay}`} />

          {/* Centered Lens Silhouette Overlay */}
          <div className="absolute inset-0 border-[8px] sm:border-[10px] border-black/85 pointer-events-none rounded-2xl flex items-center justify-center">
            <div className="w-[88%] h-[84%] rounded-[20px] border border-white/30 shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] flex items-center justify-center relative">
              {/* Subtle lens sheen reflection */}
              <div className="absolute top-2 right-4 w-14 h-7 bg-gradient-to-bl from-white/25 to-transparent rounded-full -rotate-45 blur-xs pointer-events-none" />
              
              {/* Centered Active Lens Indicator Badge */}
              <div className="px-3 py-1 rounded-full bg-white/95 text-black text-[11px] font-black shadow-md backdrop-blur-sm border border-black/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{current.name}</span>
                <span className="text-black/60 font-semibold">• {current.glare}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
