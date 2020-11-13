import {Modal, ModalProps} from "../components/Modal";
import React               from "react";
import {Skeleton}          from "../components/ui/Skeleton";

export type AddressStreetNumberActionMenuType = {
    address: string;
    onNumber: (number: number) => void;
    number: number | null;
}

export const AddressStreetNumberActionMenu: React.FC<ModalProps & AddressStreetNumberActionMenuType> =
    ({onNumber, number, address, open, onClose}) => {
        return <Modal open={open} onClose={onClose}>
            <h1 className="text-center text-lg font-medium">Qual o número do endereço?</h1>
            <p className="mb-4 text-center text-gray-500">
                {address || <Skeleton className="w-1/2"/> }
            </p>
            <div className="block border-b border-gray-300"/>
            <div className="flex justify-center my-2">
                <input
                    value={number || ''}
                    onChange={e => onNumber(parseInt(e.currentTarget.value))}
                    className="inline-block py-2 w-1/2 text-center text-xl font-mono font-medium border rounded tracking-wide"
                    type="number"
                />
            </div>
            <div className="px-2">
                <button
                    onClick={onClose}
                    className="w-full py-3 text-white text-lg font-medium bg-primary-500"
                >
                    Continuar
                </button>
            </div>
        </Modal>
    };
