import type { ScreenKind } from "@/lib/site";
import { PhoneScreen } from "../PhoneScreens";

// Small phone used in the apps section. Uses the app accent from the parent's --app-accent.
export function MiniPhone({ screen, className }: { screen: ScreenKind; className?: string }) {
  return (
    <div className={`mini-phone ${className ?? ""}`} aria-hidden>
      <div className="mini-phone-notch" />
      <div className="mini-phone-screen">
        <PhoneScreen kind={screen} />
      </div>
    </div>
  );
}
