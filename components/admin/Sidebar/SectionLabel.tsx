
/* ------------------------------------------------------------------ */
/*  Section label                                                     */
/* ------------------------------------------------------------------ */

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export const SectionLabel = ({ collapsed, children }: { collapsed: boolean; children: ReactNode })  => {
  return (
    <div className="h-6 flex items-center px-2.5">
      <AnimatePresence initial={false} mode="wait">
        {collapsed ? (
          <motion.div
            key="dot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-px bg-slate-200 dark:bg-slate-700"
          />
        ) : (
          <motion.span
            key="label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 whitespace-nowrap"
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}