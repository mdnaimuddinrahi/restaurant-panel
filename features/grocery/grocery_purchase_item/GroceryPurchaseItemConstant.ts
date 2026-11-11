import { TableColumn } from '@/store/common.types';
import { TFunction } from 'i18next';
import { z } from 'zod';
import { GroceryPurchaseItem, GroceryPurchaseItemTableHead } from './GroceryPurchaseItem.types';

export const GROCERYPURCHASEITEM_CREATE_MODAL = 'grocery_purchase_item-create';
export const GROCERYPURCHASEITEM_UPDATE_MODAL = 'grocery_purchase_item-update';
export const GROCERYPURCHASEITEM_DELETE_MODAL = 'grocery_purchase_item-delete';
export const GROCERYPURCHASEITEM_COLUMNS: TableColumn<GroceryPurchaseItemTableHead>[] = [
  { key: 'id', label: 'ID', isSort: true, isVisible: true },
  { key: 'grocery_purchase_id', label: 'grocery_purchase_id', isSort: true, isVisible: true },
];
export const GroceryPurchaseItemSchema = (t: TFunction) => z.object({
  grocery_purchase_id: z.union([z.string(), z.number()]),
});

