"use client"
import AppCustomButton from '@/components/ui/button/AppCustomButton';
import { useLogoutMutation } from '@/features/auth/authApi';
import { useButtonTheme } from '@/hooks/useButtonTheme';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function NavbarAvatarDropDown() {
    const router = useRouter();

    const [logout] = useLogoutMutation();
    const handleLogout = async () => {
        try {
            // some logout endpoints expect a payload; pass an empty object to satisfy the
            // generated typings that require one argument.
            await logout({}).unwrap();

            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("auth");

            // Clear cookie
            document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // Redirect
            router.replace("/admin-login");
        } catch (error) {
            console.error("Logout failed", error);
            const logoutError = error as { status?: number };
            if (logoutError.status === 401) {
                // Token might be invalid or expired, clear local storage and redirect anyway
                localStorage.removeItem("token");
                localStorage.removeItem("auth");
                document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                router.replace("/admin-login");
            }
        }
    };
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const theme = useButtonTheme();

  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
    return (
        <div ref={dropdownRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg pl-1 pr-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
                <div className="w-7 h-7 rounded-full accent-bg flex items-center justify-center text-white text-xs font-700">
                    JD
                </div>

                <span className="hidden text-sm font-500 sm:block">
                John Doe
                </span>

                <svg
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                />
                </svg>
            </button>

            <div
                className={`absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition-all duration-200 dark:border-slate-700 dark:bg-slate-800 ${
                isOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
            >
                <div className="border-b border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-700/50">
                    <p className="text-sm font-600">John Doe</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        john@nexus.io
                    </p>
                </div>

                <div className="p-1">
                    {/* <button
                        type="button"
                        onClick={() => {
                        setIsOpen(false);
                        // router.push("/profile");
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                        View Profile
                    </button> */}
                    <AppCustomButton
                        type="button"
                        variant='ghost'
                        className='flex w-full justify-start gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors'
                        onClick={() => {
                            setIsOpen(false);
                            // router.push("/profile");
                        }}
                    >
                        View Profile
                    </AppCustomButton>
                    <AppCustomButton
                        type="button"
                        variant='ghost'
                        className='flex w-full justify-start gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors'
                        onClick={() => {
                            setIsOpen(false);
                            // router.push("/profile");
                        }}
                    >
                        Settings
                    </AppCustomButton>
                     <AppCustomButton
                        type="button"
                        variant='ghost'
                        className='flex w-full justify-start gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors'
                        onClick={() => {
                            setIsOpen(false);
                            // router.push("/profile");
                        }}
                    >
                        Settings
                    </AppCustomButton>
                    <AppCustomButton
                        type="button"
                        variant='ghost'
                        className='flex w-full justify-start gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors'
                        onClick={() => {
                            setIsOpen(false);
                            // router.push("/profile");
                        }}
                    >
                        Security
                    </AppCustomButton>


                    <div className="my-1 border-t border-slate-100 dark:border-slate-700" />

                    <button
                        type="button"
                        onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )

}
