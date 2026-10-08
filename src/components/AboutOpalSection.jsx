import React from 'react';
import { Sparkles, ShieldCheck, Eye, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutOpalSection({ setActivePage, onOpenBooking }) {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Japanese Beta-Titanium',
      badge: '9g Featherweight',
      desc: 'Precision-milled aerospace grade beta-titanium with friction hinges and hypoallergenic medical silicone pads for zero-pressure, all-day poise.',
      highlight: 'Zero-Screw Friction Hinges',
    },
    {
      icon: Eye,
      title: 'German Freeform Optics',
      badge: 'Sub-Millimeter',
      desc: 'Digital computerized lens surfacing designed to eliminate peripheral distortion and block harmful HEV blue light while preserving crystal-clear clarity.',
      highlight: 'Zero-Distortion Centration',
    },
    {
      icon: ShieldCheck,
      title: '21-Step Clinical Optometry',
      badge: 'In-House Atelier',
      desc: 'Autorefraction, corneal health topography, and custom pupillary distance calibration conducted in-house by licensed clinical optometrists.',
      highlight: 'Certified Optometry Team',
    },
  ];

  const stats = [
    { value: '15,000+', label: 'Happy Eyes Fitted', sub: 'Bengaluru Patrons' },
    { value: '9g Titanium', label: 'Featherweight Standard', sub: 'Aerospace Grade' },
    { value: '21-Step', label: 'Clinical Examination', sub: 'Sub-Millimeter Accuracy' },
    { value: '4.9 ★', label: 'Google Verified Rating', sub: 'Over 850+ Reviews' },
  ];

  return (
    <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* ================= SECTION HEADER: NEAT CENTRAL ALIGNMENT (DIRECT ON PAGE) ================= */}
      <div className="max-w-2xl mx-auto text-center space-y-2.5 mb-6 sm:mb-8">
        {/* Centered Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-sky-200/90 text-black text-[11px] font-bold shadow-xs backdrop-blur-md">
          <Award className="w-3.5 h-3.5 text-sky-600" />
          <span className="tracking-wide">About Opal Opticals • Indiranagar, Bengaluru</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl font-bold text-black tracking-tight leading-tight">
          Optometry Crafted for Life Under the Sky
        </h2>

        {/* Subtitle Paragraph */}
        <p className="text-xs sm:text-sm text-black/75 font-normal leading-relaxed max-w-xl mx-auto">
          Eyewear should feel completely weightless, and your vision should be effortless. No uncomfortable pressure points, no generic off-the-shelf lenses—just bespoke craftsmanship calibrated to your exact eyes.
        </p>
      </div>

          {/* ================= 3 PILLAR CARDS WITH UIVERSE BLUE DOT ANIMATION (WHITE THEME) ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 sm:mb-8 items-stretch">
            {pillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  className="uiverse-outer group cursor-pointer"
                >
                  {/* Glowing Orbiting Electric Blue Dot (Staggered by 2s per card) */}
                  <div 
                    className="uiverse-dot" 
                    style={{ animationDelay: `${idx * -2}s` }} 
                  />

                  {/* Inner Pure White Card */}
                  <div className="uiverse-card bg-white p-5 sm:p-6 flex flex-col justify-between">
                    {/* Glossy Specular Light Sheen Sweeper */}
                    <div className="glossy-shine" />

                    <div className="space-y-3 relative z-10">
                      
                      {/* Top Row: Icon Container + Badge */}
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white via-sky-50 to-sky-100 flex items-center justify-center border border-sky-200/80 shadow-xs group-hover:scale-105 transition-all duration-300">
                          <IconComp className="w-4 h-4 text-sky-900" />
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-black border border-sky-200/80 shadow-xs">
                          {item.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-black pt-0.5 group-hover:text-sky-950 transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-black/75 font-normal leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Card Bottom Highlight Tag */}
                    <div className="pt-3.5 mt-4 border-t border-sky-200/60 flex items-center justify-between text-[11px] font-semibold text-black/85 relative z-10">
                      <div className="flex items-center gap-1 text-sky-900 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{item.highlight}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-black/40 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= COMPACT STATS & ACTION BAR ================= */}
          <div className="rounded-xl p-4 sm:p-5 bg-white/95 border border-sky-100 shadow-[0_6px_20px_-6px_rgba(56,125,190,0.1)] backdrop-blur-xl">
            {/* 4 Stats Grid - Compact Sizing */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-3.5 border-b border-sky-100/80">
              {stats.map((s, idx) => (
                <div key={idx} className="space-y-0 text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-bold text-black tracking-tight leading-none">
                    {s.value}
                  </div>
                  <div className="text-[11px] font-bold text-black pt-0.5">
                    {s.label}
                  </div>
                  <div className="text-[9px] text-sky-700 font-medium">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Compact Action Banner */}
            <div className="pt-3 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="text-center md:text-left">
                <p className="text-xs font-bold text-black">
                  Visit Opal Opticals Flagship Atelier in Indiranagar
                </p>
                <p className="text-[10px] text-black/60 font-medium">
                  Complimentary 21-step eye examination with every bespoke frame purchase.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={onOpenBooking}
                  className="px-3.5 py-1.5 rounded-full bg-black text-white hover:bg-slate-900 text-[11px] font-bold transition-all shadow-xs active:scale-95 flex items-center gap-1 group"
                >
                  <span>Book Eye Test</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => setActivePage && setActivePage('frames')}
                  className="px-3 py-1.5 rounded-full bg-sky-50 hover:bg-black hover:text-white border border-sky-200 text-black text-[11px] font-bold transition-all shadow-xs active:scale-95"
                >
                  Explore Frames
                </button>
              </div>
            </div>
          </div>

    </section>
  );
}
