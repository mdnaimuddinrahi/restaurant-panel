"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GrocerySupplierCreate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Create Grocery Supplier"
      description="Create Grocery Supplier form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
