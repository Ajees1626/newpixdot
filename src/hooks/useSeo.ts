import { useEffect } from "react";
import { SITE } from "@/constants/site";

interface SeoOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Updates document title + core meta tags for SPA route changes. */
export function useSeo({
  title,
  description = SITE.description,
  path = "",
  image = "/og-image.jpg",
  noIndex = false,
}: SeoOptions) {
  useEffect(() => {
    const fullTitle = title.includes(SITE.name) ? title : `${title} — ${SITE.name}`;
    const url = `${SITE.url}${path}`;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE.name);
    setMeta("property", "og:locale", "en_US");
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image.startsWith("http") ? image : `${SITE.url}${image}`);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image.startsWith("http") ? image : `${SITE.url}${image}`);
    setLink("canonical", url);
  }, [title, description, path, image, noIndex]);
}
