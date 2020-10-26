import React, {useState}               from "react";
import {useDispatch}                   from "react-redux";
import {useHistory}                    from "react-router-dom";
import {ChevronRight, Loader, MapPin}  from "react-feather";
import PlacesAutocomplete              from 'react-places-autocomplete';
import {Title}                         from "../../components/Title";
import {Dispatch}                      from "../../store";
import {AddressProperties}             from "../../models/addresses";
import {Box}                           from "../../components/Box";
import {AddressStreetNumberActionMenu} from "../../action-menu/AdressStreetNumberActionMenu";
import {Google}                        from "../../google";

export const AddressesCreate: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const [numberSelectorOpen, setNumberSelectorOpen] = useState(false);
    const [input, setInput] = useState('');
    const [address, setAddress] = useState<google.maps.GeocoderResult|null>(null);
    const [number, setNumber] = useState<number | null>(null);

    async function handleAddressSelection(address: string) {
        const geocode = new (Google()).maps.Geocoder().geocode({address},
            (results, status) => {
                if (status !== 'OK') {
                    console.log('Geocoder returned', status);
                    return;
                }

                if (results.length === 0) {
                    console.log('Could not find location');
                    return;
                }

                const result = results[0];
                console.log('Found address', result);

                setAddress(result);
            });
    }

    async function storeAddress(data: AddressProperties) {
        await dispatch.addresses.store(data);
        history.goBack();
    }

    const ready = !!(address && number);

    return <>
        <AddressStreetNumberActionMenu
            address={address?.formatted_address as string}
            onNumber={number => number && setNumber(number)}
            number={number}
            open={numberSelectorOpen}
            onClose={() => setNumberSelectorOpen(false)}
        />

        <Title>Selecione o seu endereço</Title>
        <div className="mt-4 px-4 w-full">
            {!ready && <PlacesAutocomplete
                value={input}
                onChange={input => setInput(input)}
                onSelect={address => {
                    handleAddressSelection(address);
                    setNumberSelectorOpen(true);
                }}
                ref={refObj => {
                    // Avoid clearing suggestions when input loses focus
                    // ---
                    // https://github.com/hibiken/react-places-autocomplete/issues/260
                    // @ts-ignore
                    refObj?.clearSuggestions = () => {
                    };
                    // @ts-ignore
                    refObj?.handleInputOnBlur = () => {
                    };
                }}
            >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        <label className="text-gray-500" htmlFor="#address">Endereço</label>
                        <input
                            {...getInputProps({
                                placeholder: 'Digite seu endereço...',
                                className: 'transition-colors duration-300 block w-full mb-4 py-3 px-4 text-black bg-transparent border-b border-lg',
                            })}
                        />

                        {loading && <div className="flex justify-center py-8">
                            <Loader className="animate-spin" size={30}/>
                        </div>}

                        <div>
                            {suggestions.map(suggestion =>
                                <Box {...getSuggestionItemProps(suggestion)}>
                                    <MapPin className="flex-shrink-0 text-gray-500"/>

                                    <p className="flex-grow mx-4 text-sm tracking-tight">{suggestion.description}</p>

                                    <ChevronRight className="flex-shrink-0 text-gray-500"/>
                                </Box>
                            )}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>}

            {ready && <div>
                <p className="text-center text-sm text-gray-700">{address?.formatted_address}</p>
                <p className="text-center text-base font-medium text-gray-700">{number}</p>
            </div>}

            {ready &&
            <button className="w-full py-4 bg-primary-500 text-center text-xl text-white font-medium rounded-lg">
                Adicionar
            </button>
            }

        </div>
    </>
};
