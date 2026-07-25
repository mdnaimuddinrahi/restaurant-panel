// export type RoleStatus = "assigned" | "not assigned";

import { DEFAULT_TAG } from "@/store/commonConstants";

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


export interface RoleListResponse {
  data: Role[]
}

export interface RoleByIdResponse {
  data: Role;
}