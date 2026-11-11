"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryPurchaseItemCreate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Create Grocery Purchase Item"
      description="Create Grocery Purchase Item form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
