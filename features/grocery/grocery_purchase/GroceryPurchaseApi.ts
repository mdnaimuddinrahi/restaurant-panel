import { baseApi } from '@/services/baseApi';
import { DEFAULT_METHOD, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from '@/store/commonConstants';
import { routes } from '@/utils/apiRoutes';
import { GroceryPurchase, GroceryPurchaseByIdResponse, GroceryPurchaseResponse, GroceryPurchaseTag } from './GroceryPurchase.types';

export const GroceryPurchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroceryPurchases: builder.query<GroceryPurchaseResponse, void>({
      query: () => ({ url: routes.grocery_purchase.list, method: DEFAULT_METHOD.GET }),
      providesTags: (result): GroceryPurchaseTag[] => [
        ...(result?.data ?? []).map(({ id }) => ({ type: DEFAULT_TAG.GROCERYPURCHASE, id })),
        { type: DEFAULT_TAG.GROCERYPURCHASE, id: DEFAULT_TAG_SCOPE.LIST },
      ],
    }),
    getGroceryPurchaseById: builder.query<GroceryPurchaseByIdResponse, number>({
      query: (id) => ({ url: routes.grocery_purchase.getById(id), method: DEFAULT_METHOD.GET }),
      providesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYPURCHASE, id }],
    }),
    createGroceryPurchase: builder.mutation<GroceryPurchase, FormData>({
      query: (body) => ({ url: routes.grocery_purchase.create, method: DEFAULT_METHOD.POST, body }),
      invalidatesTags: [{ type: DEFAULT_TAG.GROCERYPURCHASE, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    updateGroceryPurchase: builder.mutation<GroceryPurchase, { id: number; data: FormData }>({
      query: ({ id, data }) => ({ url: routes.grocery_purchase.update(id), method: DEFAULT_METHOD.PUT, body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: DEFAULT_TAG.GROCERYPURCHASE, id }, { type: DEFAULT_TAG.GROCERYPURCHASE, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    deleteGroceryPurchase: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: routes.grocery_purchase.delete(id), method: DEFAULT_METHOD.DELETE }),
      invalidatesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYPURCHASE, id }, { type: DEFAULT_TAG.GROCERYPURCHASE, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
  }),
});

export const { useGetGroceryPurchasesQuery, useGetGroceryPurchaseByIdQuery, useCreateGroceryPurchaseMutation, useUpdateGroceryPurchaseMutation, useDeleteGroceryPurchaseMutation } = GroceryPurchaseApi;

