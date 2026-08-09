import SkeletonSelect from '@/components/ui/skeleton/SkeletonSelect';
import { useGetEmployeeResourcesQuery } from '@/features/employee/employeeApi';
import AppInput from '@/components/ui/input/AppInput';
import AppButton from '@/components/ui/button/AppButton';
import { EmployeeFIlterPanelProps } from '@/features/employee/employee.types';
import { ResourceOption } from '@/store/common.types';
import { useState } from 'react';
import { hexToRgba, useTheme } from "@/theme";  
import AppSelect from '@/components/ui/input/AppSelect';
import { SingleValue } from 'react-select';
import { t } from 'i18next';
import FilterSkeleton from '@/components/ui/skeleton/SkeletonFilter';
import AppSearchInput from '@/components/ui/input/AppSearchInput';
import { DEFAULT_SEARCH } from '@/store/commonConstants';

export default function EmployeeFilterPanel({
    resourceIsLoading,
    bloodGroupOption,
    employeeDesignationOption,
    employeeTypeOption,
    genderOption,
    maritalStatusOption,
    bloodGroup,
    setBloodGroup,
    employeeDesignation,
    setEmployeeDesignation,
    employeeType,
    setEmployeeType,
    gender,
    setGender,
    maritalStatus,
    setMaritalStatus,
    onSearch,
    searchTerm,
    setSearchTerm,
    searchFields
}: EmployeeFIlterPanelProps) {
    
    const { accentColor } = useTheme();
    // console.log('bloodGroupOption', bloodGroupOption)
      
    return (
        <>
            {resourceIsLoading ? <FilterSkeleton
                  fields={[
                    { type: "select", count: 5 },
                    { type: "input", count: 1 },
                    {type: "button", count: 1},
                  ]}
                />: 
                <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3 mt-1 p-3">
                    <AppSelect
                        options={bloodGroupOption}
                        placeholder={t('main:placeholder.employee.blood_group')}
                        isClearable={true}
                        value={bloodGroupOption?.find(o => o.value === bloodGroup)}
                        onChange={(option: SingleValue<ResourceOption>) => {
                            setBloodGroup(option?.value ?? DEFAULT_SEARCH.NUMBER);
                        }}
                    />

                    <AppSelect
                        options={employeeDesignationOption}
                        placeholder={t('main:placeholder.employee.employee_designation')}
                        isClearable={true}
                        value={employeeDesignationOption?.find(o => o.value ===employeeDesignation)}
                        onChange={(option: SingleValue<ResourceOption>) => setEmployeeDesignation(option?.value ?? -1)}
                    />

                    <AppSelect
                        options={employeeTypeOption}
                        placeholder={t('main:placeholder.employee.employee_type')}
                        isClearable={true}
                        value={employeeTypeOption?.find(o => o.value ===employeeType)}
                        onChange={(option: SingleValue<ResourceOption>) => setEmployeeType(option?.value ?? -1)}
                    />

                    <AppSelect
                        options={genderOption}
                        placeholder={t('main:placeholder.employee.gender')}
                        isClearable={true}
                        value={genderOption?.find(o => o.value ===gender)}
                        onChange={(option: SingleValue<ResourceOption>) => setGender(option?.value ?? -1)}
                    />

                    <AppSelect
                        options={maritalStatusOption}
                        placeholder={t('main:placeholder.employee.marital_status')}
                        isClearable={true}
                        value={maritalStatusOption?.find(o => o.value ===maritalStatus)}
                        onChange={(option: SingleValue<ResourceOption>) => setMaritalStatus(option?.value ?? -1)}
                    />
                    <AppSearchInput
                        setSearchTerm={setSearchTerm}
                        searchFields={searchFields}
                    />
                    <AppButton onClick={onSearch}>
                        {t('main:button.search')}
                    </AppButton>
                </div>
            }
        </>
    )
}
