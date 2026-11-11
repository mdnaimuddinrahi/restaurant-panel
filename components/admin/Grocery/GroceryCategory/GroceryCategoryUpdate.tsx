"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryCategoryUpdate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Update Grocery Category"
      description="Update Grocery Category form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
