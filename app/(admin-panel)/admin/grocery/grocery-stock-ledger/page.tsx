"use client";

import GroceryStockLedgerList from "@/components/admin/Grocery/GroceryStockLedger/GroceryStockLedgerList";
import GroceryStockLedgerModal from "@/components/admin/Grocery/GroceryStockLedger/GroceryStockLedgerModal";
import Heading from "@/components/ui/Heading";
import { useTranslation } from "react-i18next";

export default function GroceryStockLedgerPage() {
  const { t } = useTranslation("main");
  return (
    <>
      <Heading title={t("title.grocery_stock_ledger")} />
      <GroceryStockLedgerList />
      <GroceryStockLedgerModal />
    </>
  );
}
