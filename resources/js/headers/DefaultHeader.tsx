import React from 'react';
import {Back} from "./partials/Back";
import {HeaderWrapper} from "./partials/HeaderWrapper";

export const DefaultHeader: React.FC = () => {
    return <HeaderWrapper>
        <Back/>
    </HeaderWrapper>
};
