export const opticalServices = [
  {
    id: 'digital-eye-exam',
    title: 'Comprehensive 21-Step Eye Examination',
    category: 'Clinical Diagnostic',
    duration: '20 - 25 mins',
    price: 'Complimentary with Frame Purchase (Regular: ₹499)',
    image: '/service-eye-exam.png',
    icon: 'Eye',
    highlight: 'Advanced Corneal & Retinal Screening',
    description: 'Conducted by certified licensed optometrists using computerized autorefractors and digital phoropters. Beyond checking your power, we screen for early eye strain, digital fatigue, and dry eye syndrome.',
    includes: [
      'Digital autorefractor computerized assessment',
      'Binocular vision balance & depth evaluation',
      'Corneal curvature & astigmatism mapping',
      'Intraocular pressure test',
      'Personalized lifestyle vision recommendation'
    ]
  },
  {
    id: 'precision-fitting',
    title: '3D Digital Centration & Frame Fitting',
    category: 'Custom Fit',
    duration: '15 mins',
    price: 'Free for All Customers',
    image: '/service-digital-fitting.jpg',
    icon: 'Crosshair',
    highlight: 'Sub-millimeter Accuracy',
    description: 'Aligns your Pupillary Distance (PD), pantoscopic tilt, and vertex distance with 0.1mm accuracy for zero-slip comfort and distortion-free lens alignment.',
    includes: [
      'Digital pupillary distance (PD) measurement',
      'Pantoscopic tilt & wrap angle compensation',
      'Temple arm custom molding',
      'Medical silicone nose pad alignment'
    ]
  },
  {
    id: 'lens-replacement-reglaze',
    title: 'Lens Replacement & Reglazing Service',
    category: 'Restoration',
    duration: 'Same-Day / 24 Hours',
    price: 'From ₹999 (Lenses only)',
    image: '/service-lens-reglaze.jpg',
    icon: 'Sparkles',
    highlight: 'Bring Your Existing Frame',
    description: 'Has your prescription changed or are your lenses scratched? Bring your favorite frame to Opal Opticals! We custom-cut new precision lenses into your current frames.',
    includes: [
      'Frame ultrasonic stress check',
      'Precision optical CNC lens edging',
      'Free hinge tightening & realignment',
      '1-year lens coating warranty'
    ]
  },
  {
    id: 'repair-ultrasonic-spa',
    title: 'Ultrasonic Deep Cleaning & Tune-Up',
    category: 'Maintenance',
    duration: '10 mins',
    price: 'Complimentary Lifetime Care',
    image: '/service-ultrasonic-cleaning.jpg',
    icon: 'Wrench',
    highlight: 'Walk-ins Always Welcome',
    description: 'Submerge your frames in an ultrasonic micro-cavitation bath to dislodge facial oils and dust from hinges, with free screw tightening and fresh nose pads.',
    includes: [
      '40kHz ultrasonic micro-cavitation cleaning bath',
      'Replacement silicone nose pads',
      'Micro-screw hinge re-torque with thread seal',
      'Microfiber buffing finish'
    ]
  }
];

export const storeInfo = {
  name: 'Opal Opticals Boutique & Vision Lab',
  tagline: 'See the World in High Definition',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  whatsappDisplay: '+91 98765 43210',
  email: 'concierge@opalopticals.com',
  address: 'Shop 14, Crystal Galleria, MG Road',
  city: 'Bengaluru, India',
  hours: [
    { day: 'Monday – Saturday', time: '10:00 AM – 9:00 PM' },
    { day: 'Sunday', time: '11:00 AM – 8:00 PM' }
  ],
  googleMapsUrl: 'https://maps.google.com/?q=MG+Road+Bengaluru',
  whatsappUrl: 'https://wa.me/919876543210?text=Hello%20Opal%20Opticals,%20I%20would%20like%20to%20enquire%20about%20your%20eyewear%20collections%20and%20services.'
};

export const faqs = [
  {
    q: 'How often should I have an eye examination?',
    a: 'We recommend an annual eye checkup, or every 6 months if you experience headaches, night glare, or spend long hours on screens.'
  },
  {
    q: 'Can I bring my own frame for new lenses?',
    a: 'Yes! Our reglazing service custom-cuts and fits fresh optical lenses into your existing frame with fast 24-hour delivery.'
  },
  {
    q: 'What warranty is provided on frames and lenses?',
    a: 'All frames carry a 1-year manufacturing defect warranty. All premium lens coatings include a 12-month scratch warranty with lifetime free ultrasonic cleaning.'
  }
];
