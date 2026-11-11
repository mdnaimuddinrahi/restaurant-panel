"use client";

import { closeModal } from "@/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GROCERY_MODAL_TYPES } from "@/components/admin/Grocery/groceryModalTypes";
import GroceryCreate from "./GroceryCreate";
import GroceryUpdate from "./GroceryUpdate";
import GroceryDelete from "./GroceryDelete";

export default function GroceryModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  if (!isOpen) return null;
  const onClose = () => dispatch(closeModal());
  const modalTypes = GROCERY_MODAL_TYPES.grocery;

  switch (type) {
    case modalTypes.create:
      return <GroceryCreate onClose={onClose} />;
    case modalTypes.update:
      return <GroceryUpdate onClose={onClose} />;
    case modalTypes.delete:
      return <GroceryDelete onClose={onClose} />;
    default:
      return null;
  }
}
