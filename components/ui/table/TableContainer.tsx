import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface TableContainerProps extends ComponentProps<"div"> {}

export default function TableContainer({
  className,
  children,
  ...props
}: TableContainerProps) {
  return (
    <div
      className={cn("overflow-x-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}