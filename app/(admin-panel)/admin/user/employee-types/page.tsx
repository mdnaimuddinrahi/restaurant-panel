"use client"
import EmployeeTypeList from '@/components/admin/EmployeeType/EmployeeTypeList'
import EmployeeTypeModal from '@/components/admin/EmployeeType/EmployeeTypeModal'
import Heading from '@/components/ui/Heading'
import { EMPLOYEE_TYPE_CREATE_MODAL } from '@/features/employee_type/employeeTypeConstant'
import { useTranslation } from 'react-i18next'

export default function page() {
    const {t} = useTranslation("main")
    return (
        <>
            <Heading 
                title={t("title.employee_types")}
                buttonText={t("button.add_employee_type")}
                modal={EMPLOYEE_TYPE_CREATE_MODAL}
            />
            <EmployeeTypeList/>
            <EmployeeTypeModal/>
        </>
    )
}
