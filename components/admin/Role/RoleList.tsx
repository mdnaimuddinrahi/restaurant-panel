import ContentCard from '@/components/ui/ContentCard'
import React, { useEffect, useMemo, useState } from 'react'
import RoleFilterPanel from './RoleFilterPanel'
import { DEFAULT_PAGINATION, DEFAULT_SEARCH } from '@/store/commonConstants';
import { SortState, TableColumn } from '@/store/common.types';
import { ROLE_COLUMNS } from '@/features/rolepermission/rolePermissionConstant';
import { GetRolesRequest, RoleTableHead } from '@/features/rolepermission/rolepermission.types';
import SkeletonTable from '@/components/ui/skeleton/SkeletonTable';
import { useGetRolesQuery } from '@/features/rolepermission/rolePermissionApi';
import { useSortableData } from '@/hooks/useSortableData';
import TableHead from '@/components/ui/table/TableHead';
import RoleTableBody from './RoleTableBody';

export default function RoleList() {
  const withPrefix = (
    fields: string[],
    prefix: string
  ) => fields.map(field => `${prefix}${field}`);
  const [draftSearchTerm, setDraftSearchTerm] = useState(DEFAULT_SEARCH.SEARCH_TERM)
  const [lastPage, setLastPage] = useState(DEFAULT_PAGINATION.LAST_PAGE)
  const [total, setTotal] = useState(DEFAULT_PAGINATION.TOTAL)
  const [columns, setColumns] = useState<TableColumn<RoleTableHead>[]>(ROLE_COLUMNS);
  ///
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGINATION.CURRENT_PAGE);
  const [perPage, setPerPage] = useState(DEFAULT_PAGINATION.PER_PAGE)
  const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH.SEARCH_TERM)
  const [roleStatus, setRoleStatus] = useState(DEFAULT_SEARCH.NUMBER);
  const [searchFields, setSearchFields] = useState(["name"])
  const [sortType, setSortType] = useState(DEFAULT_SEARCH.SORT_TYPE)
  const [sortBy, setSortBy] = useState(DEFAULT_SEARCH.SORT_BY)
  const [sortState, setSortState] = useState<SortState<RoleTableHead>>({ col: "id", dir: "asc" });
    
    
  const searchParams: GetRolesRequest = useMemo(
    () => ({
      status: roleStatus,
      paginate: DEFAULT_PAGINATION.PAGINATE,
      page_name: DEFAULT_PAGINATION.PAGE_NAME,
      page: currentPage,
      per_page: perPage,
      search_term: searchTerm,
      search_fields: searchFields.join(','),
      sort_type: sortType,
      sort_by: sortBy,
      
    }), [
      currentPage,
      perPage,
      searchTerm,
      searchFields,
      sortType,
      sortBy,
      roleStatus,
    ])
  const {data: roleResponse, isLoading} = useGetRolesQuery(searchParams)

  useEffect(() => {
    if (!roleResponse?.meta) return;

    setTotal(roleResponse.meta.total ?? DEFAULT_PAGINATION.TOTAL);
    setPerPage(roleResponse.meta.per_page ?? DEFAULT_PAGINATION.PER_PAGE);
    setCurrentPage(roleResponse.meta.current_page ?? DEFAULT_PAGINATION.CURRENT_PAGE);
    setLastPage(roleResponse.meta.last_page ?? DEFAULT_PAGINATION.LAST_PAGE);
    // setBloodGroup(DEFAULT_SEARCH.NUMBER)
  }, [roleResponse?.meta]);
  const roleList = useSortableData(roleResponse?.data, sortState)
  const [openColumnModal, setOpenColumnModal] = useState(false);

  return (

    <ContentCard>
        <RoleFilterPanel 
          searchFields = {withPrefix(searchFields, "role:")}
          searchTerm = {draftSearchTerm}
          setSearchTerm = {setDraftSearchTerm}
          onSearch={() => {
              setCurrentPage(1);
              setSearchTerm(draftSearchTerm)
          }}
        />
        {isLoading ? <SkeletonTable columns={4}/> : 
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead<RoleTableHead>
                columns={columns}
                sortState={sortState}
                setSortState={setSortState}
                setOpenColumnModal={setOpenColumnModal}
              />
              <RoleTableBody
                roleList={roleList}
                columns={columns}/>
            </table>
          </div>
        </div>}
    </ContentCard>
  )
}
