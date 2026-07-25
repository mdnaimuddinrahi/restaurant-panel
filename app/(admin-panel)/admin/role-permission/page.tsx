"use client"
import React, { useMemo, useState } from "react";
import { useTheme } from "@/theme";
import { hexToRgba } from "@/utils/colorUtils";
import { Role } from "@/features/rolepermission/roleInterface";
import { groupBy, PERMISSIONS_SOURCE, ROLES_SOURCE, SEED_ASSIGNMENTS } from "@/features/rolepermission/rolePermissionConstant";
import { Assignments, GroupedPermissions, Permission } from "@/features/rolepermission/permissionInterface";
import Heading from "@/components/ui/Heading";
import { useTranslation } from "react-i18next";
import AppCustomButton from "@/components/ui/button/AppCustomButton";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { FaArrowRotateLeft, FaCheck } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import useNumberFormatter from '@/hooks/useNumberFormatter';

export default function page() {
  const { accentColor } = useTheme();
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
    const [showGroupTags, setShowGroupTags] = useState(false);
    const formatNumber = useNumberFormatter();
    const grouped: GroupedPermissions = useMemo(() => groupBy(permissions, "group_name"), [permissions]);

    const filteredRoles: Role[] = useMemo(() => {
        const q = roleQuery.trim().toLowerCase();
        if (!q) return roles;
        return roles.filter((r) => r.name.toLowerCase().includes(q));
      }, [roles, roleQuery]);
      const [selectedGroup, setSelectedGroup] = useState<string>("All");
      const permissionGroups = useMemo(
        () => ["All", ...Object.keys(grouped)],
        [grouped]
      );
      const filteredGroups: GroupedPermissions = useMemo(() => {
    let groups = grouped;

    // Filter by selected tag
    if (selectedGroup !== "All") {
      groups = {
        [selectedGroup]: grouped[selectedGroup],
      };
    }

    // Search filter
    const q = permQuery.trim().toLowerCase();
    if (!q) return groups;

    const out: GroupedPermissions = {};

    Object.keys(groups).forEach((group) => {
      const rows = groups[group].filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );

      if (rows.length) {
        out[group] = rows;
      }
    });

    return out;
  }, [grouped, permQuery, selectedGroup]);

    const selectedRole: Role | undefined = roles.find((r) => r.id === selectedRoleId);
    const draftIds = new Set<number>(draft[selectedRoleId] || []);
    const savedIds = new Set<number>(saved[selectedRoleId] || []);
    const total = permissions.length;

    const isDirty =
      draftIds.size !== savedIds.size || [...draftIds].some((id) => !savedIds.has(id));

    const toggle = (permId: number): void => {
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
    const { t } = useTranslation("rolepermission");
    return (
      <>
        <Heading 
          title={t("title")}
        />
        {/* <div className="grid grid-cols-[240px_1fr] gap-4 items-start"> */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[280px_1fr] items-start">
            {/* ============================ ROLE LIST ============================ */}
            <div className="w-full rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden transition-all duration-300">
              <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                <div className="relative">
                    <CiSearch className="absolute left-2.5 top-1/2 
                      -translate-y-1/2 w-3.5 h-3.5 
                      text-slate-400 dark:text-slate-500" />

                    <input
                      value={roleQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoleQuery(e.target.value)}
                      onFocus={() => setRoleFocused(true)}
                      onBlur={() => setRoleFocused(false)}
                      placeholder={t('search_roles')}
                      className="w-full pl-8 pr-3 py-2 text-sm 
                      rounded-lg border border-slate-200
                      dark:border-slate-700 bg-slate-50 
                      dark:bg-slate-800 text-slate-900 
                      dark:text-slate-100 placeholder-slate-400
                      dark:placeholder-slate-500 outline-none
                      transition-shadow duration-150"
                      style={
                        roleFocused ? 
                          { borderColor: accentColor, boxShadow: `0 0 0 3px ${hexToRgba(accentColor, 0.18)}` } 
                          : undefined}
                    />
                </div>
              </div>

              <div className="max-h-120 overflow-y-auto">
                {filteredRoles.length === 0 && (
                  <div 
                    className="p-4 text-center text-xs 
                    text-slate-400 dark:text-slate-500">No roles found.</div>
                )}
                {filteredRoles.map((role) => {
                  const active = role.id === selectedRoleId;
                  const count = (saved[role.id] || []).length;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRoleId(role.id)}
                      className="w-full text-left px-3 
                        py-2.5 border-l-[3px] border-transparent 
                        transition-colors duration-150 
                        hover:bg-slate-50 dark:hover:bg-slate-800/70"
                      style={
                        active
                          ? { borderColor: accentColor, backgroundColor: hexToRgba(accentColor, 0.08) }
                          : undefined
                      }
                    >
                      <div className="text-sm font-medium">{role.name}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">
                        
                        {t('selected_permissions', {
                          count: formatNumber(count),
                          total: formatNumber(total)
                        })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* ============================ PERMISSIONS ============================ */}
            
            <div className="min-w-0 rounded-2xl border border-slate-200
                 bg-white dark:border-slate-800 dark:bg-slate-900 
                 overflow-hidden transition-all duration-300">
              <div 
                className="p-4 border-b border-slate-200 
                dark:border-slate-800 flex items-center 
                justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-sm font-semibold">{selectedRole?.name}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500">
                    {/* {draftIds.size} of {total} selected */}
                    {t('totalSelected', {
                      size: formatNumber(draftIds.size),
                      total: formatNumber(total)
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isDirty && (
                    <AppCustomButton
                      variant="outline"
                      onClick={handleCancel}
                      className="text-sm flex items-center gap-1.5 px-3 py-1.5"
                    >
                      <FaArrowRotateLeft />
                      {t('common:cancel')}
                    </AppCustomButton>
                  )}
                  <button
                    onClick={handleAssign}
                    disabled={!isDirty}
                    className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg text-white transition-all duration-150 ${
                      isDirty ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default bg-slate-300 dark:bg-slate-700"
                    }`}
                    style={isDirty ? { backgroundColor: savedFlash ? "#16A34A" : accentColor } : undefined}
                  >
                    {savedFlash ? t('assigned') : t('assign_to_role')}
                  </button>
                </div>
              </div>

              <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  {/* Search */}
                  <div className="relative flex-1">
                    
                    <CiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />

                    <input
                      value={permQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPermQuery(e.target.value)
                      }
                      onFocus={() => setPermFocused(true)}
                      onBlur={() => setPermFocused(false)}
                      placeholder={t('search_permission')}
                      className="w-full pl-8 pr-3 py-2 text-sm 
                      rounded-lg border border-slate-200 
                      dark:border-slate-700 bg-slate-50 dark:bg-slate-800
                       text-slate-900 dark:text-slate-100 placeholder-slate-400
                        dark:placeholder-slate-500 outline-none transition-shadow duration-150"
                      style={
                        permFocused
                          ? {
                              borderColor: accentColor,
                              boxShadow: `0 0 0 3px ${hexToRgba(accentColor, 0.18)}`,
                            }
                          : undefined
                      }
                    />
                  </div>

                  {/* Dropdown Button */}
                  <AppCustomButton
                    variant="ghost"
                    onClick={() => setShowGroupTags((prev) => !prev)}
                    className="w-10 h-10 rounded-full border 
                    border-slate-200 dark:border-slate-700 bg-slate-50 
                    dark:bg-slate-800 flex items-center justify-center 
                    transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <motion.div
                      animate={{ rotate: showGroupTags ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <FiChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </motion.div>
                  </AppCustomButton>
                </div>
              </div>
                {/* add_groups_tags */}
                <AnimatePresence initial={false}>
                  {showGroupTags && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-b border-slate-200 dark:border-slate-800"
                    >
                      <div className="p-4 flex flex-wrap gap-2">
                        {permissionGroups.map((group) => {
                          const active = selectedGroup === group;

                          return (
                            <motion.button
                              key={group}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              layout
                              onClick={() => setSelectedGroup(group)}
                              className="px-3 py-1.5 rounded-md text-xs 
                              font-medium border border-slate-300 
                              dark:border-slate-600 transition-colors"
                              style={
                                active
                                  ? {
                                      backgroundColor: accentColor,
                                      borderColor: accentColor,
                                      color: "#fff",
                                    }
                                  : undefined
                              }
                            >
                              {group}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              <div className="max-h-110 overflow-y-auto">
                {Object.keys(filteredGroups).length === 0 && (
                  <div className="p-8 text-center text-sm text-slate-400 dark:text-slate-500">No permissions found.</div>
                )}
                {Object.keys(filteredGroups).map((groupName) => {
                  const rows = filteredGroups[groupName];
                  const ids = grouped[groupName].map((p) => p.id);
                  const grantedInGroup = ids.filter((id) => draftIds.has(id)).length;
                  const allOn = grantedInGroup === ids.length;
                  const isOpen = expanded.has(groupName);
                  return (
                    <div key={groupName} className="border-b border-slate-100 dark:border-slate-800/80 last:border-b-0">
                      <div
                        onClick={() => toggleExpand(groupName)}
                        className="flex items-center justify-between px-4 py-2.5 cursor-pointer bg-slate-50 dark:bg-slate-800/40 transition-colors duration-150"
                      >
                        <div className="flex items-center gap-2">
                          
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{
                              duration: 0.25,
                              ease: "easeInOut",
                            }}
                            className="flex items-center justify-center w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600"
                          >
                            {/* <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> */}
                            <FiChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                          </motion.div>
                          <span className="text-sm font-semibold">{groupName}</span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            ({formatNumber(grantedInGroup)}/{formatNumber(ids.length)})
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
                          {allOn ? t('common:clear_all') : t('common:select_all')}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.25,
                              ease: "easeInOut",
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pt-1 pb-2.5">
                              {rows.map((perm, i) => {
                                const on = draftIds.has(perm.id);

                                return (
                                  <motion.label
                                    onClick={() => toggle(perm.id)}
                                    key={perm.id}
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      delay: i * 0.03,
                                      duration: 0.2,
                                    }}
                                    className="flex items-center gap-2.5 
                                    px-1.5 py-2 rounded-lg cursor-pointer 
                                    hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                  >
                                    <span
                                      // onClick={() => toggle(perm.id)}
                                      className="w-4.5 h-4.5 rounded-[5px] 
                                      border border-slate-300 dark:border-slate-600 
                                      flex items-center justify-center shrink-0"
                                      style={
                                        on
                                          ? {
                                              backgroundColor: accentColor,
                                              borderColor: accentColor,
                                            }
                                          : undefined
                                      }
                                    >
                                      {on && (
                                        <FaCheck className="w-3 h-3 text-white" strokeWidth={3}/>
                                      )}
                                    </span>

                                    <span
                                      // onClick={() => toggle(perm.id)}
                                      className="min-w-0"
                                    >
                                      <span className="block text-sm text-slate-800 dark:text-slate-200">
                                        {perm.name}
                                      </span>

                                      <span className="block text-[11px] text-slate-400 dark:text-slate-500">
                                        {perm.slug}
                                      </span>
                                    </span>
                                  </motion.label>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
        </div>
      </>
    )
}
