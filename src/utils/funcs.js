/**
 * @method
 * @name parseLinkHeader
 * @param{String} header - the LinkHeader string
 * @return{Object} a rel - link map of all the links contained in the header
 * borrowed from https://gist.github.com/niallo/3109252
 */

export function parseLinkHeader(header) {
    if (header.length === 0) {
        throw new Error('input must not be of zero length');
    }

    // Split parts by comma
    const parts = header.split(',');
    const links = {};
    // Parse each part into a named link
    for (let i = 0; i < parts.length; i++) {
        const section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error('section could not be split on \';\'');
        }
        const url = section[0].replace(/<(.*)>/, '$1').trim();
        const name = section[1].replace(/rel=(.*)/, '$1').trim();
        links[name] = url;
    }
    return links;
};
