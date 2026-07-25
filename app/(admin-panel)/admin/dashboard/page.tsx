"use client";
import Heading from '@/components/ui/Heading'
import { useTranslation } from "react-i18next";

export default function page() {
  const stats = [
    { label:'Total Users', value:'12,482', change:'+8.2%', up:true, icon:'<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>', color:'#6366f1' },
    { label:'Active Jobs', value:'3,847', change:'+12.5%', up:true, icon:'<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>', color:'#8b5cf6' },
    { label:'Revenue', value:'$84,200', change:'+4.1%', up:true, icon:'<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', color:'#10b981' },
    { label:'Open Tickets', value:'248', change:'-3.4%', up:false, icon:'<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>', color:'#ef4444' },
  ];

  
  const recentActivity = [
    { user:'Alice Chen', action:'Created job #4920', time:'2m ago', avatar:'AC', color:'#6366f1' },
    { user:'Bob Miller', action:'Updated user role', time:'15m ago', avatar:'BM', color:'#10b981' },
    { user:'Carol White', action:'Uploaded report.pdf', time:'1h ago', avatar:'CW', color:'#f97316' },
    { user:'David Park', action:'Resolved ticket #88', time:'2h ago', avatar:'DP', color:'#8b5cf6' },
    { user:'Eva Stone', action:'New user registered', time:'3h ago', avatar:'ES', color:'#ec4899' },
  ];

  const showModal = (id: number | string) => {
    console.log("Show modal", id);
    // document.getElementById(id).classList.remove('hidden');
    // closeAllDropdowns();
  }

  const navigate = (url: string) => {
    console.log("Navigate to", url);
    // router.push(url);
  }
  const { t } = useTranslation("common");

  return (
    <>
      <Heading title={t("admin_dad")} subtitles={"Manage your restaurant settings"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-card relative bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow animate-fadeInUp overflow-hidden"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${s.color}20` }}
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: s.color }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  dangerouslySetInnerHTML={{ __html: s.icon }}
                />
              </div>

              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  s.up
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {s.change}
              </span>
            </div>

            <div className="font-display text-2xl font-bold mb-0.5">
              {s.value}
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              {s.label}
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
              style={{ background: `${s.color}40` }}
            />
          </div>
        ))}
      </div>
      {/* start */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* <!-- Chart placeholder --> */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-700 text-base">Revenue Overview</h2>
            <select className="text-xs border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1 bg-transparent">
              <option>Last 7 days</option><option>Last 30 days</option><option>This year</option>
            </select>
          </div>
          <div className="relative h-48 flex items-end gap-2">
            {[40,65,45,80,55,90,70,85,60,95,75,88].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md transition-all hover:opacity-80 cursor-pointer" style={{ height: `${h}%`, background: 'var(--accent)', opacity: `${0.4 + i * 0.05}` }}></div>
              </div>
            ))}
            <div 
              className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(255,255,255,0.02))' }}></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

        {/* <!-- Activity --> */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="font-display font-700 text-base mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((a, i) => 
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-700 flex-shrink-0" style={{ background: a.color }}>{a.avatar}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-500 truncate">{a.user}</p>
                  <p className="text-xs text-slate-400 truncate">{a.action}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">{a.time}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* end */}
      {/* <!-- Quick Actions --> */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
        <h2 className="font-display font-700 text-base mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => showModal('form-modal')} 
            className="flex items-center gap-2 px-4 py-2 accent-bg text-white text-sm rounded-xl hover:opacity-90 transition-opacity font-500"> 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>Add User
          </button>
          <button 
            onClick={() => showModal('confirm-modal')} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-sm rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>Run Job
          </button>
          <button onClick={() => showModal('info-modal')} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-sm rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>View Info
          </button>
          <button onClick={() => navigate('#/email')} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-sm rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>Send Email
          </button>
        </div>
      </div>
      {/* <!-- Alerts --> */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl">
          <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div><p className="text-sm font-600 text-emerald-800 dark:text-emerald-300">All systems operational</p><p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Last checked 2 minutes ago</p></div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
          <div><p className="text-sm font-600 text-amber-800 dark:text-amber-300">Storage usage at 85%</p><p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">Consider upgrading your plan</p></div>
        </div>
      </div>
    </>
  )
}
