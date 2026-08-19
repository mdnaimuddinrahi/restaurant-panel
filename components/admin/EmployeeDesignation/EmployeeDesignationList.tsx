import ContentCard from '@/components/ui/ContentCard';
import { useGetEmployeeDesignationsQuery } from '@/features/employee_designation/employeeDesignationApi';
import { EMPLOYEE_DESIGNATION_COLUMNS } from '@/features/employee_designation/employeeDesignationConstant';
import { EmployeeDesignationTableHead } from '@/features/employee_designation/employeeDesignationType.types';
import { useSortableData } from '@/hooks/useSortableData';
import { SortState, TableColumn } from '@/store/common.types';
import { DEFAULT_SEARCH } from '@/store/commonConstants';
import React, { useMemo, useState } from 'react'
import EmployeeDesignationFilterPanel from './EmployeeDesignationFilterPanel';
import SkeletonTable from '@/components/ui/skeleton/SkeletonTable';
import Table from '@/components/ui/table/Table';
import TableHead from '@/components/ui/table/TableHead';
import EmployeeDesignationBody from './EmployeeDesignationBody';
import ColumnSelectorModal from '@/components/ui/modal/ColumnSelectorModal';

export default function EmployeeDesignationList() {
  const withPrefix = (
    fields: string[],
    prefix: string
  ) => fields.map(field => `${prefix}${field}`);
  const [draftSearchTerm, setDraftSearchTerm] = useState<string>(DEFAULT_SEARCH.SEARCH_TERM)
  const [columns, setColumns] = useState<TableColumn<EmployeeDesignationTableHead>[]>(EMPLOYEE_DESIGNATION_COLUMNS);
  const [searchFields, setSearchFields] = useState<string[]>(["name"])
  const [sortState, setSortState] = useState<SortState<EmployeeDesignationTableHead>>({ col: "id", dir: "asc" });
  const [searchStatus, setSearchStatus] = useState<number>(DEFAULT_SEARCH.NUMBER); 
  const [openColumnModal, setOpenColumnModal] = useState<boolean>(false);
  
  const {data: dataListResponse, isLoading} = useGetEmployeeDesignationsQuery()
  const dataList = useSortableData(dataListResponse?.data, sortState)
    
  const filteredDataList = useMemo(() => {
      const search = draftSearchTerm.trim().toLowerCase();

      return dataList.filter((eachData) => {
          const matchesSearch =
              !search ||
              eachData.name.toLowerCase().includes(search);

          const matchesStatus =
              searchStatus == DEFAULT_SEARCH.NUMBER ||
              eachData.status == searchStatus;

          return matchesSearch && matchesStatus;
      });
  }, [dataList, draftSearchTerm, searchStatus]);


  return (
    <ContentCard>
      <EmployeeDesignationFilterPanel
        searchFields = {withPrefix(searchFields, "employee_designations:")}
        searchTerm = {draftSearchTerm}
        setSearchTerm = {setDraftSearchTerm}
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
      />
      {isLoading ? <SkeletonTable columns={4}/> : 
        <div>
          <Table>
            <TableHead<EmployeeDesignationTableHead>
              columns={columns}
              sortState={sortState}
              setSortState={setSortState}
              setOpenColumnModal={setOpenColumnModal}
            />
            <EmployeeDesignationBody
              dataList={filteredDataList}
              columns={columns}
            />
          </Table>
        </div>}
        <ColumnSelectorModal<EmployeeDesignationTableHead>
          open={openColumnModal}
          onClose={() => setOpenColumnModal(false)}
          columns={columns}
          setColumns={setColumns}
        />
    </ContentCard>
  )
}
