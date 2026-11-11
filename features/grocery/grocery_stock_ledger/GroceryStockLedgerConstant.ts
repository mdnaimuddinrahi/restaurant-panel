import { TableColumn } from '@/store/common.types';
import { TFunction } from 'i18next';
import { z } from 'zod';
import { GroceryStockLedger, GroceryStockLedgerTableHead } from './GroceryStockLedger.types';

export const GROCERYSTOCKLEDGER_CREATE_MODAL = 'grocery_stock_ledger-create';
export const GROCERYSTOCKLEDGER_UPDATE_MODAL = 'grocery_stock_ledger-update';
export const GROCERYSTOCKLEDGER_DELETE_MODAL = 'grocery_stock_ledger-delete';
export const GROCERYSTOCKLEDGER_COLUMNS: TableColumn<GroceryStockLedgerTableHead>[] = [
  { key: 'id', label: 'ID', isSort: true, isVisible: true },
  { key: 'grocery_id', label: 'grocery_id', isSort: true, isVisible: true },
];
export const GroceryStockLedgerSchema = (t: TFunction) => z.object({
  grocery_id: z.union([z.string(), z.number()]),
});

