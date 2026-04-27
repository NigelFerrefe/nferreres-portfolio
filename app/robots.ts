import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nferrefe.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/es/admin",
        "/en/admin",
        "/es/auth",
        "/en/auth",
        "/admin",
        "/auth",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}