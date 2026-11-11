"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryUnitUpdate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Update Grocery Unit"
      description="Update Grocery Unit form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
