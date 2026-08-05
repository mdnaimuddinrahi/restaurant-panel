import AppModal from '@/components/ui/modal/AppModal'
import { RoleUpdatedProps } from '@/features/rolepermission/rolepermission.types'
import { t } from 'i18next'
import RoleForm from './RoleForm'
import { createRoleSchema } from '@/features/rolepermission/rolePermissionConstant';
import z from 'zod';
import { useEffect, useState } from 'react';
import { useGetRoleByIdQuery, useUpdateRoleMutation } from '@/features/rolepermission/rolePermissionApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildFormData } from '@/utils/buildFormData';
import { appToast } from '@/utils/toastUtils';

export default function RoleUpdate({
    roleId,
    onClose,
}: RoleUpdatedProps) {
  const schema = createRoleSchema(t);
  type RoleFormData = z.infer<typeof schema>;
  const [hasError, setHasError] = useState<boolean>(false);

  const{data: roleResponse, isLoading: isRoleResponseLoading} = useGetRoleByIdQuery(roleId);
  const role = roleResponse?.data ?? null;
  console.log('role', role)
  const [updateRole, { isLoading }] = useUpdateRoleMutation();
   
  const methods = useForm<RoleFormData>({
      resolver: zodResolver(schema),
  });
  const {
      setError,
      reset,
  } = methods;
  const handleSubmit: SubmitHandler<RoleFormData> = async (data) => {
      try {
            const updateRoleResponse = await updateRole({
                id: roleId, 
                data: buildFormData(data)
            }).unwrap()
            console.log('updateRoleRes', updateRoleResponse)
            appToast.success(t("main:message.updated", {name: t('main:content.role')}));
            methods.reset(); // Optional
            onClose();       // Close the modal
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
  useEffect(() => {
    if(role) {
        reset({
            name: role.name
        })
    }
  }, [role])

  return (
    <AppModal
        onClose={onClose}
        modalTitle={t("main:modal_title.update_role")} 
        size='sm'
    >
    <RoleForm
        mode="update"
        onSubmit={handleSubmit}
        loading={isLoading}
        methods={methods}
        hasError={hasError}
        setHasError={setHasError}
        buttonText={isLoading ? t("main:button.updating") : t("main:button.update_role")}
    /></AppModal>
)
}
