"use client"
import NavbarNotification from './NavBarItem/NavbarNotification'
import NavbarAvatarDropDown from './NavBarItem/NavbarAvatarDropDown'
import { useEffect, useState } from "react";
import NavbarThemeToggle from './NavBarItem/NavbarThemeToggle';
import NavbarColorPicker from './NavBarItem/NavbarColorPicker';
import NavbarSideToggle from './NavBarItem/NavbarSideToggle';

export default function Navbar() {
   useEffect(() => {
      function closeAllDropdowns() {
        ["notif-dropdown", "avatar-dropdown", "color-picker-dropdown"].forEach(
          (id) => {
            document.getElementById(id)?.classList.add("hidden");
          }
        );
      }

      function setupDropdown(btnId: string, dropId: string) {
        const btn = document.getElementById(btnId);
        const drop = document.getElementById(dropId);

        if (!btn || !drop) return;

        const handler = (e: Event) => {
          e.stopPropagation();

          const wasHidden = drop.classList.contains("hidden");

          closeAllDropdowns();

          if (wasHidden) {
            drop.classList.remove("hidden");
          }
        };

        btn.addEventListener("click", handler);

        return () => btn.removeEventListener("click", handler);
      }

      setupDropdown("notif-btn", "notif-dropdown");
      setupDropdown("avatar-btn", "avatar-dropdown");
      setupDropdown("color-picker-btn", "color-picker-dropdown");

      document.addEventListener("click", closeAllDropdowns);

      return () => {
        document.removeEventListener("click", closeAllDropdowns);
      };
  }, []);

  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-3 shadow-sm">
      {/* <!-- Sidebar toggle --> */}
      <NavbarSideToggle/>

      {/* <!-- Logo --> */}
      <div className="flex items-center gap-2 mr-3 flex-shrink-0">
        <div className="w-7 h-7 accent-bg rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <span className="font-display font-700 text-lg tracking-tight hidden sm:block">Nexus</span>
      </div>

      {/* <!-- Search --> */}
      {/* <div className="flex-1 max-w-xs relative hidden md:block">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input type="text" placeholder="Search anything..." className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:bg-white dark:focus:bg-slate-600 transition-colors"/>
      </div> */}

      <div className="flex-1"></div>

      {/* <!-- Color picker --> */}
      <NavbarColorPicker/>

      {/* <!-- Tour --> */}
      {/* <button id="tour-btn" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" data-tooltip="Product tour">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </button> */}
      {/* <!-- Dark mode --> */}
      <NavbarThemeToggle />
      {/* <!-- Notifications --> */}
      <NavbarNotification/>
      {/* <!-- Avatar dropdown --> */}
      <NavbarAvatarDropDown/>
    </nav>
  )
}
