import {Check, ShoppingBag, User} from "react-feather";
import {Modal, ModalProps}        from "../components/Modal";
import React                      from "react";

interface ShippingOptionActionMenuProps {
    isDelivery: boolean;
    onChange: (isDelivery: boolean) => void;
}

export const ShippingOptionActionMenu: React.FC<ModalProps & ShippingOptionActionMenuProps> = ({open, isDelivery, onClose, onChange}) => {

    return <Modal open={open} onClose={onClose}>
        <h1 className="text-center text-lg font-medium">Selecionar opção</h1>
        <p className="text-center text-gray-500">
            O pedido pode ser entregue ou retirado
        </p>
        <div className="mt-2 border-t border-gray-300">
            <div
                onClick={() => onChange(true)}
                className="flex items-center px-4 py-6 border-b last:border-b-0 border-gray-100"
            >
                <ShoppingBag className="mr-4"/>
                <span className="flex-grow text-lg font-medium">Entregar no endereço</span>
                {isDelivery && <Check size={17} strokeWidth={5} className="text-green-500"/>}
            </div>
            <div
                onClick={() => onChange(false)}
                className="flex items-center px-4 py-6 border-b last:border-b-0 border-gray-100"
            >
                <User className="mr-4"/>
                <span className="flex-grow text-lg font-medium">Retirar pessoalmente</span>
                {!isDelivery && <Check size={17} strokeWidth={5} className="text-green-500"/>}
            </div>
        </div>
        <div className="mt-4 px-2">
            <button
                onClick={onClose}
                className="w-full py-3 text-white text-lg font-medium bg-primary-500"
            >
                Done
            </button>
        </div>
    </Modal>
};
