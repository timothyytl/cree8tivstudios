import Link from "next/link";
import { apps, site } from "@/lib/site";

// Contact call-out, per-app legal links (store review needs these reachable),
// then the wordmark set as wide as the page.
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-hello">
        <h2 className="section-title">
          <b>/</b>say hello.
        </h2>
        <p>Questions, ideas or feedback on an app. We read every email.</p>
        <a className="underline-cta" href={`mailto:${site.email}`}>
          <span className="underline-cta-label">{site.email}</span>
          <span className="underline-cta-arrow" aria-hidden>
            →
          </span>
        </a>
      </div>

      <div className="footer-cols">
        {apps.map((app) => (
          <div key={app.slug}>
            <h3>/{app.name.toLowerCase()}</h3>
            <ul>
              <li>
                <Link href={`/${app.slug}`}>Overview</Link>
              </li>
              <li>
                <Link href={`/${app.slug}/support`}>Support</Link>
              </li>
              <li>
                <Link href={`/${app.slug}/privacy`}>Privacy policy</Link>
              </li>
              <li>
                <Link href={`/${app.slug}/delete-account`}>Delete account</Link>
              </li>
            </ul>
          </div>
        ))}
        <div>
          <h3>/studio</h3>
          <ul>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
            </li>
            <li>{site.location}</li>
          </ul>
        </div>
      </div>

      <p className="footer-wordmark" aria-hidden>
        cree<span>8</span>tiv<b>studios</b>
      </p>

      <div className="footer-bottom">
        <span>
          © {year} {site.legalName}. {site.location}. All rights reserved.
        </span>
        <nav aria-label="Footer">
          <Link href="/#how">what we do</Link>
          <Link href="/#apps">apps</Link>
          <Link href="/#about">about</Link>
          <a href={`mailto:${site.email}`}>say hello</a>
        </nav>
      </div>
    </footer>
  );
}
