import { site } from "@/lib/site";
import { AppsBento } from "./AppsBento";
import { AppsShelf } from "./AppsShelf";
import { AppsSpotlight } from "./AppsSpotlight";

// The homepage apps section. Pick the design in lib/site.ts (appsLayout).
export function AppsSection() {
  const layout = site.appsLayout;
  return (
    <section id="apps" className={`apps apps--${layout}`} aria-labelledby="apps-title">
      <div className="apps-head">
        <h2 id="apps-title">Our apps</h2>
        <p>Thoughtfully designed for iPhone and Android. Each one does a single job, beautifully.</p>
      </div>
      {layout === "shelf" ? <AppsShelf /> : layout === "spotlight" ? <AppsSpotlight /> : <AppsBento />}
    </section>
  );
}
