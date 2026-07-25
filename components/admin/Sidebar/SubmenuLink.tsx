
/* ------------------------------------------------------------------ */
/*  Submenu link                                                      */
/* ------------------------------------------------------------------ */

import { hexToRgba } from "@/theme";
import { SubmenuLinkProps } from "./SidebarInterface";

export const SubmenuLink = ({
  label,
  active,
  onClick,
  flyout,
  accentColor,
}: SubmenuLinkProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      style={
        flyout && active && accentColor
          ? { color: accentColor, backgroundColor: hexToRgba(accentColor, 0.12) }
          : undefined
      }
      className={`flex items-center text-sm py-1.5 rounded-lg cursor-pointer transition-colors duration-150
                  ${flyout ? "mx-1.5 px-2.5" : "px-2"}
                  ${
                    active
                      ? flyout
                        ? "font-medium"
                        : "text-(--accent) bg-(--accent-soft) font-medium"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
    >
      {label}
    </div>
  );
}