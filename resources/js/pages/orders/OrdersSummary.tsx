import React           from "react";
import {Link}          from "react-router-dom";
import useRelativePath from "../../hooks/useRelativePath";


export const OrdersSummary: React.FC = ({children}) => {
    const relative = useRelativePath();

    return <>
        <Link to={relative('/carrinho')}>
            Ver pedido
        </Link>
    </>
};
