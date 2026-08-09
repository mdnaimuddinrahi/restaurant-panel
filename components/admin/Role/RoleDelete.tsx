import AppModal from '@/components/ui/modal/AppModal'
import ModalDelete from '@/components/ui/modal/ModalDelete'
import { RoleDeleteProps } from '@/features/rolepermission/rolepermission.types'
import { useDeleteRoleMutation } from '@/features/rolepermission/rolePermissionApi'
import { t } from 'i18next'
import { toast } from 'react-toastify'

export default function RoleDelete({
    roleId,
    onClose,
}: RoleDeleteProps) {
  const [deleteRole, {isLoading}] = useDeleteRoleMutation()
  const handleDelete = async () => {
    try {
      await deleteRole(roleId).unwrap()
      toast.success(t("main:message.deleted", {name: t('main:content.role')}))
      onClose()
    } catch (error: any) {
      toast.error(error?.data?.message ?? t("main:message.something_went_wrong"))
    }
  }

  return (
    <AppModal
      modalTitle={t("main:modal_title.delete_role")}
      onClose={onClose}
      size="sm"
    >
      <ModalDelete
          description={t("main:content.delete_role_confirmation")}
          //   accentColor={accentColor}
          isLoading={isLoading}
          onDelete={handleDelete}
          onCancel={onClose}
      />
    </AppModal>
  )
}
