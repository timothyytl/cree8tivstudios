import { notFound } from "next/navigation";
import { apps } from "./site";

export function getApp(slug: string) {
  const app = apps.find((a) => a.slug === slug);
  if (!app) notFound();
  return app;
}

export function appParams() {
  return apps.map((a) => ({ app: a.slug }));
}
