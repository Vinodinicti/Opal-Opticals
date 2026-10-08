import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Calendar } from 'lucide-react';
import { storeInfo } from '../data/servicesData';

export default function FrameQuickViewModal({ frame, onClose, onOpenBooking }) {
  if (!frame) return null;

  const initialColor = frame.colors?.find(c => c.image === frame.image)?.name || frame.colors?.[0]?.name || '';
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [activeImg, setActiveImg] = useState(frame.image || frame.colors?.[0]?.image || '');

  useEffect(() => {
    const matched = frame.colors?.find(c => c.image === frame.image);
    if (matched) {
      setSelectedColor(matched.name);
    }
    if (frame.image) {
      setActiveImg(frame.image);
    }
  }, [frame]);

  const handleColorChange = (colorObj) => {
    setSelectedColor(colorObj.name);
    if (colorObj.image) {
      setActiveImg(colorObj.image);
    }
  };

  const getWhatsAppEnquiryUrl = () => {
    const text = encodeURIComponent(
      `Hello Opal Opticals! I am inquiring about the ${frame.name} in ${selectedColor} finish priced at ₹${frame.price.toLocaleString('en-IN')}. Is this currently available in store?`
    );
    return `https://wa.me/${storeInfo.whatsapp}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 text-black my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/5 hover:bg-black hover:text-white text-black transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Main Image corresponding to the selected color */}
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm relative group">
              <img
                src={activeImg}
                alt={`${frame.name} - ${selectedColor}`}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/80 text-white backdrop-blur-sm">
                {selectedColor}
              </span>
            </div>

            {/* Thumbnail thumbnails for other colors */}
            <div className="flex gap-2">
              {frame.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleColorChange(c)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedColor === c.name ? 'border-black scale-95 shadow-sm' : 'border-black/10 opacity-70 hover:opacity-100'
                  }`}
                  title={c.name}
                >
                  <img src={c.image || frame.image} alt={c.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black text-white inline-block mb-1.5">
                {frame.badge}
              </span>
              <h3 className="text-2xl font-black text-black">{frame.name}</h3>
              <span className="text-xl font-black text-black block mt-0.5">₹{frame.price.toLocaleString('en-IN')}</span>
            </div>

            <p className="text-xs text-black/75 font-semibold leading-relaxed">
              {frame.description.slice(0, 110)}...
            </p>

            {/* Color Swatches */}
            <div>
              <span className="text-xs font-bold text-black block mb-1.5">
                Color Finish: <strong className="text-black">{selectedColor}</strong>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {frame.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleColorChange(c)}
                    className={`px-3 py-1 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedColor === c.name
                        ? 'border-black bg-black text-white shadow-sm'
                        : 'border-black/20 bg-white text-black hover:border-black'
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-white/50" 
                      style={{ backgroundColor: c.hex }} 
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fit Dimensions */}
            <div className="p-3 rounded-xl bg-black/5 text-xs font-bold text-black/80">
              Dimensions: {frame.dimensions.lensWidth}mm lens • {frame.dimensions.bridgeWidth}mm bridge • {frame.weight}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                <span>Enquire {selectedColor} on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking(frame);
                }}
                className="w-full py-2.5 px-4 rounded-full bg-black text-white hover:bg-slate-900 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Free Try-On</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
