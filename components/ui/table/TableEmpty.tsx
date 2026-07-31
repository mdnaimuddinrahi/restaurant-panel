import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AppTableEmptyProps {
  totalItems: number;
  colSpan: number;
  message: ReactNode;
  className?: string;
}

export default function TableEmpty({
  totalItems,
  colSpan,
  message,
  className,
}: AppTableEmptyProps) {
  if (totalItems > 0) return null;

  return (
    <tr>
      <td
        colSpan={colSpan}
        className={cn(
          "px-4 py-8 text-center text-sm text-slate-400",
          className
        )}
      >
        {message}
      </td>
    </tr>
  );
}