import React                from "react";
import {AddressType}        from "../../types/addresses";
import {X}                  from "react-feather";
import {Box}                from "../ui/Box";
import {HeightTransitioner} from "../ui/HeightTransitioner";

export type AddressListProps = {
    addresses: AddressType[];
    loading?: boolean;
    onClick?: (address: AddressType) => void;
    onContext?: (address: AddressType) => void;
    contextIcon?: React.FC;
}

export const AddressList: React.FC<AddressListProps> = (
    {
        addresses,
        onClick,
        onContext,
        contextIcon: ContextIcon = X,
    }
) => {
    function handleOnClick(address: AddressType, e: React.MouseEvent<HTMLDivElement>) {
        if (onClick) {
            onClick(address);
        }
    }

    function handleOnContext(address: AddressType, e: React.MouseEvent<SVGElement>) {
        if (onContext) {
            e.stopPropagation();
            onContext(address)
        }
    }

    return <div className="divide-y divide-gray-200">
        {addresses.map(address => (
            <HeightTransitioner
                key={address.id}
            >
                <Box
                    onClick={handleOnClick.bind(this, address)}
                    hoverable={!!onClick}
                >
                    {/* Address information */}
                    <div className="flex-grow">
                        <h2 className="text-sm">
                            {address.address}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {
                                [address.number, address.complement].filter(i => !!i).join(' - ')
                            }
                        </p>
                    </div>

                    {/* Icon */}
                    {ContextIcon && <ContextIcon
                        className="ml-4 flex-shrink-0 text-gray-500"
                        onClick={handleOnContext.bind(this, address)}
                    />}
                </Box>
            </HeightTransitioner>
        ))}
    </div>
};
