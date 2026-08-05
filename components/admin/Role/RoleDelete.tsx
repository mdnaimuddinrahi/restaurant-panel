import AppModal from '@/components/ui/modal/AppModal'
import { RoleDeleteProps } from '@/features/rolepermission/rolepermission.types'
import { t } from 'i18next'
import React from 'react'

export default function RoleDelete({
    roleId,
    onClose,
}: RoleDeleteProps) {

  return (
    <AppModal
      modalTitle={t("main:modal_title.delete_role")}
      onClose={onClose}
      size="sm"
    >
      <div className="py-1 px-3">
        
      </div>
    </AppModal>
  )
}
