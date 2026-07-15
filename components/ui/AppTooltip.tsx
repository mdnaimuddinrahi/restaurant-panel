import { ReactNode } from "react";
import { hexToRgba, useTheme } from "@/theme";

type AppTooltipProps = {
  title: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
};

export default function AppTooltip({
  title,
  children,
  placement = "top",
}: AppTooltipProps) {
  const { accentColor } = useTheme();

  const placementClass = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-flex group">
      {children}

      <div
        className={`
          absolute z-50
          ${placementClass[placement]}
          pointer-events-none
          whitespace-nowrap
          rounded-md px-2 py-1 text-xs font-medium text-white
          opacity-0 scale-95
          transition-all duration-200
          group-hover:opacity-100
          group-hover:scale-100
        `}
        style={{ background: hexToRgba(accentColor, 0.9) }}

      >
        {title}
      </div>
    </div>
  );
}