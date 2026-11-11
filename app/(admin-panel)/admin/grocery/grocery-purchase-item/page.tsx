"use client";

import GroceryPurchaseItemList from "@/components/admin/Grocery/GroceryPurchaseItem/GroceryPurchaseItemList";
import Heading from "@/components/ui/Heading";
import { useTranslation } from "react-i18next";

export default function GroceryPurchaseItemPage() {
  const { t } = useTranslation("main");
  return <><Heading title={t("title.grocery_purchase_item")} /><GroceryPurchaseItemList /></>;
}
