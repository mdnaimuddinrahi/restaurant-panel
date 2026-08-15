import ContentCard from '@/components/ui/ContentCard'
import { EmployeeTypeTableHead } from '@/features/employee_type/employeeType.types';
import { useGetEmployeeTypesQuery } from '@/features/employee_type/employeeTypeApi';
import { EMPLOYEE_TYPE_COLUMNS } from '@/features/employee_type/employeeTypeConstant';
import { useSortableData } from '@/hooks/useSortableData';
import { SortState, TableColumn } from '@/store/common.types';
import { DEFAULT_SEARCH } from '@/store/commonConstants';
import React, { useMemo, useState } from 'react'
import EmployeeTypeFilterPanel from './EmployeeTypeFilterPanel';
import SkeletonTable from '@/components/ui/skeleton/SkeletonTable';
import Table from '@/components/ui/table/Table';
import TableHead from '@/components/ui/table/TableHead';
import EmployeeTypeBody from './EmployeeTypeBody';
import ColumnSelectorModal from '@/components/ui/modal/ColumnSelectorModal';

export default function EmployeeTypeList() {
  const withPrefix = (
    fields: string[],
    prefix: string
  ) => fields.map(field => `${prefix}${field}`);
  const [draftSearchTerm, setDraftSearchTerm] = useState(DEFAULT_SEARCH.SEARCH_TERM)
  const [columns, setColumns] = useState<TableColumn<EmployeeTypeTableHead>[]>(EMPLOYEE_TYPE_COLUMNS);
  const [searchFields, setSearchFields] = useState(["name", "code"])
  const [sortState, setSortState] = useState<SortState<EmployeeTypeTableHead>>({ col: "id", dir: "asc" });
  const {data: employeeTypeResponse, isLoading} = useGetEmployeeTypesQuery()
  const employeeTypeList = useSortableData(employeeTypeResponse?.data, sortState)
  const [openColumnModal, setOpenColumnModal] = useState(false);
  const [searchStatus, setSearchStatus] = useState(DEFAULT_SEARCH.NUMBER); 

const filteredEmployeeTypes = useMemo(() => {
    const search = draftSearchTerm.trim().toLowerCase();

    return employeeTypeList.filter((eachData) => {
        const matchesSearch =
            !search ||
            eachData.name.toLowerCase().includes(search) ||
            eachData.code.toLowerCase().includes(search);

        const matchesStatus =
            searchStatus == DEFAULT_SEARCH.NUMBER ||
            eachData.status == searchStatus;

        return matchesSearch && matchesStatus;
    });
}, [employeeTypeList, draftSearchTerm, searchStatus]);

  return (
    <ContentCard>
      <EmployeeTypeFilterPanel
        searchFields = {withPrefix(searchFields, "employee_types:")}
        searchTerm = {draftSearchTerm}
        setSearchTerm = {setDraftSearchTerm}
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
      />
      {isLoading ? <SkeletonTable columns={4}/> : 
        <div>
          <Table>
            <TableHead<EmployeeTypeTableHead>
              columns={columns}
              sortState={sortState}
              setSortState={setSortState}
              setOpenColumnModal={setOpenColumnModal}
            />
            <EmployeeTypeBody
              dataList={filteredEmployeeTypes}
              columns={columns}
            />
          </Table>
        </div>}
        <ColumnSelectorModal<EmployeeTypeTableHead>
          open={openColumnModal}
          onClose={() => setOpenColumnModal(false)}
          columns={columns}
          setColumns={setColumns}
        />
    </ContentCard>
  )
}
