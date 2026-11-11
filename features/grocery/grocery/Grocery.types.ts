import { DEFAULT_TAG } from '@/store/commonConstants';
import { TableColumn } from '@/store/common.types';

export interface Grocery {
  id: number;
  name: string | number | null;
  grocery_category_id: string | number | null;
  grocery_unit_id: string | number | null;
  status: string | number | null;
  created_at?: string;
  updated_at?: string | null;
}

export type GroceryTableHead = Grocery;
export interface GroceryResponse { data: Grocery[]; }
export interface GroceryByIdResponse { data: Grocery; }
export type GroceryTag = { type: typeof DEFAULT_TAG.GROCERY; id: number | 'LIST' };
export type GroceryColumn = TableColumn<GroceryTableHead>;

