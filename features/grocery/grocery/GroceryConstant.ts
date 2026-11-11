import { TableColumn } from '@/store/common.types';
import { TFunction } from 'i18next';
import { z } from 'zod';
import { Grocery, GroceryTableHead } from './Grocery.types';

export const GROCERY_CREATE_MODAL = 'grocery-create';
export const GROCERY_UPDATE_MODAL = 'grocery-update';
export const GROCERY_DELETE_MODAL = 'grocery-delete';
export const GROCERY_COLUMNS: TableColumn<GroceryTableHead>[] = [
  { key: 'id', label: 'ID', isSort: true, isVisible: true },
  { key: 'name', label: 'name', isSort: true, isVisible: true },
];
export const GrocerySchema = (t: TFunction) => z.object({
  name: z.union([z.string(), z.number()]),
});

