import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
// import AppCustomButton from './button/AppCustomButton';
import { PaginationProps } from '@/store/common.types';
// import AppSelect from './input/AppSelect';
import { t } from 'i18next';
import useNumberFormatter from '@/hooks/useNumberFormatter';
import AppSelect from '../input/AppSelect';
import AppCustomButton from '../button/AppCustomButton';

export default function TableFooter({
    totalDataCount,
    tablePage,
    tablePageSize,
    setTablePage,
    setTablePageSize,
}: PaginationProps) {
  
 const formatNumber = useNumberFormatter();

  const pageOptions = [
    { label: formatNumber(5), value: 5 },
    { label: formatNumber(10), value: 10 },
    { label: formatNumber(100), value: 100 },
  ];
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
  const from =
    totalDataCount === 0
      ? 0
      : Math.min(
          (tablePage - 1) * tablePageSize + 1,
          totalDataCount
        );

  const to = Math.min(
    tablePage * tablePageSize,
    totalDataCount
  );
  const visiblePages = getVisiblePages();
      return (
          <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">

          {/* LEFT: info + page size */}
          <div className="flex items-center gap-4">
            <span id="table-info">
              {t("main:content.tableInfo", {
                from: formatNumber(from),
                to: formatNumber(to),
                total: formatNumber(totalDataCount),
              })}
            </span>
          </div>
          <div className="">
              {/* Page size dropdown */}
              <AppSelect
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
              {t('main:button.previous')}
            </AppCustomButton>

            {/* First page */}
            {visiblePages[0] > 1 && (
              <>
                <AppCustomButton variant="outline" onClick={() => setTablePage(1)}>
                  {formatNumber(1)}
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
                {formatNumber(page)}
              </AppCustomButton>
            ))}

            {/* Last page */}
            {visiblePages[visiblePages.length - 1] < pagesCount && (
              <>
                {visiblePages[visiblePages.length - 1] < pagesCount - 1 && (
                  <span className="px-1 text-slate-400">...</span>
                )}

                <AppCustomButton variant="outline" onClick={() => setTablePage(pagesCount)}>
                  {formatNumber(pagesCount)}
                </AppCustomButton>
              </>
            )}

            {/* Next */}
            <AppCustomButton
              variant="outline"
              onClick={() => setTablePage(tablePage + 1)}
              disabled={tablePage === pagesCount}
            >
              {t('main:button.next')}
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
