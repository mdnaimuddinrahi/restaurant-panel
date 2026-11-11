import { DEFAULT_TAG } from '@/store/commonConstants';
import { TableColumn } from '@/store/common.types';

export interface GroceryUnit {
  id: number;
  name: string | number | null;
  abbreviation: string | number | null;
  status: string | number | null;
  created_at?: string;
  updated_at?: string | null;
}

export type GroceryUnitTableHead = GroceryUnit;
export interface GroceryUnitResponse { data: GroceryUnit[]; }
export interface GroceryUnitByIdResponse { data: GroceryUnit; }
export type GroceryUnitTag = { type: typeof DEFAULT_TAG.GROCERYUNIT; id: number | 'LIST' };
export type GroceryUnitColumn = TableColumn<GroceryUnitTableHead>;

