import React, { ReactNode } from 'react'


interface FormModalProps {
    children: ReactNode;
    onClose: () => void;
    modalTitle: string;
    buttonText?: string;
}

export default function FormModal({
    children,
    onClose,
    modalTitle,
    buttonText,
}: FormModalProps) {
    return (
        <div id="form-modal" className=" fixed inset-0 z-[200] flex items-center justify-center">
            <div className="modal-backdrop absolute inset-0 bg-black/50" onClick={() => onClose()}></div>
            
            <div className="modal-box relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
                <button onClick={() => onClose()} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
                <h3 className="font-display font-700 text-base mb-4">{modalTitle}</h3>
                <form >
                {children}
                <div className="flex gap-2 mt-5">
                    {/* <button onClick={() => onClose()} className="flex-1 px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-500">Cancel</button> */}
                    <button type="submit" className="flex-1 px-4 py-2 text-sm rounded-xl accent-bg text-white hover:opacity-90 transition-opacity font-500">{buttonText}</button>
                </div>
                </form>
            </div>
        </div>
    )
}
