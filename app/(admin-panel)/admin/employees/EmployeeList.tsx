"use client"
import { useState } from 'react';
import { Employee, EmployeeTableHead } from '@/features/employee/employeeInterface';
import TableHead from '@/components/ui/TableHead';
import { SortState } from '@/store/commonInterface';
import { EMPLOYEE_COLUMNS } from '@/features/employee/employeeConstant';
import EmployeeFilterPanel from './EmployeeFilterPanel';
import TableFooter from '@/components/ui/TableFooter';
import { DEFAULT_PAGINATION } from '@/store/commonConstants';

export default function EmployeeList() {
  const [sortState, setSortState] = useState<SortState<EmployeeTableHead>>({ col: "", dir: "asc" });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalUsersCount, setTotalUsersCount] = useState(200);
  const [tablePageSize, setTablePageSize] = useState(DEFAULT_PAGINATION.PER_PAGE);
  const [tablePage, setTablePage] = useState(1);
  
  return (
      <div className=" bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <EmployeeFilterPanel/>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead<EmployeeTableHead>
              columns={EMPLOYEE_COLUMNS}
              sortState={sortState}
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
        <TableFooter
            totalDataCount={totalUsersCount}
            tablePage={tablePage}
            tablePageSize={tablePageSize}
            setTablePage={setTablePage}
            setTablePageSize={setTablePageSize}
          />
      </div>
  )
}
