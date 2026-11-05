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
  return { title: `${app.name} privacy policy` };
}

// Not legal advice. Keep each app's entry in lib/site.ts in step with what the app
// and its SDKs actually collect, and the PDPA (Malaysia) or other laws that apply.
export default async function PrivacyPage({ params }: Props) {
  const app = getApp((await params).app);
  const { privacy } = app;

  return (
    <div className="page-plain">
      <Header />
      <main id="main" className="legal">
        <Link href="/" className="legal-back">
          {site.name}
        </Link>
        <h1>{app.name} privacy policy</h1>
        <p className="legal-meta">Last updated {privacy.lastUpdated}</p>

        <p>
          This policy explains what information {app.name} (&ldquo;the app&rdquo;), made by {site.legalName}{" "}
          (&ldquo;we&rdquo;), collects, why, and the choices you have. If you have questions, email{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
        {privacy.summary && <p>{privacy.summary}</p>}

        <h2>What we collect and why</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Information</th>
              <th scope="col">Why we use it</th>
            </tr>
          </thead>
          <tbody>
            {privacy.collected.map((row) => (
              <tr key={row.what}>
                <td>{row.what}</td>
                <td>{row.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: "1em" }}>
          We don&rsquo;t sell your information, and we don&rsquo;t use it for advertising.
        </p>
        {privacy.notCollected && <p>{privacy.notCollected}</p>}

        <h2>Services we use</h2>
        <p>These providers process data on our behalf, only for the purposes listed:</p>
        <ul>
          {privacy.thirdParties.map((t) => (
            <li key={t.name}>
              <strong>{t.name}</strong>: {t.purpose}
            </li>
          ))}
        </ul>
        {privacy.extra?.map((para) => (
          <p key={para}>{para}</p>
        ))}

        <h2>How long we keep it</h2>
        <p>{privacy.storage}</p>

        <h2>Deleting your data</h2>
        <p>
          You can delete your account and its data from Settings in the app, or by emailing{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> from the address on your account. See the{" "}
          <Link href={`/${app.slug}/delete-account`}>account deletion steps</Link>.
        </p>

        <h2>Children</h2>
        <p>{app.name} is not directed at children under 13, and we don&rsquo;t knowingly collect their information.</p>

        <h2>Changes to this policy</h2>
        <p>
          If we change this policy, we&rsquo;ll update the date at the top. For significant changes, we&rsquo;ll also
          tell you in the app.
        </p>

        <h2>Contact</h2>
        <p>
          {site.legalName}, {site.location}.{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
        </p>
      </main>
    </div>
  );
}
