import { FaUserShield } from "react-icons/fa6";
import { BsHouse } from "react-icons/bs";
import { NavSection } from "../../../features/sidebar/sidebar.types";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { PiUsersDuotone } from "react-icons/pi";
import { BsHouseDoor } from "react-icons/bs";

export const EXPANDED_WIDTH = 264;
export const COLLAPSED_WIDTH = 50;

export const NAV_SECTIONS: NavSection[] = [
  {
    key: "main",
    label: "Main",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        route: "/admin/dashboard",
        icon: (<BsHouseDoor />),
      },
      {
        key: "roles",
        label: "Roles & Permissions",
        route: "/admin/role-permission",
        icon: (<RiShieldKeyholeLine />),
        children: [
          { key: "role", label: "Roles", route: "/admin/role-permission/roles" },
        ]
      },
      {
        key: "users",
        label: "Users",
        route: "/admin/user",
        icon: (<PiUsersDuotone />),
        children: [
          { key: "employees", label: "Employees", route: "/admin/user/employees" },
          { key: "roles", label: "Roles & Permissions", route: "/admin/user/roles" },
          { key: "activity", label: "Activity Log", route: "/admin/users/activity" },
        ],
      },
      {
        key: "jobs",
        label: "Jobs",
        route: "#/jobs",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        children: [
          { key: "queue", label: "Job Queue", route: "#/jobs" },
          { key: "scheduler", label: "Scheduler", route: "#/jobs/scheduler" },
          { key: "history", label: "Job History", route: "#/jobs/history" },
        ],
      },
    ],
  },
  {
    key: "communication",
    label: "Communication",
    items: [
      {
        key: "email",
        label: "Email",
        route: "#/email",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        key: "chat",
        label: "Chat",
        route: "#/chat",
        badge: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
      },
    ],
  },
  {
    key: "account",
    label: "Account",
    items: [
      {
        key: "profile",
        label: "Profile",
        route: "#/profile",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
      {
        key: "security",
        label: "Security",
        route: "#/security",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
      },
    ],
  },
  {
    key: "system",
    label: "System",
    items: [
      {
        key: "settings",
        label: "Settings",
        route: "#/settings",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        children: [
          { key: "general", label: "General", route: "#/settings" },
          { key: "billing", label: "Billing", route: "#/settings/billing" },
          { key: "api", label: "API Keys", route: "#/settings/api" },
          { key: "integrations", label: "Integrations", route: "#/settings/integrations" },
        ],
      },
    ],
  },
];
