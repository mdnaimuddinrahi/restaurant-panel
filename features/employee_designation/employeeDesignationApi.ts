import { baseApi } from "@/services/baseApi";
import { EmployeeDesignation, EmployeeDesignationTag, GetEmployeeDesignationsResponse } from "./employeeDesignationType.types";
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

    })
})

export const {
    useGetEmployeeDesignationsQuery
} = employeeDesignationApi;