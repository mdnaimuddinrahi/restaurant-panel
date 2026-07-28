import AppForm from '@/components/ui/AppForm'
import FormInput from '@/components/ui/form/FormInput';
import { RoleFormProps } from '@/features/rolepermission/rolepermission.types'
import { t } from 'i18next';
import React from 'react'
import { FieldValues, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next';

export default function RoleForm<T extends FieldValues>({
    methods,
    mode,
    onSubmit,
    loading,
    oldData,
    hasError=false,
    setHasError,
    buttonText,
}: RoleFormProps<T>) {
  return (
    <FormProvider {...methods}>
      <AppForm onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormInput
            name="name"
            label={t("main:label.role.name")}
            placeholder={t("main:placeholder.role.name")}
            required
          />
        </div>
      </AppForm>
    </FormProvider>
  )
}
