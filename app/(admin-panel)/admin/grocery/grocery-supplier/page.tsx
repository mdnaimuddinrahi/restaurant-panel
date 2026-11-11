"use client";

import GrocerySupplierList from "@/components/admin/Grocery/GrocerySupplier/GrocerySupplierList";
import GrocerySupplierModal from "@/components/admin/Grocery/GrocerySupplier/GrocerySupplierModal";
import Heading from "@/components/ui/Heading";
import { useTranslation } from "react-i18next";

export default function GrocerySupplierPage() {
  const { t } = useTranslation("main");
  return (
    <>
      <Heading title={t("title.grocery_supplier")} />
      <GrocerySupplierList />
      <GrocerySupplierModal />
    </>
  );
}
