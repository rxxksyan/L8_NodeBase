
/**
 @param {string[]} strings
 @param {boolean} [reverse=false] 
 @returns {string[]} 
 */
export function sortStringsIgnoreSpaces(strings, reverse = false) {
    if (!Array.isArray(strings)) {
        throw new Error('Input must be an array of strings');
    }

    return strings
        .map(str => {
            if (typeof str !== 'string') {
                throw new Error('All elements must be strings');
            }
            return str;
        })
        .sort((a, b) => {
            const aWithoutSpaces = a.replace(/\s+/g, '');
            const bWithoutSpaces = b.replace(/\s+/g, '');
            
            const comparison = aWithoutSpaces.localeCompare(bWithoutSpaces);
            return reverse ? -comparison : comparison;
        });
}

/**
 @param {string} str 
 @param {string} [separator=' ']
 @returns {string} 
 */
export function sortStringWords(str, separator = ' ') {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }

    const words = str.split(separator)
        .filter(word => word.trim().length > 0)
        .sort((a, b) => a.localeCompare(b));
    
    return words.join(separator);
}

/**
@param {Object[]} objects 
@param {string} property 
@param {boolean} [reverse=false] 
@returns {Object[]} 
 */
export function sortObjectsByStringProperty(objects, property, reverse = false) {
    if (!Array.isArray(objects)) {
        throw new Error('...');
    }

    return objects.sort((a, b) => {
        const aValue = a[property] || '';
        const bValue = b[property] || '';
        
        const aWithoutSpaces = String(aValue).replace(/\s+/g, '');
        const bWithoutSpaces = String(bValue).replace(/\s+/g, '');
        
        const comparison = aWithoutSpaces.localeCompare(bWithoutSpaces);
        return reverse ? -comparison : comparison;
    });
}

export default {
    sortStringsIgnoreSpaces,
    sortStringWords,
    sortObjectsByStringProperty
};