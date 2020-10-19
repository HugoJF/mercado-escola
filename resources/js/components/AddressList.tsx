import React                 from "react";
import {ProductType}         from "../models/products";
import {Product}             from "./Product";
import {AddressType}                       from "../models/addresses";
import {CheckSquare, ChevronRight, Square} from "react-feather";
import {Box}                               from "./Box";
import {Loading}             from "./Loading";

interface AddressListParameters {
    addresses: AddressType[];
    loading?: boolean;
    onClick?: (address: AddressType) => void;
}

export const AddressList: React.FC<AddressListParameters> = ({onClick, loading = false,addresses}) => {
    return <Loading loading={loading}>
        {addresses && addresses.map(address => (
            <Box onClick={() => onClick && onClick(address)}>
                {address.deleted_at ?
                    <CheckSquare size={30} className="mr-8 flex-shrink-0 text-secondary-500"/>
                    :
                    <Square size={30} className="mr-8 flex-shrink-0 text-gray-400"/>
                }
                <div className="flex-grow">
                    <h2 className="text-lg font-medium">{address.complement}</h2>
                    <p className="text-gray-600">{address.address}</p>
                    <p className="text-sm text-gray-600 font-thin">{address.number}</p>
                </div>
                <ChevronRight className="flex-shrink-0 text-gray-500"/>
            </Box>
        ))}
    </Loading>
};
