"use client"
import Heading from '@/components/ui/Heading'
import React, { useState, useEffect } from 'react'

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

const usersData: User[] = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
  { id: 2, name: 'Bob Miller', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2024-02-20' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-03-10' },
  { id: 4, name: 'David Park', email: 'david@example.com', role: 'Editor', status: 'Active', joined: '2024-03-25' },
  { id: 5, name: 'Eva Stone', email: 'eva@example.com', role: 'Admin', status: 'Active', joined: '2024-04-01' },
  { id: 6, name: 'Frank Lee', email: 'frank@example.com', role: 'Viewer', status: 'Pending', joined: '2024-04-12' },
  { id: 7, name: 'Grace Kim', email: 'grace@example.com', role: 'Editor', status: 'Active', joined: '2024-04-18' },
  { id: 8, name: 'Henry Brown', email: 'henry@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-05-02' },
  { id: 9, name: 'Ivy Wong', email: 'ivy@example.com', role: 'Admin', status: 'Active', joined: '2024-05-10' },
  { id: 10, name: 'Jack Davis', email: 'jack@example.com', role: 'Editor', status: 'Active', joined: '2024-05-20' },
  { id: 11, name: 'Karen Liu', email: 'karen@example.com', role: 'Viewer', status: 'Pending', joined: '2024-05-25' },
  { id: 12, name: 'Leo Martinez', email: 'leo@example.com', role: 'Editor', status: 'Active', joined: '2024-06-01' },
];

