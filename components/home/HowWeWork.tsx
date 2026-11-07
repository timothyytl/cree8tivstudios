import { site } from "@/lib/site";

// Numbered rows that pin under the nav and stack as you scroll.
export function HowWeWork() {
  return (
    <section id="how" className="how" aria-labelledby="how-title">
      <div className="how-head">
        <h2 id="how-title" className="section-title">
          <b>/</b>what we do.
        </h2>
        <p>A few rules every Cree8tiv app follows.</p>
      </div>
      <div className="how-stack">
        {site.principles.map((p, i) => (
          <article key={p.title} className="how-card">
            <div className="how-card-inner">
              <div className="how-title-row">
                <span className="how-num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="how-title">
                  <span className="how-slash">/</span>
                  {p.title.toLowerCase()}
                </h3>
              </div>
              <p className="how-desc">{p.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
