import AppForm from '@/components/ui/form/AppForm';
import FormInput from '@/components/ui/form/FormInput';
import { RoleFormProps } from '@/features/rolepermission/rolepermission.types'
import { t } from 'i18next';
import { FieldValues, FormProvider } from 'react-hook-form'

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
    <AppForm
      methods={methods}
      onSubmit={onSubmit}
      onReset={() => methods.reset()}
      submitText={buttonText}
      resetText={t("main:button.reset")}
      submitLoading={loading}
      submitVariant={hasError ? "danger" : "solid"}
    >
      <div className="grid ">
        <FormInput
          name="name"
          label={t("main:label.role.name")}
          placeholder={t("main:placeholder.role.name")}
          required
        />
      </div>
    </AppForm>)
}
