import {Modal, ModalProps} from "../components/Modal";
import React, {useState}   from "react";

export type AddressStreetNumberActionMenuType = {
    address: string;
    onNumber: (number: number) => void;
    number: number|null;
}

export const AddressStreetNumberActionMenu: React.FC<ModalProps & AddressStreetNumberActionMenuType> =
    ({onNumber, number,address, open, onClose}) => {
        return <Modal open={open} onClose={onClose}>
            <h1 className="text-center text-lg font-medium">Qual o número do endereço?</h1>
            <p className="mb-4 text-center text-gray-500">
                {address}
            </p>
            <div className="block border-b border-gray-300"/>
            <div className="flex justify-center my-2">
                <input
                    value={number || ''}
                    onChange={e => onNumber(parseInt(e.currentTarget.value))}
                    className="inline-block py-2 w-1/2 text-center text-xl bg-white rounded tracking-wide"
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
