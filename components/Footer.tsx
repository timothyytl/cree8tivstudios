import Link from "next/link";
import { apps, site } from "@/lib/site";

// Deterministic star field (same on server and client, so no hydration noise).
function makeStars(count: number) {
  let seed = 11;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 75,
    size: rand() < 0.85 ? 2 : 3,
    opacity: 0.3 + rand() * 0.6,
  }));
}

const stars = makeStars(70);

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="site-footer">
      <div className="stars" aria-hidden>
        {stars.map((s, i) => (
          <span
            key={i}
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity }}
          />
        ))}
      </div>

      <div className="footer-inner">
        <h2 className="footer-title">Say hello.</h2>
        <a className="footer-email" href={`mailto:${site.email}`}>
          {site.email}
        </a>

        <div className="footer-cols">
          {apps.map((app) => (
            <div key={app.slug}>
              <h3>{app.name}</h3>
              <ul>
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
          © {year} {site.legalName}. App Store is a trademark of Apple Inc. Google Play is a trademark of Google LLC.
        </p>
      </div>
    </footer>
  );
}
