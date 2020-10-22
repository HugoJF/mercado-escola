import React                               from "react";
import {AddressType}                       from "../models/addresses";
import {CheckSquare, ChevronRight, Square} from "react-feather";
import {Box}                               from "./Box";
import {Skeleton}                          from "./Skeleton";

interface AddressListParameters {
    addresses: AddressType[];
    loading?: boolean;
    onClick?: (address: AddressType) => void;
}

export const AddressList: React.FC<AddressListParameters> = ({onClick, loading = false, addresses}) => {

    function getAddresses() {
        if (loading) {
            return Array(3).fill({});
        } else {
            return addresses
        }
    }

    return <>
        {
            getAddresses().map(address => (
                <Box onClick={() => onClick && onClick(address)}>
                    {address.deleted_at ?
                        <CheckSquare size={30} className="mr-8 flex-shrink-0 text-secondary-500"/>
                        :
                        <Square size={30} className="mr-8 flex-shrink-0 text-gray-400"/>
                    }
                    <div className="flex-grow">
                        <h2 className="text-lg font-medium">
                            {address.complement || <Skeleton randomSize/>}
                        </h2>
                        <p className="text-gray-600">
                            {address.address || <Skeleton/>}
                        </p>
                        <p className="text-sm text-gray-600 font-thin">
                            {address.number || <Skeleton/>}
                        </p>
                    </div>
                    <ChevronRight className="flex-shrink-0 text-gray-500"/>
                </Box>
            ))
        }
    </>
};
