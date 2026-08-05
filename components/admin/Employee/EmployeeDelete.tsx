"use client";

import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDeleteEmployeeMutation } from "@/features/employee/employeeApi";
import { useButtonTheme } from "@/hooks/useButtonTheme";
import { hexToRgba } from "@/utils/colorUtils";
import AppModal from "@/components/ui/modal/AppModal";
import AppCustomButton from "@/components/ui/button/AppCustomButton";
import { FiAlertTriangle } from "react-icons/fi";
import { EmployeeDeletedProps } from "@/features/employee/employee.types";
import ModalDelete from "@/components/ui/modal/ModalDelete";


export default function EmployeeDelete({
    employeeId,
    onClose,
}: EmployeeDeletedProps) {
    const { t } = useTranslation("main");
    const [deleteEmployee, { isLoading }] =
        useDeleteEmployeeMutation();
    const handleDelete = async () => {
        try {
            await deleteEmployee(employeeId).unwrap();
            toast.success(t("message.deleted", {name: t('content.employee')}));
            onClose();
        } catch (error: any) {
            toast.error(
                error?.data?.message ??
                t("message.something_went_wrong")
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
            {/* <div className="py-1 px-3">

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: .3,
                        type: "spring",
                    }}
                    className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{
                        background: hexToRgba(accentColor, .12),
                    }}
                >
                    <motion.div
                        animate={{
                            rotate: [-8, 8, -8],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.4,
                        }}
                    >
                        <FiAlertTriangle
                            size={38}
                            color={accentColor}
                        />
                    </motion.div>
                </motion.div>

                <h3 className="text-center text-xl font-semibold">
                    {t("main:content.are_you_sure")}
                </h3>

                <p className="mt-3 text-center text-sm text-gray-500 leading-6">
                    {t(
                        "main:content.delete_employee_confirmation"
                    )}
                </p>

                <div className="mt-2 flex justify-end gap-3 p-3">
                    <AppCustomButton
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {t("main:button.cancel")}
                    </AppCustomButton>

                    <AppCustomButton
                        onClick={handleDelete}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        {t("main:button.delete")}
                    </AppCustomButton>
                </div>
            </div> */}
        </AppModal>
    );
}