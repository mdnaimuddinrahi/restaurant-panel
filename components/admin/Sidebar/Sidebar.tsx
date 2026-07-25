"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/theme";
import { hexToRgba } from "@/utils/colorUtils";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";
import { NavItem } from "../../../features/sidebar/sidebar.types";
import { COLLAPSED_WIDTH, EXPANDED_WIDTH, NAV_SECTIONS } from "./SidebarConstants";
import Footer from "./Footer";
import NavSection from "./NavSection";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { accentColor } = useTheme();
  const collapsed = useSidebarCollapsed();
  const [openKey, setOpenKey] = useState<string | null>(null); // accordion, expanded mode
  const [flyoutKey, setFlyoutKey] = useState<string | null>(null); // hover flyout, collapsed mode

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
      <NavSection
        sections={NAV_SECTIONS}
        collapsed={collapsed}
        openKey={openKey}
        flyoutKey={flyoutKey}
        accentColor={accentColor}
        isItemActive={isItemActive}
        isRouteActive={isRouteActive}
        onNavigate={navigate}
        setOpenKey={setOpenKey}
        setFlyoutKey={setFlyoutKey}
      />

      {/* Footer */}
      <Footer collapsed={collapsed}/>
    </motion.aside>
  );
}

