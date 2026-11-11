"use client";

import GroceryUnitList from "@/components/admin/Grocery/GroceryUnit/GroceryUnitList";
import Heading from "@/components/ui/Heading";
import { useTranslation } from "react-i18next";

export default function GroceryUnitPage() {
  const { t } = useTranslation("main");
  return <><Heading title={t("title.grocery_unit")} /><GroceryUnitList /></>;
}
