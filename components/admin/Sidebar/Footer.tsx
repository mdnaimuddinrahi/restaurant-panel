import { useTheme } from '@/theme';
import { AnimatePresence, motion } from 'framer-motion'

export default function Footer({collapsed}: {collapsed: boolean}) {
    const { accentColor } = useTheme();
    return (
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
            <div className={`flex items-center gap-3 px-1 py-2 ${collapsed ? "justify-center" : ""}`}>
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: accentColor }}
                >
                    JD
                </div>
                <AnimatePresence initial={false}>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.15 }}
                            className="min-w-0 overflow-hidden"
                        >
                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-100 truncate">
                                John Doe
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                                Administrator
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
