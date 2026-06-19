
import AnimatedSelect from '@/components/ui/select/AppReactSelect';
import Pagination from '@/components/ui/Pagination';
import SkeletonSelect from '@/components/ui/SkeletonSelect';
import TableHead from '@/components/ui/TableHead';
import { useGetEmployeeResourcesQuery, useGetEmployeesQuery } from '@/features/employee/employeeApi';
import { COLUMNS, USER_DATA } from '@/features/employee/employeeConstant';
import React, { useEffect, useState } from 'react'
import Select from 'react-select/base';

export default function EmployeeList() {

  const {data: resourceResponse, isLoading: resourceIsLoading, isError: resourceIsError, isFetching: resourceIsFetching} = useGetEmployeeResourcesQuery({})
  console.log('resourceIsError', resourceIsError)
  console.log('resourceIsFetching', resourceIsFetching)
  console.log('resourceIsLoading', resourceIsLoading)
  console.log('resource Response', resourceResponse);


  return (
      <div className="bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-4 p-3">
            <SkeletonSelect />
            <SkeletonSelect />
            <SkeletonSelect />
            <SkeletonSelect />
            <SkeletonSelect />
        </div>
    
        {/* filter start */}
          {/* <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-40">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input
                  id="user-search"
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:border-transparent transition-all"
                  value={tableSearch}
                  onInput={(e) => {
                      setTableSearch(e.currentTarget.value);
                      setTablePage(1);
                  }}
                />
            </div>
              <AnimatedSelect
                value={tableFilter}
                onChange={(val) => {
                  setTableFilter(val);
                  setTablePage(1);
                }}
                // options={roles}
              /> */}
          {/* </div> */}
{/* filter end */}

          <div className="overflow-x-auto">
          <table className="w-full text-sm">
              <TableHead sortState={sortState} sortTable={sortTable} columns={COLUMNS}/>
              <tbody id="user-table-body">
              {users.map((u) => (
                  <tr key={u.id} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: colors[u.id % colors.length] }}>
                          {initials(u.name)}
                      </div>
                      <span className="font-medium">{u.name}</span>
                      </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{u.email}</td>
                  <td className="px-4 py-3">{roleBadge(u.role)}</td>
                  <td className="px-4 py-3">{statusBadge(u.status)}</td>
                  <td className="px-4 py-3 text-slate-500">{u.joined}</td>
                  <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                      <button onClick={() => showModal('form-modal')} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors" data-tooltip="Edit">
                          <svg className="w-3.5 h-3.5 accent-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => showModal('confirm-modal')} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" data-tooltip="Delete">
                          <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                      </div>
                  </td>
                  </tr>
              ))}
              {users.length === 0 && (
                  <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">No users found</td>
                  </tr>
              )}
              </tbody>
          </table>
          </div>
          {/* <Pagination
            totalUsersCount={totalUsersCount}
            tablePage={tablePage}
            tablePageSize={tablePageSize}
            pagesCount={pagesCount}
            setTablePage={setTablePage}
          /> */}
      </div>
  )
}
