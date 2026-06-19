export type CreateEmployeeDTO = {
  employee_type_id: number;
  employee_designation_id: number;
  user_id?: number | null;

  name: string;
  email: string;
  phone: string;
  address: string;

  date_of_birth: string;
  date_of_joining: string;

  is_active: boolean;

  gender: number;

  national_id: string;
  passport_number: string;

  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relation: string;

  basic_salary: string;

  blood_group: number;
  marital_status: number;

  shift_start: string;
  shift_end: string;
};

export type UpdateEmployeeDTO = Partial<CreateEmployeeDTO>;