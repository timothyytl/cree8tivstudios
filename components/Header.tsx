import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label={`${site.name} home`}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
          <path d="M5 16a7 7 0 0 1 14 0z" fill="#F5B01E" />
          <rect x="2" y="17" width="20" height="2" rx="1" fill="currentColor" />
        </svg>
        <span>{site.name}</span>
      </Link>
      <nav aria-label="Main">
        <a href="/#apps">Apps</a>
        <a href="/#contact">Contact</a>
      </nav>
    </header>
  );
}
