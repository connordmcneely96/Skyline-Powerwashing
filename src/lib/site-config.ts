/**
 * Single source of truth for all brand-specific content.
 * To rebrand (name, phone, colors live in globals.css; everything textual here),
 * edit this file only — no component changes needed.
 *
 * POSITIONING: Skyline is a HYBRID exterior cleaning company. Drone-powered
 * cleaning of commercial / multi-story buildings is the headline offer; a
 * traditional ground crew (houses, driveways, flatwork) is the supporting base.
 * Drone leads, ground supports.
 */

export type IconKey =
  | "drone"
  | "building"
  | "roof-cleaning"
  | "window-cleaning"
  | "solar"
  | "pressure-washing"
  | "soft-washing"
  | "gutter-cleaning"
  | "home"
  | "droplets"
  | "shield"
  | "star"
  | "no-lift"
  | "cost"
  | "clock"
  | "safety";

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  title: string;
  icon: IconKey;
  /** One-line summary used on cards. */
  desc: string;
  /** "drone" = headline/aerial work; "ground" = supporting ground-crew work. */
  category: "drone" | "ground";
  /** 2–3 short paragraphs for the /services/[slug] detail page. */
  longBody: string[];
  /** Benefit/outcome bullets shown on the detail page. */
  benefits: string[];
  /** Who this service is for. */
  forWho: string;
  /** Optional process steps. */
  process?: string[];
  /** Optional SEO description override (falls back to `desc`). */
  seoDescription?: string;
}

export interface BeforeAfter {
  label: string;
  before: string;
  after: string;
}

export interface DifferenceItem {
  title: string;
  icon: IconKey;
  desc: string;
  /** Only render when `insured` is true (honesty gate). */
  insuredOnly?: boolean;
}

export const brand = {
  name: "Skyline Exterior Cleaning",
  shortName: "Skyline",
  phoneDisplay: "(405) 479-5794",
  phoneHref: "tel:+14054795794",
  email: "quotes@skylineexteriorcleaning.com",
  emailHref: "mailto:quotes@skylineexteriorcleaning.com",
  city: "Little Rock, AR",
  serving: "Serving Arkansas & Oklahoma",
  // Honest, verifiable tagline — drone work is flown by an FAA Part 107 pilot.
  pilotLine: "Drone-powered cleaning, flown by a certified (FAA Part 107) pilot.",
  social: {
    facebook: "https://facebook.com/",
    google: "https://www.google.com/maps",
  },
} as const;

