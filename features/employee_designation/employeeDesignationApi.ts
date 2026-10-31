import { baseApi } from "@/services/baseApi";
import { EmployeeDesignation, EmployeeDesignationByIdResponse, EmployeeDesignationTag, GetEmployeeDesignationsResponse } from "./employeeDesignationType.types";
import { routes } from "@/utils/apiRoutes";
import { DEFAULT_METHOD, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from "@/store/commonConstants";

export const employeeDesignationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeeDesignations: builder.query<GetEmployeeDesignationsResponse, void>({
                query: () => ({
                    url: routes.employee_designation.list,
                    method: DEFAULT_METHOD.GET,
                }),
                providesTags: (result): EmployeeDesignationTag[] => {
                const listTag = {
                    type: DEFAULT_TAG.EMPLOYEE_DESIGNATION,
                    id: DEFAULT_TAG_SCOPE.LIST,
                } as const;
        
                if (!result?.data) return [listTag];
        
                return [
                    ...result.data.map((employeeDesignation) => ({
                        type: DEFAULT_TAG.EMPLOYEE_DESIGNATION,
                        id: employeeDesignation.id,
                    })),
                    listTag,
                ];
            }
        }),
        createEmployeeDesignation: builder.mutation<EmployeeDesignation, FormData>({
            query: (body) => ({
                url: routes.employee_designation.create,
                method: DEFAULT_METHOD.POST,
                body,
            }),
            invalidatesTags: [{ type: DEFAULT_TAG.EMPLOYEE_DESIGNATION, id: DEFAULT_TAG_SCOPE.LIST }],
        }),
        
        getEmployeeDesignationById: builder.query<EmployeeDesignationByIdResponse, number>({
            query: (id: number) => ({
                url: routes.employee_designation.getById(id),
                method: DEFAULT_METHOD.GET
            }),
            providesTags: (_result, _error, id) => [
                { type: DEFAULT_TAG.EMPLOYEE_DESIGNATION, id },
            ],
        }),

        
        updateEmployeeDesignation: builder.mutation<EmployeeDesignation,  { id: number; data: FormData }>({
              query: ({ id, data }) => ({
                url: routes.employee_designation.update(id),
                method: DEFAULT_METHOD.PUT,
                body: data,
              }),
        
              invalidatesTags: (_result, _error, { id }) => [
                { type: DEFAULT_TAG.EMPLOYEE_DESIGNATION, id },
                { type: DEFAULT_TAG.EMPLOYEE_DESIGNATION, id: DEFAULT_TAG_SCOPE.LIST },
              ],   
        }),

        
        deleteEmployeeDesignation: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: routes.employee_designation.delete(id),
                method: DEFAULT_METHOD.DELETE,
            }),

            invalidatesTags: (_result, _error, id) => [
                { type: DEFAULT_TAG.EMPLOYEE_DESIGNATION, id },
                { type: DEFAULT_TAG.EMPLOYEE_DESIGNATION, id: DEFAULT_TAG_SCOPE.LIST  },
            ],
        }),

    })
})

export const {
    useGetEmployeeDesignationsQuery,
    useCreateEmployeeDesignationMutation,
    useGetEmployeeDesignationByIdQuery,
    useUpdateEmployeeDesignationMutation,
    useDeleteEmployeeDesignationMutation,
} = employeeDesignationApi;