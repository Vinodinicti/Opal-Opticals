import React, { useState, useRef } from 'react';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { lensTypes, lensIndices } from '../data/lensesData';

function LensCard({ lens, onSendEnquiry }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`
    );
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered ? transform : undefined,
        animationDelay: lens.id === 'digital-progressive' ? '1.6s' : lens.id === 'blue-shield-pro' ? '3.2s' : '0s',
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`cloud-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group cursor-pointer ${
        lens.image && !isHovered ? 'animate-card-float' : ''
      } ${
        isHovered
          ? 'shadow-[0_25px_50px_-12px_rgba(56,189,248,0.25)] border-sky-300'
          : ''
      }`}
    >
      {/* Dynamic Specular Light Glare following cursor */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4), transparent 70%)`,
          }}
        />
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black text-white shadow-sm">
            {lens.badge}
          </span>
          <span className="text-sm font-black text-black">
            From ₹{lens.startingPrice.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Clean Lens Image ONLY - No HUD, buttons, or overlay clutter */}
        {lens.image && (
          <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white mb-5 border border-sky-100 shadow-sm relative group/img">
            <img
              src={lens.image}
              alt={lens.name}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        )}

        <h3 className="text-xl font-black text-black mb-1 group-hover:text-sky-950 transition-colors">
          {lens.name}
        </h3>
        <p className="text-xs text-black/70 font-bold mb-4">{lens.tagline}</p>

        <div className="space-y-2 mb-6">
          {lens.features.slice(0, 3).map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-black font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-black flex-shrink-0 mt-0.5" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSendEnquiry({ name: lens.name, price: lens.startingPrice })}
        className="w-full py-2.5 rounded-full bg-black text-white hover:bg-slate-900 text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
      >
        <span>Enquire Lens</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

export default function LensesPage({ onOpenBooking, onSendEnquiry }) {
  const [selectedIndex, setSelectedIndex] = useState(lensIndices[2]);

  return (
    <div className="min-h-screen pb-20 text-black">
      
      {/* ================= LENSES HERO SECTION (Soft opacity background image matching FramesPage) ================= */}
      <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-[#EDF6FC]">
        {/* Hero Background Image with Increased Opacity & Soft Sky Blend */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/lenses-hero-bg.png" 
            alt="Optical Lens Technology" 
            className="w-full h-full object-cover object-center opacity-80 sm:opacity-85 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-[#EDF6FC]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-black/15 text-black text-xs font-bold shadow-cloud">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Precision Optical Technology</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-black tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]">
              Precision Lenses
            </h1>
            
            <p className="text-sm sm:text-base text-black font-semibold max-w-lg mx-auto leading-relaxed drop-shadow-[0_1px_10px_rgba(255,255,255,0.9)]">
              German-calibrated freeform digital surfacing, BlueShield HEV protection, and high-index clarity tailored to your prescription.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Lens Cards (3 Key Categories) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {lensTypes.slice(0, 3).map((lens) => (
            <LensCard
              key={lens.id}
              lens={lens}
              onSendEnquiry={onSendEnquiry}
            />
          ))}
        </div>

      {/* ================= ARCHITECTURAL INDEX THICKNESS COMPARISON GUIDE ================= */}
      <div className="cloud-card rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto space-y-8 mt-4">
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-black/70 block">
            Clinical Optical Lab
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-black tracking-tight">
            Lens Thickness Comparison
          </h3>
          <p className="text-xs sm:text-sm text-black/80 font-medium">
            Visual edge-profile reduction across Japanese high-refraction indices.
          </p>
        </div>

        {/* 1. Macro Optical Studio Bench Photograph with Dynamic Focal Spotlight */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/7] rounded-3xl overflow-hidden bg-slate-100 border border-black/10 shadow-sm group">
          <img 
            src="/lens-thickness-comparison.jpg" 
            alt="Optical lens index thickness comparison from 1.50 to 1.74" 
            className="w-full h-full object-cover object-center select-none"
          />

          {/* Smooth Optical Spotlight Tracker following selected lens */}
          <div 
            className="absolute top-0 bottom-0 pointer-events-none transition-all duration-500 ease-out flex flex-col items-center justify-between py-2 sm:py-3 z-10"
            style={{ 
              left: selectedIndex.position,
              transform: 'translateX(-50%)'
            }}
          >
            {/* Top Indicator Badge */}
            <div className="px-2 py-0.5 rounded-full bg-black/90 text-white text-[8px] sm:text-[10px] font-mono tracking-widest uppercase shadow-md backdrop-blur-md border border-white/20 whitespace-nowrap">
              Index {selectedIndex.index}
            </div>

            {/* Precision Optical Ring Target - Pristine White Glass Bar */}
            <div className="w-10 sm:w-20 h-24 sm:h-44 rounded-full border-2 border-white/90 bg-white/20 shadow-[0_0_25px_rgba(255,255,255,0.85),0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-[2px]" />

            {/* Bottom Thickness Callout */}
            <div className="px-2 py-0.5 rounded-full bg-white/95 text-black text-[8px] sm:text-[10px] font-mono font-bold tracking-tight shadow-md border border-black/10 whitespace-nowrap">
              {selectedIndex.reduction}
            </div>
          </div>

          {/* Direct Clickable Lens Hotspots in the Photograph */}
          <div className="absolute inset-0 grid grid-cols-5 z-20">
            {lensIndices.map((item) => (
              <button
                key={item.index}
                type="button"
                onClick={() => setSelectedIndex(item)}
                className="w-full h-full cursor-pointer focus:outline-none hover:bg-black/5 transition-colors"
                title={`Select Index ${item.index}`}
                aria-label={`Select Index ${item.index}`}
              />
            ))}
          </div>
        </div>

        {/* 2. Interactive Segmented Index Selector */}
        <div className="grid grid-cols-5 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-2.5">
          {lensIndices.map((item) => {
            const isActive = selectedIndex.index === item.index;
            return (
              <button
                key={item.index}
                onClick={() => setSelectedIndex(item)}
                className={`px-1.5 py-2 sm:px-6 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-black transition-all duration-300 text-center ${
                  isActive
                    ? 'bg-black text-white shadow-pill-dark scale-102 sm:scale-105'
                    : 'bg-white/80 text-black hover:bg-white border border-black/10 hover:border-black/30'
                }`}
              >
                <span className="block leading-none text-[11px] sm:text-xs">{item.index}</span>
                <span className={`text-[8px] sm:text-[9px] block mt-1 uppercase tracking-wider ${
                  isActive ? 'text-slate-300 font-bold' : 'text-black/50 font-semibold'
                }`}>
                  {item.reductionPercent === 0 ? 'Std' : `-${item.reductionPercent}%`}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3. Architectural Telemetry & Clinical Guidance Panel */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-black/10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Description & Power (7 cols) */}
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[10px] font-black uppercase tracking-wider text-black/70">
              <span>Index {selectedIndex.index} • Technical Specification</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-black tracking-tight">
              {selectedIndex.title}
            </h4>

            <p className="text-xs sm:text-sm text-black/80 font-medium leading-relaxed max-w-xl">
              {selectedIndex.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-black">
              <span className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-950 font-semibold">
                Recommended Range: {selectedIndex.power}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-black/10 text-black/80 font-semibold">
                Frame Synergy: {selectedIndex.idealFor}
              </span>
            </div>
          </div>

          {/* Right Column: Precision Bench Metrics (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4 pt-4 md:pt-0 md:pl-6 border-t md:border-t-0 md:border-l border-black/10">
            <div className="space-y-3.5">
              {/* Edge Thickness Profile */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-black/60 uppercase text-[10px] tracking-wider">Edge Thickness Profile</span>
                  <span className="text-black font-mono">{selectedIndex.profile}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/10 overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all duration-500 rounded-full"
                    style={{ width: `${100 - selectedIndex.reductionPercent}%` }}
                  />
                </div>
              </div>

              {/* Optical Abbe Value */}
              <div className="flex justify-between items-center text-xs py-1.5 border-b border-black/5">
                <span className="text-black/60 font-semibold">Optical Dispersion</span>
                <span className="font-bold text-black font-mono">{selectedIndex.abbe}</span>
              </div>

              {/* Weight Classification */}
              <div className="flex justify-between items-center text-xs py-1.5 border-b border-black/5">
                <span className="text-black/60 font-semibold">Weight Classification</span>
                <span className="font-bold text-black">{selectedIndex.weight}</span>
              </div>
            </div>

            {/* Direct Clinical Action CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="w-full py-3 rounded-full bg-black text-white hover:bg-slate-900 text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <span>Verify My Index With Optometrist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
