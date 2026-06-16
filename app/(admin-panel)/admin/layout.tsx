import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Sidebar />
      {/* <main className="flex-1">
        {children}
      </main> */}
      <main id="main-content" className="mt-14 min-h-screen p-6 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
        <div id="page-outlet">
          {children}
        </div>
      </main>
    </>
  );
}