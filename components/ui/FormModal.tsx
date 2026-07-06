"use client";

import {
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-7xl",
};

export default function FormModal({
  open,
  onClose,
  title,
  children,
  size = "md",
  closeOnBackdrop = true,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999">

      <div
        onClick={() => closeOnBackdrop && onClose()}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="flex h-full items-center justify-center p-4">

        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          className={`
            relative
            w-full
            ${sizeClasses[size]}
            rounded-xl
            bg-white
            dark:bg-slate-800
            shadow-2xl
            animate-in
            fade-in
            zoom-in-95
            duration-200
          `}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <RxCross2 size={20} />
          </button>

          {title && (
            <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4">
              <h2 className="text-lg font-semibold">
                {title}
              </h2>
            </div>
          )}

          <div className="max-h-[80vh] overflow-y-auto p-6">
            {children}
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
// import { MODAL_SIZE_CLASS } from '@/store/commonConstants';
// import React, { ReactNode } from 'react'
// import { GiCrossedSabres, GiTireIronCross } from 'react-icons/gi';
// import AppCustomButton from './button/AppCustomButton';
// import { useTheme } from '@/theme';
// import { RxCross2 } from 'react-icons/rx';

// interface FormModalProps { 
//     children: ReactNode; 
//     modalTitle: string; 
//     buttonText: string; 
//     onClose: () => void; 
//     onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void; 
//     size?: "sm" | "md" | "lg" | "xl" | "full"; 
//     isSubmitting?: boolean; 
// } 

// export default function FormModal({
//     children,
//     onClose,
//     modalTitle,
//     size = "xl", 
// }: FormModalProps) {
//     const sizeClass = MODAL_SIZE_CLASS;
//     const {accentColor} = useTheme();

//     return (
//         <div id="form-modal" className=" fixed inset-0 z-200 flex items-center justify-center">
//             {/* BackDrop */}
//             <div className="modal-backdrop backdrop-blur-xs absolute inset-0 bg-black/50" onClick={() => onClose()}></div>
//             {/* Modal */}
//             <div className={`modal-box relative
//                          bg-white dark:bg-slate-800 
//                             rounded-lg shadow-2xl p-4
//                              w-full mx-4 ${sizeClass[size]} overflow-hidden`}>
//                 <AppCustomButton 
//                     variant='ghost'
//                     onClick={() => onClose()} 
//                     className="absolute top-4 right-4 w-8 h-8 
//                                 flex items-center justify-center">
//                     <RxCross2  style={{ color: accentColor }}/>


//                 </AppCustomButton>
//                 <h3 
//                     className="font-display font-700 
//                                 text-base mb-4 text-center">
//                     {modalTitle}
//                 </h3>
//                 {children}
//             </div>
//         </div>
//     )
// }
