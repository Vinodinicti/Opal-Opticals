import React, { useState, useEffect } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  CheckCircle2
} from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    initials: 'AN',
    name: 'Arjun Narang',
    role: 'Senior Software Architect',
    location: 'Bengaluru',
    verified: 'Verified Eye Exam • Indiranagar',
    time: 'Yesterday at 4:15 PM',
    rating: 5,
    message: 'The Aero Titanium frame is unbelievably light. Working 10+ hours on screens used to give me evening headaches, but their BlueShield lenses made an instant difference. You genuinely forget you are wearing glasses.',
    product: 'Opal Aero Titanium X1 (Matte Gunmetal)',
    price: '₹3,499',
  },
  {
    id: 2,
    initials: 'PR',
    name: 'Priya Ramaswamy',
    role: 'Product Designer',
    location: 'Koramangala, Bengaluru',
    verified: 'Verified Boutique Fitting',
    time: '2 days ago',
    rating: 5,
    message: 'Had my eye test done here over the weekend. The 21-step check was the most thorough clinical exam I have experienced. The Lumina Vintage Havana frame feels custom-sculpted for my face and never slides down my nose!',
    product: 'Lumina Vintage Havana (Bio-Acetate)',
    price: '₹2,699',
  },
  {
    id: 3,
    initials: 'VM',
    name: 'Dr. Vikram Mehta',
    role: 'Consultant Cardiologist',
    location: 'Indiranagar, Bengaluru',
    verified: 'Verified Progressive Calibration',
    time: '4 days ago',
    rating: 5,
    message: 'I was hesitant about adapting to progressive lenses, but Opal calibrated them with sub-millimeter precision on the first try. Zero peripheral distortion while examining surgical charts or driving at night.',
    product: 'FreeForm Progressive HD Lenses',
    price: '₹3,999',
  },
  {
    id: 4,
    initials: 'AS',
    name: 'Ananya Sen',
    role: 'Creative Director',
    location: 'Lavelle Road, Bengaluru',
    verified: 'Verified Atelier Patron',
    time: '5 days ago',
    rating: 5,
    message: 'Minimalist, chic, and genuinely 9 grams. The diamond-faceted rimless edges catch the light so subtly. Everyone at my design studio keeps asking where I got these frames from. The in-store hospitality was delightful.',
    product: 'Strata Horizon Rimless (Mirror Silver)',
    price: '₹3,199',
  },
  {
    id: 5,
    initials: 'RV',
    name: 'Rohan Verma & Meera',
    role: 'Tech Lead & Travellers',
    location: 'Bengaluru',
    verified: 'Verified Buyer • UV400 Polarized',
    time: '1 week ago',
    rating: 5,
    message: 'Picked up the Solaris Drift polarized sunglasses for our road trip to Coorg. The water-shedding hydro coating and glare cutoff on bright highway stretches are exceptional. 10/10 clinical and craft service!',
    product: 'Solaris Drift Polarized (Sky Blue Mirror)',
    price: '₹3,299',
  }
];

export default function ReviewsPageFlipper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');

  // Uninterrupted automatic review change every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handleDotClick = (idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 'next' : 'prev');
    setCurrentIndex(idx);
  };

  const currentReview = reviewsData[currentIndex];

  return (
    <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header: Clean Symmetrical Alignment */}
      <div className="text-center max-w-md mx-auto mb-5 sm:mb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-sky-200 text-black text-[11px] font-bold shadow-xs">
          <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
          <span>Patient & Customer Reviews</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight leading-tight">
          Words from Opal Patrons
        </h2>
        <p className="text-xs sm:text-sm text-black/75 font-normal leading-relaxed">
          Real text message reviews from patrons wearing Opal eyewear across Bengaluru.
        </p>
      </div>

      {/* Main Review Card with Smooth Auto-Turn Page Transition */}
      <div className="relative max-w-2xl mx-auto">
        {/* Clean, Neat Solid White Card */}
        <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-[0_12px_36px_-10px_rgba(56,125,190,0.12)] border border-sky-100/90 overflow-hidden">
          
          {/* Animated Turning Page Content Container */}
          <div 
            key={currentReview.id}
            className={`min-h-[220px] flex flex-col justify-between ${
              direction === 'next' ? 'animate-page-turn-next' : 'animate-page-turn-prev'
            }`}
          >
            {/* Header: Customer Profile & Stars (Neat Alignment) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
              
              {/* User Avatar + Identity */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shadow-xs ring-4 ring-sky-50 shrink-0">
                  {currentReview.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-black leading-tight">
                      {currentReview.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-black/60 font-medium pt-0.5">
                    {currentReview.role} • {currentReview.location}
                  </p>
                </div>
              </div>

              {/* Rating Stars & Timestamp */}
              <div className="flex sm:flex-col sm:items-end items-center justify-between gap-1 pt-1 sm:pt-0">
                <div className="flex items-center text-amber-400">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-black/50 font-medium">
                  {currentReview.time}
                </span>
              </div>
            </div>

            {/* Message Quotation Body (Neat Light Sky Bubble) */}
            <div className="my-2 relative bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-100">
              <p className="text-xs sm:text-sm text-black/85 font-normal leading-relaxed italic">
                "{currentReview.message}"
              </p>
            </div>

            {/* Bottom Row: Purchased Product & Navigation Controls (Neat Horizontally Aligned) */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              
              {/* Product Purchased Tag */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold text-black/60">
                  Purchased:
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-50/80 border border-sky-200/80 text-[11px] font-bold text-black">
                  {currentReview.product}
                </span>
                <span className="text-xs font-bold text-black">
                  {currentReview.price}
                </span>
              </div>

              {/* Clean Minimal Navigation: Arrows + 5 Progress Dots */}
              <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                {/* 5 Minimal Progress Lines */}
                <div className="flex items-center gap-1.5 mr-1">
                  {reviewsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === idx 
                          ? 'w-5 bg-black' 
                          : 'w-1.5 bg-black/20 hover:bg-black/40'
                      }`}
                      aria-label={`Go to review ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Prev Arrow Button */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="w-7 h-7 rounded-full bg-white hover:bg-black hover:text-white border border-slate-200 flex items-center justify-center text-black transition-all shadow-xs active:scale-95"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Next Arrow Button */}
                <button
                  onClick={handleNext}
                  aria-label="Next review"
                  className="w-7 h-7 rounded-full bg-white hover:bg-black hover:text-white border border-slate-200 flex items-center justify-center text-black transition-all shadow-xs active:scale-95"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
