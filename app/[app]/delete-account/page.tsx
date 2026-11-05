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
  return { title: `Delete your ${app.name} account` };
}

// Google Play's "account deletion URL": must work for people who no longer have the app.
export default async function DeleteAccountPage({ params }: Props) {
  const app = getApp((await params).app);
  const { deletion } = app;
  const mail = `mailto:${site.supportEmail}?subject=${encodeURIComponent(`Delete my ${app.name} account`)}`;

  return (
    <div className="page-plain">
      <Header />
      <main id="main" className="legal">
        <Link href="/" className="legal-back">
          {site.name}
        </Link>
        <h1>Delete your {app.name} account</h1>

        <h2>In the app</h2>
        <ol>
          {deletion.inApp.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <h2>By email</h2>
        <p>
          If you no longer have the app, email <a href={mail}>{site.supportEmail}</a> from the address you signed up
          with and ask us to delete your account. {deletion.emailReply}
        </p>

        <h2>What gets deleted</h2>
        <p>{deletion.whatIsDeleted}</p>
        <p>{deletion.timing}</p>

        <p>
          Read the <Link href={`/${app.slug}/privacy`}>privacy policy</Link> or get{" "}
          <Link href={`/${app.slug}/support`}>support</Link>.
        </p>
      </main>
    </div>
  );
}
