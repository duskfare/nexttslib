import UniversalCookie from 'universal-cookie';
import QueryString from 'query-string';
import arrayMove from 'array-move';
const COOKIE_KEY_ACCESS_TOKEN = 'access-token';
/**
 * @param {string} name 
 * @param {*} value 
 * @param {{ expires?: Date }} options 
 */
export function setCookie(name, value, options = {}) {
    let cookies = new UniversalCookie();
    if(!options.expires) {
        let expiresAt = (new Date()).getTime() + 10 * 1000 * 60 * 60 * 24 * 365; //Default to cookies that last 10 years when expiry is not set
        options.expires = new Date(expiresAt);
    }
    cookies.set(name, value, { expires: options.expires });
}

export function getCookie(name) {
    let cookies = new UniversalCookie;
    return cookies.get(name);
}

export function deleteCookie(name) {
    let cookies = new UniversalCookie;
    cookies.remove(name);
}
/**
 * Get window.location.search parsed as an object
 * @returns {Object<string, string>}
 */
export function getLocationSearch () {
    let search_str = (typeof window !== 'undefined' && window && window.location) ? window.location.search : ''
    let urlSearch = new URLSearchParams(search_str);
    /** @type {*} */
    let search = {};
    for(let [key, value] of urlSearch) {
        search[key] = value;
    }
    return search || {};
}
//Auth Methods
export function setAccessToken(accessToken) {
    return setCookie(COOKIE_KEY_ACCESS_TOKEN, accessToken);
}
export function getAccessToken() {
    return getCookie(COOKIE_KEY_ACCESS_TOKEN);
}
export function deleteAccessToken() {
    return deleteCookie(COOKIE_KEY_ACCESS_TOKEN);
}
//Sort Methods
/**
 * @param {[]} items 
 */
export function sortByCreatedDate(items) {
    return items.sort((a, b) => {
        let { created_date } = a;
        let { created_date: next_created_date } = b;
        if(created_date > next_created_date) {
            return -1;
        } else if (created_date == next_created_date) {
            return 0;
        } else {
            return 1;
        }
    })

}
/**
 * @template T
 * Reorder the itmes in an array
 * @param {T[]} array
 * @param {number} oldIndex
 * @param {number} newIndex
 * @returns {T[]}
 */
export function reoreder(array, oldIndex, newIndex) {
    return arrayMove(array, oldIndex, newIndex);
}