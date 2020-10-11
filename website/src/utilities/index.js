/**
 * Mapping obj values to new properties
 * @param obj the object you are going through
 * @param mapper the properties you want to return with
 */
export function mapValues(params) {
    const { obj, mapper } = params;

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, mapper(value)])
    );
}

