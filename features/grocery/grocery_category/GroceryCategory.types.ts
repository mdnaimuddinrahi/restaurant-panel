import { DEFAULT_TAG } from '@/store/commonConstants';
import { TableColumn } from '@/store/common.types';

export interface GroceryCategory {
  id: number;
  name: string | number | null;
  description: string | number | null;
  status: string | number | null;
  created_at?: string;
  updated_at?: string | null;
}

export type GroceryCategoryTableHead = GroceryCategory;
export interface GroceryCategoryResponse { data: GroceryCategory[]; }
export interface GroceryCategoryByIdResponse { data: GroceryCategory; }
export type GroceryCategoryTag = { type: typeof DEFAULT_TAG.GROCERYCATEGORY; id: number | 'LIST' };
export type GroceryCategoryColumn = TableColumn<GroceryCategoryTableHead>;

