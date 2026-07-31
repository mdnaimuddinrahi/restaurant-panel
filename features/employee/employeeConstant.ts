import { TableColumn } from "@/store/common.types";
import { EmployeeTableHead } from "./employee.types";

export const EMPLOYEE_CREATE_MODAL = "employee-create";
export const EMPLOYEE_UPDATE_MODAL = "employee-update";
export const EMPLOYEE_DELETE_MODAL = "employee-delete";


export const EMPLOYEE_COLUMNS: TableColumn<EmployeeTableHead>[] = [
    { isVisible: true, isSort:true, key: "name", label: "main:label.employee.employee_name"},
    { isVisible: true, isSort:true, key: "email", label: "main:label.employee.email_address"},
    { isVisible: true, isSort:true, key: "phone", label: "main:label.employee.phone_number"},
    { isVisible: true, isSort:false, key: "blood_group", label: "main:label.employee.blood_group"},
    { isVisible: true, isSort:true, key: "date_of_joining", label: "main:label.employee.date_of_joining"},
    { isVisible: false, isSort:false, key: "employee_designation_id", label: "main:label.employee.employee_designation"},
    { isVisible: false, isSort:false, key: "employee_type_id", label: "main:label.employee.employee_type"},
    { isVisible: false, isSort:false, key: "gender", label: "main:label.employee.gender"},
    { isVisible: false, isSort:false, key: "marital_status", label: "main:label.employee.marital_status"},
    { isVisible: false, isSort:false, key: "emergency_contact_name", label: "main:label.employee.contact_person_name"},
    { isVisible: false, isSort:false, key: "emergency_contact_phone", label: "main:label.employee.contact_person_phone"},
    { isVisible: false, isSort:false, key: "emergency_contact_relation", label: "main:label.employee.contact_person_relation"},
    { isVisible: false, isSort:false, key: "shift_start", label: "main:label.employee.start_time"},
    { isVisible: false, isSort:false, key: "shift_end", label: "main:label.employee.end_time"},
]
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

