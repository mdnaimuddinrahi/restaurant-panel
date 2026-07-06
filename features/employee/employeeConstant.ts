import { TableColumn } from "@/store/commonInterface";
import { EmployeeTableHead } from "./employeeInterface";


export const EMPLOYEE_COLUMNS: TableColumn<EmployeeTableHead>[] = [
    { isVisible: true, isSort:true, key: "name", label: "Name"},
    { isVisible: true, isSort:true, key: "email", label: "Email"},
    { isVisible: true, isSort:true, key: "phone", label: "Phone"},
    { isVisible: true, isSort:false, key: "blood_group", label: "Blood Group"},
    { isVisible: true, isSort:true, key: "date_of_joining", label: "Joined"},
    { isVisible: false, isSort:false, key: "employee_designation_id", label: "Employee Designation"},
    { isVisible: false, isSort:false, key: "employee_type_id", label: "Employee Type"},
    { isVisible: false, isSort:false, key: "gender", label: "Gender"},
    { isVisible: false, isSort:false, key: "marital_status", label: "Marital Status"},
    { isVisible: false, isSort:false, key: "emergency_contact_name", label: "Emergency Contact Name"},
    { isVisible: false, isSort:false, key: "emergency_contact_phone", label: "Emergency Contact Phone"},
    { isVisible: false, isSort:false, key: "emergency_contact_relation", label: "Emergency Contact Relation"},
    { isVisible: false, isSort:false, key: "shift_start", label: "Shift Start"},
    { isVisible: false, isSort:false, key: "shift_end", label: "Shift End"},
]

// export const EMPLOYEE_SECTIONS = [ { id: "personal", title: "Personal Information", description: "Basic employee information", }, { id: "employment", title: "Employment Information", description: "Role and employment details", }, { id: "identity", title: "Identity Information", description: "National ID and passport", }, { id: "emergency", title: "Emergency Contact", description: "Emergency contact details", }, { id: "bank", title: "Bank Information", description: "Bank account details", }, { id: "address", title: "Address Information", description: "Present and permanent address", }, { id: "documents", title: "Documents", description: "Attachments and uploaded files", }, { id: "permissions", title: "Permissions", description: "Roles and access control", }, { id: "system", title: "System Information", description: "Internal settings", }, ];
export const EMPLOYEE_SECTIONS = [
  { id: "personal" },
  { id: "employment" },
  { id: "identity" },
  { id: "emergency" },
  { id: "bank" },
  { id: "address" },
  { id: "documents" },
  { id: "permissions" },
  { id: "system" },
] as const;

// employee.schema.ts

import { z } from "zod";
import { useTranslation } from "react-i18next";

export const employeeSchema = z.object({
  name: z
    .string()
    .min(1, "Employee name is required"),

  email: z
    .email("Invalid email address"),

  phone: z
    .string()
    .min(11, "Phone number must be 11 digits"),

  gender: z
    .number()
    .min(1, "Gender is required"),

  address: z
    .string()
    .min(1, "Address is required"),

  national_id: z
    .string()
    .optional(),

  passport_number: z
    .string()
    .min(1, "Passport Number is Required."),

  date_of_birth: z.date({
    error: "Date of birth is required",
  }),
  basic_salary: z
    .number({
      error: "Basic salary is required.",
    })
    .positive("Basic salary must be greater than 0.")
    .refine(
      (value) => Number.isInteger(value * 100),
      {
        message: "Basic salary can have at most 2 decimal places.",
      }
    ),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
// {
//     "id": 1,
//     "employee_type_id": 3,
//     "employee_designation_id": 2,
//     "user_id": null,
//     "name": "John Smith",
//     "email": "john.smith@example.com",
//     "phone": "1000000001",
//     "address": "Global Office Location 1",
//     "date_of_birth": "2003-06-09",
//     "date_of_joining": "2025-08-14",
//     "is_active": true,
//     "gender": 3,
//     "profile_img": null,
//     "national_id": "NID-G-00001",
//     "passport_number": "PPT-G-00001",
//     "emergency_contact_name": "Emergency Contact 1",
//     "emergency_contact_phone": "9000000001",
//     "emergency_contact_relation": "Family",
//     "documents": [],
//     "basic_salary": "18459.00",
//     "termination_date": null,
//     "blood_group": 1,
//     "marital_status": 1,
//     "shift_start": "09:00:00",
//     "shift_end": "17:00:00",
//     "created_at": "2026-06-09 17:06:54",
//     "updated_at": null,
//     "created_by": 1,
//     "updated_by": null
// }

  
