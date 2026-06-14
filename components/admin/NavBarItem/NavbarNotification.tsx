import React from 'react'

export default function NavbarNotification() {
  return (
    <div className="relative" id="notif-wrap">
        <button id="notif-btn" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative" data-tooltip="Notifications">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full notif-dot"></span>
        </button>
        <div id="notif-dropdown" className="hidden absolute right-0 top-11 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl animate-slideDown z-50">
          <div className="p-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <span className="font-display font-600 text-sm">Notifications</span>
            <button className="text-xs accent-text font-500">Mark all read</button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            <div className="notif-item p-3 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-l-2 accent-border">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0"><svg className="w-4 h-4 accent-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>
              <div><p className="text-sm font-500">New user registered</p><p className="text-xs text-slate-400 mt-0.5">2 minutes ago</p></div>
            </div>
            <div className="notif-item p-3 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0"><svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
              <div><p className="text-sm font-500">Job #4821 completed</p><p className="text-xs text-slate-400 mt-0.5">15 minutes ago</p></div>
            </div>
            <div className="notif-item p-3 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0"><svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg></div>
              <div><p className="text-sm font-500">Storage limit at 85%</p><p className="text-xs text-slate-400 mt-0.5">1 hour ago</p></div>
            </div>
            <div className="notif-item p-3 flex gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0"><svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div>
              <div><p className="text-sm font-500">3 new messages</p><p className="text-xs text-slate-400 mt-0.5">3 hours ago</p></div>
            </div>
          </div>
          <div className="p-2 border-t border-slate-100 dark:border-slate-700">
            <button className="w-full text-center text-xs accent-text font-500 py-1">View all notifications</button>
          </div>
        </div>
      </div>
  )
}
