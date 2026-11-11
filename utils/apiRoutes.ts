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
    employee_type: {...createCrudRoutes('/employee-types')},
    employee_designation: {...createCrudRoutes('/employee-designations')},
    grocery_category: {...createCrudRoutes('/grocery-categories')},
    grocery: {...createCrudRoutes('/groceries')},
    grocery_purchase: {...createCrudRoutes('/grocery-purchases')},
    grocery_purchase_item: {...createCrudRoutes('/grocery-purchase-items')},
    grocery_stock_ledger: {...createCrudRoutes('/grocery-stock-ledgers')},
    grocery_supplier: {...createCrudRoutes('/grocery-suppliers')},
    grocery_unit: {...createCrudRoutes('/grocery-units')}
};
