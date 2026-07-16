"use client"
import Heading from '@/components/ui/Heading'
import EmployeeList from './EmployeeList';
import { useTranslation } from 'react-i18next';
import EmployeeModal from './EmployeeModal';
import { EMPLOYEE_CREATE_MODAL } from '@/features/employee/employeeConstant';

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
