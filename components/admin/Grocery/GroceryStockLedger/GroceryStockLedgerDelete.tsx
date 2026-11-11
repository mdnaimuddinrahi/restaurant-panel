"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryStockLedgerDelete({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Delete Grocery Stock Ledger"
      description="Delete Grocery Stock Ledger form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
