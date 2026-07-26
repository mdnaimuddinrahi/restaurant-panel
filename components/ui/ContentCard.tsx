import { ReactNode } from "react";

interface BodyProps {
  children: ReactNode;
}

export default function ContentCard({ children }: BodyProps)  {
  return (
    <div className=" bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden">
        {children}
    </div>
  )
}
