import { TableColumn } from "@/store/commonInterface";
import { EmployeeTableHead } from "./employeeInterface";

export const EMPLOYEE_CREATE_MODAL = "employee-create";
export const EMPLOYEE_UPDATE_MODAL = "employee-update";


export const EMPLOYEE_COLUMNS: TableColumn<EmployeeTableHead>[] = [
    { isVisible: true, isSort:true, key: "name", label: "employee:employee_name"},
    { isVisible: true, isSort:true, key: "email", label: "employee:email_address"},
    { isVisible: true, isSort:true, key: "phone", label: "employee:phone_number"},
    { isVisible: true, isSort:false, key: "blood_group", label: "employee:blood_group"},
    { isVisible: true, isSort:true, key: "date_of_joining", label: "employee:date_of_joining"},
    { isVisible: false, isSort:false, key: "employee_designation_id", label: "employee:employee_designation"},
    { isVisible: false, isSort:false, key: "employee_type_id", label: "employee:employee_type"},
    { isVisible: false, isSort:false, key: "gender", label: "employee:gender"},
    { isVisible: false, isSort:false, key: "marital_status", label: "employee:marital_status"},
    { isVisible: false, isSort:false, key: "emergency_contact_name", label: "employee:contact_person_name"},
    { isVisible: false, isSort:false, key: "emergency_contact_phone", label: "employee:contact_person_phone"},
    { isVisible: false, isSort:false, key: "emergency_contact_relation", label: "employee:contact_person_relation"},
    { isVisible: false, isSort:false, key: "shift_start", label: "employee:start_time"},
    { isVisible: false, isSort:false, key: "shift_end", label: "employee:end_time"},
]
// export const getEmployeeColumns = (
//   t: (key: string) => string
// ): TableColumn<EmployeeTableHead>[] => [
//     { isVisible: true, isSort:true, key: "name", label: t("employee:employee_name")},
//     { isVisible: true, isSort:true, key: "email", label: t("employee:email_address")},
//     { isVisible: true, isSort:true, key: "phone", label: t('employee:phone_number')},
//     { isVisible: true, isSort:false, key: "blood_group", label: t("employee.blood_group")},
//     { isVisible: true, isSort:true, key: "date_of_joining", label: t('employee:date_of_joining')},
//     { isVisible: false, isSort:false, key: "employee_designation_id", label: t("employee.employee_designation")},
//     { isVisible: false, isSort:false, key: "employee_type_id", label: t('employee.employee_type')},
//     { isVisible: false, isSort:false, key: "gender", label: t('employee.gender')},
//     { isVisible: false, isSort:false, key: "marital_status", label: t('employee.marital_status')},
//     { isVisible: false, isSort:false, key: "emergency_contact_name", label: t('employee.contact_person_name')},
//     { isVisible: false, isSort:false, key: "emergency_contact_phone", label: t('employee.contact_person_phone')},
//     { isVisible: false, isSort:false, key: "emergency_contact_relation", label: t('employee.contact_person_relation')},
//     { isVisible: false, isSort:false, key: "shift_start", label: t('employee.start_time')},
//     { isVisible: false, isSort:false, key: "shift_end", label: t('employee.end_time')},
// ]

export const EMPLOYEE_SECTIONS = [
  { id: "personal" },
  { id: "employment" },
  { id: "identity" },
  { id: "emergency" },
  { id: "documents" },
] as const;

import { z } from "zod";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

const phoneRegex = /^01[3-9]\d{8}$/;
const nidRegex = /^(\d{10}|\d{13}|\d{17})$/;
const passportRegex = /^[A-Za-z0-9]{5,20}$/;
const time12Regex =
  /^(0?[1-9]|1[0-2]):[0-5][0-9]:?\s?(AM|PM)$/i;

// const { t } = useTranslation(["employee", "common"]);

const MAX_PROFILE_SIZE = 2 * 1024 * 1024; // 2 MB
const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5 MB

const PROFILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const employeeSchema = (t: TFunction) => 
  z.object({
    name: z
      .string({
        error: t('validation.employee_name_required')
      })
      .trim()
      .min(2, t("validation.name_contain_must_2_characters"))
      .max(100, t('validation.name_maximum_100'))
      .regex(
        /^[A-Za-z\s.'-]+$/,
        t('validation.name_invalid_character')
      ),
      
    email: z
      .string({
        error: t("validation.email_required"),
      })
      .trim()
      .min(1, {
        error: t("validation.email_required"),
      })
      .pipe(
        z.email({
          error: t("validation.invalid_email"),
        })
      ),

    phone: z
      .string({
        error: t('validation.phone_required')
      })
      .trim()
      .regex(phoneRegex, t('employee:validation.valid_phone')),

    gender: z
      .number({
        error: t("validation.gender_required"),
      })
      .int()
      .positive(),

    blood_group: z
      .number({
        error: t('validation.blood_group_required'),
      })
      .int()
      .positive(),

    marital_status: z
      .number({
        error: t('validation.marital_status_required'),
      })
      .int()
      .positive(),

    address: z
      .string({
        error: t('validation.address_required')
      })
      .trim()
      .min(5, t('validation.address_required'))
      .max(500, t("validation.address_max_500")),

    date_of_birth: z
      .date({
        error: t("validation.date_of_birth_required"),
      })
      .refine(
        (date) => date < new Date(),
        {
          error: t("validation.date_of_birth_cannot_be_future"),
        }
      )
      .refine(
        (date) => {
          const today = new Date();
          const minDate = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
          );

          return date <= minDate;
        },
        {
          error: t("validation.minimum_age_18"),
        }
      )
      .refine(
        (date) => {
          const today = new Date();
          const oldestAllowed = new Date(
            today.getFullYear() - 120,
            today.getMonth(),
            today.getDate()
          );

          return date >= oldestAllowed;
        },
        {
          error: t("validation.invalid_date_of_birth"),
        }
      ),

    // =========================
    // Employment Information
    // =========================
    basic_salary: z
      .number({
        error: t('validation.basic_salary_required'),
      })
      .positive(t('basic_salary_min'))
      .max(10000000, t('validation.basic_salary_max'))
      .refine(
        (value) => Number.isInteger(value * 100),
        {
          message: t('validation.basic_salary_2_decimal'),
        }
    ),
    date_of_joining: z
      .date({
        error: t("validation.date_of_join_requrired"),
      })
      .refine(
        (date) => date.getFullYear() >= 1900,
        {
          error: t("validation.invalid_date_of_join"),
        }
      ),

    employee_designation_id: z
      .number({
        error: t('validation.designation_required'),
      })
      .int({
        error: t("validation.employee_designation_invalid")
      })
      .positive({
        error: t('validation.employee_designation_invalid')
      }),

    employee_type_id: z
      .number({
        error: t("validation.employee_type_required"),
      })
      .int({
        error: t('validation.employee_type_invalid')
      })
      .positive({
        error: t("validation.employee_type_invalid")
      }),

    shift_start: z
      .string({
        error: t("validation.shift_start_required"),
      })
      .trim()
      .regex(time12Regex, t('validation.shift_start_invalid')),

    shift_end: z
      .string({
        error: t("validation.shift_end_required"),
      })
      .trim()
      .regex(time12Regex, t("validation.shift_end_invalid")),

    // =========================
    // Identity Information
    // =========================
    national_id: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || nidRegex.test(value),
        t('validation.nid_invalid')
      )
      .optional(),

    passport_number: z
      .string({
        error: t("validation.passport_required"),
      })
      .trim()
      .min(1, t('validation.passport_required'))
      .min(5, t('validation.passport_minimum'))
      .max(20, t('validation.passport_max'))
      .regex(
        passportRegex,
        t('validation.passport_invalid')
      ),
    // =========================
    // Emergency Contact
    // =========================
    emergency_contact_name: z
      .string({
        error: t('validation.emergency_contact_name_required')
      })
      .trim()
      .min(2, t('validation.emergency_contact_name_required'))
      .max(100, t('validation.emergency_contact_name_max')),

    emergency_contact_phone: z
      .string({
        error: t('validation.emergency_contact_phone_required')
      })
      .trim()
      .regex(
        phoneRegex,
        t('validation.emergency_contact_phone_invalid')
      ),

      emergency_contact_email: z
        .string({
          error: t("validation.emergency_contact_email_required"),
        })
        .trim()
        .min(1, {
          error: t("validation.emergency_contact_email_required"),
        })
        .pipe(
          z.email({
            error: t("validation.emergency_contact_email_invalid"),
          })
        ),

      emergency_contact_relation: z
        .string()
        .trim()
        .max(50, t("validation.emergency_contact_relation_max"))
        .optional()
        .or(z.literal("")),

    // =========================
    // Documents
    // =========================
    // documents: z
    //   .array(z.instanceof(File))
    //   .min(
    //     1,
    //     t("validation.documents_required")
    //   ),
    documents: z
      .array(z.instanceof(File), {
        error: (issue) => {
          if (issue.input === undefined) {
            return t("validation.documents_required");
          }

          return t("validation.invalid_documents");
        },
      })
      .min(1, {
        error: t("validation.documents_required"),
      }),
     profile_img: z
      .array(
        z.instanceof(File).refine(
          (file) => PROFILE_TYPES.includes(file.type),
          { message: "Profile image must be JPG, PNG, or WebP." }
        )
      )
      .max(1, "Only one profile image is allowed.")
      .min(1, {
            error: t("validation.documents_required"),
          }),

    resume: z
      .array(
        z.instanceof(File).refine(
          (file) => RESUME_TYPES.includes(file.type),
          { message: "Resume must be PDF, DOC, or DOCX." }
        )
      )
      .max(1, "Only one resume is allowed.")
      .optional(),

  });

