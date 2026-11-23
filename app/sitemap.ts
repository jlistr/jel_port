import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

const paths = ["", "/portfolio", "/about", "/services", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.6,
  }));
}
