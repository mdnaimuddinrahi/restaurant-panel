import ContentCard from '@/components/ui/ContentCard'
import React, { useEffect, useMemo, useState } from 'react'
import RoleFilterPanel from './RoleFilterPanel'
import { DEFAULT_PAGINATION, DEFAULT_SEARCH } from '@/store/commonConstants';
import { SortState, TableColumn } from '@/store/common.types';
import { ROLE_COLUMNS } from '@/features/rolepermission/rolePermissionConstant';
import {RoleTableHead } from '@/features/rolepermission/rolepermission.types';
import SkeletonTable from '@/components/ui/skeleton/SkeletonTable';
import { useGetRolesQuery } from '@/features/rolepermission/rolePermissionApi';
import { useSortableData } from '@/hooks/useSortableData';
import TableHead from '@/components/ui/table/TableHead';
import RoleTableBody from './RoleTableBody';
import Table from '@/components/ui/table/Table';
import TableFooter from '@/components/ui/table/TableFooter';
import ColumnSelectorModal from '@/components/ui/modal/ColumnSelectorModal';

export default function RoleList() {
  const withPrefix = (
    fields: string[],
    prefix: string
  ) => fields.map(field => `${prefix}${field}`);
  const [draftSearchTerm, setDraftSearchTerm] = useState(DEFAULT_SEARCH.SEARCH_TERM)
  const [columns, setColumns] = useState<TableColumn<RoleTableHead>[]>(ROLE_COLUMNS);
  const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH.SEARCH_TERM)
  const [roleStatus, setRoleStatus] = useState(DEFAULT_SEARCH.NUMBER);
  const [searchFields, setSearchFields] = useState(["name"])
  const [sortType, setSortType] = useState(DEFAULT_SEARCH.SORT_TYPE)
  const [sortBy, setSortBy] = useState(DEFAULT_SEARCH.SORT_BY)
  const [sortState, setSortState] = useState<SortState<RoleTableHead>>({ col: "id", dir: "asc" });
    
    
  // const searchParams: GetRolesRequest = useMemo(
  //   () => ({
  //     status: roleStatus,
  //     search_term: searchTerm,
  //     search_fields: searchFields.join(','),
  //     sort_type: sortType,
  //     sort_by: sortBy,
      
  //   }), [
  //     searchTerm,
  //     searchFields,
  //     sortType,
  //     sortBy,
  //     roleStatus,
  //   ])
  const {data: roleResponse, isLoading} = useGetRolesQuery()

  const roleList = useSortableData(roleResponse?.data, sortState)
  const [openColumnModal, setOpenColumnModal] = useState(false);
  const filterRoles = () => {
    console.log('draftSearchTerm', draftSearchTerm)
  }

  return (

    <ContentCard>
        <RoleFilterPanel 
          searchFields = {withPrefix(searchFields, "roles:")}
          searchTerm = {draftSearchTerm}
          setSearchTerm = {setDraftSearchTerm}
          onSearch={() => {
              // setSearchTerm(draftSearchTerm)
              filterRoles()
          }}
        />
        {isLoading ? <SkeletonTable columns={4}/> : 
        <div>
          <Table>
            <TableHead<RoleTableHead>
              columns={columns}
              sortState={sortState}
              setSortState={setSortState}
              setOpenColumnModal={setOpenColumnModal}
            />
            <RoleTableBody
              roleList={roleList}
              columns={columns}/>
          </Table>
        </div>}
        <ColumnSelectorModal<RoleTableHead>
          open={openColumnModal}
          onClose={() => setOpenColumnModal(false)}
          columns={columns}
          setColumns={setColumns}
        />
    </ContentCard>
  )
}
