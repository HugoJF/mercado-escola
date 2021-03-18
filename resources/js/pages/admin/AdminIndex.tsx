import React                                              from "react";
import {Title}                                            from "../../components/ui/Title";
import {Calendar, ChevronRight, Icon, ShoppingBag, Users} from "react-feather";
import {PagePadding}                                      from "../../containers/PagePadding";
import {Box}                                              from "../../components/ui/Box";
import useNavigation                                      from "../../hooks/useNavigation";

type ButtonProps = {
    title: string;
    icon: Icon;
    to: string;
}

const buttons: ButtonProps[] = [{
    title: 'Produtos',
    icon: ShoppingBag,
    to: './produtos',
}, {
    title: 'Produtores',
    icon: Users,
    to: './produtores',
}, {
    title: 'Aberturas',
    icon: Calendar,
    to: './aberturas',
}, {
    title: 'Usuários',
    icon: Users,
    to: './usuarios',
}];

export const AdminIndex: React.FC = () => {
    const {bindGo} = useNavigation();

    return <PagePadding>
        <div className="mx-auto container">
            <Title>Administrativo</Title>

            <div className="mt-4 divide-y divide-gray-200">
                {buttons.map(({icon: Icon, title, to}) => (
                    <Box
                        onClick={bindGo(to)}
                    >
                        {/* Icon */}
                        <div className="flex items-center justify-center w-6 mr-4">
                            <Icon className="text-primary-500"/>
                        </div>

                        {/* Title */}
                        <div className="flex-grow">
                            <h3 className="text-lg font-medium">{title}</h3>
                        </div>

                        {/* Indicator */}
                        <ChevronRight className="flex-shrink-0 text-gray-500"/>
                    </Box>
                ))}
            </div>
        </div>
    </PagePadding>
};
