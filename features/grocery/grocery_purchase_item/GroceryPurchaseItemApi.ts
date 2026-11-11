import { baseApi } from '@/services/baseApi';
import { DEFAULT_METHOD, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from '@/store/commonConstants';
import { routes } from '@/utils/apiRoutes';
import { GroceryPurchaseItem, GroceryPurchaseItemByIdResponse, GroceryPurchaseItemResponse, GroceryPurchaseItemTag } from './GroceryPurchaseItem.types';

export const GroceryPurchaseItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroceryPurchaseItems: builder.query<GroceryPurchaseItemResponse, void>({
      query: () => ({ url: routes.grocery_purchase_item.list, method: DEFAULT_METHOD.GET }),
      providesTags: (result): GroceryPurchaseItemTag[] => [
        ...(result?.data ?? []).map(({ id }) => ({ type: DEFAULT_TAG.GROCERYPURCHASEITEM, id })),
        { type: DEFAULT_TAG.GROCERYPURCHASEITEM, id: DEFAULT_TAG_SCOPE.LIST },
      ],
    }),
    getGroceryPurchaseItemById: builder.query<GroceryPurchaseItemByIdResponse, number>({
      query: (id) => ({ url: routes.grocery_purchase_item.getById(id), method: DEFAULT_METHOD.GET }),
      providesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYPURCHASEITEM, id }],
    }),
    createGroceryPurchaseItem: builder.mutation<GroceryPurchaseItem, FormData>({
      query: (body) => ({ url: routes.grocery_purchase_item.create, method: DEFAULT_METHOD.POST, body }),
      invalidatesTags: [{ type: DEFAULT_TAG.GROCERYPURCHASEITEM, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    updateGroceryPurchaseItem: builder.mutation<GroceryPurchaseItem, { id: number; data: FormData }>({
      query: ({ id, data }) => ({ url: routes.grocery_purchase_item.update(id), method: DEFAULT_METHOD.PUT, body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: DEFAULT_TAG.GROCERYPURCHASEITEM, id }, { type: DEFAULT_TAG.GROCERYPURCHASEITEM, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    deleteGroceryPurchaseItem: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: routes.grocery_purchase_item.delete(id), method: DEFAULT_METHOD.DELETE }),
      invalidatesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYPURCHASEITEM, id }, { type: DEFAULT_TAG.GROCERYPURCHASEITEM, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
  }),
});

export const { useGetGroceryPurchaseItemsQuery, useGetGroceryPurchaseItemByIdQuery, useCreateGroceryPurchaseItemMutation, useUpdateGroceryPurchaseItemMutation, useDeleteGroceryPurchaseItemMutation } = GroceryPurchaseItemApi;

