import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  ShieldCheck, 
  FileText, 
  X, 
  Lock, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Clock,
  Glasses
} from 'lucide-react';
import { storeInfo } from '../data/servicesData';

export default function Footer({ setActivePage, onOpenBooking, onOpenAdmin }) {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleNav = (page) => {
    if (setActivePage) {
      setActivePage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com',
      color: 'hover:text-[#E4405F]',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com',
      color: 'hover:text-[#1877F2]',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/${storeInfo.phone.replace(/[^0-9]/g, '')}?text=Hello%20Opal%20Opticals,%20I%20would%20like%20to%20enquire%20about%20frames%20and%20lenses.`,
      color: 'hover:text-[#25D366]',
    },
    {
      name: 'Twitter / X',
      icon: Twitter,
      url: 'https://twitter.com',
      color: 'hover:text-black',
    },
  ];

  return (
    <>
      <footer className="relative bg-white/85 backdrop-blur-2xl border-t border-sky-100 text-black pt-6 sm:pt-8 pb-4 sm:pb-5 overflow-hidden">
        {/* Subtle background cloud decorative glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Footer Grid: Brand, Vertical Quick Links, Boutique Address */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 pb-5 sm:pb-8 border-b border-black/10 items-start">
            
            {/* Column 1: Brand & Socials (5 cols) */}
            <div className="md:col-span-5 space-y-2 sm:space-y-3.5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <img 
                  src="/opal-logo.png" 
                  alt="Opal Opticals" 
                  className="w-9 h-9 sm:w-12 sm:h-12 object-contain rounded-full bg-white p-1 shadow-xs border border-sky-100" 
                />
                <div>
                  <span className="text-sm sm:text-lg font-black tracking-widest text-black uppercase block leading-tight">
                    OPAL OPTICALS
                  </span>
                  <span className="text-[9px] sm:text-[11px] tracking-wider text-black/70 font-bold uppercase">
                    Haute Eyewear & Clinical Optometry
                  </span>
                </div>
              </div>

              <p className="text-[11px] sm:text-xs font-medium text-black/75 max-w-sm leading-relaxed">
                Featherweight titanium eyewear and precision digital optometry in Bengaluru.
              </p>

              {/* 4 Social Media Icons */}
              <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-black border border-black/10 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:bg-black hover:text-white ${social.color}`}
                      title={social.name}
                    >
                      <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Columns 2 & 3: Mobile 2-column split (Links on one side, Details on other side) / Desktop 7 cols */}
            <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-7 gap-4 sm:gap-6 lg:gap-8 items-start pt-1 sm:pt-0">
              
              {/* Left Side (Links): 1 col on mobile, 3 cols on desktop */}
              <div className="col-span-1 md:col-span-3 space-y-2 sm:space-y-3">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-black/50 block">
                  Quick Links
                </span>
                <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs font-bold text-black">
                  <li>
                    <button 
                      onClick={() => handleNav('home')} 
                      className="hover:text-sky-800 transition-colors text-left"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleNav('frames')} 
                      className="hover:text-sky-800 transition-colors text-left"
                    >
                      Frames
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleNav('lenses')} 
                      className="hover:text-sky-800 transition-colors text-left"
                    >
                      Lenses
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleNav('services')} 
                      className="hover:text-sky-800 transition-colors text-left"
                    >
                      Services
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleNav('contact')} 
                      className="hover:text-sky-800 transition-colors text-left"
                    >
                      Contact
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={onOpenBooking} 
                      className="hover:underline flex items-center gap-1 font-bold text-sky-900 pt-0.5 text-left"
                    >
                      <span>Book Test</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </li>
                </ul>
              </div>

              {/* Right Side (Details): 1 col on mobile, 4 cols on desktop */}
              <div className="col-span-1 md:col-span-4 space-y-2 sm:space-y-3 text-[11px] sm:text-xs font-semibold text-black/85">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-black/50 block">
                  Boutique & Clinic
                </span>
                
                <div className="space-y-2 sm:space-y-2.5">
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <MapPin className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                    <span className="leading-snug text-[10px] sm:text-xs">{storeInfo.address}, {storeInfo.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Phone className="w-3.5 h-3.5 text-black shrink-0" />
                    <a href={`tel:${storeInfo.phone}`} className="hover:underline font-bold text-black text-[10px] sm:text-xs">
                      {storeInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <Clock className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                    <div className="leading-snug text-[10px] sm:text-xs">
                      <div>Mon–Sat: 9:30 AM – 8:30 PM</div>
                      <div className="text-black/70">Sun: 11 AM – 6 PM</div>
                    </div>
                  </div>
                </div>

                <div className="pt-1 hidden sm:block">
                  <button
                    onClick={onOpenBooking}
                    className="px-4 py-2 rounded-full bg-black text-white hover:bg-slate-900 transition-all text-xs font-black shadow-xs flex items-center gap-1.5 active:scale-95"
                  >
                    <span>Book Free Eye Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Copyright, Currency & Legal Policies */}
          <div className="pt-3.5 sm:pt-5 pb-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-semibold text-black/75 pr-16 sm:pr-32">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span>© {currentYear} Opal Opticals</span>
              <span>•</span>
              <span>Bengaluru, India</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="font-bold text-black hover:text-sky-800 underline decoration-sky-300 underline-offset-2 transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-3 h-3 text-black" />
                <span>Privacy Policy</span>
              </button>

              <span className="text-black/30">•</span>

              <button
                onClick={() => setShowTermsModal(true)}
                className="font-bold text-black hover:text-sky-800 underline decoration-sky-300 underline-offset-2 transition-colors flex items-center gap-1"
              >
                <FileText className="w-3 h-3 text-black" />
                <span>Terms & Conditions</span>
              </button>

              {onOpenAdmin && (
                <>
                  <span className="text-black/30">•</span>
                  <button
                    onClick={onOpenAdmin}
                    className="p-1 rounded-full text-black/50 hover:text-black hover:bg-black/5 transition-all flex items-center justify-center"
                    title="Staff Atelier Access"
                    aria-label="Staff Login"
                  >
                    <Glasses className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="cloud-card max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-white text-black relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-sky-100 flex items-center justify-center border border-sky-200">
                  <ShieldCheck className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 id="privacy-modal-title" className="text-base font-black text-black">
                    Privacy Policy
                  </h3>
                  <p className="text-xs font-semibold text-black/70">
                    Opal Opticals • Patient & Customer Data Commitment
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black transition-colors"
                aria-label="Close Privacy Policy"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 text-xs sm:text-sm font-medium text-black/85 leading-relaxed">
              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200/60 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <p className="font-bold text-black text-xs sm:text-sm">
                  Your optical prescriptions and contact details are handled with strict medical confidentiality and are never shared or sold.
                </p>
              </div>

              <div>
                <h4 className="font-black text-black uppercase tracking-wider text-xs mb-1">
                  1. Optical Prescriptions & Diagnostic Records
                </h4>
                <p>
                  Refraction measurements, pupillary distance (PD), and prescription entries are stored confidentially and used solely to manufacture and calibrate your lenses.
                </p>
              </div>

              <div>
                <h4 className="font-black text-black uppercase tracking-wider text-xs mb-1">
                  2. Booking & Enquiry Information
                </h4>
                <p>
                  Information entered via booking or enquiry forms is securely routed to our store optometry team in Indiranagar, Bengaluru.
                </p>
              </div>

              <div>
                <h4 className="font-black text-black uppercase tracking-wider text-xs mb-1">
                  3. WhatsApp & External Communication
                </h4>
                <p>
                  Direct customer conversations through WhatsApp are protected by end-to-end encryption. We do not engage in unsolicited promotional messaging.
                </p>
              </div>

              <div>
                <h4 className="font-black text-black uppercase tracking-wider text-xs mb-1">
                  4. Data Rights
                </h4>
                <p>
                  You may request records deletion or corrections anytime by contacting us at <span className="font-bold">{storeInfo.email}</span>.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3 border-t border-black/10 flex justify-end">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2 rounded-full bg-black text-white hover:bg-slate-800 text-xs font-black transition-all shadow-sm"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="cloud-card max-w-xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-white text-black relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-modal-title"
          >
            <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-sky-100 flex items-center justify-center border border-sky-200">
                  <FileText className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 id="terms-modal-title" className="text-base font-black text-black">
                    Terms & Guarantee
                  </h3>
                  <p className="text-xs font-semibold text-black/70">
                    Opal Opticals Warranty Guidelines
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black transition-colors"
                aria-label="Close Terms"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm font-medium text-black/85 leading-relaxed">
              <div>
                <h4 className="font-black text-black uppercase tracking-wider text-xs mb-1">
                  • 1-Year Frame Warranty
                </h4>
                <p>
                  All Opal Aero Titanium and acetate frames include 1-year coverage on frame welds and hinges.
                </p>
              </div>
              <div>
                <h4 className="font-black text-black uppercase tracking-wider text-xs mb-1">
                  • Fitting Comfort Guarantee
                </h4>
                <p>
                  Complimentary re-testing and power adjustments provided within 30 days of lens fitting.
                </p>
              </div>
              <div>
                <h4 className="font-black text-black uppercase tracking-wider text-xs mb-1">
                  • Transparent Indian Rupee Pricing
                </h4>
                <p>
                  All catalogue prices are listed in Indian Rupees (₹ INR) including GST.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-black/10 flex justify-end">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-5 py-2 rounded-full bg-black text-white hover:bg-slate-800 text-xs font-black transition-all shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
