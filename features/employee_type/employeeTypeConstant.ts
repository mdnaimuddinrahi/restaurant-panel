import { TableColumn } from "@/store/common.types";
import { TFunction } from "i18next";
import z from "zod";
import { EmployeeTypeTableHead } from "./employeeType.types";

export const EMPLOYEE_TYPE_CREATE_MODAL = "employee-type-create";
export const EMPLOYEE_TYPE_UPDATE_MODAL = "employee-type-update";
export const EMPLOYEE_TYPE_DELETE_MODAL = "employee-type-delete";


// export const EMPLOYEE_COLUMNS: TableColumn<EmployeeTypeTableHead>[] = [
//     { isVisible: true, isSort:true, key: "name", label: "main:label.employee.employee_name"},   
// ]
export const EMPLOYEE_TYPE_COLUMNS: TableColumn<EmployeeTypeTableHead>[] = [
    {
        isVisible: true,
        isSort: true,
        key: "name",
        label: "main:label.employee_type.name",
    },
    {
        isVisible: true,
        isSort: true,
        key: "code",
        label: "main:label.employee_type.code",
    },
    {
        isVisible: false,
        isSort: false,
        key: "description",
        label: "main:label.employee_type.description",
    },
    {
        isVisible: false,
        isSort: true,
        key: "shift_start",
        label: "main:label.employee_type.shift_start",
    },
    {
        isVisible: false,
        isSort: true,
        key: "shift_end",
        label: "main:label.employee_type.shift_end",
    },
    {
        isVisible: false,
        isSort: true,
        key: "working_hours",
        label: "main:label.employee_type.working_hours",
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
];
// export const getEmployeeColumns = (
//   t: (key: string) => string
// ): TableColumn<EmployeeTableHead>[] => [
//     { isVisible: true, isSort:true, key: "name", label: t("main:label.employee:employee_name")},
//     { isVisible: true, isSort:true, key: "email", label: t("main:label.employee:email_address")},
//     { isVisible: true, isSort:true, key: "phone", label: t('main:label.employee:phone_number')},
//     { isVisible: true, isSort:false, key: "blood_group", label: t("main:label.employee.blood_group")},
//     { isVisible: true, isSort:true, key: "date_of_joining", label: t('main:label.employee:date_of_joining')},
//     { isVisible: false, isSort:false, key: "employee_designation_id", label: t("main:label.employee.employee_designation")},
//     { isVisible: false, isSort:false, key: "employee_type_id", label: t('main:label.employee.employee_type')},
//     { isVisible: false, isSort:false, key: "gender", label: t('main:label.employee.gender')},
//     { isVisible: false, isSort:false, key: "marital_status", label: t('main:label.employee.marital_status')},
//     { isVisible: false, isSort:false, key: "emergency_contact_name", label: t('main:label.employee.contact_person_name')},
//     { isVisible: false, isSort:false, key: "emergency_contact_phone", label: t('main:label.employee.contact_person_phone')},
//     { isVisible: false, isSort:false, key: "emergency_contact_relation", label: t('main:label.employee.contact_person_relation')},
//     { isVisible: false, isSort:false, key: "shift_start", label: t('main:label.employee.start_time')},
//     { isVisible: false, isSort:false, key: "shift_end", label: t('employee.end_time')},
// ]



const employeeTypeBaseSchema = (t: TFunction) => z.object({
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

    code: z
        .string({
            error: t("main:validation.employee_type.code.required"),
        })
        .min(1, {
            error: t("main:validation.employee_type.code.required"),
        })
        .max(20, {
            error: t("main:validation.employee_type.code.max"),
        })
        .regex(/^[A-Za-z0-9_-]+$/, {
            error: t("main:validation.employee_type.code.invalid"),
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

    shift_start: z
        .string()
        .regex(/^(0[1-9]|1[0-2]):([0-5]\d):(AM|PM)$/, {
            error: t("main:validation.employee_type.shift_start.invalid"),
        })
        .optional(),

    shift_end: z
        .string()
        .regex(/^(0[1-9]|1[0-2]):([0-5]\d):(AM|PM)$/, {
            error: t("main:validation.employee_type.shift_end.invalid"),
        })
        .optional(),

    working_hours: z
        .number()
        .int({
            error: t(
                "main:validation.employee_type.working_hours.integer"
            ),
        })
        .min(0, {
            error: t("main:validation.employee_type.working_hours.min"),
        }).optional(),
    });

export const createEmployeeTypeSchema = (t: TFunction) => employeeTypeBaseSchema(t)


export const updateEmployeeTypeSchema = (t: TFunction) => employeeTypeBaseSchema(t)