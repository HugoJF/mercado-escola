export function isEmpty(object: object|null|undefined|any[]) {
    if (!object) {
        return true;
    }

    if (Array.isArray(object)) {
        return object.length === 0;
    }

    return Object.values(object).length === 0;
}

export function objectRange(size: number) {
    return Array.from(Array(size).keys()).map(id => ({id}));
}
