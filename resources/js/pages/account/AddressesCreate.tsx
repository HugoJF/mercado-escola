import React, {useState} from "react";
import {ChevronRight, Loader, MapPin} from "react-feather";
import PlacesAutocomplete from 'react-places-autocomplete';
import {Title} from "@components/ui/Title";
import {AddressProperties} from "@type/addresses";
import {Box} from "@components/ui/Box";
import {Google} from "~/google";
import {MapWithPing} from "@components/addresses/MapWithPing";
import {Button} from "@components/ui/Button";
import {PagePadding} from "@containers/PagePadding";
import useNavigation from "@hooks/useNavigation";
import {useAddressCreate} from "@mutations/useAddressCreate";
import {AddressDetailsActionMenu} from "@menus/AddressDetailsActionMenu";

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

export const AddressesCreate: React.FC = () => {
    const {goBack} = useNavigation();
    const [numberSelectorOpen, setNumberSelectorOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [address, setAddress] = useState<google.maps.GeocoderResult | null>(null);
    const [number, setNumber] = useState<number | null>(null);
    const [complement, setComplement] = useState<string | null>(null);
    const [center, setCenter] = useState<[number, number] | null>(null);
    const addressCreate = useAddressCreate();

    async function handleAddressSelection(address: string) {
        const geocode = new (Google()).maps.Geocoder().geocode({address},
            (results, status) => {
                if (status !== 'OK') {
                    return;
                }

                if (!results) {
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
            complement: complement ?? undefined,
            number: number,
        });
    }

    async function storeAddress(data: AddressProperties) {
        await addressCreate.mutateAsync(data);
        goBack();
    }

    const ready = address && number && !numberSelectorOpen;

    return <PagePadding className="flex flex-col">
        <AddressDetailsActionMenu
            address={address?.formatted_address as string}
            onNumber={number => setNumber(number)}
            number={number}
            onComplement={complement => setComplement(complement)}
            complement={complement}
            open={numberSelectorOpen}
            onClose={() => setNumberSelectorOpen(false)}
        />

        {/* Address search bar */}
        <div className="flex flex-col flex-grow space-y-4 w-full h-full">
            {!ready && <>
                <Title>Adicionando novo endereço</Title>

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
                                    className: 'transition-colors duration-300 block w-full mb-4 py-3 px-4 ' +
                                        'placeholder-gray-400 text-gray-900 bg-white border-b border-lg rounded-lg',
                                })}
                            />

                            {loading && <div className="flex justify-center py-8">
                                <Loader className="animate-spin" size={30}/>
                            </div>}

                            <div className="divide-y divide-gray-200">
                                {suggestions.map(suggestion =>
                                    <Box {...getSuggestionItemProps(suggestion)}>
                                        <MapPin className="flex-shrink-0 text-gray-500"/>

                                        <p className="flex-grow mx-4 text-sm">{suggestion.description}</p>

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
                <Title>Confirme a sua localização</Title>
                <Title sub>Mova a agulha do mapa para refinar a sua localização</Title>

                {/* The address line */}
                <div className="space-y-1 bg-gray-200 px-4 py-2 rounded-lg">
                    <p className="text-center text-sm text-gray-500 leading-4 tracking-tighter">{address?.formatted_address}</p>
                    <p className="text-center text-sm font-medium text-gray-500 tracking-tighter">{number}</p>
                    {complement &&
                    <p className="mt-2 text-center text-sm font-medium text-gray-500 tracking-tighter">{complement}</p>}
                </div>

                {/* Map for fine-tuning */}
                {center &&
                <MapWithPing center={center}/>}

                {/* Save */}
                <div>
                    <Button
                        loading={loading}
                        color="primary"
                        onClick={handleSave}
                        className="mt-4"
                    >
                        Salvar
                    </Button>
                </div>
            </>}
        </div>
    </PagePadding>
};