export default function page() {
  const [tableSearch, setTableSearch] = useState("");
  const [tableFilter, setTableFilter] = useState("");
  const [tablePage, setTablePage] = useState(1);
  const [sortState, setSortState] = useState<{ col: keyof User | '', dir: 'asc' | 'desc' }>({ col: '', dir: 'asc' });
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const tablePageSize = 5;

  function refreshUserTable() {
    let data = [...usersData];

    // Search filter
    const q = tableSearch.toLowerCase();
    data = data.filter(u => {
      const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchFilter = !tableFilter || u.role === tableFilter;
      return matchSearch && matchFilter;
    });

    // Sorting
    if (sortState.col) {
      data.sort((a, b) => {
        const va = String(a[sortState.col as keyof User]);
        const vb = String(b[sortState.col as keyof User]);
        return sortState.dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }

    const total = data.length;
    const pages = Math.ceil(total / tablePageSize);

    // Adjust page if current page exceeds total pages
    let currentPage = tablePage;
    if (currentPage > pages && pages > 0) {
      currentPage = 1;
      setTablePage(1);
    }

    const slice = data.slice((currentPage - 1) * tablePageSize, currentPage * tablePageSize);

    setUsers(slice);
    setTotalUsersCount(total);
    setPagesCount(pages);
  }

  // Run on page load and whenever filter/sorting/pagination states change
  useEffect(() => {
    refreshUserTable();
  }, [tableSearch, tableFilter, tablePage, sortState]);

  function showModal(id: string) {
    setActiveModal(id);
  }

  function sortTable(column: keyof User) {
    setSortState(prev => {
      if (prev.col === column) {
        return { col: column, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      } else {
        return { col: column, dir: 'asc' };
      }
    });
  }

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      Inactive: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
      Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    };
    return <span className={`badge ${map[s] || ''}`}>{s}</span>;
  };

  const roleBadge = (r: string) => {
    const map: Record<string, string> = {
      Admin: 'accent-subtle-bg accent-text',
      Editor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      Viewer: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
    };
    return <span className={`badge ${map[r] || ''}`}>{r}</span>;
  };

  const initials = (n: string) => n.split(' ').map(p => p[0]).join('');
  const colors = ['#6366f1', '#8b5cf6', '#10b981', '#f97316', '#ec4899', '#3b82f6'];

  return (
    <>
      <Heading title="Users" subtitle="Manage your team members and their permissions." />
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-40">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              id="user-search"
              type="text"
              placeholder="Search users..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:border-transparent transition-all"
              value={tableSearch}
              onInput={(e) => {
                setTableSearch(e.currentTarget.value);
                setTablePage(1);
              }}
            />
          </div>
          <select
            id="user-filter"
            className="text-sm border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 bg-transparent"
            value={tableFilter}
            onChange={(e) => {
              setTableFilter(e.target.value);
              setTablePage(1);
            }}>
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
          <button onClick={() => showModal('form-modal')} className="flex items-center gap-2 px-4 py-2 accent-bg text-white text-sm rounded-xl hover:opacity-90 transition-opacity font-500 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/40 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3 text-left font-semibold cursor-pointer select-none" onClick={() => sortTable('name')}>
                  Name <span id="sort-name">{sortState.col === 'name' ? (sortState.dir === 'asc' ? '↑' : '↓') : ''}</span>
                </th>
                <th className="px-4 py-3 text-left font-semibold cursor-pointer select-none" onClick={() => sortTable('email')}>
                  Email <span id="sort-email">{sortState.col === 'email' ? (sortState.dir === 'asc' ? '↑' : '↓') : ''}</span>
                </th>
                <th className="px-4 py-3 text-left font-semibold cursor-pointer select-none" onClick={() => sortTable('role')}>
                  Role <span id="sort-role">{sortState.col === 'role' ? (sortState.dir === 'asc' ? '↑' : '↓') : ''}</span>
                </th>
                <th className="px-4 py-3 text-left font-semibold cursor-pointer select-none" onClick={() => sortTable('status')}>
                  Status <span id="sort-status">{sortState.col === 'status' ? (sortState.dir === 'asc' ? '↑' : '↓') : ''}</span>
                </th>
                <th className="px-4 py-3 text-left font-semibold cursor-pointer select-none" onClick={() => sortTable('joined')}>
                  Joined <span id="sort-joined">{sortState.col === 'joined' ? (sortState.dir === 'asc' ? '↑' : '↓') : ''}</span>
                </th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
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
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500">
          <span id="table-info">
            Showing {totalUsersCount === 0 ? 0 : Math.min((tablePage - 1) * tablePageSize + 1, totalUsersCount)}–{Math.min(tablePage * tablePageSize, totalUsersCount)} of {totalUsersCount}
          </span>
          <div className="flex gap-2" id="table-pagination">
            <button
              onClick={() => setTablePage(Math.max(1, tablePage - 1))}
              disabled={tablePage === 1}
              className={`px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${tablePage === 1 ? 'opacity-40 cursor-not-allowed' : ''}`}>
              Prev
            </button>
            {Array.from({ length: pagesCount }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setTablePage(p)}
                className={`px-3 py-1 text-xs rounded-lg ${p === tablePage ? 'accent-bg text-white' : 'border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'} transition-colors`}>
                {p}
              </button>
            ))}
            <button
              onClick={() => setTablePage(Math.min(pagesCount, tablePage + 1))}
              disabled={tablePage === pagesCount || pagesCount === 0}
              className={`px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${tablePage === pagesCount || pagesCount === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}>
              Next
            </button>
          </div>
        </div>
      </div>

      {activeModal === 'form-modal' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setActiveModal(null)}></div>
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            <h3 className="font-display font-bold text-base mb-4">Add New User</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name</label>
                <input type="text" placeholder="Jane Smith" className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-transparent focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                <input type="email" placeholder="jane@example.com" className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-transparent focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Role</label>
                <select className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 focus:border-transparent transition-all">
                  <option>Administrator</option><option>Editor</option><option>Viewer</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium">Cancel</button>
              <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 text-sm rounded-xl accent-bg text-white hover:opacity-90 transition-opacity font-medium">Add User</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'confirm-modal' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setActiveModal(null)}></div>
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            <h3 className="font-display font-bold text-base mb-2">Delete User</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium">Cancel</button>
              <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 text-sm rounded-xl bg-red-500 text-white hover:opacity-90 transition-opacity font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
