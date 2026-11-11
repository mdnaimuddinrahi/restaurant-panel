import { DEFAULT_TAG } from '@/store/commonConstants';
import { TableColumn } from '@/store/common.types';

export interface GroceryPurchaseItem {
  id: number;
  grocery_purchase_id: string | number | null;
  grocery_id: string | number | null;
  quantity: string | number | null;
  unit_price: string | number | null;
  created_at?: string;
  updated_at?: string | null;
}

export type GroceryPurchaseItemTableHead = GroceryPurchaseItem;
export interface GroceryPurchaseItemResponse { data: GroceryPurchaseItem[]; }
export interface GroceryPurchaseItemByIdResponse { data: GroceryPurchaseItem; }
export type GroceryPurchaseItemTag = { type: typeof DEFAULT_TAG.GROCERYPURCHASEITEM; id: number | 'LIST' };
export type GroceryPurchaseItemColumn = TableColumn<GroceryPurchaseItemTableHead>;

