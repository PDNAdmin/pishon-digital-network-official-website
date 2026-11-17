import type { MetadataRoute } from "next";

/** Search engines may crawl everything except the form endpoint. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: "https://pishondigital.com/sitemap.xml", // TODO [CONFIRM]: final domain
  };
}
