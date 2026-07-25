"use client"
import EmployeeList from '@/components/admin/Employee/EmployeeList'
import Body from '@/components/ui/ContentCard'
import Heading from '@/components/ui/Heading'
import { ROLE_CREATE_MODAL } from '@/features/rolepermission/rolePermissionConstant'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function page() {
    const {t} = useTranslation("rolepermission")
    return (
        <>
            <Heading 
                title={t('roles')}
                buttonText={t('add_role')}
                modal={ROLE_CREATE_MODAL}
            />
            <Body>
                <EmployeeList/>
            </Body>
        </>
    )
}
