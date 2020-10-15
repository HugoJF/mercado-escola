import React           from 'react';
import {BackAndCart}   from "./partial/BackAndCart";
import {HeaderWrapper} from "./partial/HeaderWrapper";

export const DefaultHeader: React.FC = () => {
    return <HeaderWrapper>
        <BackAndCart/>
    </HeaderWrapper>
};
