"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryCategoryDelete({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Delete Grocery Category"
      description="Delete Grocery Category form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
