"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GrocerySupplierDelete({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Delete Grocery Supplier"
      description="Delete Grocery Supplier form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
