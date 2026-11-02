import Link from "next/link";
import { apps, site } from "@/lib/site";
import { Mark } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-hello">
            <h2>Say hello.</h2>
            <p>Questions, ideas or feedback on an app. We read every email.</p>
            <a className="footer-email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <Mark size={120} c="var(--footer-ink)" eight="var(--accent)" className="footer-mark" />
        </div>

        <div className="footer-cols">
          {apps.map((app) => (
            <div key={app.slug}>
              <h3>{app.name}</h3>
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
              </ul>
            </div>
          ))}
          <div>
            <h3>Studio</h3>
            <ul>
              <li>
                <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>
        </div>

        <p className="footer-legal">
          © {year} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
