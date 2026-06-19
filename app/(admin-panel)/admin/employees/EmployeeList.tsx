"use client"
import SkeletonSelect from '@/components/ui/SkeletonSelect';
import { useGetEmployeeResourcesQuery } from '@/features/employee/employeeApi';
import AppSelect from '@/components/ui/select/AppReactSelect';
import AppInput from '@/components/ui/input/AppInput';
import AppButton from '@/components/ui/button/AppButton';
import { useState } from 'react';
import { Employee, EmployeeSortType, EmployeeTableHead } from '@/features/employee/employeeInterface';
import TableHead from '@/components/ui/TableHead';
import { SortState } from '@/store/commonInterface';
import { EMPLOYEE_COLUMNS } from '@/features/employee/employeeConstant';
import EmployeeFilterPanel from './EmployeeFilterPanel';
import Pagination from '@/components/ui/Pagination';

export default function EmployeeList() {
  const [sortState, setSortState] = useState<SortState<EmployeeTableHead>>({ col: "", dir: "asc" });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [tablePage, setTablePage] = useState(1);
  // const tablePageSize = 5;
  
  return (
      <div className=" bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <EmployeeFilterPanel/>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead<EmployeeTableHead>
              columns={EMPLOYEE_COLUMNS}
              sortState={sortState}
              // sortTable={sortTable}
              setSortState={setSortState}
            />
            <tbody id="employee-table-body">
              {employees.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
            totalDataCount={totalUsersCount}
            tablePage={tablePage}
            tablePageSize={tablePageSize}
            pagesCount={pagesCount}
            setTablePage={setTablePage}
            setTablePageSize={setTablePageSize}
          />
      </div>
  )
}
