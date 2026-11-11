"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryPurchaseItemUpdate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Update Grocery Purchase Item"
      description="Update Grocery Purchase Item form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
