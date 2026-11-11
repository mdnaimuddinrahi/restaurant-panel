import { TableColumn } from '@/store/common.types';
import { TFunction } from 'i18next';
import { z } from 'zod';
import { GroceryUnit, GroceryUnitTableHead } from './GroceryUnit.types';

export const GROCERYUNIT_CREATE_MODAL = 'grocery_unit-create';
export const GROCERYUNIT_UPDATE_MODAL = 'grocery_unit-update';
export const GROCERYUNIT_DELETE_MODAL = 'grocery_unit-delete';
export const GROCERYUNIT_COLUMNS: TableColumn<GroceryUnitTableHead>[] = [
  { key: 'id', label: 'ID', isSort: true, isVisible: true },
  { key: 'name', label: 'name', isSort: true, isVisible: true },
];
export const GroceryUnitSchema = (t: TFunction) => z.object({
  name: z.union([z.string(), z.number()]),
});

