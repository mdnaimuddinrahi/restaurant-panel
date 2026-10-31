import { EMPLOYEE_DESIGNATION_CREATE_MODAL, EMPLOYEE_DESIGNATION_DELETE_MODAL, EMPLOYEE_DESIGNATION_UPDATE_MODAL } from '@/features/employee_designation/employeeDesignationConstant'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React from 'react'
import EmployeeDesignationCreate from './EmployeeDesignationCreate'
import { closeModal } from "@/features/modal/modalSlice";
import EmployeeDesignationUpdate from './EmployeeDesignationUpdate';
import EmployeeDesignationDelete from './EmployeeDesignationDelete';

export default function EmployeeDesignationModal() {
    const dispatch = useAppDispatch()
    
    const { isOpen, type, payload } = useAppSelector(
        (state) => state.modal
    )

    if(!isOpen) return null

    switch (type) {
        case EMPLOYEE_DESIGNATION_CREATE_MODAL:
            return (
                <EmployeeDesignationCreate
                    onClose={() => dispatch(closeModal())}
                />
            )
            
        case EMPLOYEE_DESIGNATION_UPDATE_MODAL:
            return (
                <EmployeeDesignationUpdate
                    employeeDesignationId={payload.employeeDesignationId}
                    onClose={() => dispatch(closeModal())}
                />
            )

        case EMPLOYEE_DESIGNATION_DELETE_MODAL:
            return (
                <EmployeeDesignationDelete
                    employeeDesignationId={payload.employeeDesignationId}
                    onClose={() => dispatch(closeModal())}
                />
            )

        default:
            return null;
    }
}
