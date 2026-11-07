"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { apps, site } from "@/lib/site";
import { MiniPhone } from "../apps/MiniPhone";
import { Mark } from "../Logo";

type Preview = "email" | "support" | `app:${string}`;

// "/behind the work." Pinned briefly as you scroll past. On mouse devices, hovering
// a link shows a small preview card that follows the cursor.
export function About() {
  const [active, setActive] = useState<Preview | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const canHover = useRef(false);

  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const hover = (key: Preview) => ({
    onPointerEnter: () => canHover.current && setActive(key),
    onPointerLeave: () => setActive(null),
    onPointerMove: (e: React.PointerEvent) => {
      const el = previewRef.current;
      if (el) el.style.translate = `${e.clientX + 24}px ${e.clientY - 90}px`;
    },
  });

  return (
    <div className="about-pin">
      <section id="about" className="about" aria-labelledby="about-title">
        <div className="about-art" aria-hidden>
          <Mark size="62%" c="#ffffff" eight="var(--accent)" />
        </div>
        <div className="about-copy">
          <h2 id="about-title" className="section-title">
            <b>/</b>behind the work.
          </h2>
          {site.about.paragraphs.map((p) => (
            <p key={p} className="about-intro">
              {p}
            </p>
          ))}
          <ul className="about-links">
            <li>
              <a className="about-link" href={`mailto:${site.email}`} {...hover("email")}>
                <span className="about-link-tag">email</span>
                <span className="about-link-label">{site.email}</span>
                <span className="about-link-arrow" aria-hidden>
                  ↗
                </span>
              </a>
            </li>
            <li>
              <a className="about-link" href={`mailto:${site.supportEmail}`} {...hover("support")}>
                <span className="about-link-tag">support</span>
                <span className="about-link-label">{site.supportEmail}</span>
                <span className="about-link-arrow" aria-hidden>
                  ↗
                </span>
              </a>
            </li>
            {apps.map((app) => (
              <li key={app.slug}>
                <Link className="about-link" href={`/${app.slug}`} {...hover(`app:${app.slug}`)}>
                  <span className="about-link-tag">app</span>
                  <span className="about-link-label">{app.name}</span>
                  <span className="about-link-arrow" aria-hidden>
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div ref={previewRef} className={`link-preview${active ? " is-visible" : ""}`} aria-hidden>
        <div className={`link-preview-card${active === "email" ? " on" : ""}`}>
          <Mark size={56} c="#ffffff" eight="var(--accent)" />
          <span>/say hello.</span>
        </div>
        <div className={`link-preview-card link-preview-card--soft${active === "support" ? " on" : ""}`}>
          <span className="link-preview-big">?</span>
          <span>/support for every app.</span>
        </div>
        {apps.map((app) => (
          <div
            key={app.slug}
            className={`link-preview-card link-preview-card--app${active === `app:${app.slug}` ? " on" : ""}`}
            style={{ ["--app-soft" as string]: app.accentSoft, ["--app-accent" as string]: app.accent }}
          >
            <MiniPhone screen={app.story[0]?.screen ?? "tasks"} className="link-preview-phone" />
          </div>
        ))}
      </div>
    </div>
  );
}
