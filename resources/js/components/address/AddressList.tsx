import React                               from "react";
import {AddressType}                       from "../../models/addresses";
import {CheckSquare, ChevronRight, Square} from "react-feather";
import {Box}                               from "../ui/Box";
import {Skeleton}                          from "../ui/Skeleton";

interface AddressListParameters {
    addresses: AddressType[];
    selected?: number;
    loading?: boolean;
    onClick?: (address: AddressType) => void;
}

export const AddressList: React.FC<AddressListParameters> = ({selected, onClick, loading = false, addresses}) => {
    function getAddresses() {
        if (loading) {
            return Array(3).fill({});
        } else {
            return addresses
        }
    }

    return <>
        {getAddresses().map(address => (
            <Box
                key={address.id}
                onClick={() => onClick && onClick(address)}
            >
                {selected && selected === address.id ?
                    <CheckSquare size={30} className="mr-4 flex-shrink-0 text-secondary-500"/>
                    :
                    <Square size={30} className="mr-4 flex-shrink-0 text-gray-400"/>
                }
                <div className="flex-grow">
                    <h2 className="text-sm">
                        {address.address || <Skeleton className="w-full"/>}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {address.address
                            ?
                            [address.number, address.complement].filter(i => !!i).join(' - ')
                            :
                            <Skeleton className="w-1/2"/>
                        }
                    </p>
                </div>
                <ChevronRight className="ml-4 flex-shrink-0 text-gray-500"/>
            </Box>
        ))}
    </>
};
