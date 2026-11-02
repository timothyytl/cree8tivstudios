// The C8 monogram. One geometry for every size; colours come from props or CSS tokens.
const C_PATH = "M89.1,35.6 A38,38 0 1 0 89.1,84.4";

export function Mark({
  size = 40,
  c = "currentColor",
  eight = "var(--accent)",
  label,
  className,
}: {
  size?: number | string;
  c?: string;
  eight?: string;
  label?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="3.5 8 104 104"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={C_PATH} fill="none" stroke={c} strokeWidth="18" strokeLinecap="round" />
      <circle cx="60" cy="49" r="8" fill="none" stroke={eight} strokeWidth="6" />
      <circle cx="60" cy="69" r="10.5" fill="none" stroke={eight} strokeWidth="6" />
    </svg>
  );
}

// Horizontal lockup: mark + wordmark. The wordmark is live text in Syne.
export function Lockup({ size = 30 }: { size?: number }) {
  return (
    <span className="lockup">
      <Mark size={size} />
      <span className="lockup-text">
        <span className="lockup-name">
          CREE<span className="lockup-8">8</span>TIV
        </span>
        <span className="lockup-sub">STUDIOS</span>
      </span>
    </span>
  );
}
