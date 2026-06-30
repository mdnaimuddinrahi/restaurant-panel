"use client";

import { useEffect, useRef, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import AppCustomButton from "@/components/ui/button/AppCustomButton";

function NotificationIcon({
  type,
  unread,
}: {
  type: string;
  unread: boolean;
}) {
  const iconClass = `h-5 w-5 ${
    unread ? "animate-pulse" : ""
  }`;

  switch (type) {
    case "user":
      return (
        <svg
          className={iconClass}
          style={{ color: "var(--accent)" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0" />
        </svg>
      );

    case "order":
      return (
        <svg
          className={iconClass}
          style={{ color: "var(--accent)" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M3 4h2l2 10h10l2-7H7" />
          <circle cx="9" cy="19" r="1.5" />
          <circle cx="17" cy="19" r="1.5" />
        </svg>
      );

    case "sales":
      return (
        <svg
          className={iconClass}
          style={{ color: "var(--accent)" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 19h16M7 15l3-4 3 2 4-6" />
        </svg>
      );

    default:
      return (
        <svg
          className={iconClass}
          style={{ color: "var(--accent)" }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      );
  }
}

export default function NavbarNotification() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      type: "user",
      title: "New employee registered",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "order",
      title: "A new order has been placed",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 3,
      type: "sales",
      title: "Today's sales report is ready",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 4,
      type: "success",
      title: "Employee updated successfully",
      time: "Yesterday",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div ref={wrapperRef} className="relative">
      <AppCustomButton
        variant="ghost"
        className="relative w-8 h-8"
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* <IoNotificationsOutline className="h-5 w-5" />

        {unreadCount > 0 && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full notif-dot"></span>
        )} */}

<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full notif-dot"></span>
        )}
      </AppCustomButton>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl animate-slideDown dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between border-b border-slate-100 p-3 dark:border-slate-700">
            <span className="text-sm font-semibold">
              Notifications
            </span>

            <button className="text-xs font-medium accent-text hover:underline">
              Mark all read
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto">
  {notifications.map((item) => (
    <button
      key={item.id}
      className={`group flex w-full items-start gap-3 border-l-4 px-4 py-3 text-left transition-all duration-200
      ${
        item.unread
          ? "accent-border bg-[var(--accent-subtle)] hover:bg-[var(--accent-subtle-dark)]"
          : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/40"
      }`}
    >
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full
        ${
          item.unread
            ? "bg-[var(--accent-subtle-dark)]"
            : "bg-slate-100 dark:bg-slate-700"
        }`}
      >
        <NotificationIcon
          type={item.type}
          unread={item.unread}
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p
            className={`text-sm ${
              item.unread
                ? "font-medium"
                : "font-medium text-slate-600 dark:text-slate-300"
            }`}
          >
            {item.title}
          </p>

          {item.unread && (
            <span
              className="ml-2 h-2 w-2 rounded-full notif-dot"
              style={{
                backgroundColor: "var(--accent)",
              }}
            />
          )}
        </div>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {item.time}
        </p>
      </div>
    </button>
  ))}
</div>
{/* 
          <div className="max-h-72 overflow-y-auto">
            {notifications.map((item) => (
              <button
                key={item.id}
                className={`flex w-full gap-3 p-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                  item.unread
                    ? "border-l-2 accent-border"
                    : ""
                }`}
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40">
                  <FiUser className="accent-text h-4 w-4" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {item.time}
                  </p>
                </div>
              </button>
            ))}
          </div> */}

          <div className="border-t border-slate-100 p-2 dark:border-slate-700">
            <button className="w-full rounded-lg py-2 text-center text-xs font-medium accent-text transition-colors hover:bg-slate-50 dark:hover:bg-slate-700">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
// import React from 'react'

// export default function NavbarNotification() {
//   return (
//     <div className="relative" id="notif-wrap">
//         <button id="notif-btn" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative" data-tooltip="Notifications">
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
//           <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full notif-dot"></span>
//         </button>
//         <div id="notif-dropdown" className="hidden absolute right-0 top-11 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl animate-slideDown z-50">
//           <div className="p-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
//             <span className="font-display font-600 text-sm">Notifications</span>
//             <button className="text-xs accent-text font-500">Mark all read</button>
//           </div>
//           <div className="max-h-64 overflow-y-auto">
//             <div className="notif-item p-3 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-l-2 accent-border">
//               <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0"><svg className="w-4 h-4 accent-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>
//               <div><p className="text-sm font-500">New user registered</p><p className="text-xs text-slate-400 mt-0.5">2 minutes ago</p></div>
//             </div>
//           </div>
//           <div className="p-2 border-t border-slate-100 dark:border-slate-700">
//             <button className="w-full text-center text-xs accent-text font-500 py-1">View all notifications</button>
//           </div>
//         </div>
//       </div>
//   )
// }


            // <div className="notif-item p-3 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
            //   <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0"><svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
            //   <div><p className="text-sm font-500">Job #4821 completed</p><p className="text-xs text-slate-400 mt-0.5">15 minutes ago</p></div>
            // </div>
            // <div className="notif-item p-3 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
            //   <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0"><svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg></div>
            //   <div><p className="text-sm font-500">Storage limit at 85%</p><p className="text-xs text-slate-400 mt-0.5">1 hour ago</p></div>
            // </div>
            // <div className="notif-item p-3 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
            //   <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0"><svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div>
            //   <div><p className="text-sm font-500">3 new messages</p><p className="text-xs text-slate-400 mt-0.5">3 hours ago</p></div>
            // </div>