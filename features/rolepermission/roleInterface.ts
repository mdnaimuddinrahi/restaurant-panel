export type RoleStatus = "assigned" | "unassigned";

export interface Role {
  id: number;
  name: string;
  status: RoleStatus;
}