// Commercial-first ordering: the priority audience is property managers, HOAs,
// hotels, schools, churches, dealerships, and retail.
export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Commercial", href: "/commercial" },
  { label: "Services", href: "/#services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Reviews", href: "/reviews" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ---------------------------------------------------------------------------
 * SERVICES — drone-led, ground-supported
 * ------------------------------------------------------------------------- */

/** Headline offer: aerial cleaning up to ~150 ft, no scaffolding or lifts. */
export const droneServices: Service[] = [
  {
    slug: "commercial-building-wash",
    title: "Building & Facade Washing",
    icon: "building",
    desc: "Clean entire building exteriors and facades from the air — no scaffolding, no lift rental, nobody working at height.",
    category: "drone",
    forWho:
      "Property managers, HOAs, hotels, offices, retail centers, and any multi-story building.",
    longBody: [
      "Dirt, algae, and weathering build up on a building's exterior long before anyone can safely reach it. The traditional fix means scaffolding, boom lifts, road closures, and crews working dozens of feet in the air — slow, disruptive, and expensive. We clean the whole envelope from the air instead.",
      "Our FAA Part 107 certified pilot flies a cleaning drone across your facade up to roughly 150 feet, applying a surface-appropriate, low-pressure rinse for brick, stucco, EIFS, metal panel, precast, or glass. Nobody leaves the ground, so there's far less liability and far less disruption to your tenants and customers.",
      "The result is a uniformly clean building, finished in a fraction of the time it takes to rig the same job by hand — and usually at a lower total cost.",
    ],
    benefits: [
      "No scaffolding, boom lifts, or road closures to schedule and pay for",
      "Nobody working at height — a safer site and less liability for you",
      "Reaches facades up to ~150 ft, including areas unsafe to clean by hand",
      "Surface-appropriate, low-pressure cleaning that protects finishes",
      "Faster turnarounds with minimal disruption to tenants and foot traffic",
    ],
    seoDescription:
      "Drone-powered commercial building and facade washing in Arkansas & Oklahoma — clean your whole building up to ~150 ft with no scaffolding or lifts.",
  },
  {
    slug: "drone-roof-cleaning",
    title: "Drone Roof Soft Washing",
    icon: "roof-cleaning",
    desc: "Low-pressure soft washing that lifts algae, moss, and black streaks from steep or multi-story roofs — safely, from above.",
    category: "drone",
    forWho:
      "Apartment and commercial roofs, plus steep or hard-to-reach residential roofs.",
    longBody: [
      "Those black streaks and green patches on a roof are living organisms — algae, moss, and lichen — that trap moisture and shorten the life of your roofing. Pressure washing a roof can void warranties and tear up shingles or membrane, so soft washing is the right method. Doing it from a ladder on a steep or multi-story roof is the dangerous part.",
      "We soft wash from above. The drone applies a low-pressure, roofing-appropriate treatment that lifts the streaks and kills the growth at the root — with nobody walking a slick, steep, or tall roof. Commercial flat roofs, apartment buildings, and steep residential roofs are all in reach.",
      "You get a clean roof, a longer service life, and no one risking a fall to get it.",
    ],
    benefits: [
      "Low-pressure soft wash that protects shingles, tile, and membranes",
      "Treats algae and moss at the source, not just the surface stain",
      "No one walking a steep, tall, or fragile roof",
      "Helps extend roof life and restore curb appeal",
    ],
    seoDescription:
      "Drone roof soft washing across AR & OK — safely remove algae, moss, and black streaks from steep and multi-story roofs without anyone on the roof.",
  },
  {
    slug: "high-rise-window-cleaning",
    title: "High-Rise Window Cleaning",
    icon: "window-cleaning",
    desc: "Streak-free windows on multi-story buildings, reached by drone up to roughly 150 ft — no ladders or boom lifts.",
    category: "drone",
    forWho: "Office buildings, hotels, apartments, and multi-story storefronts.",
    longBody: [
      "Upper-floor windows are the ones everyone sees and no one cleans — because reaching them usually means a lift, a swing stage, or a ladder you shouldn't be on. We reach them from the air.",
      "Our drone delivers a purified-water clean to windows on multi-story buildings up to roughly 150 feet, drying to a streak-free, spot-free finish without ladders or boom lifts. It's ideal for storefronts, office buildings, hotels, and apartment exteriors where height is the whole problem.",
      "Bright, clear glass at every floor — without the equipment, downtime, or risk.",
    ],
    benefits: [
      "Reaches upper-floor and high-rise glass without lifts or ladders",
      "Purified-water finish dries streak- and spot-free",
      "Less disruption to tenants, entrances, and parking",
      "Safer than at-height window work, with far less setup",
    ],
    seoDescription:
      "Drone high-rise window cleaning in AR & OK — streak-free glass on multi-story buildings up to ~150 ft, no boom lifts or ladders required.",
  },
  {
    slug: "solar-panel-cleaning",
    title: "Solar Panel Cleaning",
    icon: "solar",
    desc: "Restore output with gentle, water-fed cleaning that clears dust and grime without anyone walking the array.",
    category: "drone",
    forWho:
      "Commercial rooftop arrays, solar installations, and home systems that are hard to reach.",
    longBody: [
      "Solar panels lose output as dust, pollen, bird droppings, and grime build up — and the dirtier they get, the less you earn from them. The catch is that walking a roof-mounted array to clean it risks both your safety and the panels.",
      "We clean panels from the air with gentle, water-fed equipment that clears buildup without abrasive scrubbing or anyone stepping on the array. For commercial rooftop and ground-mounted systems alike, drone cleaning restores performance quickly and safely.",
      "Cleaner panels, better production, no roof walking.",
    ],
    benefits: [
      "Helps restore energy production lost to dirt and buildup",
      "Gentle, water-fed cleaning — no abrasive scrubbing on the glass",
      "No one walking the array or the roof",
      "Practical for large commercial and rooftop systems",
    ],
    seoDescription:
      "Drone solar panel cleaning in Arkansas & Oklahoma — gently restore output with water-fed cleaning and no one walking the array.",
  },
];

/** Supporting cash base: houses, driveways, and flatwork by ground crew. */
export const groundServices: Service[] = [
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    icon: "pressure-washing",
    desc: "Driveways, sidewalks, patios, and flatwork brought back to like-new.",
    category: "ground",
    forWho:
      "Homeowners and commercial properties with concrete, pavers, or flatwork.",
    longBody: [
      "Concrete collects everything — tire marks, oil spots, gum, mildew, and years of grime that a garden hose will never touch. Our ground crew uses commercial-grade pressure washing and flat-surface cleaners to bring driveways, sidewalks, patios, and parking areas back to a clean, even finish.",
      "We match the pressure and technique to the surface, so you get a deep clean without etching or damage. From a single driveway to a full retail walkway, it's the fast, visible win that makes a property look cared-for.",
    ],
    benefits: [
      "Removes oil, tire marks, gum, mildew, and ground-in grime",
      "Even, streak-free finish from commercial surface cleaners",
      "Right-sized pressure that won't etch concrete or pavers",
      "Great for driveways, sidewalks, patios, and parking areas",
    ],
    seoDescription:
      "Professional pressure washing in AR & OK — driveways, sidewalks, patios, and parking areas cleaned to an even, like-new finish.",
  },
  {
    slug: "soft-washing",
    title: "House Soft Washing",
    icon: "soft-washing",
    desc: "Safe cleaning for siding, stucco, brick, and other delicate surfaces.",
    category: "ground",
    forWho: "Homeowners and smaller commercial buildings with delicate siding.",
    longBody: [
      "Siding doesn't need high pressure — it needs the right cleaning solution. Blasting vinyl, stucco, or brick with a pressure washer can force water behind the surface and cause real damage. Soft washing uses low pressure and a surface-safe treatment to break down dirt, algae, and mildew, then rinse it all clean.",
      "We soft wash home exteriors — vinyl, stucco, brick, fiber cement, and more — for a bright, even result that lasts longer than a quick power-wash, because it treats the growth at the root instead of just blasting the stain.",
    ],
    benefits: [
      "Low-pressure, surface-safe cleaning for delicate exteriors",
      "Removes algae and mildew at the root for a longer-lasting clean",
      "Safe for vinyl, stucco, brick, and fiber cement",
      "Restores curb appeal without risking water damage",
    ],
    seoDescription:
      "House soft washing in Arkansas & Oklahoma — safe, low-pressure cleaning that lifts algae and mildew from siding, stucco, and brick.",
  },
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    icon: "window-cleaning",
    desc: "Crystal-clear results for ground-level home and storefront windows.",
    category: "ground",
    forWho: "Homes and ground-level storefronts and offices.",
    longBody: [
      "Clean windows change how a whole property feels — brighter rooms at home, a sharper first impression at a storefront. Our crew hand-cleans accessible windows to a streak-free finish, inside and out wherever access allows.",
      "It's the detail customers notice without knowing why. Pair ground-level window cleaning with our drone high-rise service and we cover a multi-story building top to bottom in one visit.",
    ],
    benefits: [
      "Streak-free, hand-detailed finish on accessible glass",
      "Brighter interiors and a sharper storefront impression",
      "Pairs with drone service for full multi-story coverage",
      "Available for homes and ground-level commercial",
    ],
    seoDescription:
      "Window cleaning in AR & OK — streak-free, hand-detailed results for homes and ground-level storefronts, with drone service for high glass.",
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    icon: "gutter-cleaning",
    desc: "Prevent water damage and clogs with thorough gutter cleaning.",
    category: "ground",
    forWho: "Homeowners and property managers protecting against water damage.",
    longBody: [
      "Clogged gutters are a slow-motion problem: water backs up, overflows, and ends up in your fascia, foundation, and landscaping. Our crew clears troughs and downspouts of leaves, grit, and debris so water goes where it's supposed to.",
      "We haul the debris away and check that everything flows freely — simple, seasonal upkeep that helps you avoid the far more expensive water damage clogged gutters cause.",
    ],
    benefits: [
      "Clears troughs and downspouts so water drains properly",
      "Helps prevent fascia, foundation, and landscape water damage",
      "Debris hauled away — we don't leave a mess behind",
      "Seasonal upkeep that protects the rest of the property",
    ],
    seoDescription:
      "Gutter cleaning in Arkansas & Oklahoma — clear troughs and downspouts to prevent overflow and costly water damage.",
  },
];

