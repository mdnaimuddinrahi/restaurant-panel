import SkeletonSelect from '@/components/ui/skeleton/SkeletonSelect';
import { useGetEmployeeResourcesQuery } from '@/features/employee/employeeApi';
import AppInput from '@/components/ui/input/AppInput';
import AppButton from '@/components/ui/button/AppButton';
import { EmployeeFIlterPanelProps } from '@/features/employee/employee.types';
import { ResourceOption } from '@/store/commonInterface';
import { useState } from 'react';
import { hexToRgba, useTheme } from "@/theme";  
import AppSelect from '@/components/ui/input/AppSelect';
import { SingleValue } from 'react-select';
import AppTimePicker from '@/components/ui/input/AppTimePicker';
import { t } from 'i18next';
import FilterSkeleton from '@/components/ui/skeleton/SkeletonFilter';

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
    const [showSearchHint, setShowSearchHint] = useState(false)
    const { accentColor } = useTheme();
      
    return (
        <>
            {!resourceIsLoading ? <FilterSkeleton
                  fields={[
                    { type: "select", count: 5 },
                    { type: "input", count: 1 },
                    {type: "button", count: 1},
                  ]}
                />: 
                <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3 mt-1 p-3">
                    <AppSelect
                        options={bloodGroupOption}
                        placeholder={t('employee:blood_group')}
                        isClearable={true}
                        value={bloodGroupOption?.find(o => o.value === bloodGroup)}
                        onChange={(option: SingleValue<ResourceOption>) => {
                            setBloodGroup(option?.value ?? -1);
                        }}
                    />

                    <AppSelect
                        options={employeeDesignationOption}
                        placeholder={t('employee:employee_designation')}
                        isClearable={true}
                        value={employeeDesignationOption?.find(o => o.value ===employeeDesignation)}
                        onChange={(option: SingleValue<ResourceOption>) => setEmployeeDesignation(option?.value ?? -1)}
                    />

                    <AppSelect
                        options={employeeTypeOption}
                        placeholder={t('employee:employee_type')}
                        isClearable={true}
                        value={employeeTypeOption?.find(o => o.value ===employeeType)}
                        onChange={(option: SingleValue<ResourceOption>) => setEmployeeType(option?.value ?? -1)}
                    />

                    <AppSelect
                        options={genderOption}
                        placeholder={t('employee:gender')}
                        isClearable={true}
                        value={genderOption?.find(o => o.value ===gender)}
                        onChange={(option: SingleValue<ResourceOption>) => setGender(option?.value ?? -1)}
                    />

                    <AppSelect
                        options={maritalStatusOption}
                        placeholder={t('employee:marital_status')}
                        isClearable={true}
                        value={maritalStatusOption?.find(o => o.value ===maritalStatus)}
                        onChange={(option: SingleValue<ResourceOption>) => setMaritalStatus(option?.value ?? -1)}
                    />
                    <div
                        className="relative w-full"
                        onMouseEnter={() => setShowSearchHint(true)}
                        onMouseLeave={() => setShowSearchHint(false)}
                    >
                        <AppInput
                            placeholder={t('common:placeholder.search')}
                            onFocus={() => setShowSearchHint(true)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        />

                        {/* Tooltip */}
                        <div
                        
                            style={{ background: hexToRgba(accentColor, 0.9) }}
                            className={`
                                absolute left-0 top-full mt-2
                                z-50
                                w-max max-w-xs
                                rounded-lg
                                text-white text-xs
                                px-3 py-3
                                shadow-xl
                                transition-all duration-200
                                ${showSearchHint ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                                pointer-events-none
                            `}
                        >
                            <div className="font-medium mb-1">{t('common:search_enable_for')}:</div>

                            <div className="flex flex-wrap gap-1 text-slate-300">
                                {searchFields.map((field) => (
                                    <span
                                        key={field}
                                        className="text-white px-2 py-0.5 rounded-md border border-gray-300"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        {t(field)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <AppButton onClick={onSearch}>
                        {t('common:search')}
                    </AppButton>
                </div>
            }
        </>
    )
}
