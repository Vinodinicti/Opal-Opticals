export const frameCategories = [
  { id: 'all', name: 'All Frames' },
  { id: 'titanium', name: 'Titanium Lightweight' },
  { id: 'eyeglasses', name: 'Prescription Glasses' },
  { id: 'sunglasses', name: 'Polarized Sunglasses' },
  { id: 'acetate', name: 'Vintage Acetate' },
  { id: 'rimless', name: 'Minimalist Rimless' },
];

export const framesData = [
  {
    id: 'opal-aero-titanium',
    name: 'Opal Aero Titanium X1',
    category: 'titanium',
    gender: 'Unisex',
    shape: 'Geometric Titanium',
    material: 'Japanese Beta-Titanium',
    price: 3499,
    weight: '11g (Ultra-Light)',
    dimensions: { lensWidth: 50, bridgeWidth: 19, templeLength: 145 },
    colors: [
      { name: 'Matte Gunmetal', hex: '#374151', image: '/aero-titanium-gunmetal.png' },
      { name: 'Champagne Gold', hex: '#d97706', image: '/aero-titanium-gold.png' },
      { name: 'Brushed Platinum', hex: '#94a3b8', image: '/aero-titanium-platinum.png' }
    ],
    image: '/aero-titanium-gunmetal.png',
    hoverImage: '/aero-titanium-gold.png',
    badge: 'Flagship Edition',
    description: 'Precision engineered from aerospace-grade Japanese beta-titanium. Ultra-flexible temple arms with zero pressure points for all-day focus and ergonomic comfort.',
    features: ['Hypoallergenic medical silicone pads', 'Zero-screw friction hinge', 'Accommodates high prescription index'],
    idealFor: 'Oval, Round, and Heart face shapes.'
  },
  {
    id: 'opal-aero-gold',
    name: 'Opal Aero X1 — Champagne Gold',
    category: 'titanium',
    gender: 'Unisex',
    shape: 'Navigator Aviator',
    material: '18k Champagne Gold Ion-Plated Titanium',
    price: 3999,
    weight: '12g',
    dimensions: { lensWidth: 52, bridgeWidth: 18, templeLength: 145 },
    colors: [
      { name: 'Champagne Gold', hex: '#d97706', image: '/aero-titanium-gold.png' },
      { name: 'Matte Gunmetal', hex: '#374151', image: '/aero-titanium-gunmetal.png' }
    ],
    image: '/aero-titanium-gold.png',
    hoverImage: '/aero-titanium-gunmetal.png',
    badge: 'Gold Edition',
    description: 'Hand-burnished 18k champagne gold titanium with distinctive architectural double brow bridge and sky blue tinted optics.',
    features: ['Micro-milled filigree temple detailing', 'Precision optical sky-blue tint', 'Corrosion-resistant ion finish'],
    idealFor: 'Square, Oval, and Diamond face shapes.'
  },
  {
    id: 'opal-aero-platinum',
    name: 'Opal Aero X1 — Brushed Platinum',
    category: 'titanium',
    gender: 'Men',
    shape: 'Semi-Rimless Browline',
    material: 'Brushed Platinum Beta-Titanium',
    price: 3799,
    weight: '11g',
    dimensions: { lensWidth: 53, bridgeWidth: 18, templeLength: 144 },
    colors: [
      { name: 'Brushed Platinum', hex: '#94a3b8', image: '/aero-titanium-platinum.png' },
      { name: 'Matte Gunmetal', hex: '#374151', image: '/aero-titanium-gunmetal.png' }
    ],
    image: '/aero-titanium-platinum.png',
    hoverImage: '/aero-titanium-gunmetal.png',
    badge: 'Executive',
    description: 'Sculpted semi-rimless silhouette in brushed platinum titanium with diamond-textured temple grips for executive poise.',
    features: ['Half-rim unobstructed downward vision', 'Air-cushion silicone nose pads', 'Precision flex hinge'],
    idealFor: 'Round, Oval, and Oblong face shapes.'
  },
  {
    id: 'opal-lumina-acetate',
    name: 'Lumina Vintage Havana',
    category: 'acetate',
    gender: 'Unisex',
    shape: 'Square Classic',
    material: 'Handcrafted Bio-Acetate',
    price: 2699,
    weight: '24g',
    dimensions: { lensWidth: 52, bridgeWidth: 18, templeLength: 142 },
    colors: [
      { name: 'Tortoise Havana', hex: '#78350f', image: '/lumina-vintage-havana.png' },
      { name: 'Smoky Amber Trio', hex: '#b45309', image: '/lumina-smoky-amber.png' },
      { name: 'Retro Amber Stack', hex: '#a16207', image: '/lumina-retro-stack.png' }
    ],
    image: '/lumina-vintage-havana.png',
    hoverImage: '/lumina-smoky-amber.png',
    gallery: [
      '/lumina-vintage-havana.png',
      '/lumina-smoky-amber.png',
      '/lumina-retro-stack.png'
    ],
    badge: 'Bestseller',
    description: 'A timeless silhouette hand-carved from eco-conscious bio-acetate. Rich multi-tonal light dispersion with 5-barrel German hinges and authentic keyhole bridge.',
    features: ['Polished for 72 hours in organic walnut wood', 'Hand-embedded core wire', 'Bespoke multi-tonal Havana & Amber pattern'],
    idealFor: 'Round, Oval, and Diamond face shapes.'
  },
  {
    id: 'opal-solaris-polarized',
    name: 'Solaris Drift Polarized',
    category: 'sunglasses',
    gender: 'Men',
    shape: 'Navigator Aviator',
    material: 'Monel Metal & Carbon Fiber',
    price: 3299,
    weight: '18g',
    dimensions: { lensWidth: 56, bridgeWidth: 16, templeLength: 140 },
    colors: [
      { name: 'Sky Blue Mirror', hex: '#38bdf8', image: '/solaris-drift-sky-mirror.png' },
      { name: 'Midnight Hydro Polarized', hex: '#0f172a', image: '/solaris-drift-aqua.png' }
    ],
    image: '/solaris-drift-sky-mirror.png',
    hoverImage: '/solaris-drift-aqua.png',
    gallery: [
      '/solaris-drift-sky-mirror.png',
      '/solaris-drift-aqua.png'
    ],
    badge: 'UV400 Polarized',
    description: 'Sculpted for driving, coastal marine exploration, and high-glare defense. Features ventilated aerodynamic side-shields and 9-layer hydrophobic polarized optics.',
    features: ['Hydrophobic oleophobic water-shedding coating', 'Aerodynamic side-shield anti-glare louvers', '100% UVA/UVB 400 glare elimination'],
    idealFor: 'Square, Rectangle, and Oval face shapes.'
  },
  {
    id: 'opal-strata-rimless',
    name: 'Strata Horizon Rimless',
    category: 'rimless',
    gender: 'Unisex',
    shape: 'Geometric Diamond-Cut',
    material: 'Compression Mounted Japanese Titanium',
    price: 3199,
    weight: '9g (Featherweight)',
    dimensions: { lensWidth: 51, bridgeWidth: 19, templeLength: 145 },
    colors: [
      { name: 'Mirror Silver', hex: '#cbd5e1', image: '/strata-rimless-silver.png' },
      { name: 'Champagne Gold', hex: '#d97706', image: '/strata-rimless-gold.png' }
    ],
    image: '/strata-rimless-silver.png',
    hoverImage: '/strata-rimless-gold.png',
    gallery: [
      '/strata-rimless-silver.png',
      '/strata-rimless-gold.png'
    ],
    badge: '9g Featherweight',
    description: 'Practically weightless on the face. Our Strata rimless design features diamond-faceted beveled edges and Japanese compression-mounted titanium temples.',
    features: ['Zero-frame obstruction in field of vision', 'Diamond-polished anti-chipping beveled lens perimeter', 'Compression micro-plug mounting without screw tension'],
    idealFor: 'All face shapes wanting an understated, ultra-luxurious aesthetic.'
  },
  {
    id: 'opal-cyber-screen',
    name: 'ScreenShield Prism 420',
    category: 'eyeglasses',
    gender: 'Unisex',
    shape: 'Round Pantos Ergonomic',
    material: 'TR-90 Memory Polymer & BlueCut Optics',
    price: 1999,
    weight: '14g',
    dimensions: { lensWidth: 48, bridgeWidth: 21, templeLength: 140 },
    colors: [
      { name: 'Cobalt Sapphire', hex: '#1d4ed8', image: '/screenshield-sapphire.png' },
      { name: 'Matte Raven', hex: '#1e293b', image: '/screenshield-raven-desk.jpg' }
    ],
    image: '/screenshield-sapphire.png',
    hoverImage: '/screenshield-raven-desk.jpg',
    gallery: [
      '/screenshield-sapphire.png',
      '/screenshield-raven-desk.jpg'
    ],
    badge: 'Digital Shield',
    description: 'Designed specifically for screen power users. Monomer-infused blue light filtering blocks 415-455nm HEV harmful computer radiation without heavy yellow color distortion.',
    features: ['98% anti-reflective glare-free surface coating', 'Featherweight flexible TR-90 memory frame', 'Alleviates digital eye strain and headache fatigue'],
    idealFor: 'Software developers, gamers, designers, and office professionals.'
  },
  {
    id: 'opal-aurora-cat-eye',
    name: 'Aurora Velvet Cat-Eye',
    category: 'eyeglasses',
    gender: 'Women',
    shape: 'Upswept Cat-Eye',
    material: 'Italian Mazzucchelli Acetate & Polished Gold Temples',
    price: 2799,
    weight: '21g',
    dimensions: { lensWidth: 54, bridgeWidth: 16, templeLength: 142 },
    colors: [
      { name: 'Bordeaux Velvet', hex: '#881337', image: '/aurora-cat-eye-bordeaux.png' },
      { name: 'Blush Marble Tortoise', hex: '#d4a373', image: '/aurora-cat-eye-blush-tortoise.png' }
    ],
    image: '/aurora-cat-eye-bordeaux.png',
    hoverImage: '/aurora-cat-eye-blush-tortoise.png',
    gallery: [
      '/aurora-cat-eye-bordeaux.png',
      '/aurora-cat-eye-blush-tortoise.png'
    ],
    badge: 'Couture Line',
    description: 'An elevated feminine silhouette with subtle jewel-toned gradients that sculpt cheekbone contours. Accented with sleek gold-plated temple arms.',
    features: ['Sculpted ergonomic nose bridge for universal comfort', 'Hand-finished high-gloss bevels', 'Gold-plated end-piece embellishments'],
    idealFor: 'Round, Square, and Oval face contours.'
  }
];
