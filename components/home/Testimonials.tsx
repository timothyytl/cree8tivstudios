import { site, type Testimonial } from "@/lib/site";

// "/what people say." Pinned for a screen's worth of scrolling while the quotes
// drift upward on the right. Renders nothing until lib/site.ts has real quotes.
export function Testimonials() {
  const quotes = site.testimonials;
  if (quotes.length === 0) return null;

  return (
    <div className="testi-pin">
      <section className="testi" aria-labelledby="testi-title">
        <div className="testi-left">
          <h2 id="testi-title" className="testi-heading">
            <b>/</b>what <br />
            people <br />
            say.
          </h2>
        </div>
        <div className="testi-right">
          <div className="testi-marquee">
            {/* Quotes for screen readers once; the duplicate set only keeps the loop seamless. */}
            <ul className="testi-track">
              {quotes.map((q, i) => (
                <Card key={i} q={q} />
              ))}
              {quotes.map((q, i) => (
                <Card key={`dup-${i}`} q={q} hidden />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ q, hidden }: { q: Testimonial; hidden?: boolean }) {
  return (
    <li className="testi-card" aria-hidden={hidden || undefined}>
      <blockquote className="testi-quote">{q.quote}</blockquote>
      <div className="testi-person">
        {q.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="testi-avatar" src={q.avatar} alt="" width={44} height={44} loading="lazy" />
        ) : (
          <span className="testi-avatar testi-avatar--initial" aria-hidden>
            {q.name.charAt(0)}
          </span>
        )}
        <div>
          <div className="testi-name">{q.name}</div>
          <div className="testi-role">{q.role}</div>
        </div>
      </div>
    </li>
  );
}
