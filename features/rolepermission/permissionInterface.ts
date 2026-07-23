
export interface Permission {
  id: number;
  group_id: number;
  group_name: string;
  name: string;
  slug: string;
}


/** Map of role id -> array of granted permission ids */
export type Assignments = Record<number, number[]>;

/** Map of group name -> permissions in that group */
export type GroupedPermissions = Record<string, Permission[]>;
