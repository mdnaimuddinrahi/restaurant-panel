import AppModal from '@/components/ui/modal/AppModal'
import ModalDelete from '@/components/ui/modal/ModalDelete'
import { EmployeeTypeDeletedProps } from '@/features/employee_type/employeeType.types'
import { useDeleteEmployeeTypeMutation } from '@/features/employee_type/employeeTypeApi'
import { t } from 'i18next'
import React from 'react'
import { toast } from 'react-toastify'

export default function EmployeeTypeDelete({
    employeeTypeId,
    onClose,
}: EmployeeTypeDeletedProps) {
  const [deleteEmployeeType, {isLoading}] = useDeleteEmployeeTypeMutation()

  const handleDelete = async () => {
    try {
      await deleteEmployeeType(employeeTypeId).unwrap()
      toast.success(t("main:message.deleted", {name: t('main:content.employee_type')}))
      onClose()
    } catch (error: any) {
      toast.error(error?.data?.message ?? t("main:message.something_went_wrong"))
    }
  }
  return (
    <AppModal
      modalTitle={t("main:modal_title.delete_employee_type")}
      onClose={onClose}
      size="sm"
    >
      <ModalDelete
          description={t("main:content.delete_employee_type_confirmation")}
          //   accentColor={accentColor}
          isLoading={isLoading}
          onDelete={handleDelete}
          onCancel={onClose}
      />
    </AppModal>
  )
}
