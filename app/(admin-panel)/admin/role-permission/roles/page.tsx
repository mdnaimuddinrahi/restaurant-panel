"use client"
import RoleList from '@/components/admin/Role/RoleList'
import RoleModal from '@/components/admin/Role/RoleModal'
import ContentCard from '@/components/ui/ContentCard'
import Heading from '@/components/ui/Heading'
import { ROLE_CREATE_MODAL } from '@/features/rolepermission/rolePermissionConstant'
import { useTranslation } from 'react-i18next'

export default function page() {
    const {t} = useTranslation("rolepermission")
    return (
        <>
            <Heading 
                title={t('main:title.roles')}
                buttonText={t('main:button.add_role')}
                modal={ROLE_CREATE_MODAL}
            />
            <RoleList/>
            <RoleModal/>
        </>
    )
}
