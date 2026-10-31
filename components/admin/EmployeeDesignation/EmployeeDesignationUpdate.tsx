import { useGetEmployeeDesignationByIdQuery, useUpdateEmployeeDesignationMutation } from '@/features/employee_designation/employeeDesignationApi';
import { updateEmployeeDesignationSchema } from '@/features/employee_designation/employeeDesignationConstant';
import { EmployeeDesignationUpdatedProps } from '@/features/employee_designation/employeeDesignationType.types';
import { useUpdateEmployeeTypeMutation } from '@/features/employee_type/employeeTypeApi';
import { buildFormData } from '@/utils/buildFormData';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import z from 'zod';
import { appToast } from '@/utils/toastUtils'
import AppModal from '@/components/ui/modal/AppModal';
import EmployeeTypeForm from '../EmployeeType/EmployeeTypeForm';
import EmployeeDesignationForm from './EmployeeDesignationForm';

export default function EmployeeDesignationUpdate({
  onClose, 
  employeeDesignationId
}: EmployeeDesignationUpdatedProps) {
  console.log('employeeDesignationId', employeeDesignationId)
   const {t} = useTranslation("main")
    const schema = updateEmployeeDesignationSchema(t)
    type EmployeeDesignationFormData = z.infer<typeof schema>
    const [hasError, setHasError] = useState<boolean>(false);
    const {data: employeeDesignationResponse, isLoading: isEmployeeDesignationLoading} = useGetEmployeeDesignationByIdQuery(employeeDesignationId)
    const employeeDesignation = employeeDesignationResponse?.data ?? null
    const methods = useForm<EmployeeDesignationFormData>({
      resolver: zodResolver(schema),
    });
    const {
      setError,
      reset,
    } = methods;
  
    useEffect(() => {
      if (employeeDesignation) {
        reset({
          name: employeeDesignation.name,
          description: employeeDesignation.description,
        })
      }
    }, [employeeDesignation])
  
    const [updateEmployeeDesignation, {isLoading}] = useUpdateEmployeeDesignationMutation()
  
    const handleSubmit: SubmitHandler<EmployeeDesignationFormData> = async (data) => {
      try {
        await updateEmployeeDesignation({
          id: employeeDesignationId,
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
          modalTitle={t("main:modal_title.update_employee_designation")}
          size="lg"
        >
        <EmployeeDesignationForm
          onSubmit={handleSubmit}
          loading={isLoading}
          methods={methods}
          hasError={hasError}
          setHasError={setHasError}
          buttonText={isLoading ? t("main:button.updating") : t("main:button.update_employee_designation")}
        />
      </AppModal>
    </>
    )
}
