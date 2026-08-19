// import { DEFAULT_TAG } from "@/store/commonConstants";
// import { CommonResponse, MetaData, RequestParams, ResourceOption, TableColumn } from "@/store/common.types";
// import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
// import { Dispatch, SetStateAction } from "react";

import { MetaData, TableColumn } from "@/store/common.types";
import { DEFAULT_TAG } from "@/store/commonConstants";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export interface EmployeeTypeTableHead {
  id: number;
  name: string;
  code: string;
  description: string;
  status?: number;
  shift_start?: string;
  shift_end?: string;
  working_hours?: number;
  created_at: string;
  updated_at: string | null;
}

export interface EmployeeType extends EmployeeTypeTableHead {
  created_by: number;
  updated_by: number | null;
}

export type EmployeeTypeSortType = {col: keyof EmployeeType | '', dir: 'asc' | 'desc'}


export interface EmployeeTypeByIdResponse {
  data: EmployeeType;
}

export interface GetEmployeeTypesResponse {
  data: EmployeeType[];
  paginationHeaders: Headers;
  totalCount: number;
  meta: MetaData;
}

export type EmployeeTypeTag = {
  type: typeof DEFAULT_TAG.EMPLOYEE_TYPE;
  id: number | "LIST";
}

export type EmployeeTypeUpdatedProps = {
  onClose: () => void;
  employeeTypeId: number;
};


export interface EmployeeTypeDeletedProps {
  employeeTypeId: number;
  onClose: () => void;
}

export type EmployeeTypeFormProps<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  // mode: "create" | "update" | "delete";
  loading?: boolean;
  onSubmit: SubmitHandler<T>;
  oldData?: EmployeeType | null;
  hasError: boolean;
  setHasError: Dispatch<SetStateAction<boolean>>;
  buttonText: string;
};


export interface EmployeeTypeBodyProps<T> {
  columns: TableColumn<T>[];
  dataList: EmployeeType[];
}

export interface EmployeTypeFilterPanelProps {
  searchFields: string[];
  searchTerm: string;
  setSearchTerm: (search: string) => void;
  searchStatus: number;
  setSearchStatus: (searchStatus: number) => void;
}