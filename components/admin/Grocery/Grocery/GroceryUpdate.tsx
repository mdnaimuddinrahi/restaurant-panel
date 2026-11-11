"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryUpdate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Update Grocery"
      description="Update Grocery form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
