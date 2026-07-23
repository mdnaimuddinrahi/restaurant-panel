"use client"
import React, { useMemo, useState } from "react";
import { Search, ChevronDown, Check, RotateCcw, Sun, Moon } from "lucide-react";

/**
 * Theming ---------------------------------------------------------------
 * In your app, delete this block and use your real theme system instead:
 *
 *   import { useTheme } from "@/theme";
 *   import { hexToRgba } from "@/utils/colorUtils";
 *
 * Everything below reads accentColor from useTheme() and applies it the
 * same way your react-select example does: Tailwind classes handle all
 * static layout / spacing / dark-mode styling, and inline style objects
 * (built with hexToRgba) handle anything that depends on the dynamic
 * accent color, since an arbitrary hex can't be expressed as a Tailwind
 * class name.
 */
function hexToRgba(hex: string, alpha = 1): string {
  const clean = hex.replace("#", "");
  const bigint = parseInt(
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ACCENT_SWATCHES: string[] = ["#4F46E5", "#0E9488", "#E11D48", "#D97706", "#0369A1"];

interface Theme {
  accentColor: string;
  setAccentColor: React.Dispatch<React.SetStateAction<string>>;
}

function useTheme(): Theme {
  const [accentColor, setAccentColor] = useState<string>(ACCENT_SWATCHES[0]);
  return { accentColor, setAccentColor };
}

// ---------------------------------------------------------------------------
// Source data (from API) -----------------------------------------------------
// ---------------------------------------------------------------------------

type RoleStatus = "assigned" | "unassigned";

interface Role {
  id: number;
  name: string;
  status: RoleStatus;
}

interface Permission {
  id: number;
  group_id: number;
  group_name: string;
  name: string;
  slug: string;
}

/** Map of role id -> array of granted permission ids */
type Assignments = Record<number, number[]>;

/** Map of group name -> permissions in that group */
type GroupedPermissions = Record<string, Permission[]>;

const ROLES_SOURCE: Role[] = [
  { id: 2, name: "Manager", status: "assigned" },
  { id: 3, name: "Employee", status: "assigned" },
  { id: 4, name: "Guest", status: "assigned" },
];

const PERMISSIONS_SOURCE: Permission[] = [
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

const SEED_ASSIGNMENTS: Assignments = {
  2: PERMISSIONS_SOURCE.map((p) => p.id),
  3: PERMISSIONS_SOURCE.filter((p) => p.slug.endsWith(".index") || p.slug.endsWith(".show")).map((p) => p.id),
  4: [],
};

function groupBy<T, K extends keyof T>(list: T[], key: K): Record<string, T[]> {
  return list.reduce<Record<string, T[]>>((acc, item) => {
    const groupKey = String(item[key]);
    (acc[groupKey] = acc[groupKey] || []).push(item);
    return acc;
  }, {});
}

// ---------------------------------------------------------------------------
export default function RolePermissionPage(): React.JSX.Element {
  const { accentColor, setAccentColor } = useTheme();
  const [dark, setDark] = useState<boolean>(false);

  const [roles] = useState<Role[]>(ROLES_SOURCE);
  const [permissions] = useState<Permission[]>(PERMISSIONS_SOURCE);
  const [selectedRoleId, setSelectedRoleId] = useState<number>(roles[0].id);
  const [roleQuery, setRoleQuery] = useState<string>("");
  const [permQuery, setPermQuery] = useState<string>("");
  const [saved, setSaved] = useState<Assignments>(SEED_ASSIGNMENTS);
  const [draft, setDraft] = useState<Assignments>(SEED_ASSIGNMENTS);
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(Object.keys(groupBy(PERMISSIONS_SOURCE, "group_name")))
  );
  const [savedFlash, setSavedFlash] = useState<boolean>(false);
  const [roleFocused, setRoleFocused] = useState<boolean>(false);
  const [permFocused, setPermFocused] = useState<boolean>(false);

  const grouped: GroupedPermissions = useMemo(() => groupBy(permissions, "group_name"), [permissions]);

  const filteredRoles: Role[] = useMemo(() => {
    const q = roleQuery.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter((r) => r.name.toLowerCase().includes(q));
  }, [roles, roleQuery]);

  const filteredGroups: GroupedPermissions = useMemo(() => {
    const q = permQuery.trim().toLowerCase();
    if (!q) return grouped;
    const out: GroupedPermissions = {};
    Object.keys(grouped).forEach((g) => {
      const rows = grouped[g].filter(
        (p) => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
      );
      if (rows.length) out[g] = rows;
    });
    return out;
  }, [grouped, permQuery]);

  const selectedRole: Role | undefined = roles.find((r) => r.id === selectedRoleId);
  const draftIds = new Set<number>(draft[selectedRoleId] || []);
  const savedIds = new Set<number>(saved[selectedRoleId] || []);
  const total = permissions.length;

  const isDirty =
    draftIds.size !== savedIds.size || [...draftIds].some((id) => !savedIds.has(id));

  function toggle(permId: number): void {
    setDraft((prev) => {
      const cur = new Set<number>(prev[selectedRoleId] || []);
      cur.has(permId) ? cur.delete(permId) : cur.add(permId);
      return { ...prev, [selectedRoleId]: [...cur] };
    });
  }

  function toggleGroup(groupName: string, allOn: boolean): void {
    const ids = grouped[groupName].map((p) => p.id);
    setDraft((prev) => {
      const cur = new Set<number>(prev[selectedRoleId] || []);
      ids.forEach((id) => (allOn ? cur.delete(id) : cur.add(id)));
      return { ...prev, [selectedRoleId]: [...cur] };
    });
  }

  function toggleExpand(groupName: string): void {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(groupName) ? next.delete(groupName) : next.add(groupName);
      return next;
    });
  }

  function handleAssign(): void {
    setSaved((prev) => ({ ...prev, [selectedRoleId]: draft[selectedRoleId] }));
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1300);
  }

  function handleCancel(): void {
    setDraft((prev) => ({ ...prev, [selectedRoleId]: saved[selectedRoleId] || [] }));
  }

  return (
    <div className={dark ? "dark" : ""}>
      <style>{`
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        .anim-row { animation: fadeSlide 200ms ease both; }
        .anim-pop { animation: popIn 220ms cubic-bezier(.4,0,.2,1) both; }
      `}</style>

      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header ------------------------------------------------------- */}
          <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Roles &amp; Permissions</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                Select a role, choose its permissions, then assign.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Demo-only: swap accent color, to show styling reacts to useTheme() */}
              <div className="flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-1.5">
                {ACCENT_SWATCHES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setAccentColor(c)}
                    aria-label={`Use accent ${c}`}
                    className="w-4 h-4 rounded-full transition-transform duration-150 hover:scale-110"
                    style={{
                      backgroundColor: c,
                      boxShadow: c === accentColor ? `0 0 0 2px white, 0 0 0 3.5px ${c}` : "none",
                    }}
                  />
                ))}
              </div>

              {/* Demo-only: dark mode toggle, standing in for your app's real theme switcher */}
              <button
                onClick={() => setDark((d) => !d)}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[240px_1fr] gap-4 items-start">
            {/* ============================ ROLE LIST ============================ */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-colors duration-300">
              <div className="p-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                  <input
                    value={roleQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoleQuery(e.target.value)}
                    onFocus={() => setRoleFocused(true)}
                    onBlur={() => setRoleFocused(false)}
                    placeholder="Search roles"
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none transition-shadow duration-150"
                    style={roleFocused ? { borderColor: accentColor, boxShadow: `0 0 0 3px ${hexToRgba(accentColor, 0.18)}` } : undefined}
                  />
                </div>
              </div>

              <div className="max-h-[480px] overflow-y-auto">
                {filteredRoles.length === 0 && (
                  <div className="p-4 text-center text-xs text-neutral-400 dark:text-neutral-500">No roles found.</div>
                )}
                {filteredRoles.map((role) => {
                  const active = role.id === selectedRoleId;
                  const count = (saved[role.id] || []).length;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRoleId(role.id)}
                      className="w-full text-left px-3 py-2.5 border-l-[3px] border-transparent transition-colors duration-150 hover:bg-neutral-50 dark:hover:bg-neutral-800/70"
                      style={
                        active
                          ? { borderColor: accentColor, backgroundColor: hexToRgba(accentColor, 0.08) }
                          : undefined
                      }
                    >
                      <div className="text-sm font-medium">{role.name}</div>
                      <div className="text-xs text-neutral-400 dark:text-neutral-500">
                        {count}/{total} permissions
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ============================ PERMISSIONS ============================ */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-colors duration-300">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-sm font-semibold">{selectedRole?.name}</div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">
                    {draftIds.size} of {total} selected
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isDirty && (
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 transition-colors duration-150 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={handleAssign}
                    disabled={!isDirty}
                    className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg text-white transition-all duration-150 ${
                      isDirty ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default bg-neutral-300 dark:bg-neutral-700"
                    }`}
                    style={isDirty ? { backgroundColor: savedFlash ? "#16A34A" : accentColor } : undefined}
                  >
                    {savedFlash ? "Assigned ✓" : "Assign to Role"}
                  </button>
                </div>
              </div>

              <div className="p-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                  <input
                    value={permQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPermQuery(e.target.value)}
                    onFocus={() => setPermFocused(true)}
                    onBlur={() => setPermFocused(false)}
                    placeholder="Search permissions"
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none transition-shadow duration-150"
                    style={permFocused ? { borderColor: accentColor, boxShadow: `0 0 0 3px ${hexToRgba(accentColor, 0.18)}` } : undefined}
                  />
                </div>
              </div>

              <div className="max-h-[440px] overflow-y-auto">
                {Object.keys(filteredGroups).length === 0 && (
                  <div className="p-8 text-center text-sm text-neutral-400 dark:text-neutral-500">No permissions found.</div>
                )}
                {Object.keys(filteredGroups).map((groupName) => {
                  const rows = filteredGroups[groupName];
                  const ids = grouped[groupName].map((p) => p.id);
                  const grantedInGroup = ids.filter((id) => draftIds.has(id)).length;
                  const allOn = grantedInGroup === ids.length;
                  const isOpen = expanded.has(groupName);
                  return (
                    <div key={groupName} className="border-b border-neutral-100 dark:border-neutral-800/80 last:border-b-0">
                      <div
                        onClick={() => toggleExpand(groupName)}
                        className="flex items-center justify-between px-4 py-2.5 cursor-pointer bg-neutral-50 dark:bg-neutral-800/40 transition-colors duration-150"
                      >
                        <div className="flex items-center gap-2">
                          <ChevronDown
                            className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 transition-transform duration-200"
                            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                          />
                          <span className="text-sm font-semibold">{groupName}</span>
                          <span className="text-xs text-neutral-400 dark:text-neutral-500">
                            ({grantedInGroup}/{ids.length})
                          </span>
                        </div>
                        <span
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            toggleGroup(groupName, allOn);
                          }}
                          className="text-xs font-medium cursor-pointer"
                          style={{ color: accentColor }}
                        >
                          {allOn ? "Clear all" : "Select all"}
                        </span>
                      </div>

                      {isOpen && (
                        <div className="px-4 pt-1 pb-2.5">
                          {rows.map((perm, i) => {
                            const on = draftIds.has(perm.id);
                            return (
                              <label
                                key={perm.id}
                                className="anim-row flex items-center gap-2.5 px-1.5 py-2 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                                style={{ animationDelay: `${i * 20}ms` }}
                              >
                                <span
                                  onClick={() => toggle(perm.id)}
                                  className="w-[18px] h-[18px] rounded-[5px] border border-neutral-300 dark:border-neutral-600 flex items-center justify-center flex-shrink-0 transition-all duration-150"
                                  style={on ? { backgroundColor: accentColor, borderColor: accentColor } : undefined}
                                >
                                  {on && <Check className="w-3 h-3 text-white anim-pop" strokeWidth={3} />}
                                </span>
                                <span onClick={() => toggle(perm.id)} className="min-w-0">
                                  <span className="block text-sm text-neutral-800 dark:text-neutral-200">{perm.name}</span>
                                  <span className="block text-[11px] text-neutral-400 dark:text-neutral-500">{perm.slug}</span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}