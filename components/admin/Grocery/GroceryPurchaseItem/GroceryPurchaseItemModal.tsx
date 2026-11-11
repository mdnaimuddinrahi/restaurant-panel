"use client";

import { closeModal } from "@/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GROCERY_MODAL_TYPES } from "@/components/admin/Grocery/groceryModalTypes";
import GroceryPurchaseItemCreate from "./GroceryPurchaseItemCreate";
import GroceryPurchaseItemUpdate from "./GroceryPurchaseItemUpdate";
import GroceryPurchaseItemDelete from "./GroceryPurchaseItemDelete";

export default function GroceryPurchaseItemModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  if (!isOpen) return null;
  const onClose = () => dispatch(closeModal());
  const modalTypes = GROCERY_MODAL_TYPES.groceryPurchaseItem;

  switch (type) {
    case modalTypes.create:
      return <GroceryPurchaseItemCreate onClose={onClose} />;
    case modalTypes.update:
      return <GroceryPurchaseItemUpdate onClose={onClose} />;
    case modalTypes.delete:
      return <GroceryPurchaseItemDelete onClose={onClose} />;
    default:
      return null;
  }
}