/** All services combined — used for the /services/[slug] routes and SEO. */
export const allServices: Service[] = [...droneServices, ...groundServices];

/* ---------------------------------------------------------------------------
 * TRUST + PROOF
 * ------------------------------------------------------------------------- */

// HONESTY INSURANCE GATE.
// TODO(owner): set to true ONLY once commercial liability coverage is actually bound.
// Connor confirmed coverage is being obtained. When false, "Licensed & Insured"
// is hidden everywhere; when true, it shows in the trust bar, difference section,
// footer tag, and JSON-LD. Do not display this claim before the policy is active.
export const insured = false;

export const INSURED_BADGE = "Licensed & Insured";
/** Verifiable, always-true signal used in place of the insurance claim. */
export const CERTIFIED_PILOT_BADGE = "FAA Part 107 Certified Pilot";

// Trust bar items mirror the reference mockup. "Licensed & Insured" is gated:
// when `insured` is false it's swapped for the certified-pilot signal so the bar
// stays balanced at five items. Resolve via `resolveTrustBadges()`.
export const trustBadges: string[] = [
  INSURED_BADGE,
  "Free Estimates",
  "Commercial & Residential",
  "Professional Equipment",
  "Satisfaction Guaranteed",
];

/** Returns the trust badges with the insurance claim honesty-gated. */
export function resolveTrustBadges(): string[] {
  return trustBadges.map((b) =>
    b === INSURED_BADGE && !insured ? CERTIFIED_PILOT_BADGE : b
  );
}

