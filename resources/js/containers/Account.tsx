import React                                                                           from "react";
import {useDispatch}                                                                   from "react-redux";
import {Dispatch}                                                                      from "../store";
import {ChevronRight, FlagAlt, Girl, GlobeAlt, Heart, Mail, Readme, Smartphone, Track} from "../css.gg";
import {Link, useRouteMatch}                                                           from "react-router-dom";

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

export const Account: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const match = useRouteMatch();

    function logout() {
        dispatch.auth.logout();
    }

    return <>
        <h1 className="text-3xl text-center font-medium">Conta</h1>

        <h2 className="text-2xl">Informações</h2>

        <div className="my-8">
            {mainSections.map(({icon: Icon, title, sub, to}) => (
                <Link to={`${match.url}/${to}`} className="transition-colors duration-150 w-full px-4 py-3 flex items-center hover:bg-gray-200 border-b last:border-b-0 border-gray-200 cursor-pointer">
                    <div className="flex items-center justify-center w-6 mr-4">
                        <Icon className="text-primary-500"/>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-lg font-medium">{title}</h3>
                        <p className="text-gray-500 font-thin">{sub}</p>
                    </div>
                    <ChevronRight className="text-gray-500"/>
                </Link>
            ))}
        </div>

        <h2 className="text-2xl">Mais</h2>

        <div className="my-8">
            {secondarySections.map(({icon: Icon, title, to}) => (
                <Link to={`${match.url}/${to}`} className="transition-colors duration-150 w-full px-4 py-5 flex items-center hover:bg-gray-200 border-b last:border-b-0 border-gray-200 cursor-pointer">
                    <div className="flex items-center justify-center w-6 mr-4">
                        <Icon className="text-primary-500"/>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-lg text-gray-500">{title}</h3>
                    </div>
                    <ChevronRight className="text-gray-500"/>
                </Link>
            ))}
        </div>
    </>
};
