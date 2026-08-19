import { TableColumn } from "@/store/common.types";
import { EmployeeDesignationTableHead } from "./employeeDesignationType.types";

export const EMPLOYEE_DESIGNATION_CREATE_MODAL = "employee-designation-create";
export const EMPLOYEE_DESIGNATION_UPDATE_MODAL = "employee-designation-update";
export const EMPLOYEE_DESIGNATION_DELETE_MODAL = "employee-designation-delete";

export const EMPLOYEE_DESIGNATION_COLUMNS: TableColumn<EmployeeDesignationTableHead>[] = [
    {
        isVisible: true,
        isSort: true,
        key: "name",
        label: "main:label.employee_type.name",
    },
    {
        isVisible: false,
        isSort: false,
        key: "description",
        label: "main:label.employee_type.description",
    },
    {
        isVisible: true,
        isSort: true,
        key: "status",
        label: "main:label.status",
    },
    {
        isVisible: true,
        isSort: true,
        key: "created_at",
        label: "main:label.created_at",
    },
    {
        isVisible: false,
        isSort: true,
        key: "updated_at",
        label: "main:label.updated_at",
    },
] 