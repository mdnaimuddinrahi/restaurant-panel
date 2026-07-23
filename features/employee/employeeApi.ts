import { baseApi } from "@/services/baseApi";
import { Employee, EmployeeByIdResponse, EmployeeResourceResponse, EmployeeTag, GetEmployeesRequests, GetEmployeesResponse } from "./employeeInterface";

import { DEFAULT_SEGMENT_URL, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from "@/store/commonConstants";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeResources: builder.query<EmployeeResourceResponse, void>({
      query: () => DEFAULT_SEGMENT_URL.EMPLOYEE.RESOURCE,
      providesTags: [{ type: DEFAULT_TAG.EMPLOYEE, id: DEFAULT_TAG_SCOPE.RESOURCE }]
    }),
    getEmployees: builder.query<GetEmployeesResponse, GetEmployeesRequests>({
      query: (params) => ({
        url: DEFAULT_SEGMENT_URL.EMPLOYEE.EMPLOYEES,
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
      query: (id) => `/employees/${id}`,
      providesTags: (_result, _error, id) => [
        { type: "Employee", id },
      ],
    }),
    createEmployee: builder.mutation<Employee, FormData>({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
    updateEmployee: builder.mutation<Employee,  { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: DEFAULT_TAG.EMPLOYEE, id },
        { type: DEFAULT_TAG.EMPLOYEE, id: DEFAULT_TAG_SCOPE.LIST },
      ],
    }),
    deleteEmployee: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (_result, _error, id) => [
        { type: "Employee", id },
        { type: "Employee", id: "LIST" },
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