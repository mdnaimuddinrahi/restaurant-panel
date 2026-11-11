import { baseApi } from '@/services/baseApi';
import { DEFAULT_METHOD, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from '@/store/commonConstants';
import { routes } from '@/utils/apiRoutes';
import { GroceryStockLedger, GroceryStockLedgerByIdResponse, GroceryStockLedgerResponse, GroceryStockLedgerTag } from './GroceryStockLedger.types';

export const GroceryStockLedgerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroceryStockLedgers: builder.query<GroceryStockLedgerResponse, void>({
      query: () => ({ url: routes.grocery_stock_ledger.list, method: DEFAULT_METHOD.GET }),
      providesTags: (result): GroceryStockLedgerTag[] => [
        ...(result?.data ?? []).map(({ id }) => ({ type: DEFAULT_TAG.GROCERYSTOCKLEDGER, id })),
        { type: DEFAULT_TAG.GROCERYSTOCKLEDGER, id: DEFAULT_TAG_SCOPE.LIST },
      ],
    }),
    getGroceryStockLedgerById: builder.query<GroceryStockLedgerByIdResponse, number>({
      query: (id) => ({ url: routes.grocery_stock_ledger.getById(id), method: DEFAULT_METHOD.GET }),
      providesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYSTOCKLEDGER, id }],
    }),
    createGroceryStockLedger: builder.mutation<GroceryStockLedger, FormData>({
      query: (body) => ({ url: routes.grocery_stock_ledger.create, method: DEFAULT_METHOD.POST, body }),
      invalidatesTags: [{ type: DEFAULT_TAG.GROCERYSTOCKLEDGER, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    updateGroceryStockLedger: builder.mutation<GroceryStockLedger, { id: number; data: FormData }>({
      query: ({ id, data }) => ({ url: routes.grocery_stock_ledger.update(id), method: DEFAULT_METHOD.PUT, body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: DEFAULT_TAG.GROCERYSTOCKLEDGER, id }, { type: DEFAULT_TAG.GROCERYSTOCKLEDGER, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    deleteGroceryStockLedger: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: routes.grocery_stock_ledger.delete(id), method: DEFAULT_METHOD.DELETE }),
      invalidatesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYSTOCKLEDGER, id }, { type: DEFAULT_TAG.GROCERYSTOCKLEDGER, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
  }),
});

export const { useGetGroceryStockLedgersQuery, useGetGroceryStockLedgerByIdQuery, useCreateGroceryStockLedgerMutation, useUpdateGroceryStockLedgerMutation, useDeleteGroceryStockLedgerMutation } = GroceryStockLedgerApi;

