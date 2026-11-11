"use client";

import { closeModal } from "@/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GROCERY_MODAL_TYPES } from "@/components/admin/Grocery/groceryModalTypes";
import GroceryPurchaseCreate from "./GroceryPurchaseCreate";
import GroceryPurchaseUpdate from "./GroceryPurchaseUpdate";
import GroceryPurchaseDelete from "./GroceryPurchaseDelete";

export default function GroceryPurchaseModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  if (!isOpen) return null;
  const onClose = () => dispatch(closeModal());
  const modalTypes = GROCERY_MODAL_TYPES.groceryPurchase;

  switch (type) {
    case modalTypes.create:
      return <GroceryPurchaseCreate onClose={onClose} />;
    case modalTypes.update:
      return <GroceryPurchaseUpdate onClose={onClose} />;
    case modalTypes.delete:
      return <GroceryPurchaseDelete onClose={onClose} />;
    default:
      return null;
  }
}
