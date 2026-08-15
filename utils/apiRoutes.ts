type Segment = string | number | null | undefined;

export const createCrudRoutes = (base: string) => ({
    list: base,
    create: base,

    getById: (id: Segment) => [base, id].filter((v) => v != null).join("/"),

    update: (id: Segment) => [base, id].filter((v) => v != null).join("/"),

    delete: (id: Segment) => [base, id].filter((v) => v != null).join("/"),

    path: (...segments: Segment[]) =>
        [base, ...segments].filter((v) => v != null).join("/"),
});
export const routes = {
    employee: {
        ...createCrudRoutes("/employees"),
        resource: "/employee-resources",
    },
    role: {...createCrudRoutes("/roles")},
    employee_type: {...createCrudRoutes('/employee-types')}
};