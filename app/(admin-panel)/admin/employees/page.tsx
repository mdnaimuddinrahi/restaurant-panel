"use client"
import Heading from '@/components/ui/Heading'
import { useState } from 'react'
import EmployeeCreate from './EmployeeCreate';
import EmployeeList from './EmployeeList';
import { useTranslation } from 'react-i18next';
import { INVALID_NUMBER } from '@/store/commonConstants';
import EmployeeUpdate from './EmployeeUpdate';

export default function page() {
  const [activeModal, setActiveModal] = useState<string | null>("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

  function showModal(id: string) {
    setActiveModal(id);
  }
  function closeModal() {
    setActiveModal(null);
  }
  const { t } = useTranslation("employee");

  const handleEdit = (id: number) => {
    setSelectedEmployeeId(id);
    showModal("edit-modal");
  };

  return (
    <>
      <Heading 
        title={t("employees")}
        buttonText={t("add_employee")} 
        // onAddClick={() => showModal("create-modal")}
      />
      <EmployeeList
        onEdit={handleEdit}
      />


      {activeModal === 'create-modal' && (
          <EmployeeCreate onClose={closeModal} />
      )}

      {activeModal === 'edit-modal' && selectedEmployeeId &&  (
        <EmployeeUpdate
          employeeId={selectedEmployeeId}
          onClose={() => {
              setSelectedEmployeeId(null);
              closeModal;
          }}
        />
      )}

    </>
  )
}
