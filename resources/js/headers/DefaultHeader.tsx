import React           from 'react';
import {BackAndCart}   from "./partials/BackAndCart";
import {HeaderWrapper} from "./partials/HeaderWrapper";

export const DefaultHeader: React.FC = () => {
    return <HeaderWrapper>
        <BackAndCart/>
    </HeaderWrapper>
};
