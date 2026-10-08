import React, { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { framesData } from '../data/framesData';
import VisionSimulator from '../components/VisionSimulator';
import AboutOpalSection from '../components/AboutOpalSection';
import ReviewsPageFlipper from '../components/ReviewsPageFlipper';

export default function HomePage({ setActivePage, onOpenBooking, onQuickViewFrame }) {
  const [frameTab, setFrameTab] = useState('all');

  const featuredFrames = framesData.filter(frame => {
    if (frameTab === 'all') return true;
    if (frameTab === 'titanium') return frame.category === 'titanium';
    if (frameTab === 'acetate') return frame.category === 'acetate';
    if (frameTab === 'sunglasses') return frame.category === 'sunglasses';
    return true;
  }).slice(0, 4);

  return (
    <div className="min-h-screen text-black">

      {/* ================= HERO SECTION (Desktop & Mobile Synchronized Experience) ================= */}
      <section className="relative h-auto md:h-screen md:max-h-screen md:min-h-[560px] flex items-start md:items-center overflow-hidden pt-20 sm:pt-24 md:pt-16 pb-8 sm:pb-12 md:pb-8 bg-gradient-to-b from-[#7B93AD] via-[#ADC5DD] to-[#E2F0FD] md:bg-[url('/hero-bg.jpg')] md:bg-cover md:bg-center">
        
        {/* Mobile Model Image Layer (Brought up near content, full uncropped image blended with sky blue bg) */}
        <div className="absolute right-0 top-14 sm:top-16 bottom-0 pointer-events-none md:hidden z-0 flex items-start justify-end max-w-[65%] sm:max-w-[55%]">
          <img 
            src="/hero-model-mobile.png" 
            alt="Opal Titanium Smart Frames" 
            className="w-auto h-full max-h-[370px] sm:max-h-[440px] object-contain object-right-top"
          />
        </div>

        {/* Soft bottom cloud mist transition */}
        <div className="absolute inset-x-0 bottom-0 h-12 md:h-24 bg-gradient-to-t from-[#A9CCE9] via-[#A9CCE9]/60 to-transparent pointer-events-none z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="w-[55%] sm:w-[54%] md:w-full md:max-w-lg space-y-2.5 sm:space-y-4">
            
            {/* Minimalist Cloud Badges - Compact */}
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-xs font-bold bg-white/75 border border-black/20 text-black backdrop-blur-md shadow-sm">
                Titanium Craft
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-xs font-bold bg-white/75 border border-black/20 text-black backdrop-blur-md shadow-sm">
                Zero-Glare Optics
              </span>
            </div>

            {/* Scaled Down Stylish Headline */}
            <div className="space-y-0.5">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-black leading-[1.1] md:leading-[1.08]">
                Think Smarter.{' '}
                <span className="block font-black text-black">React Faster.</span>
                <span className="block font-light text-black">Evolve Daily.</span>
              </h1>
            </div>

            {/* Compact Subtitle */}
            <p className="text-black/85 text-[11px] sm:text-xs md:text-sm font-normal leading-snug md:leading-relaxed max-w-sm">
              Next-generation optical frames and precision lenses designed to sharpen clarity, reduce screen strain, and elevate your presence.
            </p>

            {/* Direct Black CTA Button + Social Proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 pt-1">
              <button
                onClick={() => setActivePage('frames')}
                className="group flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-black text-white hover:bg-slate-900 text-[11px] sm:text-xs font-black transition-all shadow-pill-dark active:scale-95"
              >
                <span>Explore Frames</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-1.5 bg-white/75 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-black/10">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-500" />
                  ))}
                </div>
                <span className="text-[10px] sm:text-[11px] text-black font-black">4.9 / 5</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= LANDSCAPE VIDEO ================= */}
      <section
        className="relative px-4 sm:px-6 lg:px-8 py-5 sm:py-6"
        style={{
          background:
            'linear-gradient(180deg, #A9CCE9 0%, #C7E1F4 48%, #A9CCE9 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-3 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-black">
              Designed for bright days and effortless vision.
            </h2>
          </div>

          <video
            className="block w-full aspect-video object-cover rounded-2xl"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/homepage-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* ================= COMPACT CENTERED VISION LAB ================= */}
      <VisionSimulator />

      {/* ================= FEATURED FRAMES (INR Prices) ================= */}
      <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-6 gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-black/70 block mb-0.5">
              Curated Eyewear
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black">
              Featured Frames
            </h2>
          </div>

          {/* Clean Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All' },
              { id: 'titanium', label: 'Titanium' },
              { id: 'acetate', label: 'Acetate' },
              { id: 'sunglasses', label: 'Sunglasses' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFrameTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  frameTab === tab.id
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white/80 text-black hover:bg-white border border-black/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Frame Cards with INR ₹ Prices - Compact 2-column mobile layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredFrames.map((frame) => (
            <div
              key={frame.id}
              className="cloud-card cloud-card-hover rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white mb-2 sm:mb-3 relative cursor-pointer"
                     onClick={() => onQuickViewFrame(frame)}>
                  <img
                    src={frame.image}
                    alt={frame.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider bg-black text-white">
                    {frame.badge}
                  </span>
                </div>

                <span className="text-[9px] sm:text-[10px] text-black/60 font-black uppercase tracking-wider block truncate">
                  {frame.shape}
                </span>
                <h3 className="text-xs sm:text-base font-black text-black mt-0.5 mb-1 truncate leading-snug">
                  {frame.name}
                </h3>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-black/10 flex items-center justify-between mt-1 sm:mt-2">
                <span className="text-xs sm:text-base font-black text-black">₹{frame.price.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => onQuickViewFrame(frame)}
                  className="px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black text-white hover:bg-slate-900 text-[10px] sm:text-xs font-bold transition-all"
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <button
            onClick={() => setActivePage('frames')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 hover:bg-black hover:text-white border border-black/20 text-black text-xs font-bold transition-all shadow-cloud"
          >
            <span>Explore All Frames</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ================= ABOUT OPAL OPTICALS ================= */}
      <AboutOpalSection
        setActivePage={setActivePage}
        onOpenBooking={onOpenBooking}
      />

      {/* ================= 5 TEXT MESSAGE REVIEWS (AUTO-TURNING PAGES) ================= */}
      <ReviewsPageFlipper
        onOpenBooking={onOpenBooking}
      />

      {/* ================= SIMPLE CLINIC TEASER ================= */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="cloud-card rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <span className="px-3 py-0.5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-wider inline-block">
              Free with Frame Purchase
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-black">
              Comprehensive 21-Step Eye Health Check
            </h3>
            <p className="text-xs sm:text-sm text-black/80 font-normal leading-relaxed">
              Certified optometrists using digital autorefraction and sub-millimeter 3D centration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-slate-900 text-xs font-black transition-all shadow-pill-dark"
            >
              Book Eye Test
            </button>
            <button
              onClick={() => setActivePage('services')}
              className="px-4 py-2.5 rounded-full bg-white text-black hover:bg-black hover:text-white border border-black/20 text-xs font-bold transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
