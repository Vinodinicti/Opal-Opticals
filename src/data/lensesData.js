export const lensTypes = [
  {
    id: 'single-vision',
    name: 'Precision Single Vision',
    tagline: 'Crisp focal clarity for distance or reading',
    badge: 'Popular',
    image: '/precision-single-vision.png',
    description: 'Custom-crafted for a single focal field—whether you need clear distance correction for driving or dedicated reading clarity.',
    idealFor: 'Myopia, Hyperopia, and Astigmatism.',
    features: [
      'Digital point-by-point surface surfacing',
      'Minimizes peripheral edge distortion',
      'Anti-Scratch & Anti-Glare coatings included'
    ],
    recommendedIndices: ['1.56', '1.61', '1.67'],
    startingPrice: 999
  },
  {
    id: 'digital-progressive',
    name: 'Opal Freeform HD Progressive',
    tagline: 'Seamless vision across Distance, Intermediate & Near without lines',
    badge: 'Advanced Tech',
    image: '/opal-freeform-progressive.png',
    description: 'Flagship multifocal lens without visible lines. Creates a wide intermediate computer viewing zone and effortless reading comfort.',
    idealFor: 'Presbyopia (age 40+) and multi-screen professionals.',
    features: [
      'No swimming or motion blur sensation',
      '40% wider intermediate computer viewing zone',
      'Fast 24-48 hour patient adaptation rate'
    ],
    recommendedIndices: ['1.61', '1.67', '1.74'],
    startingPrice: 2499
  },
  {
    id: 'blue-shield-pro',
    name: 'ScreenShield™ Blue-Cut Optics',
    tagline: 'Monomer-infused 420nm digital light protection',
    badge: 'Screen Essential',
    image: '/screenshield-blue-cut.png',
    description: 'Fuses blue-absorbing monomers directly into the lens material. Blocks damaging high-energy visible (HEV) blue light from screens and smartphones.',
    idealFor: 'Coders, gamers, remote workers, and students.',
    features: [
      'Filters 90% of harmful 415-455nm HEV blue light',
      'Preserves true-to-life color accuracy',
      'Alleviates digital dry eye and ocular strain'
    ],
    recommendedIndices: ['1.56', '1.60', '1.67'],
    startingPrice: 1499
  },
  {
    id: 'photochromic-transitions',
    name: 'ChromaShift™ Adaptive Lenses',
    tagline: 'Crystal clear indoors, deep sunglasses dark in direct sunlight',
    badge: 'Adaptive',
    description: 'Intelligent light-reactive molecules darken seamlessly under outdoor sunlight while remaining 100% transparent indoors.',
    idealFor: 'Active individuals who want one single pair for both indoors and outdoors.',
    features: [
      'Rapid fade back to clear indoors (under 2 mins)',
      '100% UVA & UVB radiation absorption',
      'Available in Graphite Grey and Amber tints'
    ],
    recommendedIndices: ['1.60', '1.67'],
    startingPrice: 2199
  },
  {
    id: 'polarized-sun',
    name: 'PolarClear™ High-Definition Sun',
    tagline: 'Eliminates blinding horizontal glare with vivid contrast',
    badge: 'Outdoor & Driving',
    description: 'Engineered with a micro-thin polarizing film that filters out intense reflected glare from roads, water bodies, and windshields.',
    idealFor: 'Driving, sports, and bright daylight.',
    features: [
      'Cuts 99.9% of reflective glare',
      'Full UV400 broad-spectrum defense',
      'Enhances vivid contrast'
    ],
    recommendedIndices: ['1.50', '1.60'],
    startingPrice: 1899
  },
  {
    id: 'drivesafe-anti-glare',
    name: 'NightDrive™ Anti-Reflective Optics',
    tagline: 'Cuts blinding oncoming LED headlights and night halo reflections',
    badge: 'Night Vision',
    description: 'Specifically engineered to counter high-intensity LED headlights, reducing annoying halos and starbursts around city lights.',
    idealFor: 'Commuters and nighttime drivers.',
    features: [
      'Up to 64% reduction in perceived headlight glare',
      'Enhanced contrast in rainy conditions',
      'Durable anti-scratch diamond coating'
    ],
    recommendedIndices: ['1.60', '1.67'],
    startingPrice: 1699
  }
];

