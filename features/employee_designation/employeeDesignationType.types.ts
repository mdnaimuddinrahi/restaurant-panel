import { CommonResponse, MetaData, TableColumn } from "@/store/common.types";
import { DEFAULT_TAG } from "@/store/commonConstants";

export type EmployeeDesignation = {
  id: number;
  name: string;
  description: string;
  status: number;
  created_at: string;
  updated_at: string | null;
}
export type EmployeeDesignationTableHead = EmployeeDesignation

export interface GetEmployeeDesignationsResponse {
  data: EmployeeDesignation[];
  paginationHeaders: Headers;
  totalCount: number;
  meta: MetaData;
}


export type EmployeeDesignationTag = {
  type: typeof DEFAULT_TAG.EMPLOYEE_DESIGNATION;
  id: number | "LIST";
}

export type EmployeeDesignationFilterPanelProps = {
  searchFields: string[];
  searchTerm: string;
  setSearchTerm: (search: string) => void;
  searchStatus: number;
  setSearchStatus: (searchStatus: number) => void;
}


export interface EmployeeDesignationBodyProps<T> {
  columns: TableColumn<T>[];
  dataList: EmployeeDesignation[];
}