import { DEFAULT_TAG } from '@/store/commonConstants';
import { TableColumn } from '@/store/common.types';

export interface GroceryPurchase {
  id: number;
  supplier_id: string | number | null;
  purchase_date: string | number | null;
  total_amount: string | number | null;
  status: string | number | null;
  created_at?: string;
  updated_at?: string | null;
}

export type GroceryPurchaseTableHead = GroceryPurchase;
export interface GroceryPurchaseResponse { data: GroceryPurchase[]; }
export interface GroceryPurchaseByIdResponse { data: GroceryPurchase; }
export type GroceryPurchaseTag = { type: typeof DEFAULT_TAG.GROCERYPURCHASE; id: number | 'LIST' };
export type GroceryPurchaseColumn = TableColumn<GroceryPurchaseTableHead>;

