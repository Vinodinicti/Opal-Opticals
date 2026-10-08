import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { storeInfo, faqs } from '../data/servicesData';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pb-20 text-black">
      
      {/* ================= CONTACT HERO SECTION ================= */}
      <section className="relative pt-36 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-[#EDF6FC]">
        {/* Hero Background Boutique Image with Increased Opacity & Clarity */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <img 
            src="/contact-hero-bg.png" 
            alt="Opal Opticals Luxury Flagship Boutique" 
            className="w-full h-full object-cover object-[center_35%] scale-100 opacity-80 sm:opacity-85 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-[#EDF6FC]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-black/15 text-black text-xs font-bold shadow-cloud">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Flagship Optical Boutique & Studio</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-black tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]">
              Contact Opal
            </h1>
            
            <p className="text-sm sm:text-base text-black font-semibold max-w-lg mx-auto leading-relaxed drop-shadow-[0_1px_10px_rgba(255,255,255,0.9)]">
              Visit our bespoke optical studio in the Arts District or send us an instant enquiry for frame styling and prescription consults.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        {/* Contact Info Card */}
        <div className="md:col-span-5 cloud-card rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-black/10">
            <img src="/opal-logo.png" alt="Opal" className="w-14 h-14 object-contain rounded-full bg-white p-1 shadow-sm border border-sky-100" />
            <div>
              <h3 className="text-base font-black text-black">Opal Opticals</h3>
              <span className="text-xs text-black/70 font-bold">Optical Arts District</span>
            </div>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
              <span>{storeInfo.address}, {storeInfo.city}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-black flex-shrink-0" />
              <span>{storeInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-black flex-shrink-0" />
              <span>{storeInfo.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-black flex-shrink-0" />
              <span>Mon–Sat: 9:30 AM – 8:30 PM | Sun: 11 AM – 6 PM</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={storeInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-black hover:bg-slate-900 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Clean Enquiry Form */}
        <div className="md:col-span-7 cloud-card rounded-3xl p-6 sm:p-8">
          <h3 className="text-xl font-black text-black mb-1">Quick Enquiry</h3>
          <p className="text-xs text-black/70 font-semibold mb-6">
            We usually respond within 1–2 hours during store hours.
          </p>

          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
              <h4 className="text-xl font-black text-black">Thank You!</h4>
              <p className="text-xs text-black font-semibold">
                Your message has been sent. Our team will contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 rounded-full bg-black text-white text-xs font-bold"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-black mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. David Sterling"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-xs text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-xs text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Questions about frames, lens power, or appointment..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-xs text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-black text-white hover:bg-slate-900 font-black text-xs transition-all shadow-pill-dark flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Simple Clean FAQs */}
      <div className="max-w-2xl mx-auto space-y-3">
        <h3 className="text-xl font-black text-black text-center mb-6">Common Questions</h3>
        {faqs.slice(0, 3).map((faq, i) => (
          <div key={i} className="cloud-card rounded-2xl p-4 sm:p-5 space-y-1.5">
            <h4 className="text-xs sm:text-sm font-black text-black">{faq.q}</h4>
            <p className="text-xs text-black/80 font-medium leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* End Main Content Area */}
      </div>
    </div>
  );
}
