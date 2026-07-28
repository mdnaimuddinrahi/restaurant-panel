"use client"
import Heading from '@/components/ui/Heading'
import { useTranslation } from 'react-i18next';
import { EMPLOYEE_CREATE_MODAL } from '@/features/employee/employeeConstant';
import EmployeeList from '@/components/admin/Employee/EmployeeList';
import EmployeeModal from '@/components/admin/Employee/EmployeeModal';
import { lngBrand } from '@/i18n/resources';

export default function page() {
  const { t } = useTranslation("main");
  return (
    <>
      <Heading 
        title={t("title.employees")}
        buttonText={t("button.add_employee")}
        modal={EMPLOYEE_CREATE_MODAL}
      />
      <EmployeeList/>
      <EmployeeModal />
    </>
  )
}
