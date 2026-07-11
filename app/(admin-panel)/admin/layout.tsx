"use client"
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import "./admin.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(localStorage.getItem("darkMode") === "true");
  }, []);
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
           <ToastContainer position="top-center"  theme={isDark ? "dark" : "light"}/>
        </div>
      </main>
    </>
  );
}