import React from 'react'

interface PaginationProps {
    totalUsersCount: number; 
    tablePage: number; 
    tablePageSize: number; 
    pagesCount: number;
    setTablePage: (page: number) => void; 
}

export default function Pagination(
    { 
        totalUsersCount, 
        tablePage, 
        tablePageSize, 
        pagesCount,
        setTablePage 
    }: 
    PaginationProps) {
  return (
    <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">
        <span id="table-info">
            Showing {totalUsersCount === 0 ? 0 : Math.min((tablePage - 1) * tablePageSize + 1, totalUsersCount)}–{Math.min(tablePage * tablePageSize, totalUsersCount)} of {totalUsersCount}
        </span>
        <div className="flex gap-2" id="table-pagination">
        <button
            onClick={() => setTablePage(Math.max(1, tablePage - 1))}
            disabled={tablePage === 1}
            className={`px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${tablePage === 1 ? 'opacity-40 cursor-not-allowed' : ''}`}>
            Prev
        </button>
        {Array.from({ length: pagesCount }, (_, i) => i + 1).map((p) => (
            <button
            key={p}
            onClick={() => setTablePage(p)}
            className={`px-3 py-1 text-xs rounded-lg ${p === tablePage ? 'accent-bg text-white' : 'border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'} transition-colors`}>
            {p}
            </button>
        ))}
        <button
            onClick={() => setTablePage(Math.min(pagesCount, tablePage + 1))}
            disabled={tablePage === pagesCount || pagesCount === 0}
            className={`px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${tablePage === pagesCount || pagesCount === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}>
            Next
        </button>
        </div>
    </div>
  )
}
