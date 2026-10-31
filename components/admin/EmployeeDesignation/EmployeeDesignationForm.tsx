import AppForm from '@/components/ui/form/AppForm'
import FormInput from '@/components/ui/form/FormInput';
import FormTextArea from '@/components/ui/form/FormTextArea';
import { createEmployeeDesignationSchema } from '@/features/employee_designation/employeeDesignationConstant';
import { EmployeeDesignationFormProps } from '@/features/employee_designation/employeeDesignationType.types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import z from 'zod';

export default function EmployeeDesignationForm<T extends FieldValues>({
    methods,
    onSubmit,
    loading,
    setHasError,
    hasError=false,
    buttonText
}: EmployeeDesignationFormProps<T>) {
    const {t} = useTranslation("main")
    const {
        setError,
        formState: { errors },
    } = methods;
    

    useEffect(() => {
        setHasError(Object.keys(errors).length > 0);
    }, [errors]);

    return (
        <AppForm
            methods={methods}
            onSubmit={onSubmit}
            submitText={buttonText}
            showReset={false}
            submitLoading={loading}
            submitVariant={hasError ? "danger" : "solid"}
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Row 1 */}
                <div className="md:col-span-2">
                    <FormInput
                        name="name"
                        label={t("main:label.employee_designation.name")}
                        placeholder={t("main:placeholder.employee_designation.name")}
                        required
                    />
                </div>

                {/* Row 2 */}
                <div className="md:col-span-2">
                    <FormTextArea
                        name="description"
                        label={t("main:label.employee_designation.description")}
                        placeholder={t("main:placeholder.employee_designation.description")}
                    />
                </div>
            </div>
        </AppForm>
    )
}
