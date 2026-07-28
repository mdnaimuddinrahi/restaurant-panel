import AppModal from '@/components/ui/modal/AppModal';

import React from 'react'
import { useTranslation } from 'react-i18next';
import RoleForm from './RoleForm';
import { SubmitHandler } from 'react-hook-form';
import { t } from 'i18next';

export default function RoleCreate({onClose}: {
  onClose: () => void;
}) {
    const schema = createEmployeeSchema(t);
    const handleSubmit: SubmitHandler<RoleFormData> = async (data) => {

    }
    return (
        <AppModal
            onClose={onClose}
            modalTitle={t("main:modal_title.create_role")} 
            size='full'
        >
        <RoleForm
            mode="create"
            onSubmit={handleSubmit}
            loading={isLoading}
            methods={methods}
            hasError={hasError}
            setHasError={setHasError}
            buttonText={isLoading ? t("main:button.creating") : t("main:button.add_role")}
        /></AppModal>
    )
}
