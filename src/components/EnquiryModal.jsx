import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, Calendar } from 'lucide-react';
import { storeInfo, opticalServices } from '../data/servicesData';

export default function EnquiryModal({ initialData, mode = 'booking', onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: initialData?.name || (mode === 'booking' ? 'Comprehensive Eye Exam' : 'Frame Fitting Consultation'),
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setSubmitted(true);
  };

  const getWhatsAppSyncUrl = () => {
    const text = encodeURIComponent(
      `Hello Opal Opticals!\n` +
      `Appointment Request:\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Service: ${formData.service}\n` +
      `Preferred Date: ${formData.date}`
    );
    return `https://wa.me/${storeInfo.whatsapp}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl border border-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 text-black my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black hover:text-white text-black transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
            <h3 className="text-2xl font-black text-black">Reservation Confirmed</h3>
            <p className="text-xs text-black/80 font-semibold">
              Thank you, <strong>{formData.name}</strong>. Our optometrist concierge will reach out to you at {formData.phone}.
            </p>

            <div className="p-3.5 rounded-2xl bg-black/5 text-xs font-bold text-left space-y-1">
              <div>Service: {formData.service}</div>
              <div>Date: {formData.date}</div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={getWhatsAppSyncUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-full bg-black/5 hover:bg-black hover:text-white text-black font-bold text-xs transition-all"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black text-white">
                Opal Concierge
              </span>
            </div>
            <h3 className="text-2xl font-black text-black mb-1">
              {mode === 'booking' ? 'Book Eye Test' : 'Product Enquiry'}
            </h3>
            <p className="text-xs text-black/70 font-semibold mb-6">
              Complimentary 21-step eye testing and 3D digital centration.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-black mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-xs text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-xs text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">Service / Frame</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-xs text-black focus:outline-none focus:ring-2 focus:ring-black font-medium"
                >
                  <option value="Comprehensive Eye Exam">Comprehensive Eye Exam (Complimentary)</option>
                  <option value="3D Centration Face Fitting">3D Centration Face Fitting</option>
                  <option value="Prescription Lens Replacement">Prescription Lens Replacement</option>
                  <option value="Frame Styling Consultation">Frame Styling Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/15 text-xs text-black focus:outline-none focus:ring-2 focus:ring-black font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-black text-white hover:bg-slate-900 font-black text-xs transition-all shadow-pill-dark"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
