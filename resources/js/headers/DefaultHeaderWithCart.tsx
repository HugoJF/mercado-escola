import React           from 'react';
import {Back}          from "./partials/Back";
import {HeaderWrapper} from "./partials/HeaderWrapper";
import {Cart}          from "./partials/Cart";

export const DefaultHeaderWithCart: React.FC = () => {
    return <HeaderWrapper>
        <Back/>
        <Cart/>
    </HeaderWrapper>
};
