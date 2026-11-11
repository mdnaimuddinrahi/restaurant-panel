"use client";

import { closeModal } from "@/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GROCERY_MODAL_TYPES } from "@/components/admin/Grocery/groceryModalTypes";
import GroceryUnitCreate from "./GroceryUnitCreate";
import GroceryUnitUpdate from "./GroceryUnitUpdate";
import GroceryUnitDelete from "./GroceryUnitDelete";

export default function GroceryUnitModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  if (!isOpen) return null;
  const onClose = () => dispatch(closeModal());
  const modalTypes = GROCERY_MODAL_TYPES.groceryUnit;

  switch (type) {
    case modalTypes.create:
      return <GroceryUnitCreate onClose={onClose} />;
    case modalTypes.update:
      return <GroceryUnitUpdate onClose={onClose} />;
    case modalTypes.delete:
      return <GroceryUnitDelete onClose={onClose} />;
    default:
      return null;
  }
}
