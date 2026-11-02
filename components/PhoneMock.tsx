import type { AppEntry } from "@/lib/site";

// A CSS-drawn phone so the site looks finished before you have screenshots.
// Swap for real screenshots with next/image once you have them.
export function PhoneMock({ app }: { app: AppEntry }) {
  return (
    <div className="phone" style={{ ["--accent" as string]: app.accent }} aria-hidden>
      <div className="phone-screen">
        <div className="phone-notch" />
        {app.screen === "planner" ? <PlannerScreen /> : <GenericScreen />}
      </div>
    </div>
  );
}

function PlannerScreen() {
  const blocks = [
    { time: "08:00", label: "Plan", h: 1, tone: "soft" },
    { time: "09:00", label: "Deep work", h: 2.4, tone: "accent" },
    { time: "12:00", label: "Lunch", h: 1, tone: "muted" },
    { time: "13:00", label: "Email + calls", h: 1.4, tone: "soft" },
  ];
  return (
    <div className="ps">
      <p className="ps-date">Today</p>
      <div className="ps-habits">
        {[1, 1, 1, 0, 0].map((done, i) => (
          <span key={i} className={done ? "ps-habit is-done" : "ps-habit"} />
        ))}
      </div>
      <div className="ps-blocks">
        {blocks.map((b) => (
          <div key={b.time} className={`ps-block ps-block--${b.tone}`} style={{ flexGrow: b.h }}>
            <span>{b.time}</span>
            <strong>{b.label}</strong>
          </div>
        ))}
      </div>
      <div className="ps-tasks">
        {["Write release notes", "Review design", "Call bank"].map((t, i) => (
          <div key={t} className={i === 0 ? "ps-task is-done" : "ps-task"}>
            <span className="ps-check" />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericScreen() {
  return (
    <div className="ps">
      <p className="ps-date">Coming soon</p>
      <div className="ps-blocks">
        <div className="ps-block ps-block--accent" style={{ flexGrow: 2 }} />
        <div className="ps-block ps-block--soft" style={{ flexGrow: 1 }} />
        <div className="ps-block ps-block--muted" style={{ flexGrow: 1 }} />
      </div>
    </div>
  );
}
