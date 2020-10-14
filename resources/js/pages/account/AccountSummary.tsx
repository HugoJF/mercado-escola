import React                                                                           from "react";
import {ChevronRight, FlagAlt, Girl, GlobeAlt, Heart, Mail, Readme, Smartphone, Track} from "../../css.gg";
import {Link, useRouteMatch}                                                           from "react-router-dom";
import {Box}                                                                           from "../../components/Box";
import {DivOrLink}                                                                     from "../../components/DivOrLink";

const mainSections = [{
    icon: Girl,
    title: 'Nome',
    sub: 'Maria Casadevall',
    to: 'nome',
    clickable: false,
}, {
    icon: Mail,
    title: 'Email',
    sub: 'maria.casadevall@gmail.com',
    to: 'email',
    clickable: false,
}, {
    icon: Track,
    title: 'Endereço principal',
    sub: 'R. Alabama, 222',
    to: 'endereco',
    clickable: true,
}, {
    icon: Smartphone,
    title: 'Telefone',
    sub: '(67) 9 9821 2015',
    to: 'telefone',
    clickable: true,
}];

const secondarySections = [{
    icon: GlobeAlt,
    title: 'Avisos',
    to: 'avisos',
    clickable: true,
}, {
    icon: Readme,
    title: 'Pedidos',
    to: 'pedidos',
    clickable: true,
}, {
    icon: Heart,
    title: 'Favoritos',
    to: 'favoritos',
    clickable: true,
}, {
    icon: FlagAlt,
    title: 'Ajuda',
    to: 'ajuda',
    clickable: true,
}];


export const AccountSummary: React.FC = ({children}) => {
    const match = useRouteMatch();

    return <>
        <h1 className="text-3xl text-center font-medium">Conta</h1>

        <h2 className="text-2xl">Informações</h2>

        <div className="my-8">
            {mainSections.map(({icon: Icon, title, sub, to, clickable}) => (
                <DivOrLink isLink={clickable} to={`${match.url}/${to}`} className="transition-colors duration-150 w-full px-4 py-3 flex items-center hover:bg-gray-200 border-b last:border-b-0 border-gray-200 cursor-pointer">
                    <div className="flex items-center justify-center w-6 mr-4">
                        <Icon className="text-primary-500"/>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-lg font-medium">{title}</h3>
                        <p className="text-gray-500 font-thin">{sub}</p>
                    </div>
                    {clickable && <ChevronRight className="text-gray-500"/>}
                </DivOrLink>
            ))}
        </div>

        <h2 className="text-2xl">Mais</h2>

        <div className="my-8">
            {secondarySections.map(({icon: Icon, title, to, clickable}) => (
                <Link to={`${match.url}/${to}`}>
                    <Box>
                        <div className="flex items-center justify-center w-6 mr-4">
                            <Icon className="text-primary-500"/>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg text-gray-500">{title}</h3>
                        </div>
                        {clickable && <ChevronRight className="text-gray-500"/>}
                    </Box>
                </Link>
            ))}
        </div>
    </>
};
