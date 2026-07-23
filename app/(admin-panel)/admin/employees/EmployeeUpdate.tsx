"use client"
import AppModal from '@/components/ui/modal/AppModal'
import EmployeeForm from './EmployeeForm'
import { updateEmployeeSchema } from '@/features/employee/employeeConstant';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildFormData } from '@/utils/buildFormData';
import { formatDate } from '@/store/commonFunction';
import { appToast } from '@/utils/toastUtils';
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from '@/features/employee/employeeApi';
import { useEffect, useState } from 'react';
import { Employee } from '@/features/employee/employeeInterface';
import { useTranslation } from 'react-i18next';

type EmployeeUpdatedProps = {
  onClose: () => void;
  employeeId: number;
};

export default function EmployeeUpdate({onClose, employeeId}: EmployeeUpdatedProps) {
    const { t } = useTranslation("employee");
    const schema = updateEmployeeSchema(t);
    type UpdateEmployeeFormData = z.infer<typeof schema>;
    const methods = useForm<UpdateEmployeeFormData>({
        resolver: zodResolver(schema),
    });
    const [hasError, setHasError] = useState<boolean>(false);
    
    const employeeToFormData = (data: UpdateEmployeeFormData) => {
        return buildFormData({
            ...data,
            date_of_birth: formatDate(data.date_of_birth),
            date_of_joining: formatDate(data.date_of_joining),
            resume: data.resume ?? null,
            profile_img: data.profile_img ?? null,
        });
    }

    const {
        setError,
        reset,
    } = methods;

    const { data: employeeResponse, isLoading } = useGetEmployeeByIdQuery(employeeId);
    const employee = employeeResponse?.data ?? null;
    console.log('employee', employee)
    const employeeToDefaultValues = (
        employee: Employee
    ): UpdateEmployeeFormData => ({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        gender: employee.gender,
        blood_group: employee.blood_group,
        marital_status: employee.marital_status,
        address: employee.address,
        date_of_birth: employee.date_of_birth ? new Date(employee.date_of_birth) : new Date,
        basic_salary:  Number(employee.basic_salary),
        date_of_joining: employee.date_of_joining ? new Date(employee.date_of_joining) : new Date,
        employee_designation_id: employee.employee_designation_id,
        employee_type_id: employee.employee_type_id,
        shift_start: employee.shift_start,
        shift_end: employee.shift_end,
        passport_number: employee.passport_number,
        emergency_contact_name: employee.emergency_contact_name,
        emergency_contact_phone: employee.emergency_contact_phone,
        emergency_contact_email: employee.emergency_contact_email,
        documents: [],
        profile_img: [],
        national_id: employee.national_id,
        emergency_contact_relation: employee.emergency_contact_relation,
        resume: [],
    });
    useEffect(() => {
        console.log('employee', employee)
        if (employee) {
            reset(employeeToDefaultValues(employee));
        }
    }, [employee, reset]);
    const values = methods.watch();

console.log("Current values:", values);
    const [updateEmployee, { isLoading: updating }] =
    useUpdateEmployeeMutation();

    const handleSubmit: SubmitHandler<UpdateEmployeeFormData> = async (data) => {
        try {
            await updateEmployee({
                id: employeeId,
                data: employeeToFormData(data),
            }).unwrap();

            appToast.success(t("employee:message.updated"));
            methods.reset(); // Optional
            onClose();       // Close the modal
        } catch (error: any) {
            const validationErrors = error?.data?.errors;
            setHasError(true)
            
            if (validationErrors) {
                Object.entries(validationErrors).forEach(([field, messages]) => {
                    setError(field as any, {
                        type: "server",
                        message: (messages as string[])[0],
                    });
                });
            }
        }
    };

    return (
        <>
            <AppModal
                onClose={onClose}
                modalTitle={t("employee:update_employee")} 
                size='full'
            >
                {isLoading ? 'Loading...' :  
                    <EmployeeForm
                        mode="update"
                        onSubmit={handleSubmit}
                        // loading={isLoading}
                        methods={methods}
                        oldData={employee}
                        hasError={hasError}
                        setHasError={setHasError}
                    />}
            </AppModal>
        </>
    )
}
