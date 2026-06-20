import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import AppCustomButton from './button/AppCustomButton';
import AppReactSelect from './select/AppReactSelect';
import { DEFAULT_PAGINATION } from '@/store/commonConstants';

interface PaginationProps {
    totalDataCount: number; 
    tablePage: number; 
    tablePageSize: number;
    setTablePage: (page: number) => void; 
    setTablePageSize: (size: number) => void; // 👈 add this
}

export default function TableFooter({
    totalDataCount,
    tablePage,
    tablePageSize,
    setTablePage,
    setTablePageSize,
}: PaginationProps) {
  const pageOptions = DEFAULT_PAGINATION.PAGE_OPTIONS;
  const pagesCount = Math.ceil(totalDataCount / tablePageSize);

  const getVisiblePages = () => {
    const delta = 2;
    const range: number[] = [];

    for (
      let i = Math.max(1, tablePage - delta);
      i <= Math.min(pagesCount, tablePage + delta);
      i++
    ) {
      range.push(i);
    }

    return range;
  };

  const visiblePages = getVisiblePages();
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

          <div id="table-pagination" className="flex flex-wrap items-center gap-2">

            {/* First */}
            <AppCustomButton
              variant="outline"
              onClick={() => setTablePage(1)}
              disabled={tablePage === 1}
            >
              <FiChevronsLeft/>
            </AppCustomButton>

            {/* Prev */}
            <AppCustomButton
              variant="outline"
              onClick={() => setTablePage(tablePage - 1)}
              disabled={tablePage === 1}
            >
              Prev
            </AppCustomButton>

            {/* First page */}
            {visiblePages[0] > 1 && (
              <>
                <AppCustomButton variant="outline" onClick={() => setTablePage(1)}>
                  1
                </AppCustomButton>
                {visiblePages[0] > 2 && (
                  <span className="px-1 text-slate-400">...</span>
                )}
              </>
            )}

            {/* Middle pages */}
            {visiblePages.map((page) => (
              <AppCustomButton
                key={page}
                variant={page === tablePage ? "solid" : "outline"}
                onClick={() => setTablePage(page)}
              >
                {page}
              </AppCustomButton>
            ))}

            {/* Last page */}
            {visiblePages[visiblePages.length - 1] < pagesCount && (
              <>
                {visiblePages[visiblePages.length - 1] < pagesCount - 1 && (
                  <span className="px-1 text-slate-400">...</span>
                )}

                <AppCustomButton variant="outline" onClick={() => setTablePage(pagesCount)}>
                  {pagesCount}
                </AppCustomButton>
              </>
            )}

            {/* Next */}
            <AppCustomButton
              variant="outline"
              onClick={() => setTablePage(tablePage + 1)}
              disabled={tablePage === pagesCount}
            >
              Next
            </AppCustomButton>

            {/* Last */}
            <AppCustomButton
              variant="outline"
              onClick={() => setTablePage(pagesCount)}
              disabled={tablePage === pagesCount}
            >
              <FiChevronsRight/>
            </AppCustomButton>

          </div>
        </div>
      );
  }
