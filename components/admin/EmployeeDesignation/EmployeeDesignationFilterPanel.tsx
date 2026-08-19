import AppSearchInput from '@/components/ui/input/AppSearchInput'
import AppSelect from '@/components/ui/input/AppSelect'
import { EmployeeDesignationFilterPanelProps } from '@/features/employee_designation/employeeDesignationType.types'
import { ResourceOption } from '@/store/common.types'
import { DEFAULT_SEARCH, STATUS_ACTIVE, STATUS_INACTIVE } from '@/store/commonConstants'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SingleValue } from 'react-select'

export default function EmployeeDesignationFilterPanel({
  searchFields,
  searchTerm,
  setSearchTerm,
  searchStatus,
  setSearchStatus,
}: EmployeeDesignationFilterPanelProps) {
    const {t} = useTranslation("main")
    const statusOption = [{'value': STATUS_ACTIVE, 'label': t("status.active")}, {'value': STATUS_INACTIVE, 'label': t("status.inactive")}]
    
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
