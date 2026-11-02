import type { MetadataRoute } from "next";
import { apps, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const appPages = apps.flatMap((app) => [
    { url: `${site.url}/${app.slug}` },
    { url: `${site.url}/${app.slug}/support` },
    { url: `${site.url}/${app.slug}/privacy` },
  ]);
  return [{ url: site.url }, ...appPages];
}
