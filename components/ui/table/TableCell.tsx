import { cn } from "@/lib/utils";
import type { ReactNode, TdHTMLAttributes } from "react";

interface AppTableCellProps
  extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export default function TableCell({
  children,
  className,
  ...props
}: AppTableCellProps) {
  return (
    <td
      {...props}
      className={cn(
        "px-4 py-3 text-slate-500 dark:text-slate-400",
        className
      )}
    >
      {children}
    </td>
  );
}