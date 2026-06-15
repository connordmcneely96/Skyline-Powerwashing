/**
 * Single source of truth for all brand-specific content.
 * To rebrand (name, phone, colors live in globals.css; everything textual here),
 * edit this file only — no component changes needed.
 */

export type IconKey =
  | "pressure-washing"
  | "soft-washing"
  | "roof-cleaning"
  | "window-cleaning"
  | "gutter-cleaning"
  | "drone"
  | "building"
  | "home"
  | "droplets"
  | "shield"
  | "star";

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  title: string;
  icon: IconKey;
  desc: string;
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
  phoneDisplay: "(555) 987-6543",
  phoneHref: "tel:5559876543",
  email: "info@skylineexteriorcleaning.com",
  emailHref: "mailto:info@skylineexteriorcleaning.com",
  city: "Little Rock, AR",
  serving: "Serving Arkansas & Oklahoma",
  social: {
    facebook: "https://facebook.com/",
    google: "https://www.google.com/maps",
  },
} as const;

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Commercial", href: "/commercial" },
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact", href: "/contact" },
];

export const services: Service[] = [
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    icon: "pressure-washing",
    desc: "Driveways, sidewalks, parking lots, storefronts and more.",
  },
  {
    slug: "soft-washing",
    title: "Soft Washing",
    icon: "soft-washing",
    desc: "Safe cleaning for siding, stucco, brick, and other delicate surfaces.",
  },
  {
    slug: "roof-cleaning",
    title: "Roof Cleaning",
    icon: "roof-cleaning",
    desc: "Remove black streaks, algae, and moss and extend the life of your roof.",
  },
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    icon: "window-cleaning",
    desc: "Crystal clear results for residential and commercial windows.",
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    icon: "gutter-cleaning",
    desc: "Prevent water damage and clogs with our thorough gutter cleaning.",
  },
];

export const trustBadges: string[] = [
  "Licensed & Insured",
  "Free Estimates",
  "Commercial & Residential",
  "Professional Equipment",
  "Satisfaction Guaranteed",
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

export const difference: DifferenceItem[] = [
  {
    title: "Drone Property Inspections",
    icon: "drone",
    desc: "Advanced drone technology for safer, more accurate property assessments.",
  },
  {
    title: "Commercial Property Specialists",
    icon: "building",
    desc: "We handle buildings of all sizes with minimal disruption to your business.",
  },
  {
    title: "Residential Experts",
    icon: "home",
    desc: "We treat your home like our own with care and attention to detail.",
  },
  {
    title: "Professional Soft Wash Systems",
    icon: "droplets",
    desc: "Safe, low-pressure cleaning that delivers powerful results.",
  },
  {
    title: "Fully Licensed & Insured",
    icon: "shield",
    desc: "Your property is protected with full insurance and professional coverage.",
  },
  {
    title: "Local & Family Owned",
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
  { label: "Services", href: "/#services" },
  { label: "Commercial", href: "/commercial" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const copyrightYear = 2024;

export const siteConfig = {
  brand,
  nav,
  services,
  trustBadges,
  beforeAfter,
  difference,
  serviceAreas,
  quickLinks,
  copyrightYear,
};

export type SiteConfig = typeof siteConfig;
