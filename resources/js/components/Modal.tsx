import React    from "react";
import {Portal} from "./Portal";

export interface ModalProps {
    open: boolean;
    onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({children, open, onClose}) => {
    return <Portal>
        <div
            onClick={onClose}
            className={`transition-all duration-300 ${open ? 'opacity-50 z-20' : 'opacity-0 z-0'} fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 shadow-menu`}
        />

        <div className={`pb-8 z-50 transition-transform duration-500
                transform ${!open && 'translate-y-full'} fixed left-0 bottom-0 right-0 py-2 bg-gray-100`}
        >
            {children}
        </div>
    </Portal>
};
