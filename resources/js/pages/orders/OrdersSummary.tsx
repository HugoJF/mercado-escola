import React           from "react";
import {Link}          from "react-router-dom";
import useRelativePath from "../../hooks/useRelativePath";

// TODO: check usage and delete
export const OrdersSummary: React.FC = () => {
    const relative = useRelativePath();

    return <>
        <Link to={relative('/carrinho')}>
            Ver pedido
        </Link>
    </>
};
