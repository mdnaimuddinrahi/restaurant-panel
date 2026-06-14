import { useState } from 'react'

export default function NavbarSideToggle() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const handleClick = () => {
        const sidebar = document.getElementById("sidebar");
        const main = document.getElementById("main-content");

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            sidebar?.classList.toggle("mobile-open");
            return;
        }

        setSidebarCollapsed(prev => {
            const next = !prev;

            sidebar?.classList.toggle("collapsed", next);
            main?.classList.toggle("expanded", next);

            return next;
        });
    };

    return (
        <button 
        id="sidebar-toggle" 
        onClick={handleClick}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0" data-tooltip="Toggle sidebar">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
    )
}
