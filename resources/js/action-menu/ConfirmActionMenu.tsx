import {Modal, ModalProps} from "../components/ui/Modal";
import React               from "react";
import {Button}            from "../components/ui/Button";

interface ConfirmActionMenuProps {
    title: string;
    description?: string;
    action: string;
    onClick: (confirmed: boolean) => void;
}

export const ConfirmActionMenu: React.FC<ModalProps & ConfirmActionMenuProps> = ({open, title, description, action, onClose, onClick}) => {
    return <Modal open={open} onClose={onClose}>
        {/* Header */}
        <h1 className="text-center text-lg font-medium">
            {title}
        </h1>
        {description &&<p className="text-center text-gray-500">
            {description}
        </p>}

        {/* Actions button */}
        <div className="mt-4 px-4 space-y-4">
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
