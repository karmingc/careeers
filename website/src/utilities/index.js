export function mapValues(params) {
    const { obj, mapper } = params;
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, mapper(value)])
    );
}

