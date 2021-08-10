export function objectRange(size: number) {
    return Array.from(Array(size).keys()).map(id => ({id}));
}

export function round(number: number, precision: number) {
    const multi = Math.pow(10, precision);

    return Math.round(number * multi) / multi;
}

export function parseNumber(input: string | number, precision: number = 2) {
    if (typeof input === 'number') {
        return input;
    }

    if (!input || !input.replace) {
        return NaN;
    }

    const withoutCommas = input.replace(',', '.');
    const float = parseFloat(withoutCommas);

    if (isNaN(float)) {
        return NaN;
    }

    return round(float, precision);
}

export function isValidNumber(input: string | number) {
    return !isNaN(parseNumber(input));
}
