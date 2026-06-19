import React from 'react'
import AppReactSelect from './select/AppReactSelect';

interface PaginationProps {
    totalDataCount: number; 
    tablePage: number; 
    tablePageSize: number; 
    pagesCount: number;
    setTablePage: (page: number) => void; 
    setTablePageSize: (size: number) => void; // 👈 add this
}

export default function Pagination({
    totalDataCount,
    tablePage,
    tablePageSize,
    pagesCount,
    setTablePage,
    setTablePageSize,
}: PaginationProps) {
    const pageOptions = [
        { label: "5", value: 5 },
        { label: "10", value: 10 },
        // { label: "50", value: 50 },
        { label: "100", value: 100 },
    ];
    return (
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">

        {/* LEFT: info + page size */}
        <div className="flex items-center gap-4">
            <span id="table-info">
            Showing{" "}
            {totalDataCount === 0
                ? 0
                : Math.min((tablePage - 1) * tablePageSize + 1, totalDataCount)}
            –
            {Math.min(tablePage * tablePageSize, totalDataCount)} of{" "}
            {totalDataCount}
            </span>
        </div>
        <div className="">
            {/* Page size dropdown */}
            <AppReactSelect
                options={pageOptions}
                placeholder="Page Limit"
                value={pageOptions.find(opt => opt.value === tablePageSize)}
                onChange={(option: any) => {
                    setTablePageSize(option.value);
                    setTablePage(1);
                }}
            />
        </div>

        {/* RIGHT: pagination */}
        <div className="flex gap-2" id="table-pagination">
            <button
            onClick={() => setTablePage(Math.max(1, tablePage - 1))}
            disabled={tablePage === 1}
            className={`px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                tablePage === 1 ? "opacity-40 cursor-not-allowed" : ""
            }`}
            >
            Prev
            </button>

            {Array.from({ length: pagesCount }, (_, i) => i + 1).map((p) => (
            <button
                key={p}
                onClick={() => setTablePage(p)}
                className={`px-3 py-1 text-xs rounded-lg ${
                p === tablePage
                    ? "accent-bg text-white"
                    : "border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                } transition-colors`}
            >
                {p}
            </button>
            ))}

            <button
                onClick={() => setTablePage(Math.min(pagesCount, tablePage + 1))}
                disabled={tablePage === pagesCount || pagesCount === 0}
                className={`px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                    tablePage === pagesCount || pagesCount === 0
                    ? "opacity-40 cursor-not-allowed"
                    : ""
                }`}
            >
            Next
            </button>
        </div>
        </div>
    );
}

// export default function Pagination(
//     { 
//         totalDataCount, 
//         tablePage, 
//         tablePageSize, 
//         pagesCount,
//         setTablePage,
//         setTablePageSize, 
//     }: 
//     PaginationProps) {
//   return (
//     <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">
//         <span id="table-info">
//             Showing {totalDataCount === 0 ? 0 : Math.min((tablePage - 1) * tablePageSize + 1, totalDataCount)}–{Math.min(tablePage * tablePageSize, totalDataCount)} of {totalDataCount}
//         </span>
//         <div className="flex gap-2" id="table-pagination">
//         <button
//             onClick={() => setTablePage(Math.max(1, tablePage - 1))}
//             disabled={tablePage === 1}
//             className={`px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${tablePage === 1 ? 'opacity-40 cursor-not-allowed' : ''}`}>
//             Prev
//         </button>
//         {Array.from({ length: pagesCount }, (_, i) => i + 1).map((p) => (
//             <button
//             key={p}
//             onClick={() => setTablePage(p)}
//             className={`px-3 py-1 text-xs rounded-lg ${p === tablePage ? 'accent-bg text-white' : 'border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'} transition-colors`}>
//             {p}
//             </button>
//         ))}
//         <button
//             onClick={() => setTablePage(Math.min(pagesCount, tablePage + 1))}
//             disabled={tablePage === pagesCount || pagesCount === 0}
//             className={`px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${tablePage === pagesCount || pagesCount === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}>
//             Next
//         </button>
//         </div>
//     </div>
//   )
// }
