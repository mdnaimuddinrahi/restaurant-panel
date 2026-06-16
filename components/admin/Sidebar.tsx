"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
      const btn = document.getElementById("sidebar-toggle");
      const sidebar = document.getElementById("sidebar");
      const main = document.getElementById("main-content");

      if (!btn || !sidebar || !main) return;

      const handleClick = () => {
        setCollapsed((prev) => {
          const next = !prev;

          sidebar.classList.toggle("collapsed", next);
          main.classList.toggle("expanded", next);

          return next;
        });
      };

      btn.addEventListener("click", handleClick);

      return () => btn.removeEventListener("click", handleClick);
    }, []);
  
  const toggleSubmenu = (rowEl: HTMLElement) => {
    const navItem = rowEl.closest(".nav-item") as HTMLElement | null;
    if (!navItem) return;

    const submenu = navItem.querySelector(".submenu") as HTMLElement | null;
    const arrow = rowEl.querySelector(".nav-arrow") as HTMLElement | null;

    if (!submenu) return;

    const isOpen = submenu.classList.contains("open");

    document.querySelectorAll(".submenu.open").forEach((s) => {
      const el = s as HTMLElement;
      el.classList.remove("open");

      const a = el.previousElementSibling?.querySelector(
        ".nav-arrow"
      ) as HTMLElement | null;

      if (a) a.style.transform = "";
    });

    if (!isOpen) {
      submenu.classList.add("open");
      if (arrow) arrow.style.transform = "rotate(90deg)";
    }
  };

  return (
      <aside id="sidebar" className="fixed left-0 top-14 bottom-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-40 flex flex-col overflow-hidden">
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2">
          {/* <!-- Main --> */}
          <div className="sidebar-section-label section-label">Main</div>

          <div className="nav-item" data-route="/">
            <div className="nav-row flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer" onClick={() => router.push('/admin')}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              <span className="nav-label text-sm font-500 whitespace-nowrap text-black dark:text-white">Dashboard</span>
            </div>
          </div>

          {/* <!-- Users group --> */}
          <div className="nav-item" data-route="/admin/users" data-has-sub="true">
            <div className="nav-row flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer" 
            onClick={(e) => toggleSubmenu(e.currentTarget)}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              <span className="nav-label text-sm font-500 whitespace-nowrap flex-1">Users</span>
              <svg className="nav-arrow w-4 h-4 flex-shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div className="submenu pl-10 pr-2 space-y-0.5">
              <div 
                className="submenu-item flex items-center text-sm py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" 
                onClick={() => router.push('/admin/users')}
                >All Users</div>
              <div 
                className="submenu-item flex items-center text-sm py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" 
                onClick={() => router.push('/admin/users/roles')}
                >Roles & Permissions</div>
              <div 
                className="submenu-item flex items-center text-sm py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" 
                onClick={() => router.push('/admin/users/activity')}
                >Activity Log</div>
            </div>
          </div>

          {/* <!-- Jobs group --> */}
          <div className="nav-item" data-route="#/jobs" data-has-sub="true">
            <div 
              className="nav-row flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer" 
              onClick={(e) => toggleSubmenu(e.currentTarget)}
              >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span className="nav-label text-sm font-500 whitespace-nowrap flex-1">Jobs</span>
              <svg className="nav-arrow w-4 h-4 flex-shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div className="submenu pl-10 pr-2 space-y-0.5">
              <div 
                className="submenu-item flex items-center text-sm py-1.5 px-２ rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" 
                onClick={() => router.push('#/jobs')}
              >Job Queue</div>
              <div 
                className="submenu-item flex items-center text-sm py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" 
                onClick={() => router.push('#/jobs/scheduler')}>
                Scheduler
              </div>
              <div 
                className="submenu-item flex items-center text-sm py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" 
                onClick={() => router.push('#/jobs/history')}
                >
                Job History
              </div>
            </div>
          </div>

          {/* <!-- Communication --> */}
          <div className="sidebar-section-label section-label mt-3">Communication</div>

          <div className="nav-item" data-route="#/email">
            <div className="nav-row flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer" 
            onClick={() => router.push('#/email')}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span className="nav-label text-sm font-500 whitespace-nowrap">Email</span>
            </div>
          </div>

          <div className="nav-item" data-route="#/chat">
            <div className="nav-row flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer" onClick={() => router.push('#/chat')}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              <span className="nav-label text-sm font-500 whitespace-nowrap">Chat</span>
              <span className="nav-label ml-auto badge accent-bg text-white" 
                style={{padding: '1px 7px', fontSize: '0.65rem'}}>5</span>
            </div>
          </div>

          {/* <!-- Account --> */}
          <div className="sidebar-section-label section-label mt-3">Account</div>

          <div className="nav-item" data-route="#/profile">
            <div className="nav-row flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer" onClick={() => router.push('#/profile')}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span className="nav-label text-sm font-500 whitespace-nowrap">Profile</span>
            </div>
          </div>

          <div className="nav-item" data-route="#/security">
            <div className="nav-row flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer" onClick={() => router.push('#/security')}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              <span className="nav-label text-sm font-500 whitespace-nowrap">Security</span>
            </div>
          </div>

          {/* <!-- Settings --> */}
          <div className="sidebar-section-label section-label mt-3">System</div>

          <div className="nav-item" data-route="#/settings" data-has-sub="true">
            <div className="nav-row flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer" 
            onClick={(e) => toggleSubmenu(e.currentTarget)}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span className="nav-label text-sm font-500 whitespace-nowrap flex-1">Settings</span>
              <svg className="nav-arrow w-4 h-4 flex-shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div className="submenu pl-10 pr-2 space-y-0.5">
              <div className="submenu-item flex items-center text-sm py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" onClick={() => router.push('#/settings')}>General</div>
              <div className="submenu-item flex items-center text-sm py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" onClick={() => router.push('#/settings/billing')}>Billing</div>
              <div className="submenu-item flex items-center text-sm py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" onClick={() => router.push('#/settings/api')}>API Keys</div>
              <div className="submenu-item flex items-center text-sm py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors" onClick={() => router.push('#/settings/integrations')}>Integrations</div>
            </div>
          </div>
        </nav>

        {/* <!-- Sidebar footer --> */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-7 h-7 rounded-full accent-bg flex items-center justify-center text-white text-xs font-700 flex-shrink-0">JD</div>
            <div className="nav-label min-w-0">
              <p className="text-xs font-600 truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
  )
}
