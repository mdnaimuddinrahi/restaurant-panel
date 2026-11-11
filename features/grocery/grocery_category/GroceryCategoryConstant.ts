import { TableColumn } from '@/store/common.types';
import { TFunction } from 'i18next';
import { z } from 'zod';
import { GroceryCategory, GroceryCategoryTableHead } from './GroceryCategory.types';

export const GROCERYCATEGORY_CREATE_MODAL = 'grocery_category-create';
export const GROCERYCATEGORY_UPDATE_MODAL = 'grocery_category-update';
export const GROCERYCATEGORY_DELETE_MODAL = 'grocery_category-delete';
export const GROCERYCATEGORY_COLUMNS: TableColumn<GroceryCategoryTableHead>[] = [
  { key: 'id', label: 'ID', isSort: true, isVisible: true },
  { key: 'name', label: 'name', isSort: true, isVisible: true },
];
export const GroceryCategorySchema = (t: TFunction) => z.object({
  name: z.union([z.string(), z.number()]),
});

