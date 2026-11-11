"use client";

import GroceryCategoryList from "@/components/admin/Grocery/GroceryCategory/GroceryCategoryList";
import GroceryCategoryModal from "@/components/admin/Grocery/GroceryCategory/GroceryCategoryModal";
import Heading from "@/components/ui/Heading";
import { useTranslation } from "react-i18next";

export default function GroceryCategoryPage() {
  const { t } = useTranslation("main");
  return (
    <>
      <Heading title={t("title.grocery_category")} />
      <GroceryCategoryList />
      <GroceryCategoryModal />
    </>);
}
