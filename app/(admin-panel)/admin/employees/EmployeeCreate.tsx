"use client"
import AppModal from '@/components/ui/modal/AppModal';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEmployeeMutation } from "@/features/employee/employeeApi";
import { employeeSchema } from "@/features/employee/employeeConstant";
import z from 'zod';
import { formatDate } from '@/store/commonFunction';
import { appToast } from '@/utils/toastUtils';
import { buildFormData } from '@/utils/buildFormData';
import EmployeeForm from './EmployeeForm';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

type EmployeeCreateProps = {
  onClose: () => void;
};

export default function EmployeeCreate({onClose}: EmployeeCreateProps) {
    const { t } = useTranslation("employee");
    const schema = employeeSchema(t);
    type EmployeeFormData = z.infer<typeof schema>;
    const methods = useForm<EmployeeFormData>({
        resolver: zodResolver(schema),
    });

    const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

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
            await createEmployee(employeeToFormData(data)).unwrap();

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
                modalTitle={t("employee:add_new_employee")} 
                size='full'
            >
                <EmployeeForm
                    mode="create"
                    onSubmit={handleSubmit}
                    loading={isLoading}
                    methods={methods}
                />
            </AppModal>
        </>
    )
}