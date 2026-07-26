
/* ------------------------------------------------------------------ */
/*  Nav row (item + optional submenu / flyout)                        */
/* ------------------------------------------------------------------ */

import { useEffect, useRef, useState } from "react";
import { SidebarProps } from "../../../features/sidebar/sidebar.types";
import { AnimatePresence, motion } from "framer-motion";
import { SubmenuLink } from "./SubmenuLink";
import { createPortal } from "react-dom";

export const NavRow = ({
  item,
  collapsed,
  active,
  open,
  hoverOpen,
  accentColor,
  onHeaderClick,
  onMouseEnter,
  onMouseLeave,
  onChildClick,
  isRouteActive,
}: SidebarProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState<{ top: number; left: number; height: number } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleEnter = () => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) setCoords({ top: rect.top, left: rect.right, height: rect.height });
        onMouseEnter();
    };

    const showFlyout = collapsed && !!item.children && hoverOpen && coords;
    const showTooltip = collapsed && !item.children && hoverOpen && coords;

    return (
        <div ref={triggerRef} className="relative" onMouseEnter={handleEnter} onMouseLeave={onMouseLeave}>
        <button
            type="button"
            onClick={onHeaderClick}
            aria-label={item.label}
            className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium
                        transition-colors duration-150 outline-none
                        focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2
                        dark:focus-visible:ring-offset-slate-900
                        ${collapsed ? "justify-center" : ""}
                        ${
                        active
                            ? "text-(--accent) bg-(--accent-soft)"
                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-(--accent-softer)"
                        }`}
        >
            {/* Active indicator — smoothly slides between rows */}
            {active && (
                <motion.span
                    layoutId="active-indicator"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute left-0 top-1.5 bottom-1.5 w-0.75 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                />
            )}

            <span className="w-5 h-5 shrink-0 [&>svg]:w-5 [&>svg]:h-5">{item.icon}</span>

            <AnimatePresence initial={false}>
            {!collapsed && (
                <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="whitespace-nowrap overflow-hidden flex-1 text-left"
                >
                {item.label}
                </motion.span>
            )}
            </AnimatePresence>

            {!collapsed && item.badge != null && (
            <span
                className="ml-auto text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 min-w-4.5 text-center"
                style={{ backgroundColor: "var(--accent)" }}
            >
                {item.badge}
            </span>
            )}

            {!collapsed && item.children && (
            <motion.span
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4 shrink-0 [&>svg]:w-4 [&>svg]:h-4 text-slate-400"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </motion.span>
            )}

            {collapsed && item.badge != null && (
            <span
                className="absolute top-1 right-1.5 w-2 h-2 rounded-full ring-2 ring-white dark:ring-slate-900"
                style={{ backgroundColor: "var(--accent)" }}
            />
            )}
        </button>

        {/* Inline accordion submenu — expanded sidebar. Stays inside the
            normal flow, so no portal needed here. */}
        {!collapsed && item.children && (
            <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                <div className="pl-10 pr-2 py-1 space-y-0.5">
                    {item.children.map((child) => (
                        <SubmenuLink
                            key={child.key}
                            label={child.label}
                            active={isRouteActive(child.route)}
                            onClick={() => onChildClick(child.route)}
                        />
                    ))}
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        )}

        {mounted &&
            item.children &&
            createPortal(
                <AnimatePresence>
                    {showFlyout && (
                    <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -6, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -6, scale: 0.97 }}
                        transition={{ duration: 0.14, ease: "easeOut" }}
                        style={{ position: "fixed", top: coords!.top, left: coords!.left + 8 }}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className="min-w-45 rounded-xl bg-white dark:bg-slate-800
                                border border-slate-200 dark:border-slate-700
                                shadow-lg shadow-slate-900/10 dark:shadow-black/30 py-1.5 z-9999"
                    >
                        <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500">
                        {item.label}
                        </div>
                        {item.children!.map((child) => (
                        <SubmenuLink
                            key={child.key}
                            label={child.label}
                            active={isRouteActive(child.route)}
                            onClick={() => onChildClick(child.route)}
                            accentColor={accentColor}
                            flyout
                        />
                        ))}
                    </motion.div>
                    )}
                </AnimatePresence>,
            document.body
            )}
        {mounted &&
            !item.children &&
            createPortal(
                <AnimatePresence>
                    {showTooltip && (
                    <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -6, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -6, scale: 0.97 }}
                        transition={{ duration: 0.14, ease: "easeOut" }}
                        style={{
                        position: "fixed",
                        top: coords!.top + coords!.height / 2,
                        left: coords!.left + 8,
                        transform: "translateY(-50%)",
                        }}
                        className="pointer-events-none whitespace-nowrap rounded-lg bg-slate-900 dark:bg-slate-700
                                px-2.5 py-1.5 text-xs font-medium text-white shadow-lg z-9999"
                    >
                        {item.label}
                        {item.badge != null && (
                        <span
                            className="ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                            style={{ backgroundColor: accentColor }}
                        >
                            {item.badge}
                        </span>
                        )}
                    </motion.div>
                    )}
                </AnimatePresence>,
            document.body
            )}
        </div>
    );
}
