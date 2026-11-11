import { TableColumn } from '@/store/common.types';
import { TFunction } from 'i18next';
import { z } from 'zod';
import { GroceryPurchase, GroceryPurchaseTableHead } from './GroceryPurchase.types';

export const GROCERYPURCHASE_CREATE_MODAL = 'grocery_purchase-create';
export const GROCERYPURCHASE_UPDATE_MODAL = 'grocery_purchase-update';
export const GROCERYPURCHASE_DELETE_MODAL = 'grocery_purchase-delete';
export const GROCERYPURCHASE_COLUMNS: TableColumn<GroceryPurchaseTableHead>[] = [
  { key: 'id', label: 'ID', isSort: true, isVisible: true },
  { key: 'supplier_id', label: 'supplier_id', isSort: true, isVisible: true },
];
export const GroceryPurchaseSchema = (t: TFunction) => z.object({
  supplier_id: z.union([z.string(), z.number()]),
});

