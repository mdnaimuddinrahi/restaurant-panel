"use client"
import { useEffect, useMemo, useState } from 'react';
import { Employee, EmployeeTableHead, GetEmployeesRequests } from '@/features/employee/employeeInterface';
import TableHead from '@/components/ui/TableHead';
import { SortState, TableColumn } from '@/store/commonInterface';
import { EMPLOYEE_COLUMNS } from '@/features/employee/employeeConstant';
import EmployeeFilterPanel from './EmployeeFilterPanel';
import TableFooter from '@/components/ui/TableFooter';
import { DEFAULT_PAGINATION, DEFAULT_SEARCH } from '@/store/commonConstants';
import { useGetEmployeesQuery } from '@/features/employee/employeeApi';

export default function EmployeeList() {
  const [sortState, setSortState] = useState<SortState<EmployeeTableHead>>({ col: "", dir: "asc" });
  const [bloodGroup, setBloodGroup] = useState(DEFAULT_SEARCH.NUMBER);
  const [employeeDesignation, setEmployeeDesignation] = useState(DEFAULT_SEARCH.NUMBER);
  const [employeeType, setEmployeeType] = useState(DEFAULT_SEARCH.NUMBER);
  const [gender, setGender] = useState(DEFAULT_SEARCH.NUMBER);
  const [martialStatus, setMartialStatus] = useState(DEFAULT_SEARCH.NUMBER);
  const [page, setPage] = useState(DEFAULT_PAGINATION.PAGE);
  const [perPage, setPerPage] = useState(DEFAULT_PAGINATION.PER_PAGE)
  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH.SEARCH_TERM)
  const [searchFields, setSearchFields] = useState(DEFAULT_SEARCH.SEARCH_FIELD)
  const [sortType, setSortType] = useState(DEFAULT_SEARCH.SORT_TYPE)
  const [sortBy, setSortBy] = useState(DEFAULT_SEARCH.SORT_BY)
  

  const searchParams: GetEmployeesRequests = useMemo(
    () => ({
      paginate: DEFAULT_PAGINATION.PAGINATE,
      page_name: DEFAULT_PAGINATION.PAGE_NAME,
      page: page,
      per_page: perPage,
      search_term: searchTerm,
      search_fields: searchFields,
      sort_type: sortType,
      sort_by: sortBy,
      blood_group: bloodGroup,
      employee_designation: employeeDesignation,
      employee_type: employeeType,
      gender: gender,
      martial_status: martialStatus,
    }), [
      page,
      perPage,
      searchTerm,
      searchFields,
      sortType,
      sortBy,
      bloodGroup,
      employeeDesignation,
      employeeType,
      gender,
      martialStatus,
    ]
  )
  const {data: employeesResponse, isLoading} = useGetEmployeesQuery(searchParams)
  const [employees, setEmployees] = useState<Employee[]>([]);
  console.log('employees', employees)
  // console.log('members', members)
  useEffect(() => {
    setEmployees(employeesResponse?.data ?? [])
  }, [employeesResponse?.data])
// {
//     "id": 1,
//     "employee_type_id": 3,
//     "employee_designation_id": 2,
//     "user_id": null,
//     "name": "John Smith",
//     "email": "john.smith@example.com",
//     "phone": "1000000001",
//     "address": "Global Office Location 1",
//     "date_of_birth": "2003-06-09",
//     "date_of_joining": "2025-08-14",
//     "is_active": true,
//     "gender": 3,
//     "profile_img": null,
//     "national_id": "NID-G-00001",
//     "passport_number": "PPT-G-00001",
//     "emergency_contact_name": "Emergency Contact 1",
//     "emergency_contact_phone": "9000000001",
//     "emergency_contact_relation": "Family",
//     "documents": [],
//     "basic_salary": "18459.00",
//     "termination_date": null,
//     "blood_group": 1,
//     "marital_status": 1,
//     "shift_start": "09:00:00",
//     "shift_end": "17:00:00",
//     "created_at": "2026-06-09 17:06:54",
//     "updated_at": null,
//     "created_by": 1,
//     "updated_by": null
// }
  
  return (
      <div className=" bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <EmployeeFilterPanel
          bloodGroup={bloodGroup} 
          setBloodGroup={setBloodGroup}
          employeeDesignation={employeeDesignation} 
          setEmployeeDesignation={setEmployeeDesignation}
          employeeType={employeeType} 
          setEmployeeType={setEmployeeType}
          gender={gender} 
          setGender={setGender}
          martialStatus={martialStatus} 
          setMartialStatus={setMartialStatus}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead<EmployeeTableHead>
              columns={EMPLOYEE_COLUMNS}
              sortState={sortState}
              setSortState={setSortState}
            />
            <tbody id="employee-table-body">
              {employees.length > 0 && (
                <tr>

                </tr>
              )}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <TableFooter
          totalDataCount={total}
          tablePage={page}
          tablePageSize={perPage}
          setTablePage={setPage}
          setTablePageSize={setPerPage}
        />
      </div>
  )
}
