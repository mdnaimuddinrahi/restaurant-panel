export const GROCERY_MODAL_TYPES = {
  groceryCategory: { create: "grocery-category-create", update: "grocery-category-update", delete: "grocery-category-delete" },
  grocery: { create: "grocery-create", update: "grocery-update", delete: "grocery-delete" },
  groceryPurchase: { create: "grocery-purchase-create", update: "grocery-purchase-update", delete: "grocery-purchase-delete" },
  groceryPurchaseItem: { create: "grocery-purchase-item-create", update: "grocery-purchase-item-update", delete: "grocery-purchase-item-delete" },
  groceryStockLedger: { create: "grocery-stock-ledger-create", update: "grocery-stock-ledger-update", delete: "grocery-stock-ledger-delete" },
  grocerySupplier: { create: "grocery-supplier-create", update: "grocery-supplier-update", delete: "grocery-supplier-delete" },
  groceryUnit: { create: "grocery-unit-create", update: "grocery-unit-update", delete: "grocery-unit-delete" },
} as const;
