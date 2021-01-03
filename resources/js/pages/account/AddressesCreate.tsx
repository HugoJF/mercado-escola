import React, {useState}               from "react";
import {useDispatch}                   from "react-redux";
import {useHistory}                    from "react-router-dom";
import {ChevronRight, Loader, MapPin}  from "react-feather";
import PlacesAutocomplete              from 'react-places-autocomplete';
import {Title}                         from "../../components/ui/Title";
import {Dispatch}                      from "../../store";
import {AddressProperties}             from "../../models/addresses";
import {Box}                           from "../../components/ui/Box";
import {AddressStreetNumberActionMenu} from "../../action-menu/AdressStreetNumberActionMenu";
import {Google}                        from "../../google";
import {extractAddressComponents}      from "../../helpers/GoogleMapsHelpers";
import {MapWithPing}                   from "../../components/MapWithPing";
import {Button}                        from "../../components/ui/Button";

const fixOnBlur = (refObj: any) => {
    // Avoid clearing suggestions when input loses focus
    // ---
    // https://github.com/hibiken/react-places-autocomplete/issues/260
    // @ts-ignore
    refObj?.clearSuggestions = () => {
    };
    // @ts-ignore
    refObj?.handleInputOnBlur = () => {
    };
};

export const AddressesCreate: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const [numberSelectorOpen, setNumberSelectorOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [address, setAddress] = useState<google.maps.GeocoderResult | null>(null);
    const [number, setNumber] = useState<number | null>(null);
    const [center, setCenter] = useState<[number, number] | null>(null);

    async function handleAddressSelection(address: string) {
        const geocode = new (Google()).maps.Geocoder().geocode({address},
            (results, status) => {
                if (status !== 'OK') {
                    return;
                }

                if (results.length === 0) {
                    return;
                }

                const result = results[0];

                setCenter([
                    result.geometry.location.lat(),
                    result.geometry.location.lng()
                ]);
                setAddress(result);
            });
    }

    async function handleSave() {
        if (!address) {
            // TODO: do something
            return;
        }

        if (!number) {
            // TODO: do something
            return;
        }

        setLoading(true);
        await storeAddress({
            address: address.formatted_address,
            latitude: address.geometry.location.lat(),
            longitude: address.geometry.location.lng(),
            number: number,
        });
    }

    async function storeAddress(data: AddressProperties) {
        await dispatch.addresses.store(data);
        history.goBack();
    }

    const ready = address && number && !numberSelectorOpen;

    return <>
        <AddressStreetNumberActionMenu
            address={address?.formatted_address as string}
            onNumber={number => number && setNumber(number)}
            number={number}
            open={numberSelectorOpen}
            onClose={() => setNumberSelectorOpen(false)}
        />

        <div className="flex flex-col pt-4 px-4 space-y-4 w-full h-full">
            {!ready && <>
                <Title>Selecione o seu endereço</Title>
                <PlacesAutocomplete
                    value={input}
                    onChange={input => setInput(input)}
                    onSelect={address => {
                        handleAddressSelection(address);
                        setNumberSelectorOpen(true);
                    }}
                    ref={fixOnBlur}
                >
                    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                        <div>
                            <label className="text-gray-500" htmlFor="#address">Busca de endereço</label>
                            <input
                                {...getInputProps({
                                    placeholder: 'Digite seu endereço...',
                                    className: 'transition-colors duration-300 block w-full mb-4 py-3 px-4 text-black bg-transparent border-PhoneInputProp border-lg',
                                })}
                            />

                            {loading && <div className="flex justify-center py-8">
                                <Loader className="animate-spin" size={30}/>
                            </div>}

                            <div>
                                {suggestions.map(suggestion =>
                                    <Box {...getSuggestionItemProps(suggestion)}>
                                        <MapPin className="flex-shrink-0 text-gray-500"/>

                                        <p className="flex-grow mx-4 tracking-tight">{suggestion.description}</p>

                                        <ChevronRight className="flex-shrink-0 text-gray-500"/>
                                    </Box>
                                )}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </>}

            {/* When an address is selected */}
            {ready && <>
                {/* The address line */}
                <div>
                    <p className="text-xl text-center text-base text-gray-700">{address?.formatted_address}</p>
                    <p className="text-center text-base font-medium text-gray-700">{number}</p>
                </div>

                {/* Map for fine-tuning */}
                {center &&
                <MapWithPing center={center}/>}

                {/* Save */}
                <div>
                    <Button
                        loading={loading}
                        color="primary"
                        onClick={() => handleSave()}
                        className="mt-4"
                    >
                        Salvar
                    </Button>
                </div>
            </>}
        </div>
    </>
};
