import AppModal from '@/components/ui/modal/AppModal';

import React, { useState } from 'react'
import RoleForm from './RoleForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { t } from 'i18next';
import { createRoleSchema } from '@/features/rolepermission/rolePermissionConstant';
import z from 'zod';
import { useCreateRoleMutation } from '@/features/rolepermission/rolePermissionApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildFormData } from '@/utils/buildFormData';
import { appToast } from '@/utils/toastUtils';

export default function RoleCreate({onClose}: {
  onClose: () => void;
}) {
    const schema = createRoleSchema(t);
    type RoleFormData = z.infer<typeof schema>;
    const [hasError, setHasError] = useState<boolean>(false);
    const [createRole, { isLoading }] = useCreateRoleMutation();
    
    const methods = useForm<RoleFormData>({
        resolver: zodResolver(schema),
    });
    const {
        setError,
    } = methods;
    const handleSubmit: SubmitHandler<RoleFormData> = async (data) => {
        try {
            await createRole(buildFormData(data))
            appToast.success(t("main:message.created", {name: t('main:content.role')}));
            methods.reset(); // Optional
            onClose();       // Close the modal
        } catch (error: any) {
            const validationErrors = error?.data?.errors;
            setHasError(true)
            // console.log('error', error);
            // console.log('validationErrors', validationErrors)

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
        <AppModal
            onClose={onClose}
            modalTitle={t("main:modal_title.create_role")} 
            size='sm'
        >
            <RoleForm
                // mode="create"
                onSubmit={handleSubmit}
                loading={isLoading}
                methods={methods}
                hasError={hasError}
                // setHasError={setHasError}
                buttonText={isLoading ? t("main:button.creating") : t("main:button.add_role")}
            />
        </AppModal>
    )
}
