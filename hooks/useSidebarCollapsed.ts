"use client";

import { useSyncExternalStore } from "react";

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
