import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { appParams, getApp } from "@/lib/getApp";
import { site } from "@/lib/site";

type Props = { params: Promise<{ app: string }> };

export const dynamicParams = false;
export const generateStaticParams = appParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getApp((await params).app);
  return { title: `${app.name} support` };
}

// Use this page as the Support URL in App Store Connect. Google Play's account
// deletion field takes /<slug>/delete-account.
export default async function SupportPage({ params }: Props) {
  const app = getApp((await params).app);
  const mail = `mailto:${site.supportEmail}?subject=${encodeURIComponent(`${app.name} support`)}`;

  return (
    <div className="page-plain">
      <Header />
      <main id="main" className="legal">
        <Link href="/" className="legal-back">
          {site.name}
        </Link>
        <h1>{app.name} support</h1>
        <p className="legal-meta">Usually answered within two working days.</p>

        <p>
          Found a bug, have an idea or need help with your account? Email us and include your phone model and the app
          version from Settings. You can also send feedback from the app: Settings, then Send feedback.
        </p>
        <a className="button" href={mail}>
          Email support
        </a>

        <h2>Common questions</h2>
        <div className="faq">
          {app.faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>

        <h2 id="delete-account">Delete your account</h2>
        <p>
          You can delete your {app.name} account and all of its data at any time, in the app or by email.{" "}
          <Link href={`/${app.slug}/delete-account`}>See how to delete your account</Link>. Read the{" "}
          <Link href={`/${app.slug}/privacy`}>privacy policy</Link> for details.
        </p>
      </main>
    </div>
  );
}
