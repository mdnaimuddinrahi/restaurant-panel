import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> {}

export default function Table({
  className,
  children,
  ...props
}: TableProps) {
  return (
    <table
      className={cn("w-full text-sm", className)}
      {...props}
    >
      {children}
    </table>
  );
}