export const lensIndices = [
  {
    index: '1.50',
    title: 'Standard Optical Index',
    profile: 'Baseline Profile (100%)',
    reduction: 'Standard Profile',
    thickness: 'Base (100%)',
    reductionPercent: 0,
    power: 'Sphere 0.00 to ±2.00',
    abbe: '58 Abbe',
    weight: 'Standard Density',
    idealFor: 'Full-rim acetate frames & mild corrections',
    description: 'Exceptional optical clarity with minimum chromatic dispersion. Highly cost-effective and distortion-free for low prescription powers.',
    position: '19.5%',
  },
  {
    index: '1.56',
    title: 'Mid-Index Slim',
    profile: '15% Thinner & Lighter',
    reduction: '-15% Edge Thickness',
    thickness: '15% Thinner',
    reductionPercent: 15,
    power: 'Sphere ±2.00 to ±3.75',
    abbe: '42 Abbe',
    weight: 'Lightweight',
    idealFor: 'Metal, stainless steel & medium acetate frames',
    description: 'Noticeably slimmer edge profile that prevents peripheral bulging. Balances everyday durability with sleek cosmetic appeal.',
    position: '35.5%',
  },
  {
    index: '1.61',
    title: 'High-Index Lightweight',
    profile: '25% Thinner & Impact-Resistant',
    reduction: '-25% Edge Thickness',
    thickness: '25% Thinner & Lighter',
    reductionPercent: 25,
    power: 'Sphere ±3.75 to ±5.50',
    abbe: '41 Abbe',
    weight: 'Featherweight',
    idealFor: 'Titanium, rimless & semi-rimless frames',
    description: 'Superior tensile strength and shatter resistance. Recommended by clinical optometrists for drilled rimless mounts and active everyday frames.',
    position: '50.8%',
  },
  {
    index: '1.67',
    title: 'Super-Thin Aspheric',
    profile: '35% Thinner & Flatter',
    reduction: '-35% Edge Thickness',
    thickness: '35% Thinner',
    reductionPercent: 35,
    power: 'Sphere ±5.50 to ±8.00',
    abbe: '32 Abbe',
    weight: 'Ultra-Light',
    idealFor: 'High prescriptions & slim architectural frames',
    description: 'Flatter aspheric surface curve eliminates the cosmetic "eye magnification" or "eye shrinking" distortion behind stronger powers.',
    position: '65.2%',
  },
  {
    index: '1.74',
    title: 'Ultra-Thin Maximum Index',
    profile: '50% Thinnest Razor Profile',
    reduction: '-50% Edge Thickness',
    thickness: '50% Thinnest Profile',
    reductionPercent: 50,
    power: 'Sphere ±8.00 and above',
    abbe: '33 Abbe',
    weight: 'Razor Profile',
    idealFor: 'Strong prescriptions & luxury minimal designs',
    description: 'The pinnacle of high-refraction polymer science. Maximally flat and featherweight for pristine, confidence-inspiring daily comfort.',
    position: '79.2%',
  }
];

export const lensCoatings = [
  { name: 'Diamond Anti-Scratch', desc: 'Nano-ceramic particles shield both surfaces against daily abrasions.' },
  { name: 'Super AR (Anti-Reflective)', desc: 'Increases light transmittance to 99.6% for crystal photo clarity.' },
  { name: 'Hydrophobic & Oleophobic', desc: 'Repels water droplets, rainwater, and facial fingerprints.' },
  { name: 'Anti-Static Dust Defense', desc: 'Neutralizes static charge so ambient dust doesn’t stick.' },
  { name: 'Full UV400 Shield', desc: 'Complete absorption of UVA and UVB solar rays.' }
];
