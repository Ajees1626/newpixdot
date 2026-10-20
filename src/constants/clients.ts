export type LogoPattern =
  | "orbit"
  | "mesh"
  | "beam"
  | "nodes"
  | "arc"
  | "prism"
  | "wave"
  | "frame"
  | "pulse"
  | "grid"
  | "stripe"
  | "hex";

export interface ClientBrand {
  id: string;
  name: string;
  initials: string;
  pattern: LogoPattern;
  gradient: string;
  /** Real client logo image (Cloudinary). When set, UI renders the image. */
  logo?: string;
}

const PATTERNS: LogoPattern[] = [
  "orbit",
  "mesh",
  "beam",
  "nodes",
  "arc",
  "prism",
  "wave",
  "frame",
  "pulse",
  "grid",
  "stripe",
  "hex",
];

const GRADIENTS = [
  "from-indigo-500 to-violet-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-500",
  "from-sky-400 to-blue-600",
  "from-lime-400 to-green-600",
  "from-rose-400 to-pink-600",
  "from-stone-400 to-emerald-700",
  "from-cyan-400 to-indigo-600",
  "from-yellow-400 to-amber-600",
  "from-fuchsia-400 to-purple-600",
  "from-red-400 to-orange-600",
  "from-blue-400 to-slate-600",
] as const;

type ClientLogoEntry = {
  logo: string;
  name?: string;
  initials?: string;
};

/** Featured / newly added partner logos (named). */
const FEATURED_CLIENT_LOGOS: ClientLogoEntry[] = [
  {
    name: "Trueself Counselling",
    initials: "TS",
    logo: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1792216854/126ad8ca-d7e7-482c-b811-2e05e7dc5078.png",
  },
  {
    name: "Bari Livespace",
    initials: "BL",
    logo: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1792216464/LOGOS-01.jpg_drmfoy.jpg",
  },
  {
    name: "Agam Kudil",
    initials: "AK",
    logo: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1792216457/LOGOS-02.jpg_fowmtb.jpg",
  },
  {
    name: "Cold Point",
    initials: "CP",
    logo: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1792216454/LOGOS-03.jpg_tjqrmy.jpg",
  },
  {
    name: "Ambika Family Shopping",
    initials: "AF",
    logo: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1791024584/WhatsApp_Image_2026-10-03_at_1.55.29_PM_fa0bef.jpg",
  },
  {
    name: "Apollo Dental",
    initials: "AD",
    logo: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308729/CLIENT_NAMES-01_result_wwaibo.webp",
  },
  {
    name: "2nd Innings",
    initials: "2I",
    logo: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308729/CLIENT_NAMES-02_result_cd7bcv.webp",
  },
  {
    name: "Bright Opticals",
    initials: "BO",
    logo: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308729/CLIENT_NAMES-09_result_jlywyw.webp",
  },
  {
    name: "Treasure iLand International School",
    initials: "TI",
    logo: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308729/CLIENT_NAMES-12_result_jgoyea.webp",
  },
  {
    name: "Petra Steel Door",
    initials: "PS",
    logo: "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308728/CLIENT_NAMES-03_result_hhwqax.webp",
  },
];

/** Remaining partner logos from the Pixdot client roster. */
const LEGACY_CLIENT_LOGO_URLS = [
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710267/clients_names-01_nvscg2.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710267/clients_names-02_nby2jc.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710267/clients_names-03_op6wvc.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710268/clients_names-04_jchrau.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710267/clients_names-05_ozwf0w.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710267/clients_names-06_gbbn9w.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710268/clients_names-07_h3i3p4.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710269/clients_names-08_zwas4e.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710268/clients_names-09_gup9fr.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710268/clients_names-10_sxcg4u.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710269/clients_names-11_ztxad7.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710269/clients_names-12_gk5yqc.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710269/clients_names-13_k2iehb.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710269/clients_names-14_pybaa7.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710271/clients_names-15_brmmt3.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710269/clients_names-16_gax0br.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710270/clients_names-17_himezc.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710270/clients_names-18_wwxr9w.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710270/clients_names-19_lewai6.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710271/clients_names-20_ouc3pk.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710270/clients_names-21_lqj37s.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710271/clients_names-22_nre2g9.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710271/clients_names-23_gt2xuu.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710297/clients_names-24_svmhvo.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710297/clients_names-25_ezgs5z.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710297/clients_names-26_luz5cv.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710296/clients_names-27_tqdk7j.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710297/clients_names-28_gpcxqu.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710297/clients_names-29_kyxfsj.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1756710298/clients_names-30_afbcs5.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308730/CLIENT_NAMES-07_result_mxa6xh.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308730/CLIENT_NAMES-05_result_gmkqct.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308730/CLIENT_NAMES-06_result_zf4jxw.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308730/CLIENT_NAMES-11_result_qixzjm.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308730/CLIENT_NAMES-04_result_hzkydc.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308729/CLIENT_NAMES-10_result_x2qu3x.webp",
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1773308728/CLIENT_NAMES-08_result_awj5wi.webp",
] as const;

const featuredLogoSet = new Set(FEATURED_CLIENT_LOGOS.map((e) => e.logo));

const CLIENT_LOGO_ENTRIES: ClientLogoEntry[] = [
  ...FEATURED_CLIENT_LOGOS,
  ...LEGACY_CLIENT_LOGO_URLS.filter((url) => !featuredLogoSet.has(url)).map((logo) => ({ logo })),
];

function initialsFromName(name: string, fallback: number): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts.length === 1 && parts[0].length >= 2) return parts[0].slice(0, 2).toUpperCase();
  return String(fallback).padStart(2, "0");
}

export const CLIENT_BRANDS: ClientBrand[] = CLIENT_LOGO_ENTRIES.map((entry, i) => {
  const n = i + 1;
  const name = entry.name ?? `Client Brand ${n}`;
  return {
    id: `client-${String(n).padStart(2, "0")}`,
    name,
    initials: entry.initials ?? initialsFromName(name, n),
    pattern: PATTERNS[i % PATTERNS.length],
    gradient: GRADIENTS[i % GRADIENTS.length],
    logo: entry.logo,
  };
});

/** Total partner count shown in marketing copy. */
export const CLIENT_PARTNER_COUNT = 150;

/** @deprecated Use CLIENT_BRANDS — kept for legacy imports */
export const CLIENTS = CLIENT_BRANDS.map((c) => c.name);
