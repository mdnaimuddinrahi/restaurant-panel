import AppModal from '@/components/ui/modal/AppModal'
import ModalDelete from '@/components/ui/modal/ModalDelete'
import { useDeleteEmployeeDesignationMutation } from '@/features/employee_designation/employeeDesignationApi'
import { EmployeeDesignationDeletedProps } from '@/features/employee_designation/employeeDesignationType.types'
import { t } from 'i18next'
import { toast } from 'react-toastify'

export default function EmployeeDesignationDelete({
    employeeDesignationId,
    onClose,
}: EmployeeDesignationDeletedProps) {
  const [deleteEmployeeDesignation, {isLoading}] = useDeleteEmployeeDesignationMutation()
  
    const handleDelete = async () => {
      try {
        await deleteEmployeeDesignation(employeeDesignationId).unwrap()
        toast.success(t("main:message.deleted", {name: t('main:content.employee_designation')}))
        onClose()
      } catch (error: any) {
        toast.error(error?.data?.message ?? t("main:message.something_went_wrong"))
      }
    }
    return (
      <AppModal
        modalTitle={t("main:modal_title.delete_employee_designation")}
        onClose={onClose}
        size="sm"
      >
        <ModalDelete
            description={t("main:content.delete_employee_designation_confirmation")}
            //   accentColor={accentColor}
            isLoading={isLoading}
            onDelete={handleDelete}
            onCancel={onClose}
        />
      </AppModal>
    )
}
