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

interface EmployeeDeletedProps {
    employeeId: number;
    onClose: () => void;
}

export default function EmployeeDelete({
    employeeId,
    onClose,
}: EmployeeDeletedProps) {
    const { t } = useTranslation("employee");
    const { accentColor } = useButtonTheme();
    const [deleteEmployee, { isLoading }] =
        useDeleteEmployeeMutation();
    const handleDelete = async () => {
        try {
            await deleteEmployee(employeeId).unwrap();
            toast.success(t("employee_deleted_successfully"));
            onClose();
        } catch (error: any) {
            toast.error(
                error?.data?.message ??
                t("common:something_went_wrong")
            );
        }
    };

    return (
        <AppModal
            modalTitle={t("delete_employee")}
            onClose={onClose}
            size="sm"
        >
            <div className="py-1 px-3">

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
                    {t("employee:are_you_sure")}
                </h3>

                <p className="mt-3 text-center text-sm text-gray-500 leading-6">
                    {t(
                        "employee:delete_employee_confirmation"
                    )}
                </p>

                <div className="mt-2 flex justify-end gap-3 p-3">
                    <AppCustomButton
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {t("common:cancel")}
                    </AppCustomButton>

                    <AppCustomButton
                        onClick={handleDelete}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        {t("common:delete")}
                    </AppCustomButton>
                </div>
            </div>
        </AppModal>
    );
}