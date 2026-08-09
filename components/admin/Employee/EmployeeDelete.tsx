"use client";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDeleteEmployeeMutation } from "@/features/employee/employeeApi";
import AppModal from "@/components/ui/modal/AppModal";
import { EmployeeDeletedProps } from "@/features/employee/employee.types";
import ModalDelete from "@/components/ui/modal/ModalDelete";
import { t } from "i18next";


export default function EmployeeDelete({
    employeeId,
    onClose,
}: EmployeeDeletedProps) {
    const [deleteEmployee, { isLoading }] =
        useDeleteEmployeeMutation();
    const handleDelete = async () => {
        try {
            await deleteEmployee(employeeId).unwrap();
            toast.success(t("main:message.deleted", {name: t('main:content.employee')}));
            onClose();
        } catch (error: any) {
            toast.error(
                error?.data?.message ??
                t("main:message.something_went_wrong")
            );
        }
    };

    return (
        <AppModal
            modalTitle={t("main:modal_title.delete_employee")}
            onClose={onClose}
            size="sm"
        >
            <ModalDelete
                description={t("main:content.delete_employee_confirmation")}
                //   accentColor={accentColor}
                isLoading={isLoading}
                onDelete={handleDelete}
                onCancel={onClose}
            />
        </AppModal>
    );
}