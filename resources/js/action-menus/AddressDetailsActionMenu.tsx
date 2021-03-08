import {Modal, ModalProps} from "../components/ui/Modal";
import React               from "react";
import {Skeleton}          from "../components/ui/Skeleton";
import {Button}            from "../components/ui/Button";

export type getSuggestionItemPropsActionMenuProps = {
    address: string;
    onNumber: (number: number) => void;
    onComplement: (complement: string) => void;
    number: number | null;
    complement: string|null;
}

export const AddressDetailsActionMenu: React.FC<ModalProps & getSuggestionItemPropsActionMenuProps> =
    ({onNumber, onComplement, number, complement, address, open, onClose}) => {
        return <Modal open={open} onClose={onClose}>
            <h1 className="px-2 text-center text-lg font-medium">Qual o número e complemento do endereço?</h1>
            <p className="px-2 mb-4 text-base text-center text-gray-500">
                {address || <Skeleton className="w-1/2"/>}
            </p>
            <div className="block border-b border-gray-300"/>
            <div className="flex flex-col items-center px-3 my-2 space-y-4">
                <input
                    value={number || ''}
                    onChange={e => onNumber(parseInt(e.currentTarget.value))}
                    className="inline-block py-2 w-1/2 text-center text-xl font-medium border rounded tracking-wide"
                    placeholder="Número"
                    type="number"
                />
                <textarea
                    value={complement || ''}
                    onChange={e => onComplement(e.currentTarget.value)}
                    className="inline-block py-2 w-2/3 text-center text-base font-medium border rounded tracking-wide"
                    placeholder="Complemento"
                />
            </div>
            <div className="px-2">
                <Button enabled={!!number} onClick={onClose}>
                    Continuar
                </Button>
            </div>
        </Modal>
    };
