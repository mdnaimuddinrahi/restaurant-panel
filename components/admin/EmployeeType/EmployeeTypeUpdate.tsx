import AppModal from '@/components/ui/modal/AppModal'
import { EmployeeTypeUpdatedProps } from '@/features/employee_type/employeeType.types'

import React, { useEffect, useState } from 'react'
import EmployeeTypeForm from './EmployeeTypeForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { updateEmployeeTypeSchema } from '@/features/employee_type/employeeTypeConstant'
import z from 'zod'
import { useGetEmployeeTypeByIdQuery, useUpdateEmployeeTypeMutation } from '@/features/employee_type/employeeTypeApi'
import { buildFormData } from '@/utils/buildFormData'
import { appToast } from '@/utils/toastUtils'

export default function EmployeeUpdate({
  onClose, 
  employeeTypeId
}: EmployeeTypeUpdatedProps) {
  
  const {t} = useTranslation("main")
  const schema = updateEmployeeTypeSchema(t)
  type EmployeeTypeFormData = z.infer<typeof schema>
  const [hasError, setHasError] = useState<boolean>(false);
  const {data: employeeTypeResponse, isLoading: isEmployeeTypeLoading} = useGetEmployeeTypeByIdQuery(employeeTypeId)
  const employeeType = employeeTypeResponse?.data ?? null
  const methods = useForm<EmployeeTypeFormData>({
    resolver: zodResolver(schema),
  });
  const {
    setError,
    reset,
  } = methods;

  useEffect(() => {
    if (employeeType) {
      reset({
        name: employeeType.name,
        code: employeeType.code,
        description: employeeType.description,
        shift_start: employeeType.shift_start,
        shift_end: employeeType.shift_end,
        working_hours: employeeType.working_hours,
      })
    }
  }, [employeeType])

  const [updateEmplyeeType, {isLoading}] = useUpdateEmployeeTypeMutation()

  const handleSubmit: SubmitHandler<EmployeeTypeFormData> = async (data) => {
    try {
      await updateEmplyeeType({
        id: employeeTypeId,
        data: buildFormData(data)
      }).unwrap()
      appToast.success(t("main:message.updated", {name: t('main:content.employee_type')}));
      methods.reset(); // Optional
      onClose()
    } catch (error: any) {
      const validationErrors = error?.data?.errors;
      setHasError(true)
      console.log('error', error);
      console.log('validationErrors', validationErrors)
      if(error.data.message && !error.data.errors) {
        appToast.error(error.data.message)
      }

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

  return (
    <>
      <AppModal
        onClose={onClose}
        modalTitle={t("main:modal_title.update_employee_type")}
        size="lg"
      >
      <EmployeeTypeForm
        onSubmit={handleSubmit}
        loading={isLoading}
        methods={methods}
        hasError={hasError}
        setHasError={setHasError}
        buttonText={isLoading ? t("main:button.creating") : t("main:button.update_employee_type")}
      />
    </AppModal>
  </>
  )
}