const employeeBaseSchema = (t: TFunction) =>
  z.object({
    name: z
      .string({
        error: t('main:validation.employee.employee_name_required'),
      })
      .trim()
      .min(2, t('main:validation.employee.name_contain_must_2_characters'))
      .max(100, t('main:validation.employee.name_maximum_100'))
      .regex(/^[A-Za-z\s.'-]+$/, t('main:validation.employee.name_invalid_character')),

    email: z
      .string({
        error: t("main:validation.employee.email_required"),
      })
      .trim()
      .min(1, {
        error: t("main:validation.employee.email_required"),
      })
      .pipe(
        z.email({
          error: t("main:validation.employee.invalid_email"),
        })
      ),

    phone: z
      .string({
        error: t('main:validation.employee.phone_required')
      })
      .trim()
      .regex(phoneRegex, t('main:validation.employee.valid_phone')),

    gender: z
      .number({
        error: t("main:validation.employee.gender_required"),
      })
      .int()
      .positive(),

    blood_group: z
      .number({
        error: t('main:validation.employee.blood_group_required'),
      })
      .int()
      .positive(),

    marital_status: z
      .number({
        error: t('main:validation.employee.marital_status_required'),
      })
      .int()
      .positive(),

    address: z
      .string({
        error: t('main:validation.employee.address_required')
      })
      .trim()
      .min(5, t('main:validation.employee.address_required'))
      .max(500, t("main:validation.employee.address_max_500")),

    date_of_birth: z
      .date({
        error: t("main:validation.employee.date_of_birth_required"),
      })
      .refine(
        (date) => date < new Date(),
        {
          error: t("main:validation.employee.date_of_birth_cannot_be_future"),
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
          error: t("main:validation.employee.minimum_age_18"),
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
          error: t("main:validation.employee.invalid_date_of_birth"),
        }
      ),

    // =========================
    // Employment Information
    // =========================
    basic_salary: z
      .number({
        error: t('main:validation.employee.basic_salary_required'),
      })
      .positive(t('main:validation.employee.basic_salary_min'))
      .max(10000000, t('main:validation.employee.basic_salary_max'))
      .refine(
        (value) => Number.isInteger(value * 100),
        {
          message: t('main:validation.employee.basic_salary_2_decimal'),
        }
    ),
    date_of_joining: z
      .date({
        error: t("main:validation.employee.date_of_join_requrired"),
      })
      .refine(
        (date) => date.getFullYear() >= 1900,
        {
          error: t("main:validation.employee.invalid_date_of_join"),
        }
      ),

    employee_designation_id: z
      .number({
        error: t('main:validation.employee.designation_required'),
      })
      .int({
        error: t("main:validation.employee.employee_designation_invalid")
      })
      .positive({
        error: t('main:validation.employee.employee_designation_invalid')
      }),

    employee_type_id: z
      .number({
        error: t("main:validation.employee.employee_type_required"),
      })
      .int({
        error: t('main:validation.employee.employee_type_invalid')
      })
      .positive({
        error: t("main:validation.employee.employee_type_invalid")
      }),

    shift_start: z
      .string({
        error: t("main:validation.employee.shift_start_required"),
      })
      .trim()
      .regex(time12Regex, t('main:validation.employee.shift_start_invalid')),

    shift_end: z
      .string({
        error: t("main:validation.employee.shift_end_required"),
      })
      .trim()
      .regex(time12Regex, t("main:validation.employee.shift_end_invalid")),

    // =========================
    // Identity Information
    // =========================
    national_id: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || nidRegex.test(value),
        t('main:validation.employee.nid_invalid')
      )
      .optional(),

    passport_number: z
      .string({
        error: t("main:validation.employee.passport_required"),
      })
      .trim()
      .min(1, t('main:validation.employee.passport_required'))
      .min(5, t('main:validation.employee.passport_minimum'))
      .max(20, t('main:validation.employee.passport_max'))
      .regex(
        passportRegex,
        t('main:validation.employee.passport_invalid')
      ),
    // =========================
    // Emergency Contact
    // =========================
    emergency_contact_name: z
      .string({
        error: t('main:validation.employee.emergency_contact_name_required')
      })
      .trim()
      .min(2, t('main:validation.employee.emergency_contact_name_required'))
      .max(100, t('main:validation.employee.emergency_contact_name_max')),

    emergency_contact_phone: z
      .string({
        error: t('main:validation.employee.emergency_contact_phone_required')
      })
      .trim()
      .regex(
        phoneRegex,
        t('main:validation.employee.emergency_contact_phone_invalid')
      ),

      emergency_contact_email: z
        .string({
          error: t("main:validation.employee.emergency_contact_email_required"),
        })
        .trim()
        .min(1, {
          error: t("main:validation.employee.emergency_contact_email_required"),
        })
        .pipe(
          z.email({
            error: t("main:validation.employee.emergency_contact_email_invalid"),
          })
        ),

      emergency_contact_relation: z
        .string()
        .trim()
        .max(50, t("main:validation.employee.emergency_contact_relation_max"))
        .optional()
        .or(z.literal("")),

  });

export const createEmployeeSchema = (t: TFunction) => 
  employeeBaseSchema(t).extend({
    documents: z
      .array(z.instanceof(File), {
        error: (issue) => {
          if (issue.input === undefined) {
            return t("main:validation.employee.documents_required");
          }

          return t("main:validation.employee.invalid_documents");
        },
      })
      .min(1, {
        error: t("main:validation.employee.documents_required"),
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
            error: t("main:validation.employee.documents_required"),
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

export const updateEmployeeSchema = (t: TFunction) =>
  employeeBaseSchema(t).extend({
    documents: z
      .array(z.instanceof(File), {
        error: () => t("main:validation.employee.invalid_documents"),
      })
      .optional(),

    profile_img: z
      .array(
        z.instanceof(File).refine(
          (file) => PROFILE_TYPES.includes(file.type),
          { message: t("main:validation.employee.profile_image_invalid") }
        )
      )
      .max(1, {
        error: t("main:validation.employee.profile_image_only_one"),
      })
      .optional(),

    resume: z
      .array(
        z.instanceof(File).refine(
          (file) => RESUME_TYPES.includes(file.type),
          { message: t("main:validation.employee.resume_invalid") }
        )
      )
      .max(1, {
        error: t("main:validation.employee.resume_only_one"),
      })
      .optional(),
  });
