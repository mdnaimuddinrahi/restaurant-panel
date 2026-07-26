import { TableColumn } from "@/store/commonInterface";
import { Assignments, Permission } from "./permissionInterface";
import { Role } from "./roleInterface";
import { RoleTableHead } from "./rolepermission.types";

export const ROLE_CREATE_MODAL = 'role-create';
export const ROLE_UPDATE_MODAL = 'role-update';
export const ROLE_DELETE_MODAL = 'role-delete';

export const ROLES_SOURCE: Role[] = [
  { id: 2, name: "Manager", status: "assigned" },
  { id: 3, name: "Employee", status: "assigned" },
  { id: 4, name: "Guest", status: "assigned" },
];

export const PERMISSIONS_SOURCE: Permission[] = [
  { id: 1, group_id: 1, group_name: "Roles", name: "List Roles", slug: "roles.index" },
  { id: 2, group_id: 1, group_name: "Roles", name: "Create Role", slug: "roles.store" },
  { id: 3, group_id: 1, group_name: "Roles", name: "Show Role", slug: "roles.show" },
  { id: 4, group_id: 1, group_name: "Roles", name: "Update Role", slug: "roles.update" },
  { id: 5, group_id: 1, group_name: "Roles", name: "Delete Role", slug: "roles.destroy" },
  { id: 6, group_id: 2, group_name: "Employees", name: "List Employees", slug: "employees.index" },
  { id: 7, group_id: 2, group_name: "Employees", name: "Create Employee", slug: "employees.store" },
  { id: 8, group_id: 2, group_name: "Employees", name: "Show Employee", slug: "employees.show" },
  { id: 9, group_id: 2, group_name: "Employees", name: "Update Employee", slug: "employees.update" },
  { id: 10, group_id: 2, group_name: "Employees", name: "Delete Employee", slug: "employees.destroy" },
  { id: 11, group_id: 3, group_name: "Employee Types", name: "List Employee Types", slug: "employee-types.index" },
  { id: 12, group_id: 3, group_name: "Employee Types", name: "Create Employee Type", slug: "employee-types.store" },
  { id: 13, group_id: 3, group_name: "Employee Types", name: "Show Employee Type", slug: "employee-types.show" },
  { id: 14, group_id: 3, group_name: "Employee Types", name: "Update Employee Type", slug: "employee-types.update" },
  { id: 15, group_id: 3, group_name: "Employee Types", name: "Delete Employee Type", slug: "employee-types.destroy" },
];



export const SEED_ASSIGNMENTS: Assignments = {
  2: PERMISSIONS_SOURCE.map((p) => p.id),
  3: PERMISSIONS_SOURCE.filter((p) => p.slug.endsWith(".index") || p.slug.endsWith(".show")).map((p) => p.id),
  4: [],
};

export const groupBy = <T, K extends keyof T>(list: T[], key: K): Record<string, T[]>  => {
  return list.reduce<Record<string, T[]>>((acc, item) => {
    const groupKey = String(item[key]);
    (acc[groupKey] = acc[groupKey] || []).push(item);
    return acc;
  }, {});
}


export const ROLE_COLUMNS: TableColumn<RoleTableHead>[] = [
  { isVisible: true, isSort:true, key: "name", label: "rolepermission:role_name"},
  { isVisible: true, isSort:true, key: "status", label: "rolepermission:status"},
  { isVisible: true, isSort:true, key: "created_at", label: "common:created_at"},
  { isVisible: true, isSort:true, key: "updated_at", label: "common:updated_at"},
]