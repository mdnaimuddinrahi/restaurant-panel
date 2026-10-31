import AppModal from '@/components/ui/modal/AppModal';
import { useCreateEmployeeDesignationMutation } from '@/features/employee_designation/employeeDesignationApi';
import { createEmployeeDesignationSchema } from '@/features/employee_designation/employeeDesignationConstant';
import { buildFormData } from '@/utils/buildFormData';
import { appToast } from '@/utils/toastUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import z from 'zod';
import EmployeeDesignationForm from './EmployeeDesignationForm';

export default function EmployeeDesignationCreate({onClose}: {
  onClose: () => void;
}) {
  const {t} = useTranslation("main")
  const schema = createEmployeeDesignationSchema(t)
  type EmployeeTypeFormData = z.infer<typeof schema>
  const [hasError, setHasError] = useState<boolean>(false);
  const methods = useForm<EmployeeTypeFormData>({
      resolver: zodResolver(schema),
  });
  const [createEmployeeDesignation, { isLoading }] = useCreateEmployeeDesignationMutation();

    const {
        setError,
    } = methods;

    const handleSubmit: SubmitHandler<EmployeeTypeFormData> = async (data) => {
        try {
            await createEmployeeDesignation(buildFormData(data)).unwrap();
            appToast.success(t("main:message.created", {name: t('main:content.employee_designation')}));
            methods.reset(); // Optional
            onClose();       // Close the modal
        } catch (error: any) {
            const validationErrors = error?.data?.errors;
            setHasError(true)
            
            console.log('errror')
            if (validationErrors) {
                Object.entries(validationErrors).forEach(([field, messages]) => {
                    setError(field as any, {
                        type: "server",
                        message: (messages as string[])[0],
                    });
                });
            }
        }
    }
    console.log(setError)

    return (
        <>
            <AppModal
                onClose={onClose}
                modalTitle={t("modal_title.add_new_employee_designation")}
                size="lg"
            >
                <EmployeeDesignationForm
                    onSubmit={handleSubmit}
                    loading={isLoading}
                    methods={methods}
                    hasError={hasError}
                    setHasError={setHasError}
                    buttonText={isLoading ? t("button.creating") : t("button.create_employee_designation")}
                />
            </AppModal>
        </>
    )
}
  