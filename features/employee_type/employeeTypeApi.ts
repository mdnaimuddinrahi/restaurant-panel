import { baseApi } from "@/services/baseApi";

import { DEFAULT_METHOD, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from "@/store/commonConstants";
import { routes } from "@/utils/apiRoutes";
import { EmployeeType, EmployeeTypeByIdResponse, EmployeeTypeTag, GetEmployeeTypesResponse } from "./employeeType.types";

export const employeeTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getEmployeeTypes: builder.query<GetEmployeeTypesResponse, void>({
      query: () => ({
        url: routes.employee_type.list,
        method: DEFAULT_METHOD.GET,
      }),
      providesTags: (result): EmployeeTypeTag[] => {
        const listTag = {
          type: DEFAULT_TAG.EMPLOYEE_TYPE,
          id: DEFAULT_TAG_SCOPE.LIST,
        } as const;

        if (!result?.data) return [listTag];

        return [
          ...result.data.map((employeeType) => ({
            type: DEFAULT_TAG.EMPLOYEE_TYPE,
            id: employeeType.id,
          })),
          listTag,
        ];
      }
    }),

    getEmployeeTypeById: builder.query<EmployeeTypeByIdResponse, number>({
      query: (id: number) => ({
        url: routes.employee_type.getById(id),
        method: DEFAULT_METHOD.GET
      }),
      providesTags: (_result, _error, id) => [
        { type: DEFAULT_TAG.EMPLOYEE_TYPE, id },
      ],
    }),

    createEmployeeType: builder.mutation<EmployeeType, FormData>({
      query: (body) => ({
        url: routes.employee_type.create,
        method: DEFAULT_METHOD.POST,
        body,
      }),
      invalidatesTags: [{ type: DEFAULT_TAG.EMPLOYEE_TYPE, id: DEFAULT_TAG_SCOPE.LIST }],
    }),

    updateEmployeeType: builder.mutation<EmployeeType,  { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: routes.employee_type.update(id),
        method: DEFAULT_METHOD.PUT,
        body: data,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: DEFAULT_TAG.EMPLOYEE_TYPE, id },
        { type: DEFAULT_TAG.EMPLOYEE_TYPE, id: DEFAULT_TAG_SCOPE.LIST },
      ],
      
    }),
    deleteEmployeeType: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: routes.employee_type.delete(id),
        method: DEFAULT_METHOD.DELETE,
      }),

      invalidatesTags: (_result, _error, id) => [
        { type: DEFAULT_TAG.EMPLOYEE_TYPE, id },
        { type: DEFAULT_TAG.EMPLOYEE_TYPE, id: DEFAULT_TAG_SCOPE.LIST  },
      ],
    }),
  }),
});

export const {
  useGetEmployeeTypesQuery,
  useGetEmployeeTypeByIdQuery,
  useCreateEmployeeTypeMutation,
  useUpdateEmployeeTypeMutation,
  useDeleteEmployeeTypeMutation,
} = employeeTypeApi;