import type { ScreenKind } from "@/lib/site";

// CSS-drawn app screens so a page looks finished before real screenshots exist.
// Replace with <Image> screenshots per step once you have them.
export function PhoneScreen({ kind }: { kind: ScreenKind }) {
  if (kind === "focus") {
    return (
      <div className="ps">
        <p className="ps-title">Focus</p>
        <div className="ps-ring">
          <span>18:24</span>
        </div>
        <div className="ps-block ps-block--accent">
          <small>09:00 to 11:00</small>
          <strong>Deep work: sync engine</strong>
        </div>
        <div className="ps-block">
          <small>11:00</small>
          <strong>Email and calls</strong>
        </div>
      </div>
    );
  }
  if (kind === "habits") {
    const rows: [string, number[]][] = [
      ["Read 20 pages", [1, 1, 1, 0, 1, 0, 0]],
      ["Walk", [1, 1, 0, 1, 1, 1, 0]],
      ["No phone after 11", [1, 0, 1, 1, 0, 0, 0]],
    ];
    return (
      <div className="ps">
        <p className="ps-title">This week</p>
        {rows.map(([name, days]) => (
          <div key={name} className="ps-habit">
            <span>{name}</span>
            <div className="ps-days">
              {days.map((d, i) => (
                <i key={i} className={d ? "on" : undefined} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  const tasks: [string, boolean][] = [
    ["Reply to Aisyah", true],
    ["Ship onboarding", false],
    ["Review App Store copy", false],
    ["Gym, 7 pm", false],
  ];
  return (
    <div className="ps">
      <p className="ps-title">Today</p>
      {tasks.map(([t, done]) => (
        <div key={t} className={done ? "ps-task done" : "ps-task"}>
          <i />
          {t}
        </div>
      ))}
    </div>
  );
}
