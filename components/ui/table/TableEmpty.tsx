import type { CSSProperties, ReactNode } from "react";
import TableCell from "./TableCell";
import TableRow from "./TableRow";
import { HiOutlineUsers } from 'react-icons/hi';
import type { IconType } from "react-icons";
import { motion } from "framer-motion";
import { hexToRgba, useTheme } from "@/theme";


interface AppTableEmptyProps {
  totalItems: number;
  colSpan: number;
  message: ReactNode;
  adjustMessage?: ReactNode;
  className?: string;
  icon?: IconType;
  iconSize?: number;
}

export default function TableEmpty({
  totalItems,
  colSpan,
  message,
  adjustMessage,
  className,
  icon: Icon = HiOutlineUsers,
  iconSize = 42,
}: AppTableEmptyProps) {
  if (totalItems > 0) return null;

  const { accentColor } = useTheme();
      const rowHoverStyle = {
          "--row-hover": hexToRgba(accentColor, 0.08),
           "--icon-color": hexToRgba(accentColor, 0.25),
        } as CSSProperties;

  return (
    <TableRow hover={false}>
      <TableCell
        colSpan={colSpan}
        className={className}
      >
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
            className="flex flex-col items-center justify-center py-3"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.7, y: 10 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                },
              }}
              className="mb-4 rounded-full bg-(--row-hover) p-5 dark:bg-(--row-hover) "
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              >
                <Icon
                  size={iconSize}
                  className="text-slate-400 dark:text-slate-200"
                />
              </motion.div>
            </motion.div>
        
            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="text-base font-semibold text-slate-600 dark:text-slate-200"
            >
              {message}
            </motion.h3>
        
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mt-2 text-sm text-slate-500 dark:text-slate-400"
            >
              {adjustMessage}
            </motion.p>
          </motion.div>
      </TableCell>
    </TableRow>
  );
}