"use client"
import AppModal from '@/components/ui/modal/AppModal';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEmployeeMutation } from "@/features/employee/employeeApi";
import { createEmployeeSchema } from "@/features/employee/employeeConstant";
import z from 'zod';
import { formatDate } from '@/store/commonFunction';
import { appToast } from '@/utils/toastUtils';
import { buildFormData } from '@/utils/buildFormData';
import EmployeeForm from './EmployeeForm';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function EmployeeCreate({onClose}: {
  onClose: () => void;
}) {
    const { t } = useTranslation("main");
    const schema = createEmployeeSchema(t);
    type EmployeeFormData = z.infer<typeof schema>;
    const [hasError, setHasError] = useState<boolean>(false);
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
    } = methods;

    const handleSubmit: SubmitHandler<EmployeeFormData> = async (data) => {
        try {
            await createEmployee(employeeToFormData(data)).unwrap();

            appToast.success(t("message.created", {name: t('content.employee')}));
            methods.reset(); // Optional
            onClose();       // Close the modal
        } catch (error: any) {
            const validationErrors = error?.data?.errors;
            setHasError(true)
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
                modalTitle={t("modal_title.add_new_employee")} 
                size="full"
            >
                <EmployeeForm
                    mode="create"
                    onSubmit={handleSubmit}
                    loading={isLoading}
                    methods={methods}
                    hasError={hasError}
                    setHasError={setHasError}
                    buttonText={isLoading ? t("button.creating") : t("button.create_employee")}
                />
            </AppModal>
        </>
    )
}