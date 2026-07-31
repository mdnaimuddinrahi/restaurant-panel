import { baseApi } from "@/services/baseApi";
import { Employee, EmployeeByIdResponse, EmployeeResourceResponse, EmployeeTag, GetEmployeesRequests, GetEmployeesResponse } from "./employee.types";

import { DEFAULT_METHOD, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from "@/store/commonConstants";
import { routes } from "@/utils/apiRoutes";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeResources: builder.query<EmployeeResourceResponse, void>({
      query: () => ({
        url: routes.employee.resource,
        method: DEFAULT_METHOD.GET,
      }),
      providesTags: [{ type: DEFAULT_TAG.EMPLOYEE, id: DEFAULT_TAG_SCOPE.RESOURCE }]
    }),
    getEmployees: builder.query<GetEmployeesResponse, GetEmployeesRequests>({
      query: (params) => ({
        url: routes.employee.list,
        method: DEFAULT_METHOD.GET,
        params,
      }),
      providesTags: (result): EmployeeTag[] => {
        const listTag = {
          type: DEFAULT_TAG.EMPLOYEE,
          id: DEFAULT_TAG_SCOPE.LIST,
        } as const;

        if (!result?.data) return [listTag];

        return [
          ...result.data.map((employee) => ({
            type: DEFAULT_TAG.EMPLOYEE,
            id: employee.id,
          })),
          listTag,
        ];
      }
    }),
    getEmployeeById: builder.query<EmployeeByIdResponse, number>({
      query: (id: number) => ({
        url: routes.employee.getById(id),
        method: DEFAULT_METHOD.GET
      }),
      providesTags: (_result, _error, id) => [
        { type: DEFAULT_TAG.EMPLOYEE, id },
      ],
    }),
    createEmployee: builder.mutation<Employee, FormData>({
      query: (body) => ({
        url: routes.employee.create,
        method: DEFAULT_METHOD.POST,
        body,
      }),
      invalidatesTags: [{ type: DEFAULT_TAG.EMPLOYEE, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    updateEmployee: builder.mutation<Employee,  { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: routes.employee.update(id),
        method: DEFAULT_METHOD.PUT,
        body: data,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: DEFAULT_TAG.EMPLOYEE, id },
        { type: DEFAULT_TAG.EMPLOYEE, id: DEFAULT_TAG_SCOPE.LIST },
      ],
    }),
    deleteEmployee: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: routes.employee.delete(id),
        method: DEFAULT_METHOD.DELETE,
      }),

      invalidatesTags: (_result, _error, id) => [
        { type: DEFAULT_TAG.EMPLOYEE, id },
        { type: DEFAULT_TAG.EMPLOYEE, id: DEFAULT_TAG_SCOPE.LIST  },
      ],
    }),
  }),
});

export const {
  useGetEmployeeResourcesQuery,
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;