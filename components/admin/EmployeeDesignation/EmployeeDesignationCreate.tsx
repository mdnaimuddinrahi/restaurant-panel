import { createEmployeeDesignationSchema } from '@/features/employee_designation/employeeDesignationConstant';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import z from 'zod';

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
  const [createEmployeeType, { isLoading }] = usecrea();

    const {
        setError,
    } = methods;

    const handleSubmit: SubmitHandler<EmployeeTypeFormData> = async (data) => {
        try {
            await createEmployeeType(buildFormData(data)).unwrap();
            appToast.success(t("main:message.created", {name: t('main:content.employee_type')}));
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
                modalTitle={t("modal_title.add_new_employee_type")}
                size="lg"
            >
                <EmployeeTypeForm
                    onSubmit={handleSubmit}
                    loading={isLoading}
                    methods={methods}
                    hasError={hasError}
                    setHasError={setHasError}
                    buttonText={isLoading ? t("button.creating") : t("button.create_employee_type")}
                />
            </AppModal>
        </>
    )
}
  