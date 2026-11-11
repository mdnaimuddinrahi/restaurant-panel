"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryCreate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Create Grocery"
      description="Create Grocery form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
