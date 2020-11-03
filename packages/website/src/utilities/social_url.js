/**
 * returns the links for specific platform + handle
 * @param {platform} param0
 * @param handle
 */
export function socialUrl({ platform, handle }) {
    switch (platform) {
        case 'Github':
            return `https://www.github.com/${handle}`;
        case 'Linkedin':
            return `https://www.linkedin.com/in/${handle}`;
        case 'Twitter':
            return `https://www.twitter.com/${handle}`;
        case 'Instagram':
            return `https://www.instagram.com/${handle}`;
        default:
            return `https://www.google.com/search?q=${handle}`;
    }
}
