"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryPurchaseDelete({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Delete Grocery Purchase"
      description="Delete Grocery Purchase form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
