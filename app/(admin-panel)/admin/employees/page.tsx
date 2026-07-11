"use client"
import Heading from '@/components/ui/Heading'
import { useState } from 'react'
import EmployeeCreate from './EmployeeCreate';
import EmployeeList from './EmployeeList';
import { useTranslation } from 'react-i18next';

export default function page() {
  const [activeModal, setActiveModal] = useState<string | null>("");

  function showModal(id: string) {
    setActiveModal(id);
  }
  function closeModal() {
    setActiveModal(null);
  }
  const { t } = useTranslation("employee");

  return (
    <>
      <Heading 
        title={t("employees")}
        buttonText={t("add_employee")} 
        onAddClick={() => showModal("form-modal")}
      />
      <EmployeeList/>
      

      {activeModal === 'form-modal' && (
          <EmployeeCreate onClose={closeModal} />
      )}

    </>
  )
}
