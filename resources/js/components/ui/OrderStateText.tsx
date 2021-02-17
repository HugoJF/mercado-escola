import React            from "react";
import {OrderStateEnum} from "../../types/orders";

export type OrderStateTextProps = {
    state: OrderStateEnum;
}

export const OrderStateTextMapping: { [state in OrderStateEnum]: string } = {
    [OrderStateEnum.ACCEPTED]: 'Aceito',
    [OrderStateEnum.CANCELLED]: 'Cancelado',
    [OrderStateEnum.DELIVERED]: 'Entregue',
    [OrderStateEnum.PENDING]: 'Pendente',
    [OrderStateEnum.READY]: 'Pronto',
    [OrderStateEnum.REJECTED]: 'Rejeitado',
    [OrderStateEnum.SHIPPING]: 'Entregando',

};

export const OrderStateText: React.FC<OrderStateTextProps> = ({state}) => {
    return <>{OrderStateTextMapping[state]}</>
};
