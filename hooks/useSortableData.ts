import { useMemo } from "react";

type SortDirection = "asc" | "desc";

interface SortState<T> {
  col: keyof T | null;
  dir: SortDirection;
}
export function useSortableData<T extends Record<string, any>>(
  items: T[] = [],
  sortState: SortState<T>
) {
  return useMemo(() => {
    const column = sortState.col;

    if (!column) return items;
    // if (!sortState.col) return items;

    return [...items].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortState.dir === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortState.dir === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });
  }, [items, sortState]);
}