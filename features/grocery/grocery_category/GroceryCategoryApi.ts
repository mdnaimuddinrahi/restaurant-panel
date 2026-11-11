import { baseApi } from '@/services/baseApi';
import { DEFAULT_METHOD, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from '@/store/commonConstants';
import { routes } from '@/utils/apiRoutes';
import { GroceryCategory, GroceryCategoryByIdResponse, GroceryCategoryResponse, GroceryCategoryTag } from './GroceryCategory.types';

export const GroceryCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroceryCategorys: builder.query<GroceryCategoryResponse, void>({
      query: () => ({ url: routes.grocery_category.list, method: DEFAULT_METHOD.GET }),
      providesTags: (result): GroceryCategoryTag[] => [
        ...(result?.data ?? []).map(({ id }) => ({ type: DEFAULT_TAG.GROCERYCATEGORY, id })),
        { type: DEFAULT_TAG.GROCERYCATEGORY, id: DEFAULT_TAG_SCOPE.LIST },
      ],
    }),
    getGroceryCategoryById: builder.query<GroceryCategoryByIdResponse, number>({
      query: (id) => ({ url: routes.grocery_category.getById(id), method: DEFAULT_METHOD.GET }),
      providesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYCATEGORY, id }],
    }),
    createGroceryCategory: builder.mutation<GroceryCategory, FormData>({
      query: (body) => ({ url: routes.grocery_category.create, method: DEFAULT_METHOD.POST, body }),
      invalidatesTags: [{ type: DEFAULT_TAG.GROCERYCATEGORY, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    updateGroceryCategory: builder.mutation<GroceryCategory, { id: number; data: FormData }>({
      query: ({ id, data }) => ({ url: routes.grocery_category.update(id), method: DEFAULT_METHOD.PUT, body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: DEFAULT_TAG.GROCERYCATEGORY, id }, { type: DEFAULT_TAG.GROCERYCATEGORY, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    deleteGroceryCategory: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: routes.grocery_category.delete(id), method: DEFAULT_METHOD.DELETE }),
      invalidatesTags: (_result, _error, id) => [{ type: DEFAULT_TAG.GROCERYCATEGORY, id }, { type: DEFAULT_TAG.GROCERYCATEGORY, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
  }),
});

export const { useGetGroceryCategorysQuery, useGetGroceryCategoryByIdQuery, useCreateGroceryCategoryMutation, useUpdateGroceryCategoryMutation, useDeleteGroceryCategoryMutation } = GroceryCategoryApi;

