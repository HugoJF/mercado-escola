export function isEmpty(object: object) {
    if (!object) {
        return true;
    }

    return Object.values(object).length === 0;
}

export function objectRange(size: number) {
    return Array.from(Array(size).keys()).map(id => ({id}));
}
