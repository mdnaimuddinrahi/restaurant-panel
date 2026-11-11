"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GrocerySupplierUpdate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Update Grocery Supplier"
      description="Update Grocery Supplier form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
