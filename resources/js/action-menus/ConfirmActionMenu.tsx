import {Modal, ModalProps} from "@components/ui/Modal";
import React, {ReactNode} from "react";
import {Button} from "@components/ui/Button";

export type ConfirmActionMenuProps = {
    title: string | ReactNode;
    description?: string | ReactNode;
    action: string | ReactNode;
    onClick: (confirmed: boolean) => void;
}

export const ConfirmActionMenu: React.FC<ModalProps & ConfirmActionMenuProps> = ({open, title, description, action, onClose, onClick}) => {
    return <Modal open={open} onClose={onClose}>
        {/* Header */}
        <h1 className="px-2 text-center text-lg font-medium">
            {title}
        </h1>
        {description && <p className="px-4 text-center text-gray-500">
            {description}
        </p>}

        {/* Actions button */}
        <div className="grid grid-cols-2 gap-4 mt-4 px-4">
            <Button
                onClick={() => {
                    onClick(true);
                    onClose && onClose()
                }}
                color="danger"
            >
                {action}
            </Button>

            <Button
                onClick={() => {
                    onClick(false);
                    onClose && onClose()
                }}
                color="default"
                outline
            >
                Cancelar
            </Button>
        </div>
    </Modal>
};
