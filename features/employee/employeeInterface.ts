import { CommonResponse, ResourceOption } from "@/store/commonInterface";

export interface Employee {
  id: number;

  employee_type_id: number;
  employee_designation_id: number;
  user_id: number | null;

  name: string;
  email: string;
  phone: string;
  address: string;

  date_of_birth: string;
  date_of_joining: string;

  is_active: boolean;

  gender: number;

  profile_img: string | null;

  national_id: string;
  passport_number: string;

  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relation: string;

  documents: any[]; // you can refine later if structure is known

  basic_salary: string;

  termination_date: string | null;

  blood_group: number;
  marital_status: number;

  shift_start: string;
  shift_end: string;

  created_at: string;
  updated_at: string | null;

  created_by: number;
  updated_by: number | null;

  // employee_type: EmployeeType;
  // employee_designation: EmployeeDesignation;
  // user: User | null;
}

export interface EmployeeTypeOption extends ResourceOption {
  code: string;
}

export interface EmployeeResourceData {
  blood_groups: ResourceOption[],
  employee_designations: ResourceOption[],
  employee_types: EmployeeTypeOption[],
  genders: ResourceOption[],
  marital_status: ResourceOption[]
}

export type EmployeeResourceResponse = CommonResponse<EmployeeResourceData>
export type EmployeeSortType = {col: keyof Employee | '', dir: 'asc' | 'desc'}


export interface EmployeeTableHead {
id: number;
name: string;
email: string;
role: string;
status: string;
joined: string;
}