export function useNativeSelectTheme() {
  return {
    base: `
      px-2 py-1 text-xs rounded-lg border
      border-slate-200 dark:border-slate-600
      bg-transparent dark:bg-slate-800
      text-slate-700 dark:text-slate-200
      focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600
    `,
  };
}