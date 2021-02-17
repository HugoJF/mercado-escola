import React            from "react";
import {OrderStateEnum} from "../../types/orders";

export type OrderStateDescriptionProps = {
    state: OrderStateEnum;
}

export const OrderStateDescriptionMapping: { [state in OrderStateEnum]: string } = {
    [OrderStateEnum.ACCEPTED]: 'Seu pedido foi aceito pela administração e será preparado no final da abertura.',
    [OrderStateEnum.CANCELLED]: 'Seu pedido foi cancelado.',
    [OrderStateEnum.DELIVERED]: 'Seu pedido foi entregue no endereço especificado.' ,
    [OrderStateEnum.PENDING]: 'Seu pedido foi recebido pelo sistema mas ainda não foi confirmado pela administração.',
    [OrderStateEnum.READY]: 'Seu pedido está pronto para ser retirado.',
    [OrderStateEnum.REJECTED]: 'Seu pedido foi rejeitado.',
    [OrderStateEnum.SHIPPING]: 'Seu pedido está sendo entregue no endereço especificado.',

};

export const OrderStateDescription: React.FC<OrderStateDescriptionProps> = ({state}) => {
    return <>{OrderStateDescriptionMapping[state]}</>
};
