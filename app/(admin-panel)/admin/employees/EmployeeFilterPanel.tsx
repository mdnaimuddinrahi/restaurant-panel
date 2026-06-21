import SkeletonSelect from '@/components/ui/SkeletonSelect';
import { useGetEmployeeResourcesQuery } from '@/features/employee/employeeApi';
import AppSelect from '@/components/ui/select/AppReactSelect';
import AppInput from '@/components/ui/input/AppInput';
import AppButton from '@/components/ui/button/AppButton';
import { EmployeeFIlterPanelProps } from '@/features/employee/employeeInterface';
import { ResourceOption } from '@/store/commonInterface';

export default function EmployeeFilterPanel({
    bloodGroup,
    setBloodGroup,
    employeeDesignation,
    setEmployeeDesignation,
    employeeType,
    setEmployeeType,
    gender,
    setGender,
    martialStatus,
    setMartialStatus,
}: EmployeeFIlterPanelProps) {
    const {data: resourceResponse, 
        isLoading: resourceIsLoading} = useGetEmployeeResourcesQuery()
    const bloodGroupOption = resourceResponse?.data?.blood_groups;
    const employeeDesignationOption = resourceResponse?.data?.employee_designations;
    const employeeTypeOption = resourceResponse?.data?.employee_types;
    const genderOption = resourceResponse?.data?.genders;
    const maritalStatusOption = resourceResponse?.data?.marital_status;
      
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
                        value={maritalStatusOption?.find(o => o.value ===martialStatus)}
                        onChange={(option: ResourceOption) => setMartialStatus(option?.value ?? -1)}
                    />
                    <AppInput placeholder="Search..." />
                    <AppButton>
                        Search
                    </AppButton>
                </div>
            }
        </div>
    )
}
