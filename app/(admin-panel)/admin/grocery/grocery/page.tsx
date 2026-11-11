"use client";

import GroceryList from "@/components/admin/Grocery/Grocery/GroceryList";
import Heading from "@/components/ui/Heading";
import { useTranslation } from "react-i18next";

export default function GroceryPage() {
  const { t } = useTranslation("main");
  return <><Heading title={t("title.grocery")} /><GroceryList /></>;
}
