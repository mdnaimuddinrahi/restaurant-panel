"use client";

import { closeModal } from "@/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GROCERY_MODAL_TYPES } from "@/components/admin/Grocery/groceryModalTypes";
import GrocerySupplierCreate from "./GrocerySupplierCreate";
import GrocerySupplierUpdate from "./GrocerySupplierUpdate";
import GrocerySupplierDelete from "./GrocerySupplierDelete";

export default function GrocerySupplierModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  if (!isOpen) return null;
  const onClose = () => dispatch(closeModal());
  const modalTypes = GROCERY_MODAL_TYPES.grocerySupplier;

  switch (type) {
    case modalTypes.create:
      return <GrocerySupplierCreate onClose={onClose} />;
    case modalTypes.update:
      return <GrocerySupplierUpdate onClose={onClose} />;
    case modalTypes.delete:
      return <GrocerySupplierDelete onClose={onClose} />;
    default:
      return null;
  }
}
