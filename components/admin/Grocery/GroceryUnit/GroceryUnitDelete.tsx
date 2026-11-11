"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryUnitDelete({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Delete Grocery Unit"
      description="Delete Grocery Unit form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
