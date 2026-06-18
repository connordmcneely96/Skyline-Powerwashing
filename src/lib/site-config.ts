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
  desc: string;
  /** "drone" = headline/aerial work; "ground" = supporting ground-crew work. */
  category: "drone" | "ground";
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
}

export const brand = {
  name: "Skyline Exterior Cleaning",
  shortName: "Skyline",
  // TODO(owner): Replace with the real business phone before launch.
  // (555) numbers are intentionally non-working placeholders — do not treat as real.
  phoneDisplay: "(555) 987-6543",
  phoneHref: "tel:5559876543",
  // TODO(owner): Replace with the real, Resend-verified domain + sender mailbox
  // once the domain is live. This is a placeholder address, not a working inbox.
  email: "info@skylineexteriorcleaning.com",
  emailHref: "mailto:info@skylineexteriorcleaning.com",
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
  },
  {
    slug: "drone-roof-cleaning",
    title: "Drone Roof Soft Washing",
    icon: "roof-cleaning",
    desc: "Low-pressure soft washing that lifts algae, moss, and black streaks from steep or multi-story roofs — safely, from above.",
    category: "drone",
  },
  {
    slug: "high-rise-window-cleaning",
    title: "High-Rise Window Cleaning",
    icon: "window-cleaning",
    desc: "Streak-free windows on multi-story buildings, reached by drone up to roughly 150 ft — no ladders or boom lifts.",
    category: "drone",
  },
  {
    slug: "solar-panel-cleaning",
    title: "Solar Panel Cleaning",
    icon: "solar",
    desc: "Restore output with gentle, water-fed cleaning that clears dust and grime without anyone walking the array.",
    category: "drone",
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
  },
  {
    slug: "soft-washing",
    title: "House Soft Washing",
    icon: "soft-washing",
    desc: "Safe cleaning for siding, stucco, brick, and other delicate surfaces.",
    category: "ground",
  },
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    icon: "window-cleaning",
    desc: "Crystal-clear results for ground-level home and storefront windows.",
    category: "ground",
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    icon: "gutter-cleaning",
    desc: "Prevent water damage and clogs with thorough gutter cleaning.",
    category: "ground",
  },
];

/** All services combined — used for the /services/[slug] routes and SEO. */
export const allServices: Service[] = [...droneServices, ...groundServices];

/* ---------------------------------------------------------------------------
 * TRUST + PROOF
 * ------------------------------------------------------------------------- */

// HONESTY: every badge below is verifiable on day one. We do NOT claim an owned
// fleet, years in business, client counts, or "Licensed & Insured" until that is
// confirmed true.
// TODO(owner): Once commercial liability coverage is bound, you may add
// "Fully Insured Operations" here (and to the footer tag + JSON-LD).
export const trustBadges: string[] = [
  "Drone-Powered Cleaning",
  "FAA Part 107 Certified Pilot",
  "No Scaffolding or Lifts",
  "Commercial & Residential",
  "Free Estimates",
];

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

export const beforeAfter: BeforeAfter[] = [
  {
    label: "House Wash",
    before: "/images/ba/house-before.png",
    after: "/images/ba/house-after.png",
  },
  {
    label: "Driveway Cleaning",
    before: "/images/ba/driveway-before.png",
    after: "/images/ba/driveway-after.png",
  },
  {
    label: "Roof Cleaning",
    before: "/images/ba/roof-before.png",
    after: "/images/ba/roof-after.png",
  },
  {
    label: "Commercial Cleaning",
    before: "/images/ba/commercial-before.png",
    after: "/images/ba/commercial-after.png",
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
    title: "Local & Owner-Operated",
    icon: "star",
    desc: "Proudly serving our community with honesty, integrity, and reliable service.",
  },
];

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
