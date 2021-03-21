import {Modal, ModalProps}            from "../components/ui/Modal";
import React, {useEffect, useState}   from "react";
import {Button}                       from "../components/ui/Button";
import {OrderStateEnum}               from "../types/orders";
import {OrderStateTextMapping}        from "../components/ui/OrderStateText";
import {OrderStateDescriptionMapping} from "../components/ui/OrderStateDescription";

export type OrderStatusActionMenuProps = {
    state: OrderStateEnum;
    onUpdate: (status: OrderStateEnum) => void;
}

export const OrderStatusActionMenu: React.FC<ModalProps & OrderStatusActionMenuProps> = ({open, state, onClose, onUpdate}) => {
    const [newState, setNewState] = useState<OrderStateEnum>(state);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setNewState(state);
    }, [state]);

    async function handleClick() {
        setLoading(true);
        await onUpdate(newState);
        setLoading(false);

        if (onClose) {
            onClose();
        }
    }

    return <Modal open={open} onClose={onClose}>
        {/* Header */}
        <h1 className="text-center text-lg font-medium">Atualizar pedido</h1>
        <p className="text-center text-gray-500">
            Atualização do estado do pedido
        </p>

        <div className="my-4 px-2">
            <select
                className="px-3 py-3 w-full rounded-lg"
                value={newState}
                onChange={event => setNewState(event.currentTarget.value as OrderStateEnum)}
            >
                {Object.keys(OrderStateEnum).map(s => (
                    <option value={s}>
                        {OrderStateTextMapping[s as OrderStateEnum]}
                        {' - '}
                        {OrderStateDescriptionMapping[s as OrderStateEnum]}
                    </option>
                ))}
            </select>
        </div>

        {/* Close button */}
        <div className="px-2 grid grid-cols-1">
            <Button loading={loading} onClick={handleClick}>
                Atualizar
            </Button>
        </div>
    </Modal>
};
