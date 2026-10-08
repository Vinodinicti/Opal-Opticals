import React, { useState, useEffect, useRef } from 'react';
import { Eye, Crosshair, Sparkles, Wrench, ArrowRight, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { opticalServices, storeInfo } from '../data/servicesData';

function ServiceCard({ service, index, onOpenBooking }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const serviceIcons = {
    Eye,
    Crosshair,
    Sparkles,
    Wrench,
  };

  const Icon = serviceIcons[service.icon] || Eye;
  const isImageLeft = index % 2 === 0;

  // Image animation: slides from left if image is on the left, from right if image is on the right
  const imageAnimClass = isVisible
    ? 'opacity-100 translate-x-0'
    : isImageLeft
    ? 'opacity-0 -translate-x-12 sm:-translate-x-20'
    : 'opacity-0 translate-x-12 sm:translate-x-20';

  // Details animation: slides from right if details are on the right, from left if details are on the left
  const detailsAnimClass = isVisible
    ? 'opacity-100 translate-x-0'
    : isImageLeft
    ? 'opacity-0 translate-x-12 sm:translate-x-20'
    : 'opacity-0 -translate-x-12 sm:-translate-x-20';

  return (
    <div
      ref={cardRef}
      className="cloud-card rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/80 shadow-cloud hover:shadow-2xl transition-all duration-500 overflow-hidden group"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ================= IMAGE COLUMN ================= */}
        <div
          className={`md:col-span-5 lg:col-span-5 ${
            isImageLeft ? 'order-1 md:order-1' : 'order-1 md:order-2'
          } transition-all duration-1000 ease-out ${imageAnimClass}`}
        >
          <div className="aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-black/10 shadow-md relative group/img">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/85 text-white backdrop-blur-md shadow-md flex items-center gap-1.5 border border-white/10">
              <Clock className="w-3 h-3 text-sky-400" />
              <span>{service.duration}</span>
            </div>
          </div>
        </div>

        {/* ================= DETAILS COLUMN ================= */}
        <div
          className={`md:col-span-7 lg:col-span-7 flex flex-col justify-between ${
            isImageLeft ? 'order-2 md:order-2' : 'order-2 md:order-1'
          } transition-all duration-1000 ease-out ${detailsAnimClass}`}
        >
          <div>
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                <Icon className="w-3.5 h-3.5 text-white" />
                <span>{service.category}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-sky-50 border border-sky-200 text-sky-950">
                {service.highlight}
              </span>
            </div>

            {/* Service Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-black mb-3 tracking-tight leading-snug">
              {service.title}
            </h3>

            {/* Full Description */}
            <p className="text-xs sm:text-sm text-black/80 leading-relaxed font-medium mb-5">
              {service.description}
            </p>

            {/* Complete Clinical Checklist */}
            <div className="pt-4 border-t border-black/5 mb-6">
              <span className="text-[10px] font-black uppercase tracking-wider text-black/60 block mb-2.5">
                Clinical Procedure Includes:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-black/85 font-medium leading-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Booking Actions Footer */}
          <div className="pt-5 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 mt-auto">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-black/50 block">Pricing</span>
              <span className="text-sm sm:text-base font-black text-black">{service.price}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onOpenBooking(service)}
                className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-black text-white hover:bg-slate-900 text-xs font-black transition-all flex items-center gap-2 shadow-sm active:scale-95"
              >
                <span>Book Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(
                  `Hello Opal Opticals, I would like to book a slot for ${service.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-black text-white hover:bg-slate-800 transition-all shadow-sm active:scale-95"
                title="WhatsApp Enquiry"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage({ onOpenBooking }) {
  const keyServices = opticalServices.slice(0, 4);

  return (
    <div className="min-h-screen pb-20 text-black">
      
      {/* ================= CLINICAL SERVICES HERO SECTION ================= */}
      <section className="relative pt-36 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-[#EDF6FC]">
        {/* Hero Background Image - Matched to Other Pages (80%-85% Opacity) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <img 
            src="/services-hero-bg.jpg" 
            alt="Clinical Care & Optical Services Examination" 
            className="w-full h-full object-cover object-[center_30%] opacity-80 sm:opacity-85 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-[#EDF6FC]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-black/15 text-black text-xs font-bold shadow-cloud">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Clinical Optometry & Vision Lab</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-black tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]">
              Optical Services
            </h1>
            
            <p className="text-sm sm:text-base text-black font-semibold max-w-lg mx-auto leading-relaxed drop-shadow-[0_1px_10px_rgba(255,255,255,0.9)]">
              Comprehensive 21-step eye examinations, computerized autorefraction, and digital 3D centration by certified licensed optometrists.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Alternating 4-Card Luxury Feature List with Edge Animations */}
        <div className="space-y-10 sm:space-y-12 mb-20">
          {keyServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>

        {/* Minimalist CTA */}
        <div className="cloud-card rounded-3xl p-8 sm:p-10 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-black text-black">
            Walk-in or Reserve Your Slot
          </h3>
          <p className="text-xs sm:text-sm text-black font-semibold">
            Eye exams are free with any frame purchase. Walk-ins are always welcomed.
          </p>
          <div>
            <button
              onClick={() => onOpenBooking()}
              className="px-7 py-3 rounded-full bg-black text-white hover:bg-slate-900 text-xs font-black transition-all shadow-pill-dark"
            >
              Reserve An Appointment
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
