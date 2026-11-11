"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryPurchaseUpdate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Update Grocery Purchase"
      description="Update Grocery Purchase form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
