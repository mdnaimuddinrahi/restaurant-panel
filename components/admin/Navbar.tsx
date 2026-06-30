"use client"
import NavbarNotification from './NavBarItem/NavbarNotification'
import NavbarAvatarDropDown from './NavBarItem/NavbarAvatarDropDown'
import { useEffect, useState } from "react";
import NavbarThemeToggle from './NavBarItem/NavbarThemeToggle';
import NavbarColorPicker from './NavBarItem/NavbarColorPicker';
import NavbarSideToggle from './NavBarItem/NavbarSideToggle';
import NavbarLocalization from './NavBarItem/NavbarLocalization';

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
      <NavbarSideToggle/>
      <div className="flex items-center gap-2 mr-3 shrink-0">
        <div className="w-7 h-7 accent-bg rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <span className="font-display font-700 text-lg tracking-tight hidden sm:block">Nexus</span>
      </div>
      <div className="flex-1"></div>
      <NavbarLocalization/>
      <NavbarColorPicker/>
      <NavbarThemeToggle />
      <NavbarNotification/>
      <NavbarAvatarDropDown/>
    </nav>
  )
}