// Why drone-powered commercial cleaning wins — the grand-slam value prop.
export const commercialValue: DifferenceItem[] = [
  {
    title: "Nobody Working at Height",
    icon: "safety",
    desc: "Cleaning is done from the air, so there's no one on ladders, scaffolding, or lifts — a safer job site and less liability for you.",
  },
  {
    title: "No Scaffolding or Lift Rental",
    icon: "no-lift",
    desc: "Skip the cost, permits, and scheduling of boom lifts and scaffolding. The drone reaches what they would — without the setup.",
  },
  {
    title: "Faster Turnarounds",
    icon: "clock",
    desc: "Less rigging and teardown means we cover large facades quickly, with minimal disruption to tenants and customers.",
  },
  {
    title: "Lower Total Cost",
    icon: "cost",
    desc: "Removing equipment rental and reducing labor hours typically makes aerial cleaning more cost-effective on multi-story work.",
  },
  {
    title: "Reaches Up to ~150 ft",
    icon: "drone",
    desc: "Facades, roofs, high windows, and solar arrays that are hard or unsafe to reach by hand are all in range from above.",
  },
  {
    title: "Flown by a Certified Pilot",
    icon: "shield",
    desc: "Every flight is operated by an FAA Part 107 certified remote pilot, following airspace and safety regulations.",
  },
];

