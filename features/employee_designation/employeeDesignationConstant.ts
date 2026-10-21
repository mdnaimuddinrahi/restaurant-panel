import { TableColumn } from "@/store/common.types";
import { EmployeeDesignationTableHead } from "./employeeDesignationType.types";
import z from "zod";
import { TFunction } from "i18next";

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

const employeeDesignationBaseSchema = (t: TFunction) => z.object({
    name: z
        .string({
            error: t("main:validation.employee_type.name.required"),
        })
        .min(1, {
            error: t("main:validation.employee_type.name.required"),
        })
        .max(100, {
            error: t("main:validation.employee_type.name.max"),
        }),

    description: z
        .string({
            error: t("main:validation.employee_type.description.invalid"),
        })
        .max(500, {
            error: t("main:validation.employee_type.description.max"),
        })
        .optional()
        .or(z.literal("")),

    });


export const createEmployeeDesignationSchema = (t:TFunction) => employeeDesignationBaseSchema(t)

export const updateEmployeeDesignationSchema = (t:TFunction) => employeeDesignationBaseSchema(t)