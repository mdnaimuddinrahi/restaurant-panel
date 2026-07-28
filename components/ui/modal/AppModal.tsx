import { useTheme } from '@/theme';
import { ReactNode, useRef } from 'react'
import AppCustomButton from '../button/AppCustomButton';
import { RxCross1, RxCross2 } from 'react-icons/rx';

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-7xl",
};

interface ModalProps {
    onClose: () => void;
    modalTitle?: string;
    children: ReactNode;
    size?: ModalSize;
}

export default function AppModal({
    children,
    onClose,
    modalTitle,
    size = "md",
}: ModalProps) {
    const {accentColor} = useTheme();
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div id="form-modal" className="fixed inset-0 z-200">
            <div 
                className="modal-backdrop backdrop-blur-sm 
                            absolute inset-0 bg-black/50" 
                onClick={() => onClose()}
            />
            <div className="flex h-full items-center justify-center">
                <div
                    ref={ref}
                    onClick={(e) => e.stopPropagation()}
                    className={`
                        relative
                        w-full
                        ${sizeClasses[size]}
                        rounded-md
                        bg-white
                        dark:bg-slate-800
                        animate-in
                        fade-in
                        zoom-in-95
                        duration-200
                    `}
                >
                    <AppCustomButton
                        variant='ghost'
                        onClick={() => onClose()}
                        className="absolute right-4 top-4 rounded-md px-2 py-2 "
                    >
                        <RxCross1 style={{ color: accentColor }}/>

                    </AppCustomButton>
                    {modalTitle && (
                        <div className="border-b border-slate-300 dark:border-slate-700 px-6 py-4">
                            <h2 className="text-lg">
                                {modalTitle}
                            </h2>
                        </div>
                    )}
                    <div className="max-h-[87vh] overflow-y-auto p-1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
