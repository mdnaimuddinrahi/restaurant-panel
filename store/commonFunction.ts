export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
  
  // const statusBadge = (s: string) => {
  //     const map: Record<string, string> = {
  //       Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  //       Inactive: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
  //       Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
  //     };
  //     return <span className={`badge ${map[s] || ''}`}>{s}</span>;
  //   };
  
  //   const roleBadge = (r: string) => {
  //     const map: Record<string, string> = {
  //       Admin: 'accent-subtle-bg accent-text',
  //       Editor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  //       Viewer: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
  //     };
  //     return <span className={`badge ${map[r] || ''}`}>{r}</span>;
  //   };

  //   const initials = (n: string) => n.split(' ').map(p => p[0]).join('');