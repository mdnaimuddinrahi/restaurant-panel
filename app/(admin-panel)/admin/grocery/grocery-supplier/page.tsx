"use client";

import ContentCard from "@/components/ui/ContentCard";
import Heading from "@/components/ui/Heading";
import { useTranslation } from "react-i18next";

export default function GrocerySupplierPage() {
  const { t } = useTranslation("main");
  return <><Heading title={t("title.grocery_supplier")} /><ContentCard><div className="p-6 text-center text-slate-500 dark:text-slate-400">Grocery Supplier list</div></ContentCard></>;
}
