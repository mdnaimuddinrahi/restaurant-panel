"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryStockLedgerUpdate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Update Grocery Stock Ledger"
      description="Update Grocery Stock Ledger form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
