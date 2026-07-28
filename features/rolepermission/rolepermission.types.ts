import { Dispatch, SetStateAction } from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export interface RoleFilterPanelProps {
  searchFields: string[];
  onSearch: () => void;
  searchTerm: string;
  setSearchTerm: (search: string) => void,
}

export type Role = {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export type RoleTableHead = Role


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
  mode: "create" | "update" | "delete";
  loading?: boolean;
  onSubmit: SubmitHandler<T>;
  hasError: boolean;
  setHasError: Dispatch<SetStateAction<boolean>>;
  buttonText: string;
  oldData?: Role | null;
}