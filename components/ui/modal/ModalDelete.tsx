import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

import { t } from "i18next";
import { hexToRgba } from "@/theme";
import AppCustomButton from "../button/AppCustomButton";
import { useButtonTheme } from "@/hooks/useButtonTheme";

interface ModalDeleteProps {
  title?: string;
  description?: string;
  isLoading?: boolean;
  onDelete: () => void;
  onCancel: () => void;
  cancelText?: string;
  deleteText?: string;
}

export default function ModalDelete({
  title=t("main:content.are_you_sure"),
  description=t("main:content.delete_confirmation"),
  isLoading = false,
  onDelete,
  onCancel,
  cancelText = t("main:button.cancel"),
  deleteText = t("main:button.delete"),
}: ModalDeleteProps) {
    const { accentColor } = useButtonTheme();
  return (
    <div className="px-3 py-1">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.3,
          type: "spring",
        }}
        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          background: hexToRgba(accentColor, 0.12),
        }}
      >
        <motion.div
          animate={{ rotate: [-8, 8, -8] }}
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
        {title}
      </h3>

      <p className="mt-3 text-center text-sm leading-6 text-gray-500">
        {description}
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <AppCustomButton
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="text-sm px-4 py-2"
        >
          {cancelText}
        </AppCustomButton>

        <AppCustomButton
          onClick={onDelete}
          loading={isLoading}
          disabled={isLoading}
          className="text-sm px-4 py-2"
        >
          {deleteText}
        </AppCustomButton>
      </div>
    </div>
  );
}