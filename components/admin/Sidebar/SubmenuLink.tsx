"use client";

import { hexToRgba } from "@/theme";
import { SubmenuLinkProps } from "@/features/sidebar/sidebar.types";
import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export const SubmenuLink = ({ label, route, active, flyout, accentColor }: SubmenuLinkProps) => {
  const [copied, setCopied] = useState(false);

  const copyLink = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(new URL(route, window.location.href).toString());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      style={flyout && active && accentColor ? { color: accentColor, backgroundColor: hexToRgba(accentColor, 0.12) } : undefined}
      className={`group flex items-center rounded-lg transition-colors duration-150 ${flyout ? "mx-1.5" : ""} ${
        active ? (flyout ? "font-medium" : "bg-(--accent-soft) font-medium") : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
      }`}
    >
      <Link
        href={route}
        className={`flex min-w-0 flex-1 items-center py-1.5 text-sm transition-colors duration-150 ${flyout ? "pl-2.5" : "pl-2"} ${
          active ? "text-(--accent)" : "hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        {label}
      </Link>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Link copied" : `Copy link to ${label}`}
        title={copied ? "Link copied" : "Copy link"}
        className="mr-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-slate-400 opacity-0 transition-opacity hover:bg-slate-200 hover:text-slate-700 focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) group-hover:opacity-100 dark:hover:bg-slate-600 dark:hover:text-slate-100"
      >
        {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
      </button>
    </div>
  );
};
