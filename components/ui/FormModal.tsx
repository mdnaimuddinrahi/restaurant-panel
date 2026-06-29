import { MODAL_SIZE_CLASS } from '@/store/commonConstants';
import React, { ReactNode } from 'react'
import { GiCrossedSabres, GiTireIronCross } from 'react-icons/gi';
import AppCustomButton from './button/AppCustomButton';
import { useTheme } from '@/theme';
import { RxCross2 } from 'react-icons/rx';

interface FormModalProps { 
    children: ReactNode; 
    modalTitle: string; 
    buttonText: string; 
    onClose: () => void; 
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void; 
    size?: "sm" | "md" | "lg" | "xl" | "full"; 
    isSubmitting?: boolean; 
} 

export default function FormModal({
    children,
    onClose,
    modalTitle,
    size = "xl", 
}: FormModalProps) {
    const sizeClass = MODAL_SIZE_CLASS;
    const {accentColor} = useTheme();

    return (
        <div id="form-modal" className=" fixed inset-0 z-200 flex items-center justify-center">
            {/* BackDrop */}
            <div className="modal-backdrop backdrop-blur-xs absolute inset-0 bg-black/50" onClick={() => onClose()}></div>
            {/* Modal */}
            <div className={`modal-box relative
                         bg-white dark:bg-slate-800 
                            rounded-lg shadow-2xl p-4
                             w-full mx-4 ${sizeClass[size]} overflow-hidden`}>
                <AppCustomButton 
                    variant='ghost'
                    onClick={() => onClose()} 
                    className="absolute top-4 right-4 w-8 h-8 
                                flex items-center justify-center">
                    <RxCross2  style={{ color: accentColor }}/>


                </AppCustomButton>
                <h3 
                    className="font-display font-700 
                                text-base mb-4 text-center">
                    {modalTitle}
                </h3>
                {children}
            </div>
        </div>
    )
}
