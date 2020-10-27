type ComponentType = google.maps.GeocoderAddressComponent

export const extractAddressComponents = (components: ComponentType[], desiredTypes: string[]) => {
    return components.reduce<{ [type: string]: ComponentType }>(
        (final, component) => {
            const filteredTypes = component.types.filter(type => desiredTypes.includes(type));

            if (filteredTypes.length === 1) {
                final[filteredTypes[0]] = component;
            }

            return final;
        }, {})
};
