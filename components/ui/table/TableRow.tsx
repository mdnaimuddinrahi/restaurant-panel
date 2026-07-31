import { cn } from "@/lib/utils";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { hexToRgba, useTheme } from '@/theme';


interface AppTableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  selected?: boolean;
  hover?: boolean;
  style?: CSSProperties;
}

export default function TableRow({
  children,
  selected = false,
  hover = true,
  className,
  style,
  ...props
}: AppTableRowProps) {
  const { accentColor } = useTheme();
  const rowHoverStyle = {
    "--row-hover": hexToRgba(accentColor, 0.08),
    ...style,
  } as CSSProperties;

  return (
    <tr
      {...props}
      style={rowHoverStyle}
      className={cn(
        "border-t border-slate-100 dark:border-slate-900 transition-colors",
        hover && "hover:bg-(--row-hover)",
        selected && "bg-(--row-hover)",
        className
      )}
    >
      {children}
    </tr>
  );
}