"use client";

import GroceryActionModal from "@/components/admin/Grocery/GroceryActionModal";

export default function GroceryStockLedgerCreate({ onClose }: { onClose: () => void }) {
  return (
    <GroceryActionModal
      title="Create Grocery Stock Ledger"
      description="Create Grocery Stock Ledger form is ready to be connected to its API and validation schema."
      onClose={onClose}
    />
  );
}
