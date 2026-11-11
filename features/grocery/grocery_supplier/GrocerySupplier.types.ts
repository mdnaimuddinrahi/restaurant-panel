import { DEFAULT_TAG } from '@/store/commonConstants';
import { TableColumn } from '@/store/common.types';

export interface GrocerySupplier {
  id: number;
  name: string | number | null;
  phone: string | number | null;
  email: string | number | null;
  address: string | number | null;
  status: string | number | null;
  created_at?: string;
  updated_at?: string | null;
}

export type GrocerySupplierTableHead = GrocerySupplier;
export interface GrocerySupplierResponse { data: GrocerySupplier[]; }
export interface GrocerySupplierByIdResponse { data: GrocerySupplier; }
export type GrocerySupplierTag = { type: typeof DEFAULT_TAG.GROCERYSUPPLIER; id: number | 'LIST' };
export type GrocerySupplierColumn = TableColumn<GrocerySupplierTableHead>;

