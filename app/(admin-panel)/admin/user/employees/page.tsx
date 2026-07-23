"use client"
import Heading from '@/components/ui/Heading'
import { useTranslation } from 'react-i18next';
import { EMPLOYEE_CREATE_MODAL } from '@/features/employee/employeeConstant';
import EmployeeList from '@/components/admin/Employee/EmployeeList';
import EmployeeModal from '@/components/admin/Employee/EmployeeModal';

export default function page() {
  const { t } = useTranslation("employee");
  return (
    <>
      <Heading 
        title={t("employees")}
        buttonText={t("add_employee")}
        modal={EMPLOYEE_CREATE_MODAL}
      />
      <EmployeeList/>
      <EmployeeModal />
    </>
  )
}
