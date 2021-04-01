import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {Box} from "../../components/ui/Box";
import {DivOrLink} from "../../components/ui/DivOrLink";
import {
    AlertCircle,
    Book,
    ChevronRight,
    Flag,
    Heart,
    LogOut,
    Mail,
    MapPin,
    ShoppingCart,
    Smartphone,
    User
} from "react-feather";
import {useAuth} from "../../selectors";
import {Title} from "../../components/ui/Title";
import clsx from 'clsx';
import {Skeleton} from "../../components/ui/Skeleton";
import {PagePadding} from "../../containers/PagePadding";

export const AccountIndex: React.FC = () => {
    const match = useRouteMatch();
    const auth = useAuth();

    const mainSections = [
        {
            icon: User,
            title: 'Nome',
            sub: auth.me?.name,
            to: 'nome',
            clickable: false,
        }, {
            icon: Mail,
            title: 'Email',
            sub: auth.me?.email,
            to: 'email',
            clickable: false,
        }, {
            icon: Smartphone,
            title: 'Telefone',
            sub: auth.me?.phone,
            hideSub: !auth.me?.phone,
            to: 'telefone',
            clickable: true,
        }, {
            icon: MapPin,
            title: 'Endereços',
            sub: null,
            hideSub: true,
            to: 'endereco',
            clickable: true,
        }
    ];

    const secondarySections = [
        {
            icon: AlertCircle,
            title: 'Avisos',
            to: 'avisos',
            clickable: true,
        }, {
            icon: ShoppingCart,
            title: 'Carrinho',
            to: 'carrinho',
            clickable: true,
        }, {
            icon: Book,
            title: 'Pedidos',
            to: 'pedidos',
            clickable: true,
        }, {
            icon: Heart,
            title: 'Favoritos',
            to: 'favoritos',
            clickable: true,
        }, {
            icon: Flag,
            title: 'Ajuda',
            to: 'ajuda',
            clickable: true,
        }, {
            icon: LogOut,
            title: 'Sair',
            to: 'conta/sair',
            clickable: true,
        }
    ];

    return <PagePadding>
        <Title>Conta</Title>

        <div className="mb-8 divide-y divide-gray-200">
            {mainSections.map(({icon: Icon, title, sub, hideSub, to, clickable}) => (
                <DivOrLink
                    key={to}
                    isLink={clickable}
                    to={`${match.url}/${to}`}
                    className={clsx(
                        'transition-colors duration-150 w-full flex items-center', {
                            'hover:bg-gray-200 cursor-pointer': clickable
                        }
                    )}
                >
                    <Box hoverable={clickable} key={to}>
                        <div className="flex items-center justify-center w-6 mr-4">
                            <Icon className="text-primary-500"/>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg text-gray-900 font-medium">{title}</h3>
                            {!hideSub &&
                            <p className="text-gray-500 font-light">{sub || <Skeleton className="w-3/4"/>}</p>}
                        </div>
                        {clickable && <ChevronRight className="flex-shrink-0 text-gray-500"/>}
                    </Box>
                </DivOrLink>
            ))}
        </div>

        <Title>Mais</Title>

        <div className="mt-8 divide-y divide-gray-200">
            {secondarySections.map(({icon: Icon, title, to, clickable}) => (
                <Link key={to} className="block" to={`/${to}`}>
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
    </PagePadding>
};
