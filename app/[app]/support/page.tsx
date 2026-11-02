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

// Use this page as the Support URL in App Store Connect, and the
// "Delete account" section's URL for Google Play's account deletion field.
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
          version from Settings.
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
        <p>You can delete your {app.name} account and all of its data at any time.</p>
        <ul>
          <li>
            <strong>In the app:</strong> open Settings, tap Account, then Delete account.
          </li>
          <li>
            <strong>By email:</strong> write to <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> from
            the address on your account with the subject &ldquo;Delete my account&rdquo;.
          </li>
        </ul>
        <p>
          Your synced data is removed from our servers within 30 days. Data stored only on your device is removed when
          you delete the app. Read the <Link href={`/${app.slug}/privacy`}>privacy policy</Link> for details.
        </p>
      </main>
    </div>
  );
}
