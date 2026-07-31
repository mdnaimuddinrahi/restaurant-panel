import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
  resource?: string;
}

export default function TableBody({
  children,
  resource,
  id,
  className,
  ...props
}: TableBodyProps) {
  return (
    <tbody
      {...props}
      id={id ?? (resource ? `${resource}-table-body` : undefined)}
      className={cn(className)}
    >
      {children}
    </tbody>
  );
}