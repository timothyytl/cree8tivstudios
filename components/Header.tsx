"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { site } from "@/lib/site";
import { Lockup } from "./Logo";

const LINKS = [
  { href: "/#how", label: "what we do" },
  { href: "/#apps", label: "apps" },
  { href: "/#about", label: "about" },
];

// Fixed glass bar that hides while scrolling down. The burger opens a full-screen
// menu that grows out of the burger itself (clip-path from its rect).
export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const lenis = useLenis();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const burgerInset = () => {
      const r = burgerRef.current?.getBoundingClientRect();
      if (!r) return "inset(0px 0px 100% 100%)";
      return `inset(${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px)`;
    };
    if (open) {
      overlay.style.transition = "none";
      overlay.style.clipPath = burgerInset();
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          overlay.style.transition = "";
          overlay.style.clipPath = "inset(0px 0px 0px 0px)";
        }),
      );
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      overlay.querySelector<HTMLElement>(".menu-close")?.focus();
    } else if (wasOpen.current) {
      // Shrink back into the burger, then hide fully so no sliver sits over it.
      overlay.style.clipPath = burgerInset();
      lenis?.start();
      document.documentElement.style.overflow = "";
      const hide = window.setTimeout(() => {
        overlay.style.clipPath = "inset(0px 0px 100% 100%)";
      }, 650);
      wasOpen.current = open;
      return () => window.clearTimeout(hide);
    }
    wasOpen.current = open;
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 0.6) setHidden(false);
      else if (y > last + 2) setHidden(true);
      else if (y < last - 2) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-nav${hidden && !open ? " is-hidden" : ""}`}>
        <Link href="/" className="home-link" aria-label={`${site.name} home`}>
          <Lockup size={28} />
        </Link>
        <button
          ref={burgerRef}
          type="button"
          className="burger"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      {/* Keeps subpage content clear of the fixed bar; the homepage hero hides it. */}
      <div className="site-nav-spacer" aria-hidden />

      <div
        ref={overlayRef}
        id="site-menu"
        className={`menu-overlay${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <button type="button" className="menu-close" onClick={close}>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
            <path d="M2 2l16 16M18 2L2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>Close</span>
        </button>
        <ul className="menu-nav">
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ ["--i" as string]: i }}>
              <Link href={l.href} onClick={close}>
                <b>/</b>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a className="menu-cta" href={`mailto:${site.email}`} onClick={close}>
          <span className="menu-cta-label">Say hello</span>
          <span className="menu-cta-arrow" aria-hidden>
            →
          </span>
        </a>
      </div>
    </>
  );
}
