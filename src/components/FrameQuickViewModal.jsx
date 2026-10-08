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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg sm:max-w-2xl bg-white/95 backdrop-blur-2xl border border-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-7 text-black my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prominent High-Visibility Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-black hover:text-white text-black border border-black/15 shadow-md flex items-center justify-center transition-all active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 items-center pt-2 sm:pt-0">
          {/* Main Image corresponding to the selected color */}
          <div className="space-y-2 sm:space-y-3">
            <div className="aspect-[4/3] sm:aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-black/10 shadow-xs relative group max-h-[190px] sm:max-h-none">
              <img
                src={activeImg}
                alt={`${frame.name} - ${selectedColor}`}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-black/80 text-white backdrop-blur-sm">
                {selectedColor}
              </span>
            </div>

            {/* Thumbnail thumbnails for other colors */}
            <div className="flex gap-1.5 sm:gap-2">
              {frame.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleColorChange(c)}
                  className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                    selectedColor === c.name ? 'border-black scale-95 shadow-xs' : 'border-black/10 opacity-70 hover:opacity-100'
                  }`}
                  title={c.name}
                >
                  <img src={c.image || frame.image} alt={c.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-black text-white inline-block mb-1">
                {frame.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black leading-tight">{frame.name}</h3>
              <span className="text-lg sm:text-xl font-black text-black block mt-0.5">₹{frame.price.toLocaleString('en-IN')}</span>
            </div>

            <p className="text-[11px] sm:text-xs text-black/75 font-semibold leading-relaxed">
              {frame.description.slice(0, 110)}...
            </p>

            {/* Color Swatches */}
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-black block mb-1">
                Color Finish: <strong className="text-black">{selectedColor}</strong>
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {frame.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleColorChange(c)}
                    className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedColor === c.name
                        ? 'border-black bg-black text-white shadow-xs'
                        : 'border-black/20 bg-white text-black hover:border-black'
                    }`}
                  >
                    <span 
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-white/50" 
                      style={{ backgroundColor: c.hex }} 
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fit Dimensions */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-black/5 text-[11px] sm:text-xs font-bold text-black/80">
              {frame.dimensions.lensWidth}mm lens • {frame.dimensions.bridgeWidth}mm bridge • {frame.weight}
            </div>

            {/* Actions */}
            <div className="pt-1 sm:pt-2 flex flex-col gap-2">
              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 sm:py-2.5 px-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                <span>Enquire {selectedColor} on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking(frame);
                }}
                className="w-full py-2 sm:py-2.5 px-3.5 rounded-full bg-black text-white hover:bg-slate-900 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
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
