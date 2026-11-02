import Link from "next/link";
import { site } from "@/lib/site";
import { Lockup } from "./Logo";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="home-link" aria-label={`${site.name} home`}>
          <Lockup />
        </Link>
        <nav aria-label="Main">
          <Link href="/#apps">Apps</Link>
          <Link href="/#how">How I work</Link>
          <Link href="/#contact" className="nav-cta">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
