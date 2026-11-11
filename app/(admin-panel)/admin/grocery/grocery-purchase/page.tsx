"use client";

import GroceryPurchaseList from "@/components/admin/Grocery/GroceryPurchase/GroceryPurchaseList";
import GroceryPurchaseModal from "@/components/admin/Grocery/GroceryPurchase/GroceryPurchaseModal";
import Heading from "@/components/ui/Heading";
import { useTranslation } from "react-i18next";

export default function GroceryPurchasePage() {
  const { t } = useTranslation("main");
  return (
    <>
      <Heading title={t("title.grocery_purchase")} />
      <GroceryPurchaseList />
      <GroceryPurchaseModal/>
    </>
  );
}
