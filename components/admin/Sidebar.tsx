"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/theme";
import { hexToRgba } from "@/utils/colorUtils";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";

/* ------------------------------------------------------------------ */
/*  Nav data                                                          */
/* ------------------------------------------------------------------ */

type NavChild = { key: string; label: string; route: string };
type NavItem = {
  key: string;
  label: string;
  route: string;
  icon: ReactNode;
  badge?: string | number;
  children?: NavChild[];
};
type NavSection = { key: string; label: string; items: NavItem[] };

const NAV_SECTIONS: NavSection[] = [
  {
    key: "main",
    label: "Main",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        route: "/admin",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
      },
      {
        key: "users",
        label: "Users",
        route: "/admin/user",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
        children: [
          { key: "employees", label: "Employees", route: "/admin/user/employees" },
          { key: "roles", label: "Roles & Permissions", route: "/admin/user/roles" },
          { key: "activity", label: "Activity Log", route: "/admin/users/activity" },
        ],
      },
      {
        key: "jobs",
        label: "Jobs",
        route: "#/jobs",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        children: [
          { key: "queue", label: "Job Queue", route: "#/jobs" },
          { key: "scheduler", label: "Scheduler", route: "#/jobs/scheduler" },
          { key: "history", label: "Job History", route: "#/jobs/history" },
        ],
      },
    ],
  },
  {
    key: "communication",
    label: "Communication",
    items: [
      {
        key: "email",
        label: "Email",
        route: "#/email",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        key: "chat",
        label: "Chat",
        route: "#/chat",
        badge: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
      },
    ],
  },
  {
    key: "account",
    label: "Account",
    items: [
      {
        key: "profile",
        label: "Profile",
        route: "#/profile",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
      {
        key: "security",
        label: "Security",
        route: "#/security",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
      },
    ],
  },
  {
    key: "system",
    label: "System",
    items: [
      {
        key: "settings",
        label: "Settings",
        route: "#/settings",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        children: [
          { key: "general", label: "General", route: "#/settings" },
          { key: "billing", label: "Billing", route: "#/settings/billing" },
          { key: "api", label: "API Keys", route: "#/settings/api" },
          { key: "integrations", label: "Integrations", route: "#/settings/integrations" },
        ],
      },
    ],
  },
];

const EXPANDED_WIDTH = 264;
const COLLAPSED_WIDTH = 50;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { accentColor } = useTheme();

  // Single source of truth, shared with NavbarSideToggle (or anything
  // else) via the external store — no id-based DOM listening required.
  const collapsed = useSidebarCollapsed();
  const [openKey, setOpenKey] = useState<string | null>(null); // accordion, expanded mode
  const [flyoutKey, setFlyoutKey] = useState<string | null>(null); // hover flyout, collapsed mode

  // Keep #main-content's margin class in sync for any layout CSS that
  // depends on it. We deliberately do NOT touch classes on #sidebar
  // itself anymore — this component now fully owns its own width via
  // the animate prop below, so a stray legacy CSS rule for
  // "#sidebar.collapsed" can no longer fight the inline animated style.
  useEffect(() => {
    const main = document.getElementById("main-content");
    main?.classList.toggle("expanded", collapsed);
  }, [collapsed]);

  // Collapsing the sidebar should always close any open accordion/flyout.
  useEffect(() => {
    setOpenKey(null);
    setFlyoutKey(null);
  }, [collapsed]);

  const isRouteActive = (route: string) =>
    route.startsWith("/") && (pathname === route || pathname?.startsWith(`${route}/`));

  const isItemActive = (item: NavItem) =>
    isRouteActive(item.route) || (item.children?.some((c) => isRouteActive(c.route)) ?? false);

  const navigate = (route: string) => {
    router.push(route);
    setFlyoutKey(null);
  };

  const accentVars = {
    "--accent": accentColor,
    "--accent-soft": hexToRgba(accentColor, 0.12),
    "--accent-softer": hexToRgba(accentColor, 0.07),
  } as CSSProperties;

  return (
    <motion.aside
      id="sidebar"
      style={accentVars}
      initial={false}
      animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
      transition={{ type: "tween", duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-14 bottom-0 z-40 flex flex-col overflow-hidden
                 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm
                 border-r border-slate-200 dark:border-slate-800"
    >
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-1.5 space-y-0.5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.key} className="mb-1">
            <SectionLabel collapsed={collapsed}>{section.label}</SectionLabel>

            {section.items.map((item) => (
              <NavRow
                key={item.key}
                item={item}
                collapsed={collapsed}
                active={isItemActive(item)}
                open={openKey === item.key}
                hoverOpen={flyoutKey === item.key}
                accentColor={accentColor}
                onHeaderClick={() => {
                  if (item.children) {
                    if (collapsed) return; // collapsed: handled by hover flyout
                    setOpenKey((k) => (k === item.key ? null : item.key));
                  } else {
                    navigate(item.route);
                  }
                }}
                onMouseEnter={() => collapsed && setFlyoutKey(item.key)}
                onMouseLeave={() => collapsed && setFlyoutKey(null)}
                onChildClick={(route) => navigate(route)}
                isRouteActive={isRouteActive}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
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
    </motion.aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Section label                                                     */
/* ------------------------------------------------------------------ */

function SectionLabel({ collapsed, children }: { collapsed: boolean; children: ReactNode }) {
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

/* ------------------------------------------------------------------ */
/*  Nav row (item + optional submenu / flyout)                        */
/* ------------------------------------------------------------------ */

function NavRow({
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
}: {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
  open: boolean;
  hoverOpen: boolean;
  accentColor: string;
  onHeaderClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onChildClick: (route: string) => void;
  isRouteActive: (route: string) => boolean;
}) {
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

      {/* Flyout submenu — collapsed sidebar, parent items, shown on hover.
          Portaled to document.body and positioned by real coordinates so
          the scrollable <nav> (overflow-y-auto) can never clip it. */}
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

      {/* Tooltip — collapsed sidebar, leaf items (no children), shown on
          hover. Also portaled for the same reason. */}
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

/* ------------------------------------------------------------------ */
/*  Submenu link                                                      */
/* ------------------------------------------------------------------ */

function SubmenuLink({
  label,
  active,
  onClick,
  flyout,
  accentColor,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  flyout?: boolean;
  accentColor?: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      style={
        flyout && active && accentColor
          ? { color: accentColor, backgroundColor: hexToRgba(accentColor, 0.12) }
          : undefined
      }
      className={`flex items-center text-sm py-1.5 rounded-lg cursor-pointer transition-colors duration-150
                  ${flyout ? "mx-1.5 px-2.5" : "px-2"}
                  ${
                    active
                      ? flyout
                        ? "font-medium"
                        : "text-(--accent) bg-(--accent-soft) font-medium"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
    >
      {label}
    </div>
  );
}