import AppModal from '@/components/ui/modal/AppModal'
import React from 'react'
import EmployeeForm from './EmployeeForm'
import { employeeSchema } from '@/features/employee/employeeConstant';
import { t } from 'i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildFormData } from '@/utils/buildFormData';
import { formatDate } from '@/store/commonFunction';
import { appToast } from '@/utils/toastUtils';
import { useUpdateEmployeeMutation } from '@/features/employee/employeeApi';

type EmployeeUpdatedProps = {
  onClose: () => void;
  employeeId: number;
};

export default function EmployeeUpdate({onClose, employeeId}: EmployeeUpdatedProps) {
    const schema = employeeSchema(t);
    type EmployeeFormData = z.infer<typeof schema>;
    const methods = useForm<EmployeeFormData>({
        resolver: zodResolver(schema),
    });

    const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
    
    const employeeToFormData = (data: EmployeeFormData) => {
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

    const handleSubmit: SubmitHandler<EmployeeFormData> = async (data) => {
        try {
            // await createEmployee(employeeToFormData(data)).unwrap();

            appToast.success(t("employee:message.created"));
            methods.reset(); // Optional
            onClose();       // Close the modal
        } catch (error: any) {
            const validationErrors = error?.data?.errors;
            console.log('error', error);
            console.log('validationErrors', validationErrors)

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
                <EmployeeForm
                    mode="update"
                    onSubmit={handleSubmit}
                    loading={isLoading}
                    methods={methods}
                />
            </AppModal>
        </>
    )
}
