import { createContext, useState } from "react";

type ModalContextType = {
    activeModal: string | null;
    showModal: (id: string) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [activeModal, setActiveModal] =
        useState<string | null>(null);

    const showModal = (id: string) => {
        setActiveModal(id);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    return (
        <ModalContext.Provider
            value={{
                activeModal,
                showModal,
                closeModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

