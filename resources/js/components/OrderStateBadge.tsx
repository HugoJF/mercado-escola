import React                from "react";
import {OrderStateEnum}     from "../models/orders";
import {Badge, BadgeColors} from "./Badge";
import {OrderStateText}     from "./OrderStateText";

export type OrderStateTextProps = {
    state: OrderStateEnum;
}

export const OrderStateColorMapping: { [state in OrderStateEnum]: BadgeColors } = {
    [OrderStateEnum.ACCEPTED]: 'info',
    [OrderStateEnum.CANCELLED]: 'warning',
    [OrderStateEnum.DELIVERED]: 'primary',
    [OrderStateEnum.PENDING]: 'warning',
    [OrderStateEnum.READY]: 'info',
    [OrderStateEnum.REJECTED]: 'danger',
    [OrderStateEnum.SHIPPING]: 'info',

};

export const OrderStateBadge: React.FC<OrderStateTextProps> = ({state}) => {
    return <Badge color={OrderStateColorMapping[state]}>
        <OrderStateText state={state}/>
    </Badge>
};
