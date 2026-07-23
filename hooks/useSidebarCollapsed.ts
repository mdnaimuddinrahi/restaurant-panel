"use client";

import { useSyncExternalStore } from "react";

/**
 * Minimal external store for the sidebar's collapsed/expanded state.
 *
 * Why not just React state in one component? Because the toggle button
 * (NavbarSideToggle) and the sidebar itself (Sidebar) live in different
 * parts of the tree and both need to read AND write the same value in
 * sync. This avoids id-based DOM querying / custom events, and avoids
 * needing to wire a Redux slice + provider just for one boolean.
 *
 * If you'd rather this live in your existing @reduxjs/toolkit store,
 * it's a drop-in swap later — same read/write shape.
 */

let collapsed = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function getSidebarCollapsed() {
  return collapsed;
}

export function setSidebarCollapsed(value: boolean | ((prev: boolean) => boolean)) {
  const next = typeof value === "function" ? (value as (prev: boolean) => boolean)(collapsed) : value;
  if (next === collapsed) return;
  collapsed = next;
  emit();
}

export function toggleSidebarCollapsed() {
  setSidebarCollapsed((prev) => !prev);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Read the current collapsed state; re-renders the component on change. */
export function useSidebarCollapsed() {
  return useSyncExternalStore(subscribe, getSidebarCollapsed, () => false);
}
