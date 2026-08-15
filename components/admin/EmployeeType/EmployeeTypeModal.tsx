import { EMPLOYEE_TYPE_CREATE_MODAL, EMPLOYEE_TYPE_DELETE_MODAL, EMPLOYEE_TYPE_UPDATE_MODAL } from '@/features/employee_type/employeeTypeConstant'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React from 'react'
import EmployeeTypeCreate from './EmployeeTypeCreate'
import EmployeeTypeUpdate from './EmployeeTypeUpdate'
import EmployeeTypeDelete from './EmployeeTypeDelete'
import { closeModal } from '@/features/modal/modalSlice'

export default function EmployeeTypeModal() {
    const dispatch = useAppDispatch()
    
    const { isOpen, type, payload } = useAppSelector(
        (state) => state.modal
    )

    if(!isOpen) return null

    switch (type) {
        case EMPLOYEE_TYPE_CREATE_MODAL:
            return (
                <EmployeeTypeCreate
                    onClose={() => dispatch(closeModal())}
                />
            )
        case EMPLOYEE_TYPE_UPDATE_MODAL:
            return (
                <EmployeeTypeUpdate
                    employeeTypeId={payload.employeeTypeId}
                    onClose={() => dispatch(closeModal())}
                />
            )
        case EMPLOYEE_TYPE_DELETE_MODAL:
            return (
                <EmployeeTypeDelete
                    employeeTypeId={payload.employeeTypeId}
                    onClose={() => dispatch(closeModal())}
                />
            )
    }

    return (
        <div>EmployeeTypeModal</div>
    )
}
