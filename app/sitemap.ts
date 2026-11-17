import type { MetadataRoute } from "next";
import { CASES } from "@/lib/work";

const BASE = "https://pishondigital.com"; // TODO [CONFIRM]: final domain

/** Tells Google which pages exist. Placeholder case studies are left out until they're real. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", priority: 1 },
    { path: "/contact", priority: 0.9 },
    { path: "/websites", priority: 0.9 },
    { path: "/ai-assistants", priority: 0.9 },
    { path: "/work", priority: 0.7 },
    { path: "/about", priority: 0.6 },
  ];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p.path}`, lastModified: now, changeFrequency: "monthly" as const, priority: p.priority })),
    ...CASES.filter((c) => !c.placeholder).map((c) => ({ url: `${BASE}/work/${c.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
