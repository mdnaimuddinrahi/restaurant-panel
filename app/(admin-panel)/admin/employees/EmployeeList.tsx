"use client"
import { useEffect, useMemo, useState } from 'react';
import { Employee, EmployeeTableHead, GetEmployeesRequests } from '@/features/employee/employeeInterface';
import TableHead from '@/components/ui/TableHead';
import { SortState, TableColumn } from '@/store/commonInterface';
import { EMPLOYEE_COLUMNS } from '@/features/employee/employeeConstant';
import EmployeeFilterPanel from './EmployeeFilterPanel';
import TableFooter from '@/components/ui/TableFooter';
import { DEFAULT_PAGINATION, DEFAULT_SEARCH } from '@/store/commonConstants';
import { useGetEmployeeResourcesQuery, useGetEmployeesQuery } from '@/features/employee/employeeApi';
import ColumnSelectorModal from '@/components/ui/modal/ColumnSelectorModal';
import EmployeeTableBody from './EmployeeTableBody';

export default function EmployeeList() {
  const [sortState, setSortState] = useState<SortState<EmployeeTableHead>>({ col: "id", dir: "asc" });
  const [bloodGroup, setBloodGroup] = useState(DEFAULT_SEARCH.NUMBER);
  const [employeeDesignation, setEmployeeDesignation] = useState(DEFAULT_SEARCH.NUMBER);
  const [employeeType, setEmployeeType] = useState(DEFAULT_SEARCH.NUMBER);
  const [gender, setGender] = useState(DEFAULT_SEARCH.NUMBER);
  const [maritalStatus, setMaritalStatus] = useState(DEFAULT_SEARCH.NUMBER);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGINATION.CURRENT_PAGE);
  const [lastPage, setLastPage] = useState(DEFAULT_PAGINATION.LAST_PAGE)
  const [perPage, setPerPage] = useState(DEFAULT_PAGINATION.PER_PAGE)
  const [total, setTotal] = useState(DEFAULT_PAGINATION.TOTAL)
  const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH.SEARCH_TERM)
  const [searchFields, setSearchFields] = useState(["name","email","phone"])
  const [sortType, setSortType] = useState(DEFAULT_SEARCH.SORT_TYPE)
  const [sortBy, setSortBy] = useState(DEFAULT_SEARCH.SORT_BY)
  const [columns, setColumns] = useState<TableColumn<EmployeeTableHead>[]>(EMPLOYEE_COLUMNS);
  const [draftBloodGroup, setDraftBloodGroup] = useState(-1);
  const [draftEmployeeDesignation, setDraftEmployeeDesignation] = useState(-1);
  const [draftEmployeeType, setDraftEmployeeType] = useState(-1);
  const [draftGender, setDraftGender] = useState(-1);
  const [draftMaritalStatus, setDraftMaritalStatus] = useState(-1);
  const [draftSearchTerm, setDraftSearchTerm] = useState(DEFAULT_SEARCH.SEARCH_TERM)

  const {data: resourceResponse, 
          isLoading: resourceIsLoading} = useGetEmployeeResourcesQuery()
  const bloodGroupOption = resourceResponse?.data?.blood_groups;
  const employeeDesignationOption = resourceResponse?.data?.employee_designations;
  const employeeTypeOption = resourceResponse?.data?.employee_types;
  const genderOption = resourceResponse?.data?.genders;
  const maritalStatusOption = resourceResponse?.data?.marital_status;

  const searchParams: GetEmployeesRequests = useMemo(
    () => ({
      paginate: DEFAULT_PAGINATION.PAGINATE,
      page_name: DEFAULT_PAGINATION.PAGE_NAME,
      page: currentPage,
      per_page: perPage,
      search_term: searchTerm,
      search_fields: searchFields.join(','),
      sort_type: sortType,
      sort_by: sortBy,
      blood_group: bloodGroup,
      employee_designation: employeeDesignation,
      employee_type: employeeType,
      gender: gender,
      marital_status: maritalStatus,
    }), [
      currentPage,
      perPage,
      searchTerm,
      searchFields,
      sortType,
      sortBy,
      bloodGroup,
      employeeDesignation,
      employeeType,
      gender,
      maritalStatus,
    ]
  )
  const {data: employeesResponse, isLoading} = useGetEmployeesQuery(searchParams)
 
  useEffect(() => {
    if (!employeesResponse?.meta) return;

    setTotal(employeesResponse.meta.total ?? DEFAULT_PAGINATION.TOTAL);
    setPerPage(employeesResponse.meta.per_page ?? DEFAULT_PAGINATION.PER_PAGE);
    setCurrentPage(employeesResponse.meta.current_page ?? DEFAULT_PAGINATION.CURRENT_PAGE);
    setLastPage(employeesResponse.meta.last_page ?? DEFAULT_PAGINATION.LAST_PAGE);
    setBloodGroup(DEFAULT_SEARCH.NUMBER)
  }, [employeesResponse?.meta]);

  const employees = useMemo(() => {
    const data = [...(employeesResponse?.data ?? [])]

    if (!sortState.col) return data;

      data.sort((a, b) => {
        const aValue = a[sortState.col];
        const bValue = b[sortState.col];

        if (aValue == null || bValue == null) return 0;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortState.dir === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortState.dir === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      });

      return data;
  }, [employeesResponse?.data, sortState]);

  const [openColumnModal, setOpenColumnModal] = useState(false);
  const withPrefix = (
    fields: string[],
    prefix: string
  ) => fields.map(field => `${prefix}${field}`);

  return (
      <div className=" bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <EmployeeFilterPanel
          resourceIsLoading={resourceIsLoading}
          bloodGroupOption={bloodGroupOption ?? []}
          employeeDesignationOption={employeeDesignationOption ?? []}
          employeeTypeOption={employeeTypeOption ?? []}
          genderOption={genderOption ?? []}
          maritalStatusOption={maritalStatusOption ?? []}
          bloodGroup={draftBloodGroup}
          setBloodGroup={setDraftBloodGroup}
          employeeDesignation={draftEmployeeDesignation}
          setEmployeeDesignation={setDraftEmployeeDesignation}
          employeeType={draftEmployeeType}
          setEmployeeType={setDraftEmployeeType}
          gender={draftGender}
          setGender={setDraftGender}
          maritalStatus={draftMaritalStatus}
          setMaritalStatus={setDraftMaritalStatus}
          searchTerm = {draftSearchTerm}
          setSearchTerm = {setDraftSearchTerm}
          onSearch={() => {
              setBloodGroup(draftBloodGroup);
              setEmployeeDesignation(draftEmployeeDesignation);
              setEmployeeType(draftEmployeeType);
              setGender(draftGender);
              setMaritalStatus(draftMaritalStatus);
              setCurrentPage(1);
              setSearchTerm(draftSearchTerm)
          }}
          searchFields = {withPrefix(searchFields, "employee:")}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead<EmployeeTableHead>
              columns={columns}
              sortState={sortState}
              setSortState={setSortState}
              setOpenColumnModal={setOpenColumnModal}
            />
            <EmployeeTableBody
              bloodGroupOption={bloodGroupOption ?? []}
              employeeDesignationOption={employeeDesignationOption ?? []}
              employeeTypeOption={employeeTypeOption ?? []}
              genderOption={genderOption ?? []}
              maritalStatusOption={maritalStatusOption ?? []}
              employees={employees} 
              columns={columns}/>
          </table>
        </div>
        <TableFooter
          totalDataCount={total}
          tablePage={currentPage}
          tablePageSize={perPage}
          setTablePage={setCurrentPage}
          setTablePageSize={setPerPage}
        />
        <ColumnSelectorModal<EmployeeTableHead>
          open={openColumnModal}
          onClose={() => setOpenColumnModal(false)}
          columns={columns}
          setColumns={setColumns}
        />
      </div>
  )
}
