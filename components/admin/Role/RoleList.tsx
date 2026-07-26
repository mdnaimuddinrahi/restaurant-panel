import ContentCard from '@/components/ui/ContentCard'
import React, { useState } from 'react'
import RoleFilterPanel from './RoleFilterPanel'
import { DEFAULT_PAGINATION, DEFAULT_SEARCH } from '@/store/commonConstants';
import { EmployeeTableHead } from '@/features/employee/employee.types';
import { TableColumn } from '@/store/commonInterface';
import { ROLE_COLUMNS } from '@/features/rolepermission/rolePermissionConstant';
import { RoleTableHead } from '@/features/rolepermission/rolepermission.types';

export default function RoleList() {
  const withPrefix = (
    fields: string[],
    prefix: string
  ) => fields.map(field => `${prefix}${field}`);
  const [searchFields, setSearchFields] = useState(["name"]);
  const [draftSearchTerm, setDraftSearchTerm] = useState(DEFAULT_SEARCH.SEARCH_TERM)
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGINATION.CURRENT_PAGE);
  const [lastPage, setLastPage] = useState(DEFAULT_PAGINATION.LAST_PAGE)
  const [perPage, setPerPage] = useState(DEFAULT_PAGINATION.PER_PAGE)
  const [total, setTotal] = useState(DEFAULT_PAGINATION.TOTAL)
  const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH.SEARCH_TERM)
  const [sortType, setSortType] = useState(DEFAULT_SEARCH.SORT_TYPE)
  const [sortBy, setSortBy] = useState(DEFAULT_SEARCH.SORT_BY)
  const [columns, setColumns] = useState<TableColumn<RoleTableHead>[]>(ROLE_COLUMNS);   

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
    </ContentCard>
  )
}
