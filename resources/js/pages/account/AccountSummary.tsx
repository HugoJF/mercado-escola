import React, {useEffect}                                                                     from "react";
import {Link, useRouteMatch}                                                                  from "react-router-dom";
import {Box}                                                                                  from "../../components/ui/Box";
import {DivOrLink}                                                                            from "../../components/DivOrLink";
import {AlertCircle, Book, ChevronRight, Flag, Heart, LogOut, Mail, MapPin, Smartphone, User} from "react-feather";
import {useAddresses, useAuth}                                                                from "../../selectors";
import {useDispatch}                                                                          from "react-redux";
import {Dispatch}                                                                             from "../../store";
import {Title}                                                                                from "../../components/ui/Title";
import classNames                                                                             from 'classnames';
import {Skeleton}                                                                             from "../../components/ui/Skeleton";

export const AccountSummary: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const addresses = useAddresses();
    const match = useRouteMatch();
    const auth = useAuth();

    useEffect(() => {
        dispatch.addresses.index();
    }, []);

    const mainAddressId = auth.me?.main_address_id;
    const mainAddress = mainAddressId && addresses.addresses[mainAddressId];

    const mainSections = [{
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
        title: 'Endereço principal',
        sub: mainAddress ? mainAddress.address : null,
        hideSub: !mainAddressId,
        to: 'endereco',
        clickable: true,
    }];

    const secondarySections = [{
        icon: AlertCircle,
        title: 'Avisos',
        to: 'avisos',
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
        to: 'sair',
        clickable: true,
    }];

    return <div className="mx-auto container">
        <Title>Conta</Title>

        <div className="mb-8">
            {mainSections.map(({icon: Icon, title, sub, hideSub, to, clickable}) => (
                <DivOrLink
                    key={to}
                    isLink={clickable}
                    to={`${match.url}/${to}`}
                    className={classNames(
                        `transition-colors duration-150 w-full px-4 py-3 flex items-center
                        border-b last:border-b-0 border-gray-200`,
                        {
                            'hover:bg-gray-200 cursor-pointer': clickable
                        }
                    )}
                >
                    <div className="flex items-center justify-center w-6 mr-4">
                        <Icon className="text-primary-500"/>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-lg font-medium">{title}</h3>
                        {!hideSub && <p className="text-gray-500 font-thin">{sub || <Skeleton className="w-3/4"/>}</p>}
                    </div>
                    {clickable && <ChevronRight className="flex-shrink-0 text-gray-500"/>}
                </DivOrLink>
            ))}
        </div>

        <h2 className="text-2xl">Mais</h2>

        <div className="mt-8">
            {secondarySections.map(({icon: Icon, title, to, clickable}) => (
                <Link to={`${match.url}/${to}`}>
                    <Box key={to}>
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
    </div>
};
