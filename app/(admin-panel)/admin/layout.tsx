"use client"
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar/Sidebar";
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
      <main id="main-content" className="mt-14 min-h-screen pt-2 pl-6 pr-3">
        <div id="page-outlet">
          {children}
           <ToastContainer position="top-center"  theme={isDark ? "dark" : "light"}/>
        </div>
      </main>
    </>
  );
}