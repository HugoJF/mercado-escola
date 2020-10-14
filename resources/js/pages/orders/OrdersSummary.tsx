import React                                                            from "react";
import {useDispatch}                                                    from "react-redux";
import {Dispatch}                                                       from "../../store";
import {Link, useRouteMatch}                                            from "react-router-dom";
import useRelativePath                                                  from "../../hooks/useRelativePath";
import {AlertCircle, Book, Flag, Heart, Mail, MapPin, Smartphone, User} from "react-feather";

const mainSections = [{
    icon: User,
    title: 'Nome',
    sub: 'Maria Casadevall',
    to: 'nome',
}, {
    icon: Mail,
    title: 'Email',
    sub: 'maria.casadevall@gmail.com',
    to: 'email',
}, {
    icon: MapPin,
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
    icon: AlertCircle,
    title: 'Avisos',
    to: 'avisos',
}, {
    icon: Book,
    title: 'Pedidos',
    to: 'pedidos',
}, {
    icon: Heart,
    title: 'Favoritos',
    to: 'favoritos',
}, {
    icon: Flag,
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
