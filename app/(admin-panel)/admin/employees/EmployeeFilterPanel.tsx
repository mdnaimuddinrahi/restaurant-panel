import React from 'react'
import SkeletonSelect from '@/components/ui/SkeletonSelect';
import { useGetEmployeeResourcesQuery } from '@/features/employee/employeeApi';
import AppSelect from '@/components/ui/select/AppReactSelect';
import AppInput from '@/components/ui/input/AppInput';
import AppButton from '@/components/ui/button/AppButton';
import { useState } from 'react';
import { Employee, EmployeeSortType, EmployeeTableHead } from '@/features/employee/employeeInterface';


export default function EmployeeFilterPanel() {
    const {data: resourceResponse, isLoading: resourceIsLoading, isError: resourceIsError, isFetching: resourceIsFetching} = useGetEmployeeResourcesQuery()
    const bloodGroupOption = resourceResponse?.data?.blood_groups;
    const employeeDesignation = resourceResponse?.data?.employee_designations;
    const employeeType = resourceResponse?.data?.employee_types;
    const gender = resourceResponse?.data?.genders;
    const maritalStatus = resourceResponse?.data?.marital_status;
      
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
                    />
                    <AppSelect
                        options={employeeDesignation}
                        placeholder="Employee Designation"
                        isClearable={true}
                    />
                    <AppSelect
                        options={employeeType}
                        placeholder="Employee Type"
                        isClearable={true}
                    />
                    <AppSelect
                        options={gender}
                        placeholder="Gender"
                        isClearable={true}
                    /> 
                    <AppSelect
                        options={maritalStatus}
                        placeholder="Marital Status"
                        isClearable={true}
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
