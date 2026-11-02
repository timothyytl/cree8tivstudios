import type { Metadata } from "next";
import Link from "next/link";
import { DeviceStory } from "@/components/DeviceStory";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { appParams, getApp } from "@/lib/getApp";
import { site } from "@/lib/site";

type Props = { params: Promise<{ app: string }> };

export const dynamicParams = false;
export const generateStaticParams = appParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).app);
  return { title: app.name, description: app.summary };
}

// Each app's landing page. It uses the app's own accent colour; the studio
// chrome (header, footer) stays neutral.
export default async function AppPage({ params }: Props) {
  const app = getApp((await params).app);
  const waitlistHref = `mailto:${site.email}?subject=${encodeURIComponent(`${app.name} waitlist`)}`;

  return (
    <>
      <Header />
      <main id="main" style={{ ["--app-accent" as string]: app.accent, ["--app-soft" as string]: app.accentSoft }}>
        <section className="app-hero">
          {/* Placeholder icon: replace with the real app icon once designed. */}
          <div className="app-icon" aria-hidden>
            {app.name.charAt(0)}
          </div>
          <p className="app-status">{app.status}</p>
          <h1>{app.name}</h1>
          <p className="app-tagline">{app.tagline}</p>
          <p className="app-summary">{app.summary}</p>
          <div className="app-actions">
            {app.appStoreUrl && (
              <a className="button button--app" href={app.appStoreUrl}>
                Download on the App Store
              </a>
            )}
            {app.playStoreUrl && (
              <a className="button button--app" href={app.playStoreUrl}>
                Get it on Google Play
              </a>
            )}
            {app.waitlist && !app.appStoreUrl && !app.playStoreUrl && (
              <a className="button button--app" href={waitlistHref}>
                Join the waitlist
              </a>
            )}
            <Link className="button button--ghost" href={`/${app.slug}/support`}>
              Support
            </Link>
          </div>
          <p className="app-platforms">
            {app.appStoreUrl || app.playStoreUrl ? "Available on" : "Coming to"} {app.platforms.join(" and ")}
          </p>
        </section>

        <DeviceStory app={app} />

        <section className="app-more">
          <div>
            <h2>Questions about {app.name}?</h2>
            <p>Read the common questions, or email us directly.</p>
          </div>
          <div className="app-more-links">
            <Link href={`/${app.slug}/support`}>Support and FAQ</Link>
            <Link href={`/${app.slug}/privacy`}>Privacy policy</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
