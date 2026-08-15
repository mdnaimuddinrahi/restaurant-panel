import AppForm from '@/components/ui/form/AppForm'
import FormInput from '@/components/ui/form/FormInput'
import FormTextArea from '@/components/ui/form/FormTextArea'
import FormTimePicker from '@/components/ui/form/FormTimePicker'
import { EmployeeTypeFormProps } from '@/features/employee_type/employeeType.types'
import { useEffect } from 'react'
import { FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function EmployeeTypeForm<T extends FieldValues>({
    methods,
    onSubmit,
    loading,
    setHasError,
    hasError=false,
    buttonText
}: EmployeeTypeFormProps<T>) {
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
                <FormInput
                    name="name"
                    label={t("main:label.employee_type.name")}
                    placeholder={t("main:placeholder.employee_type.name")}
                    required
                />

                <FormInput
                    name="code"
                    label={t("main:label.employee_type.code")}
                    placeholder={t("main:placeholder.employee_type.code")}
                    required
                />

                {/* Row 2 */}
                <div className="md:col-span-2">
                    <FormTextArea
                        name="description"
                        label={t("main:label.employee_type.description")}
                        placeholder={t("main:placeholder.employee_type.description")}
                    />
                </div>

                {/* Row 3 */}
                <FormTimePicker
                    name="shift_start"
                    label={t("main:label.employee_type.shift_start")}
                />

                <FormTimePicker
                    name="shift_end"
                    label={t("main:label.employee_type.shift_end")}
                />

                {/* Row 4 */}
                <FormInput
                    name="working_hours"
                    label={t("main:label.employee_type.working_hours")}
                    type="number"
                    placeholder="0"
                />
            </div>
        </AppForm>
    )
}
