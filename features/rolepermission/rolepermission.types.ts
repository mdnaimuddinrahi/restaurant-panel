import { DEFAULT_TAG } from "@/store/commonConstants";
import { MetaData, RequestParams, TableColumn } from "@/store/common.types";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export interface RoleFilterPanelProps {
  searchFields: string[];
  searchTerm: string;
  setSearchTerm: (search: string) => void;
  searchStatus: number;
  setSearchStatus: (searchStatus: number) => void;
}

export interface Role {
  id: number;
  name: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  created_by?: number;
  updated_by?: number | null;
}

export type RoleTag = {
  type: typeof DEFAULT_TAG.ROLE;
  id: number | "LIST";
}

export type RoleTableHead = Role

export interface RoleTableBodyProps<T> {
  columns: TableColumn<T>[];
  roleList: Role[];
}

export interface RoleListResponse {
  data: Role[];
  paginationHeaders: Headers;
  totalCount: number;
  meta: MetaData;
}

export interface RoleByIdResponse {
  data: Role;
}

export type RoleUpdatedProps = {
  roleId: number;
  onClose: () => void;
};


export interface RoleDeleteProps {
  roleId: number;
  onClose: () => void;
}

export type RoleFormProps<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  // mode: "create" | "update" | "delete";
  loading?: boolean;
  onSubmit: SubmitHandler<T>;
  hasError: boolean;
  // setHasError: Dispatch<SetStateAction<boolean>>;
  buttonText: string;
}