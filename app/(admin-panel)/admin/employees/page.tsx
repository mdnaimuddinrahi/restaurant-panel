"use client"
import FormModal from '@/components/ui/FormModal';
import Heading from '@/components/ui/Heading'
import { useState } from 'react'
import EmployeeCreate from './EmployeeCreate';
import EmployeeList from './EmployeeList';

export default function page() {
  const [activeModal, setActiveModal] = useState<string | null>("form-modal");

  function showModal(id: string) {
    setActiveModal(id);
  }
  function closeModal() {
    setActiveModal(null);
  }
  return (
    <>
      <Heading 
        title="Employees" 
        buttonText="Add Employee" 
        onAddClick={() => showModal("form-modal")}
      />
      {/* <EmployeeList/> */}

      {activeModal === 'form-modal' && (
          <EmployeeCreate onClose={closeModal} />
      )}

    </>
  )
}
