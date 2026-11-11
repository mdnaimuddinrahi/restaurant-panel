import { baseApi } from '@/services/baseApi';
import { DEFAULT_METHOD, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from '@/store/commonConstants';
import { routes } from '@/utils/apiRoutes';
import { GroceryUnit, GroceryUnitByIdResponse, GroceryUnitResponse, GroceryUnitTag } from './GroceryUnit.types';

export const GroceryUnitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroceryUnits: builder.query<GroceryUnitResponse, void>({
      query: () => ({ url: routes.grocery_unit.list, method: DEFAULT_METHOD.GET }),
      providesTags: (result): GroceryUnitTag[] => [
        ...(result?.data ?? []).map(({ id }) => ({ type: DEFAULT_TAG.GROCERYUNIT, id })),
        { type: DEFAULT_TAG.GROCERYUNIT, id: DEFAULT_TAG_SCOPE.LIST },
      ],
    }),
    getGroceryUnitById: builder.query<GroceryUnitByIdResponse, number>({
      query: (id) => ({ url: routes.grocery_unit.getById(id), method: DEFAULT_METHOD.GET }),
      providesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYUNIT, id }],
    }),
    createGroceryUnit: builder.mutation<GroceryUnit, FormData>({
      query: (body) => ({ url: routes.grocery_unit.create, method: DEFAULT_METHOD.POST, body }),
      invalidatesTags: [{ type: DEFAULT_TAG.GROCERYUNIT, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    updateGroceryUnit: builder.mutation<GroceryUnit, { id: number; data: FormData }>({
      query: ({ id, data }) => ({ url: routes.grocery_unit.update(id), method: DEFAULT_METHOD.PUT, body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: DEFAULT_TAG.GROCERYUNIT, id }, { type: DEFAULT_TAG.GROCERYUNIT, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    deleteGroceryUnit: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: routes.grocery_unit.delete(id), method: DEFAULT_METHOD.DELETE }),
      invalidatesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYUNIT, id }, { type: DEFAULT_TAG.GROCERYUNIT, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
  }),
});

export const { useGetGroceryUnitsQuery, useGetGroceryUnitByIdQuery, useCreateGroceryUnitMutation, useUpdateGroceryUnitMutation, useDeleteGroceryUnitMutation } = GroceryUnitApi;

