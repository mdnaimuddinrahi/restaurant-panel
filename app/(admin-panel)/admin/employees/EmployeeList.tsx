"use client"
import SkeletonSelect from '@/components/ui/SkeletonSelect';
import { useGetEmployeeResourcesQuery } from '@/features/employee/employeeApi';
import AppSelect from '@/components/ui/select/AppSelect';
import AppInput from '@/components/ui/input/AppInput';
import AppButton from '@/components/ui/button/AppButton';
import { useState } from 'react';
import { Employee, EmployeeSortType, EmployeeTableHead } from '@/features/employee/employeeInterface';
import TableHead from '@/components/ui/TableHead';
import { SortState } from '@/store/commonInterface';
import { EMPLOYEE_COLUMNS } from '@/features/employee/employeeConstant';

export default function EmployeeList() {
  const {data: resourceResponse, isLoading: resourceIsLoading, isError: resourceIsError, isFetching: resourceIsFetching} = useGetEmployeeResourcesQuery()
  const bloodGroupOption = resourceResponse?.data?.blood_groups;
  const employeeDesignation = resourceResponse?.data?.employee_designations;
  const employeeType = resourceResponse?.data?.employee_types;
  const gender = resourceResponse?.data?.genders;
  const maritalStatus = resourceResponse?.data?.marital_status;
  const [sortState, setSortState] = useState<SortState<EmployeeTableHead>>({ col: "", dir: "asc" });
  
  return (
      <div className="h-100 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div id="filterPanel">
          {resourceIsLoading ? <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3 mt-4 p-3">
                <SkeletonSelect />
                <SkeletonSelect />
                <SkeletonSelect />
                <SkeletonSelect />
                <SkeletonSelect />
            </div>: 
            <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3 mt-4 p-3">
              <AppSelect
                options={bloodGroupOption}
                placeholder="Blood Group"
              />
              <AppSelect
                options={employeeDesignation}
                placeholder="Employee Designation"
              />
              <AppSelect
                options={employeeType}
                placeholder="Employee Type"
              />
              <AppSelect
                options={gender}
                placeholder="Gender"
              /> 
              <AppSelect
                options={maritalStatus}
                placeholder="Marital Status"
              />
              <AppInput placeholder="Search..." />
              <AppButton>
                Search
              </AppButton>
            </div>
          }
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead<EmployeeTableHead>
              columns={EMPLOYEE_COLUMNS}
              sortState={sortState}
              // sortTable={sortTable}
              setSortState={setSortState}
            />
            <tbody id="employee-table-body">

            </tbody>
          </table>
        </div>
      </div>
  )
}
