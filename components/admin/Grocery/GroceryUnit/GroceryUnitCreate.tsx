"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryUnitCreate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Create Grocery Unit"
      description="Create Grocery Unit form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
