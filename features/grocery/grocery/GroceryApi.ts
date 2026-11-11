import { baseApi } from '@/services/baseApi';
import { DEFAULT_METHOD, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from '@/store/commonConstants';
import { routes } from '@/utils/apiRoutes';
import { Grocery, GroceryByIdResponse, GroceryResponse, GroceryTag } from './Grocery.types';

export const GroceryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGrocerys: builder.query<GroceryResponse, void>({
      query: () => ({ url: routes.grocery.list, method: DEFAULT_METHOD.GET }),
      providesTags: (result): GroceryTag[] => [
        ...(result?.data ?? []).map(({ id }) => ({ type: DEFAULT_TAG.GROCERY, id })),
        { type: DEFAULT_TAG.GROCERY, id: DEFAULT_TAG_SCOPE.LIST },
      ],
    }),
    getGroceryById: builder.query<GroceryByIdResponse, number>({
      query: (id) => ({ url: routes.grocery.getById(id), method: DEFAULT_METHOD.GET }),
      providesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERY, id }],
    }),
    createGrocery: builder.mutation<Grocery, FormData>({
      query: (body) => ({ url: routes.grocery.create, method: DEFAULT_METHOD.POST, body }),
      invalidatesTags: [{ type: DEFAULT_TAG.GROCERY, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    updateGrocery: builder.mutation<Grocery, { id: number; data: FormData }>({
      query: ({ id, data }) => ({ url: routes.grocery.update(id), method: DEFAULT_METHOD.PUT, body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: DEFAULT_TAG.GROCERY, id }, { type: DEFAULT_TAG.GROCERY, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    deleteGrocery: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: routes.grocery.delete(id), method: DEFAULT_METHOD.DELETE }),
      invalidatesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERY, id }, { type: DEFAULT_TAG.GROCERY, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
  }),
});

export const { useGetGrocerysQuery, useGetGroceryByIdQuery, useCreateGroceryMutation, useUpdateGroceryMutation, useDeleteGroceryMutation } = GroceryApi;

