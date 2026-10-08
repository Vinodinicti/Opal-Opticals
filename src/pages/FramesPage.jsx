import React, { useState, useMemo, useEffect } from 'react';
import { Search, MessageSquare, X, Sparkles } from 'lucide-react';
import { framesData, frameCategories } from '../data/framesData';
import { storeInfo } from '../data/servicesData';

function FrameCard({ frame, onQuickViewFrame }) {
  const frameImages = useMemo(() => {
    const list = [];
    if (frame.image) list.push(frame.image);
    if (frame.colors) {
      frame.colors.forEach((c) => {
        if (c.image && !list.includes(c.image)) list.push(c.image);
      });
    }
    if (frame.gallery) {
      frame.gallery.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    if (frame.hoverImage && !list.includes(frame.hoverImage)) {
      list.push(frame.hoverImage);
    }
    return list.length > 0 ? list : [frame.image];
  }, [frame]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Stagger intervals slightly (2600ms - 3650ms) so cards don't all flip at the exact same instant
  const intervalDelay = useMemo(() => {
    const hash = frame.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return 2600 + (hash % 4) * 350;
  }, [frame.id]);

  useEffect(() => {
    if (frameImages.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % frameImages.length);
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [frameImages.length, isPaused, intervalDelay]);

  const currentImage = frameImages[currentIndex] || frame.image;

  return (
    <div className="cloud-card cloud-card-hover rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 flex flex-col justify-between">
      <div>
        {/* Frame Image Container with Automatic Slideshow - Compact mobile sizing */}
        <div 
          className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white mb-2 sm:mb-3 relative cursor-pointer group"
          onClick={() => onQuickViewFrame({ ...frame, image: currentImage })}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {frameImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`${frame.name} angle ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:scale-105 ${
                idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            />
          ))}

          <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 z-20 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider bg-black text-white shadow-sm">
            {frame.badge}
          </span>

          {/* Subtle Slide Indicator Dots */}
          {frameImages.length > 1 && (
            <div className="absolute bottom-1.5 right-1.5 sm:bottom-2.5 sm:right-2.5 z-20 flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-black/40 backdrop-blur-md">
              {frameImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(dotIdx);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    dotIdx === currentIndex
                      ? 'w-2 sm:w-3 h-1 sm:h-1.5 bg-white'
                      : 'w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Show image ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Specs, Title & Material */}
        <span className="text-[9px] sm:text-[10px] text-black/60 font-black uppercase tracking-wider block truncate">
          {frame.shape} • {frame.weight}
        </span>
        <h3 className="text-xs sm:text-base font-black text-black mt-0.5 mb-0.5 leading-snug truncate">
          {frame.name}
        </h3>
        <p className="text-[10px] sm:text-xs text-black/70 font-medium line-clamp-1 mb-1 sm:mb-2">
          {frame.material}
        </p>
      </div>

      {/* Price & Actions in INR */}
      <div className="pt-2 sm:pt-3 border-t border-black/10 flex items-center justify-between mt-1 sm:mt-2">
        <span className="text-xs sm:text-base font-black text-black">₹{frame.price.toLocaleString('en-IN')}</span>
        
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={() => onQuickViewFrame({ ...frame, image: currentImage })}
            className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black text-white hover:bg-slate-900 text-[10px] sm:text-xs font-bold transition-all"
          >
            View
          </button>
          <a
            href={`https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(`Hi Opal Opticals! I am inquiring about the ${frame.name} (₹${frame.price.toLocaleString('en-IN')}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 sm:p-1.5 rounded-full bg-black text-white hover:bg-slate-800 transition-all shadow-sm active:scale-95"
            title="Enquire on WhatsApp"
          >
            <MessageSquare className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-white" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FramesPage({ onQuickViewFrame, onOpenBooking, onSendEnquiry }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFrames = useMemo(() => {
    return framesData.filter((frame) => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'eyeglasses' && frame.category !== 'eyeglasses' && frame.category !== 'titanium' && frame.category !== 'acetate') return false;
        if (selectedCategory !== 'eyeglasses' && frame.category !== selectedCategory) return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return frame.name.toLowerCase().includes(query) || frame.shape.toLowerCase().includes(query);
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pb-20 text-black">
      
      {/* ================= FRAMES HERO SECTION (Soft opacity background image) ================= */}
      <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-[#EDF6FC]">
        {/* Hero Background Image with Increased Opacity */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/frames-hero-bg.jpg" 
            alt="Frames Atmosphere" 
            className="w-full h-full object-cover object-center opacity-80 sm:opacity-85 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-[#EDF6FC]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-black/15 text-black text-xs font-black shadow-cloud">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>The Optical Atelier</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-black tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]">
              Frame Collections
            </h1>
            
            <p className="text-sm sm:text-base text-black font-semibold max-w-lg mx-auto leading-relaxed drop-shadow-[0_1px_10px_rgba(255,255,255,0.9)]">
              Featuring Opal Aero Titanium X1 in Matte Gunmetal, Champagne Gold, and Brushed Platinum editions.
            </p>
          </div>

          {/* Integrated Filter & Search Bar */}
          <div className="max-w-3xl mx-auto mt-8 cloud-card rounded-3xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-cloud">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-black/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search titanium, gold, aviator..."
                className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-black/15 text-xs text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/60 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {frameCategories.slice(0, 5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-white/80 text-black hover:bg-white border border-black/10'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FRAMES CATALOG GRID ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-black/80">
            Showing <strong className="text-black">{filteredFrames.length}</strong> styles
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold text-black underline"
            >
              Show All
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredFrames.map((frame) => (
            <FrameCard
              key={frame.id}
              frame={frame}
              onQuickViewFrame={onQuickViewFrame}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
