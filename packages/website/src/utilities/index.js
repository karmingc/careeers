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

/**
 * returns url without https and www
 * @param {*} url
 */
export function prettierUrl(url) {
    /* for referral teehee */
    if (url.includes('morningbrew.com')) {
        return 'morningbrew.com';
    }
    return url.replace(/^https?:\/\/(www.)?/, '');
}

/**
 * returning the page number of the path
 * @param {*} path
 */
export function findPathPageNumber(path) {
    const pageNumber = path.indexOf('/page/') + 6;
    return parseInt(path.substring(pageNumber));
}
