import { SortState, TableColumn } from "@/store/commonInterface";
import { FaFilter } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { hexToRgba, useTheme } from "@/theme";  
import { t } from "i18next";
import useNumberFormatter from "@/hooks/useNumberFormatter";

interface TableHeadProps<T> {
  sortState: SortState<T>;
  setSortState: React.Dispatch<React.SetStateAction<SortState<T>>>;
  columns: TableColumn<T>[];
  setOpenColumnModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TableHead<T>({
  sortState,
  setSortState,
  columns,
  setOpenColumnModal,
}: TableHeadProps<T>) {

  const sortTable = (column: keyof T) => {
    setSortState(prev => {
      if (prev.col === column) {
        return { col: column, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      } else {
        return { col: column, dir: 'asc' };
      }
    });
  }
  const { accentColor } = useTheme();
  const formatNumber = useNumberFormatter();

  return (
    <thead>
      <tr className="bg-slate-50 dark:bg-slate-700/40 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        <th className="px-4 py-3 text-center font-semibold border-r border-gray-200 dark:border-gray-900">
          <div className="relative inline-flex group overflow-visible">
            <button
              type="button"
              onClick={() => setOpenColumnModal(true)}
              className="
                relative
                flex items-center justify-center
                p-2 rounded-xl
                transition-all duration-300 ease-out
                hover:scale-110
                hover:-translate-y-0.5
                hover:shadow-lg
                hover:bg-slate-100
                dark:hover:bg-slate-700
                active:scale-95
              "
            >
              <FaFilter className="text-xs transition-transform duration-300 group-hover:rotate-12" />

              {/* Badge */}
              <span
                    style={{ backgroundColor: accentColor }}
                    className="
                      absolute -top-1 -right-1
                      min-w-4 h-4 px-1
                      rounded-full
                      text-[10px] text-white
                      flex items-center justify-center
                    "
                  >
                    { formatNumber(columns.filter(c => c.isVisible).length)}
                  </span>
            </button>

            {/* Tooltip */}
            <div
              style={{
                backgroundColor: accentColor,
              }}
              className="
                absolute left-full top-1/2 ml-3
                -translate-y-1/2
                z-9999

                rounded-xl
                text-white

                px-3 py-2
                whitespace-nowrap

                shadow-xl

                opacity-0
                scale-95
                translate-x-1

                transition-all duration-200

                pointer-events-none

                group-hover:opacity-100
                group-hover:scale-100
                group-hover:translate-x-0
              "
            >
              <div className="font-medium">
                {t('common:filter_columns')}
              </div>

              <div className="text-xs text-white/80 mt-1">
              {t("common:visibleColumns", {
                visible: formatNumber(columns.filter(c => c.isVisible).length),
                total: formatNumber(columns.length),
              })}
                {/* {columns.filter(c => c.isVisible).length} of {columns.length} visible */}
              </div>
            </div>
          </div>
        </th>
        {columns
          .filter(column => column.isVisible)
          .map((column) => (
            <th
              key={String(column.key)}
              className={`px-4 py-3 text-left font-semibold  border-r border-gray-200 dark:border-gray-900 ${
                column.isSort ? "cursor-pointer select-none" : ""
              }`}
              onClick={() => {
                if (column.isSort) {
                  sortTable(column.key);
                }
              }}
            >
              <div className="flex items-center gap-1">
                <span>{t(column.label)}</span>

                {column.isSort &&
                  sortState.col === column.key &&
                  (sortState.dir === "asc" ? (
                    <IoMdArrowRoundUp className="shrink-0" />
                  ) : (
                    <IoMdArrowRoundDown className="shrink-0" />
                  ))}
              </div>
            </th>
          ))}

        <th className="px-4 py-3 text-left font-semibold">
          {t('common:action')}
        </th>
      </tr>
    </thead>
  );
}
