"use client"

import EmployeeDesignationList from "@/components/admin/EmployeeDesignation/EmployeeDesignationList"
import EmployeeDesignationModal from "@/components/admin/EmployeeDesignation/EmployeeDesignationModal"
import Heading from "@/components/ui/Heading"
import { EMPLOYEE_DESIGNATION_CREATE_MODAL } from "@/features/employee_designation/employeeDesignationConstant"
import { useTranslation } from "react-i18next"

export default function page() {
    const {t} = useTranslation("main")
    return (
        <>
            <Heading 
                title={t("title.employee_designation")}
                buttonText={t("button.add_employee_designation")}
                modal={EMPLOYEE_DESIGNATION_CREATE_MODAL}
            />
            <EmployeeDesignationList/>
            <EmployeeDesignationModal/>
        </>
    )
}
