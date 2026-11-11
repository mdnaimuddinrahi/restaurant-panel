"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryPurchaseItemDelete({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Delete Grocery Purchase Item"
      description="Delete Grocery Purchase Item form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
