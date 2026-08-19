import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React from 'react'

export default function EmployeeDesignationModal() {
    const dispatch = useAppDispatch()

    
    const { isOpen, type, payload } = useAppSelector(
        (state) => state.modal
    )

    if(!isOpen) return null

    return (
        <div>EmployeeDesignationModal</div>
    )
}
