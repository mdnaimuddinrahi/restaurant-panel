import SkeletonSelect from '@/components/ui/SkeletonSelect';
import { useGetEmployeeResourcesQuery } from '@/features/employee/employeeApi';
import AppSelect from '@/components/ui/select/AppReactSelect';
import AppInput from '@/components/ui/input/AppInput';
import AppButton from '@/components/ui/button/AppButton';
import { EmployeeFIlterPanelProps } from '@/features/employee/employeeInterface';
import { ResourceOption } from '@/store/commonInterface';
import { useState } from 'react';
import { hexToRgba, useTheme } from "@/theme";  

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
    const searchFieldList = searchFields.split(",").map(f => f.trim()).filter(Boolean);
    const { accentColor } = useTheme();
      
    return (
        <div id="filterPanel">
            {resourceIsLoading ? <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3 mt-4 p-3">
                    <SkeletonSelect />
                    <SkeletonSelect />
                    <SkeletonSelect />
                    <SkeletonSelect />
                    <SkeletonSelect />
                </div>: 
                <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3 mt-1 p-3">
                    <AppSelect
                        options={bloodGroupOption}
                        placeholder="Blood Group"
                        isClearable={true}
                        value={bloodGroupOption?.find(o => o.value === bloodGroup)}
                        onChange={(option: ResourceOption) => setBloodGroup(option?.value ?? -1)}
                    />

                    <AppSelect
                        options={employeeDesignationOption}
                        placeholder="Employee Designation"
                        isClearable={true}
                        value={employeeDesignationOption?.find(o => o.value ===employeeDesignation)}
                        onChange={(option: ResourceOption) => setEmployeeDesignation(option?.value ?? -1)}
                    />

                    <AppSelect
                        options={employeeTypeOption}
                        placeholder="Employee Type"
                        isClearable={true}
                        value={employeeTypeOption?.find(o => o.value ===employeeType)}
                        onChange={(option: ResourceOption) => setEmployeeType(option?.value ?? -1)}
                    />

                    <AppSelect
                        options={genderOption}
                        placeholder="Gender"
                        isClearable={true}
                        value={genderOption?.find(o => o.value ===gender)}
                        onChange={(option: ResourceOption) => setGender(option?.value ?? -1)}
                    />

                    <AppSelect
                        options={maritalStatusOption}
                        placeholder="Marital Status"
                        isClearable={true}
                        value={maritalStatusOption?.find(o => o.value ===maritalStatus)}
                        onChange={(option: ResourceOption) => setMaritalStatus(option?.value ?? -1)}
                    />
                    <div
                        className="relative w-full"
                        onMouseEnter={() => setShowSearchHint(true)}
                        onMouseLeave={() => setShowSearchHint(false)}
                    >
                        <AppInput
                            placeholder="Search..."
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

                            px-3 py-2

                            shadow-xl

                            transition-all duration-200

                            ${showSearchHint ? "opacity-100 scale-100" : "opacity-0 scale-95"}

                            pointer-events-none
                        `}
                        >
                            <div className="font-medium mb-1">Search enabled for:</div>

                            <div className="flex flex-wrap gap-1 text-slate-300">
                            {searchFieldList.map((field) => (
                                <span
                                key={field}
                                className="text-white px-2 py-0.5 rounded-md border border-gray-300"
                                 style={{ backgroundColor: accentColor }}
                                >
                                {field}
                                </span>
                            ))}
                            </div>
                        </div>
                    </div>
                    <AppButton onClick={onSearch}>
                        Search
                    </AppButton>
                </div>
            }
        </div>
    )
}
