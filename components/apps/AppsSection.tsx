import { site } from "@/lib/site";
import { RevealHeading } from "../RevealHeading";
import { AppsBento } from "./AppsBento";
import { AppsShelf } from "./AppsShelf";
import { AppsSpotlight } from "./AppsSpotlight";

// The homepage apps section. Pick the design in lib/site.ts (appsLayout).
export function AppsSection() {
  const layout = site.appsLayout;
  return (
    <section id="apps" className={`apps apps--${layout}`} aria-labelledby="apps-title">
      <div className="apps-head">
        <RevealHeading id="apps-title" text="Our apps" />
        <p>Thoughtfully designed for iPhone and Android. Each one does a single job, beautifully.</p>
      </div>
      {layout === "shelf" ? <AppsShelf /> : layout === "spotlight" ? <AppsSpotlight /> : <AppsBento />}
    </section>
  );
}
