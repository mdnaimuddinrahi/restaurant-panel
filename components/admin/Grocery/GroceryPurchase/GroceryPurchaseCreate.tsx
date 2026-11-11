"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryPurchaseCreate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Create Grocery Purchase"
      description="Create Grocery Purchase form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
