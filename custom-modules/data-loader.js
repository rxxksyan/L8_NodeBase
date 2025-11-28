import axios from 'axios';



/**
 @param {string} url 
 @param {Object} [options] 
 @returns {Promise<{data: any, isLoading: boolean, error: Error|null}>}
 */

export async function loadData(url, options = {}) {
    const result = {
        data: null,
        isLoading: true,
        error: null
    };

    try {
        if (!url || typeof url !== 'string') {
            throw new Error('URL must be a non-empty string');
        }

        const response = await axios({
            url,
            method: options.method || 'GET',
            data: options.data,
            headers: options.headers,
            timeout: options.timeout || 10000,
            ...options
        });

        result.data = response.data;
        result.isLoading = false;

    } catch (error) {
        result.error = new Error(
            error.response?.data?.message || 
            error.message || 
            'Unknown error occurred'
        );
        result.isLoading = false;
    }

    return result;
}

/**
@returns {Promise<{data: Array, isLoading: boolean, error: Error|null}>}
 */
export async function loadUsers() {
    return await loadData('https://jsonplaceholder.typicode.com/users');
}

/**
@returns {Promise<{data: Array, isLoading: boolean, error: Error|null}>}
 */
export async function loadPosts() {
    return await loadData('https://jsonplaceholder.typicode.com/posts');
}

/**
@returns {Promise<{data: Array, isLoading: boolean, error: Error|null}>}
 */
export async function loadComments() {
    return await loadData('https://jsonplaceholder.typicode.com/comments');
}

/**
@param {string} url 
@param {number} retries 
@param {number} delay 
@returns {Promise<{data: any, isLoading: boolean, error: Error|null}>}
 */
export async function loadDataWithRetry(url, retries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        const result = await loadData(url);
        
        if (!result.error) {
            return result;
        }

        if (attempt < retries) {
            console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    return {
        data: null,
        isLoading: false,
        error: new Error(`All ${retries} attempts failed`)
    };
}

export default {
    loadData,
    loadUsers,
    loadPosts,
    loadComments,
    loadDataWithRetry
};