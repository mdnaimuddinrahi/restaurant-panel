"use client";

import AppModal from "@/components/ui/modal/AppModal";

export default function GroceryActionModal({
  title,
  description,
  onClose,
}: {
  title: string;
  description: string;
  onClose: () => void;
}) {
  return (
    <AppModal onClose={onClose} modalTitle={title} size="md">
      <div className="p-6 text-center text-slate-500 dark:text-slate-400">{description}</div>
    </AppModal>
  );
}
