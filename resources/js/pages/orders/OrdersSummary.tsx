import React                                                             from "react";
import {useDispatch}                                                     from "react-redux";
import {Dispatch}                                                        from "../../store";
import {FlagAlt, Girl, GlobeAlt, Heart, Mail, Readme, Smartphone, Track} from "../../css.gg";
import {Link, useRouteMatch}                                             from "react-router-dom";
import useRelativePath                                                   from "../../hooks/useRelativePath";

const mainSections = [{
    icon: Girl,
    title: 'Nome',
    sub: 'Maria Casadevall',
    to: 'nome',
}, {
    icon: Mail,
    title: 'Email',
    sub: 'maria.casadevall@gmail.com',
    to: 'email',
}, {
    icon: Track,
    title: 'Endereço principal',
    sub: 'R. Alabama, 222',
    to: 'endereco',
}, {
    icon: Smartphone,
    title: 'Telefone',
    sub: '(67) 9 9821 2015',
    to: 'telefone',
}];

const secondarySections = [{
    icon: GlobeAlt,
    title: 'Avisos',
    to: 'avisos',
}, {
    icon: Readme,
    title: 'Pedidos',
    to: 'pedidos',
}, {
    icon: Heart,
    title: 'Favoritos',
    to: 'favoritos',
}, {
    icon: FlagAlt,
    title: 'Ajuda',
    to: 'ajuda',
}];

export const OrdersSummary: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const match = useRouteMatch();
    const relative = useRelativePath();

    function logout() {
        dispatch.auth.logout();
    }

    return <>
        <Link to={relative('/1')}>
            Ver pedido
        </Link>
    </>
};
