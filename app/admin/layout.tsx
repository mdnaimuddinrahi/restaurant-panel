import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen">
      <Navbar />
      <Sidebar />
        <main className="flex-1">
          {children}
        </main>
    </body>
  );
}