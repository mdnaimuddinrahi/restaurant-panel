import { baseApi } from '@/services/baseApi';
import { DEFAULT_METHOD, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from '@/store/commonConstants';
import { routes } from '@/utils/apiRoutes';
import { GrocerySupplier, GrocerySupplierByIdResponse, GrocerySupplierResponse, GrocerySupplierTag } from './GrocerySupplier.types';

export const GrocerySupplierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGrocerySuppliers: builder.query<GrocerySupplierResponse, void>({
      query: () => ({ url: routes.grocery_supplier.list, method: DEFAULT_METHOD.GET }),
      providesTags: (result): GrocerySupplierTag[] => [
        ...(result?.data ?? []).map(({ id }) => ({ type: DEFAULT_TAG.GROCERYSUPPLIER, id })),
        { type: DEFAULT_TAG.GROCERYSUPPLIER, id: DEFAULT_TAG_SCOPE.LIST },
      ],
    }),
    getGrocerySupplierById: builder.query<GrocerySupplierByIdResponse, number>({
      query: (id) => ({ url: routes.grocery_supplier.getById(id), method: DEFAULT_METHOD.GET }),
      providesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYSUPPLIER, id }],
    }),
    createGrocerySupplier: builder.mutation<GrocerySupplier, FormData>({
      query: (body) => ({ url: routes.grocery_supplier.create, method: DEFAULT_METHOD.POST, body }),
      invalidatesTags: [{ type: DEFAULT_TAG.GROCERYSUPPLIER, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    updateGrocerySupplier: builder.mutation<GrocerySupplier, { id: number; data: FormData }>({
      query: ({ id, data }) => ({ url: routes.grocery_supplier.update(id), method: DEFAULT_METHOD.PUT, body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: DEFAULT_TAG.GROCERYSUPPLIER, id }, { type: DEFAULT_TAG.GROCERYSUPPLIER, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    deleteGrocerySupplier: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: routes.grocery_supplier.delete(id), method: DEFAULT_METHOD.DELETE }),
      invalidatesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYSUPPLIER, id }, { type: DEFAULT_TAG.GROCERYSUPPLIER, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
  }),
});

export const { useGetGrocerySuppliersQuery, useGetGrocerySupplierByIdQuery, useCreateGrocerySupplierMutation, useUpdateGrocerySupplierMutation, useDeleteGrocerySupplierMutation } = GrocerySupplierApi;

