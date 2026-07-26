import SkeletonNavSection from "./SkeletonNavSection";
import SkeletonSidebarFooter from "./SkeletonSidebarFooter";
import { motion } from "framer-motion";
import { useSidebarCollapsed } from "@/hooks/useSidebarCollapsed";
import { useEffect, useState } from "react";
import { COLLAPSED_WIDTH, EXPANDED_WIDTH } from "@/components/admin/Sidebar/SidebarConstants";


export default function SkeletonSidebar() {
    const sections = 2;
    const itemsPerSection = 5;
    const collapsed = useSidebarCollapsed();
    const [openKey, setOpenKey] = useState<string | null>(null); // accordion, expanded mode
    const [flyoutKey, setFlyoutKey] = useState<string | null>(null); // hover flyout, collapsed mode
    
    useEffect(() => {
        const main = document.getElementById("main-content");
        main?.classList.toggle("expanded", collapsed);
    }, [collapsed]);
    
    return (
        <motion.aside
            id="sidebar"
            initial={false}
            animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
            transition={{ type: "tween", duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-14 bottom-0 z-40 flex flex-col overflow-hidden
                 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm
                 border-r border-slate-200 dark:border-slate-800"
        >
        <div className="flex-1 overflow-y-auto py-3 px-2">
            {Array.from({ length: sections }).map((_, index) => (
            <SkeletonNavSection
                key={index}
                collapsed={collapsed}
                items={itemsPerSection}
            />
            ))}
        </div>
        </motion.aside>
    );
}