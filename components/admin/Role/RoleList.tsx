import ContentCard from '@/components/ui/ContentCard'
import { useMemo, useState } from 'react'
import RoleFilterPanel from './RoleFilterPanel'
import { DEFAULT_SEARCH } from '@/store/commonConstants';
import { SortState, TableColumn } from '@/store/common.types';
import { ROLE_COLUMNS } from '@/features/rolepermission/rolePermissionConstant';
import {RoleTableHead } from '@/features/rolepermission/rolepermission.types';
import SkeletonTable from '@/components/ui/skeleton/SkeletonTable';
import { useGetRolesQuery } from '@/features/rolepermission/rolePermissionApi';
import { useSortableData } from '@/hooks/useSortableData';
import TableHead from '@/components/ui/table/TableHead';
import RoleTableBody from './RoleTableBody';
import Table from '@/components/ui/table/Table';
import ColumnSelectorModal from '@/components/ui/modal/ColumnSelectorModal';

export default function RoleList() {
  const withPrefix = (
    fields: string[],
    prefix: string
  ) => fields.map(field => `${prefix}${field}`);
  const [draftSearchTerm, setDraftSearchTerm] = useState(DEFAULT_SEARCH.SEARCH_TERM)
  const [columns, setColumns] = useState<TableColumn<RoleTableHead>[]>(ROLE_COLUMNS);
  const [searchFields, setSearchFields] = useState(["name"])
  const [sortState, setSortState] = useState<SortState<RoleTableHead>>({ col: "id", dir: "asc" });
  const [searchStatus, setSearchStatus] = useState(DEFAULT_SEARCH.NUMBER)
    
  const {data: roleResponse, isLoading} = useGetRolesQuery()

  const roleList = useSortableData(roleResponse?.data, sortState)
  const [openColumnModal, setOpenColumnModal] = useState(false);
  
  const filteredRoles = useMemo(() => {
    return roleList.filter((role) => {
      const matchesName =
        !draftSearchTerm.trim() ||
        role.name
          .toLowerCase()
          .includes(draftSearchTerm.trim().toLowerCase());

      const matchesStatus =
        searchStatus === DEFAULT_SEARCH.NUMBER ||
        (searchStatus === 1 && role.status === "assigned") ||
        (searchStatus === 2 && role.status === "not assigned");

      return matchesName && matchesStatus;
    });
  }, [roleList, draftSearchTerm, searchStatus]);

  return (

    <ContentCard>
        <RoleFilterPanel 
          searchFields = {withPrefix(searchFields, "roles:")}
          searchTerm = {draftSearchTerm}
          setSearchTerm = {setDraftSearchTerm}
          searchStatus={searchStatus}
          setSearchStatus={setSearchStatus}
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
              roleList={filteredRoles}
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
