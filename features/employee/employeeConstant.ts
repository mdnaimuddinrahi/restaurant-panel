import { TableColumn } from "@/store/commonInterface";
import { EmployeeTableHead } from "./employeeInterface";


export const EMPLOYEE_COLUMNS: TableColumn<EmployeeTableHead>[] = [
    { isSort:true, key: "name", label: "Name"},
    { isSort:true, key: "email", label: "Email"},
    { isSort:true, key: "role", label: "Role"},
    { isSort:true, key: "status", label: "Status"},
    { isSort:true, key: "joined", label: "Joined"},
]

export const USER_DATA = [
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


      
  // const sortTable = (column: string) => {
  //   setSortState(prev => {
  //     if (prev.col === column) {
  //       return {
  //         col: column as keyof User,
  //         dir: prev.dir === "asc" ? "desc" : "asc",
  //       };
  //     }

  //     return {
  //       col: column as keyof User,
  //       dir: "asc",
  //     };
  //   });
  // }

  // const statusBadge = (s: string) => {
  //     const map: Record<string, string> = {
  //       Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  //       Inactive: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
  //       Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
  //     };
  //     return <span className={`badge ${map[s] || ''}`}>{s}</span>;
  //   };
  
  //   const roleBadge = (r: string) => {
  //     const map: Record<string, string> = {
  //       Admin: 'accent-subtle-bg accent-text',
  //       Editor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  //       Viewer: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
  //     };
  //     return <span className={`badge ${map[r] || ''}`}>{r}</span>;
  //   };
  
  //   const initials = (n: string) => n.split(' ').map(p => p[0]).join('');
  //   const colors = ['#6366f1', '#8b5cf6', '#10b981', '#f97316', '#ec4899', '#3b82f6'];

  //   const [activeModal, setActiveModal] = useState<string | null>(null);
  //   const showModal = (id: string) => {
  //     setActiveModal(id);
  //   }
  //   const options = [
  //       { value: "chocolate", label: "Chocolate" },
  //       { value: "strawberry", label: "Strawberry" },
  //       { value: "vanilla", label: "Vanilla" },
  //     ];

  //     const [selected, setSelected] = useState(null);
  //   const roles = [
  //     { value: "", label: "All Roles" },
  //     { value: "Admin", label: "Admin" },
  //     { value: "Editor", label: "Editor" },
  //     { value: "Viewer", label: "Viewer" },
  //   ];

      // useEffect(() => {
      //     refreshUserTable();
      // }, [tableSearch, tableFilter, tablePage, sortState]);
  
      // const refreshUserTable = () => {
      //     let data = [...usersData];
      
      //     // Search filter
      //     const q = tableSearch.toLowerCase();
      //     data = data.filter(u => {
      //       const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      //       const matchFilter = !tableFilter || u.role === tableFilter;
      //       return matchSearch && matchFilter;
      //     });
      
      //     // Sorting
      //     if (sortState.col) {
      //       data.sort((a, b) => {
      //         const va = String(a[sortState.col as keyof User]);
      //         const vb = String(b[sortState.col as keyof User]);
      //         return sortState.dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      //       });
      //     }
      
      //     const total = data.length;
      //     const pages = Math.ceil(total / tablePageSize);
      
      //     // Adjust page if current page exceeds total pages
      //     let currentPage = tablePage;
      //     if (currentPage > pages && pages > 0) {
      //       currentPage = 1;
      //       setTablePage(1);
      //     }
      
      //     const slice = data.slice((currentPage - 1) * tablePageSize, currentPage * tablePageSize);
      
      //     setUsers(slice);
      //     setTotalUsersCount(total);
      //     setPagesCount(pages);
      //   }
  