// Who commercial work is for (the primary audience).
export const commercialAudience: string[] = [
  "Property Managers",
  "HOAs & Apartments",
  "Hotels & Hospitality",
  "Schools & Churches",
  "Auto Dealerships",
  "Retail & Storefronts",
];

export interface ProcessStep {
  title: string;
  desc: string;
}

// "How it works" for the commercial page — set expectations simply and honestly.
export const commercialSteps: ProcessStep[] = [
  {
    title: "Assessment",
    desc: "Tell us about your property and we'll review the building, surfaces, and access — on-site or from the details you share.",
  },
  {
    title: "Clear Quote",
    desc: "You get a straightforward, itemized quote with no scaffolding or lift-rental line items to inflate it.",
  },
  {
    title: "Drone Clean",
    desc: "Our FAA Part 107 pilot cleans the facade, roof, windows, or solar from the air — fast, with minimal disruption.",
  },
  {
    title: "Walkthrough",
    desc: "We confirm the results with you and make sure the property is left clean and tidy. Done.",
  },
];

export const beforeAfter: BeforeAfter[] = [
  {
    label: "House Wash",
    before: "/images/ba/house-before.jpg",
    after: "/images/ba/house-after.jpg",
  },
  {
    label: "Driveway Cleaning",
    before: "/images/ba/driveway-before.jpg",
    after: "/images/ba/driveway-after.jpg",
  },
  {
    label: "Roof Cleaning",
    before: "/images/ba/roof-before.jpg",
    after: "/images/ba/roof-after.jpg",
  },
  {
    label: "Commercial Cleaning",
    before: "/images/ba/commercial-before.jpg",
    after: "/images/ba/commercial-after.jpg",
  },
];

// The hybrid advantage, drone foreground.
export const difference: DifferenceItem[] = [
  {
    title: "Drone-Powered Reach",
    icon: "drone",
    desc: "Clean facades, roofs, and high windows up to ~150 ft — no scaffolding or lifts required.",
  },
  {
    title: "Commercial Specialists",
    icon: "building",
    desc: "Buildings of all sizes handled with minimal disruption to your business or tenants.",
  },
  {
    title: "Hybrid Ground Crew",
    icon: "home",
    desc: "A traditional crew handles houses, driveways, and flatwork the drone doesn't need to.",
  },
  {
    title: "Soft Wash Systems",
    icon: "droplets",
    desc: "Low-pressure, surface-safe cleaning that delivers powerful results without damage.",
  },
  {
    title: "Certified Drone Pilot",
    icon: "shield",
    desc: "Aerial work is flown by an FAA Part 107 certified remote pilot, by the book.",
  },
  {
    // Honesty-gated: only rendered when `insured` is true.
    title: "Licensed & Insured",
    icon: "safety",
    desc: "Fully insured commercial operations for your peace of mind and protection.",
    insuredOnly: true,
  },
  {
    title: "Local & Owner-Operated",
    icon: "star",
    desc: "Proudly serving our community with honesty, integrity, and reliable service.",
  },
];

/** Difference items with the insurance claim honesty-gated out when not insured. */
export function resolveDifference(): DifferenceItem[] {
  return difference.filter((d) => !d.insuredOnly || insured);
}

export const serviceAreas = {
  AR: ["Little Rock", "North Little Rock", "Benton", "Conway", "Bryant"],
  OK: ["Oklahoma City", "Edmond", "Moore", "Norman"],
  note: "And Surrounding Areas",
} as const;

export const quickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Commercial", href: "/commercial" },
  { label: "Services", href: "/#services" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const copyrightYear = 2026;

export const siteConfig = {
  brand,
  nav,
  droneServices,
  groundServices,
  allServices,
  trustBadges,
  beforeAfter,
  difference,
  serviceAreas,
  quickLinks,
  copyrightYear,
};

export type SiteConfig = typeof siteConfig;
