"use client";

import { closeModal } from "@/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GROCERY_MODAL_TYPES } from "@/components/admin/Grocery/groceryModalTypes";
import GroceryStockLedgerCreate from "./GroceryStockLedgerCreate";
import GroceryStockLedgerUpdate from "./GroceryStockLedgerUpdate";
import GroceryStockLedgerDelete from "./GroceryStockLedgerDelete";

export default function GroceryStockLedgerModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  if (!isOpen) return null;
  const onClose = () => dispatch(closeModal());
  const modalTypes = GROCERY_MODAL_TYPES.groceryStockLedger;

  switch (type) {
    case modalTypes.create:
      return <GroceryStockLedgerCreate onClose={onClose} />;
    case modalTypes.update:
      return <GroceryStockLedgerUpdate onClose={onClose} />;
    case modalTypes.delete:
      return <GroceryStockLedgerDelete onClose={onClose} />;
    default:
      return null;
  }
}
