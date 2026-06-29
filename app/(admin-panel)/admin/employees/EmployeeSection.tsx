"use client";

import { ReactNode, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    id: string;
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

export default function EmployeeSection({
    id,
    title,
    children,
    defaultOpen = true,
}: Props) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <section
            id={id}
            className="scroll-mt-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-300"
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-3 text-left"
                
            >
                <h2 className="text-md font-bold text-gray-700 dark:text-gray-100">{title}</h2>

                <FiChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}