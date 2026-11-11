"use client";

import { closeModal } from "@/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GROCERY_MODAL_TYPES } from "@/components/admin/Grocery/groceryModalTypes";
import GroceryCategoryCreate from "./GroceryCategoryCreate";
import GroceryCategoryUpdate from "./GroceryCategoryUpdate";
import GroceryCategoryDelete from "./GroceryCategoryDelete";

export default function GroceryCategoryModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  if (!isOpen) return null;
  const onClose = () => dispatch(closeModal());
  const modalTypes = GROCERY_MODAL_TYPES.groceryCategory;

  switch (type) {
    case modalTypes.create:
      return <GroceryCategoryCreate onClose={onClose} />;
    case modalTypes.update:
      return <GroceryCategoryUpdate onClose={onClose} />;
    case modalTypes.delete:
      return <GroceryCategoryDelete onClose={onClose} />;
    default:
      return null;
  }
}
