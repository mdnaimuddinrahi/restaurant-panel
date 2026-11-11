import { TableColumn } from '@/store/common.types';
import { TFunction } from 'i18next';
import { z } from 'zod';
import { GrocerySupplier, GrocerySupplierTableHead } from './GrocerySupplier.types';

export const GROCERYSUPPLIER_CREATE_MODAL = 'grocery_supplier-create';
export const GROCERYSUPPLIER_UPDATE_MODAL = 'grocery_supplier-update';
export const GROCERYSUPPLIER_DELETE_MODAL = 'grocery_supplier-delete';
export const GROCERYSUPPLIER_COLUMNS: TableColumn<GrocerySupplierTableHead>[] = [
  { key: 'id', label: 'ID', isSort: true, isVisible: true },
  { key: 'name', label: 'name', isSort: true, isVisible: true },
];
export const GrocerySupplierSchema = (t: TFunction) => z.object({
  name: z.union([z.string(), z.number()]),
});

