import { DEFAULT_TAG } from '@/store/commonConstants';
import { TableColumn } from '@/store/common.types';

export interface GroceryStockLedger {
  id: number;
  grocery_id: string | number | null;
  transaction_type: string | number | null;
  quantity: string | number | null;
  created_at: string | number | null;
  created_at?: string;
  updated_at?: string | null;
}

export type GroceryStockLedgerTableHead = GroceryStockLedger;
export interface GroceryStockLedgerResponse { data: GroceryStockLedger[]; }
export interface GroceryStockLedgerByIdResponse { data: GroceryStockLedger; }
export type GroceryStockLedgerTag = { type: typeof DEFAULT_TAG.GROCERYSTOCKLEDGER; id: number | 'LIST' };
export type GroceryStockLedgerColumn = TableColumn<GroceryStockLedgerTableHead>;

