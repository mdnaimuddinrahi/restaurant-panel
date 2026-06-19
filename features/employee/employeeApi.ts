import { baseApi } from "@/services/baseApi";
import { Employee, EmployeeResourceResponse } from "./employeeInterface";
import { CreateEmployeeDTO, UpdateEmployeeDTO } from "./employeeDTOs";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeResources: builder.query<EmployeeResourceResponse, void>({
      query: () => "/employee-resources",
      providesTags: [{ type: "Employee" as const, id: "RESOURCE" }]
    }),
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employees",

      providesTags: (result) =>
        (result
          ? [
              ...result.map(({ id }) => ({
                type: "Employee" as const,
                id,
              })),
              { type: "Employee" as const, id: "LIST" },
            ]
          : [{ type: "Employee" as const, id: "LIST" }]) as any,
    }),

    // =========================
    // GET SINGLE EMPLOYEE
    // =========================
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `/employees/${id}`,
      providesTags: (_result, _error, id) => [
        { type: "Employee", id },
      ],
    }),

    // =========================
    // CREATE EMPLOYEE
    // =========================
    createEmployee: builder.mutation<Employee, CreateEmployeeDTO>({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    // =========================
    // UPDATE EMPLOYEE
    // =========================
    updateEmployee: builder.mutation<
      Employee,
      { id: number; data: UpdateEmployeeDTO }
    >({
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "Employee", id },
        { type: "Employee", id: "LIST" },
      ],
    }),

    // =========================
    // DELETE EMPLOYEE
    // =========================
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

// =========================
// EXPORT HOOKS
// =========================
export const {
  useGetEmployeeResourcesQuery,
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;