"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryCategoryCreate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Create Grocery Category"
      description="Create Grocery Category form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
