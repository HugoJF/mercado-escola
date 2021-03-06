import React    from "react";
import {Portal} from "./Portal";
import clsx     from 'clsx';

export type ModalProps = {
    className?: string;
    open: boolean;
    onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({className = '', children, open, onClose}) => {
    return <Portal>
        <div className={clsx(
            className,
            'pb-8 transition-transform duration-500',
            'transform fixed left-0 bottom-0 right-0 py-2 bg-gray-100 z-50', {
                'translate-y-full': !open
            }
        )}
        >
            {children}
        </div>

        <div
            onClick={onClose}
            className={clsx(
                'transition-all duration-300 fixed top-0 bottom-0 left-0 right-0',
                'bg-black bg-opacity-75 shadow-menu', {
                    'opacity-50 z-40': open,
                    'opacity-0 z-0': !open,
                }
            )}
        />
    </Portal>
};
