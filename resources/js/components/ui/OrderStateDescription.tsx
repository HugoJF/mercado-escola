import React            from "react";
import {OrderStateEnum} from "../../types/orders";

export type OrderStateDescriptionProps = {
    state: OrderStateEnum;
}

export const OrderStateDescriptionMapping: { [state in OrderStateEnum]: string } = {
    [OrderStateEnum.ACCEPTED]: 'O pedido foi aceito pela administração e será preparado no final da abertura.',
    [OrderStateEnum.CANCELLED]: 'O pedido foi cancelado.',
    [OrderStateEnum.DELIVERED]: 'O pedido foi entregue no endereço especificado.' ,
    [OrderStateEnum.PENDING]: 'O pedido foi recebido pelo sistema mas ainda não foi confirmado pela administração.',
    [OrderStateEnum.READY]: 'O pedido está pronto para ser retirado.',
    [OrderStateEnum.REJECTED]: 'O pedido foi rejeitado.',
    [OrderStateEnum.SHIPPING]: 'O pedido está sendo entregue no endereço especificado.',

};

export const OrderStateDescription: React.FC<OrderStateDescriptionProps> = ({state}) => {
    return <>{OrderStateDescriptionMapping[state]}</>
};
