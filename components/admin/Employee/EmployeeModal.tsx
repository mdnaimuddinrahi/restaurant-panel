"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeModal } from "@/features/modal/modalSlice";

import EmployeeCreate from "./EmployeeCreate";
import EmployeeUpdate from "./EmployeeUpdate";
import { EMPLOYEE_CREATE_MODAL, EMPLOYEE_UPDATE_MODAL, EMPLOYEE_DELETE_MODAL } from "@/features/employee/employeeConstant";
import EmployeeDelete from "./EmployeeDelete";

export default function EmployeeModal() {
  const dispatch = useAppDispatch();

  const { isOpen, type, payload } = useAppSelector(
    (state) => state.modal
  );

  if (!isOpen) return null;

  switch (type) {
    case EMPLOYEE_CREATE_MODAL:
      return (
        <EmployeeCreate
          onClose={() => dispatch(closeModal())}
        />
      );

    case EMPLOYEE_UPDATE_MODAL:
      return (
        <EmployeeUpdate
          employeeId={payload.employeeId}
          onClose={() => dispatch(closeModal())}
        />
      );

    case EMPLOYEE_DELETE_MODAL:
      return (
        <EmployeeDelete
          employeeId={payload.employeeId}
          onClose={() => dispatch(closeModal())}
        />
      );

    default:
      return null;
  }
}