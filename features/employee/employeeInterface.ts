import { DEFAULT_TAG } from "@/store/commonConstants";
import { CommonResponse, MetaData, RequestParams, ResourceOption } from "@/store/commonInterface";

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
  code: string
}

export interface EmployeeResourceData {
  blood_groups: ResourceOption[]
  employee_designations: ResourceOption[]
  employee_types: EmployeeTypeOption[]
  genders: ResourceOption[]
  marital_status: ResourceOption[]
}

export type EmployeeResourceResponse = CommonResponse<EmployeeResourceData>
export type EmployeeSortType = {col: keyof Employee | '', dir: 'asc' | 'desc'}

export interface EmployeeTableHead {
  id: number;
  name: string;
  email: string;
  phone: string;
  blood_group: string;
  date_of_joining: string;
  employee_designation_id: number;
  employee_type_id: number;
  gender: number;
  marital_status: number;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relation: string;
  shift_start: string;
  shift_end: string;
}

export interface GetEmployeesRequests extends RequestParams {
  blood_group: number | null
  employee_designation: number | null
  employee_type: number | null
  gender: number | null
  marital_status: number | null
}

export interface GetEmployeesResponse {
    data: Employee[]
    paginationHeaders: Headers
    totalCount: number
    meta: MetaData
}

export type EmployeeTag = {
  type: typeof DEFAULT_TAG.EMPLOYEE
  id: number | "LIST"
}


export interface EmployeeFIlterPanelProps {
    resourceIsLoading: boolean,
    bloodGroupOption: ResourceOption[],
    employeeDesignationOption: ResourceOption[],
    employeeTypeOption: ResourceOption[],
    genderOption: ResourceOption[],
    maritalStatusOption: ResourceOption[],
    bloodGroup: number,
    employeeDesignation: number,
    employeeType: number,
    gender: number,
    maritalStatus: number,
    searchTerm: string,
    searchFields: string,
    setBloodGroup: (blood_group: number) => void,
    setEmployeeDesignation: (employee_designation: number) => void,
    setEmployeeType: (employee_type: number) => void,
    setGender: (gender: number) => void,
    setMaritalStatus: (marital_status: number) => void,
    setSearchTerm: (search: string) => void,
    onSearch: () => void;
}

