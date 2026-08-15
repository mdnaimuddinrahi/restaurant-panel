import AppSearchInput from '@/components/ui/input/AppSearchInput'
import AppSelect from '@/components/ui/input/AppSelect'
import { EmployeTypeFilterPanelProps } from '@/features/employee_type/employeeType.types'
import { ResourceOption } from '@/store/common.types'
import { DEFAULT_SEARCH, STATUS_ACTIVE, STATUS_INACTIVE } from '@/store/commonConstants'
import { t } from 'i18next'
import React from 'react'
import { SingleValue } from 'react-select'

export default function EmployeeTypeFilterPanel({
  searchFields,
  searchTerm,
  setSearchTerm,
  searchStatus,
  setSearchStatus,
}: EmployeTypeFilterPanelProps) {
  const statusOption = [{'value': STATUS_ACTIVE, 'label': t("main:status.active")}, {'value': STATUS_INACTIVE, 'label': t("main:status.inactive")}]
 
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3 mt-1 p-3">
          <AppSelect
            options={statusOption}
            value={statusOption?.find(o => o.value === searchStatus)}
            onChange={(option: SingleValue<ResourceOption>) => {
              setSearchStatus(option?.value ?? DEFAULT_SEARCH.NUMBER)
            }}
            isClearable
          />
          <AppSearchInput
            setSearchTerm={setSearchTerm}
            searchFields={searchFields}
          />
    </div>
  )
}
