import { baseApi } from '@/services/baseApi'
import { RoleByIdResponse, RoleListResponse, RoleTag } from './roleInterface';
import { DEFAULT_METHOD, DEFAULT_TAG, DEFAULT_TAG_SCOPE } from '@/store/commonConstants';
import { routes } from '@/utils/apiRoutes';

export const rolePermissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<RoleListResponse, void>({
        query: () => ({
            url: routes.role.list,
            method: DEFAULT_METHOD.GET,
        }),
        providesTags: (result): RoleTag[] => {
            const listTag = {
                type: DEFAULT_TAG.ROLE,
                id: DEFAULT_TAG_SCOPE.LIST,
            } as const;

            if (!result?.data) return [listTag];

            return [
                ...result.data.map((role) => ({
                    type: DEFAULT_TAG.ROLE,
                    id: role.id,
                })),
                listTag,
            ];
        }
    }),
    getRoleById: builder.query<RoleByIdResponse, number>({
        query: (id: number) => ({
            url: routes.role.getById(id),
            method: DEFAULT_METHOD.GET
        }),
        providesTags: (_result, _error, id) => [
            { type: DEFAULT_TAG.ROLE, id },
        ],
    }),
    createRole: builder.mutation<RoleByIdResponse, FormData>({
        query: (body) => ({
            url: routes.role.create,
            method: DEFAULT_METHOD.POST,
            body,
        }),
        invalidatesTags: [{ type: DEFAULT_TAG.ROLE, id: DEFAULT_TAG_SCOPE.LIST }],
    }),
    updateRole: builder.mutation<RoleByIdResponse,  { id: number; data: FormData }>({
        query: ({ id, data }) => ({
            url: routes.role.update(id),
            method: DEFAULT_METHOD.PUT,
            body: data,
        }),
        invalidatesTags: (_result, _error, { id }) => [
            { type: DEFAULT_TAG.ROLE, id },
            { type: DEFAULT_TAG.ROLE, id: DEFAULT_TAG_SCOPE.LIST },
        ],
    }),
    deleteRole: builder.mutation<{ success: boolean }, number>({
        query: (id) => ({
            url: routes.role.delete(id),
            method: DEFAULT_METHOD.DELETE,
        }),

        invalidatesTags: (_result, _error, id) => [
            { type: DEFAULT_TAG.ROLE, id },
            { type: DEFAULT_TAG.ROLE, id: DEFAULT_TAG_SCOPE.LIST  },
        ],
    }),
  })
});

export const {
    useGetRolesQuery,
} = rolePermissionApi;