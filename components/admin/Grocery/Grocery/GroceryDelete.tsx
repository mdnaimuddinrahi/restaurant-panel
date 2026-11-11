"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryDelete({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Delete Grocery"
      description="Delete Grocery form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
