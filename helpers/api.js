import Axios from 'axios';
import * as GeneralHelper from './general';
/**
 * @param {string} url
 * @param {{ headers?: * }} options
 * @returns {Promise<ResponseFormat>}
 */
export async function doAuthenticatedGet(url, options = {}) {
    let accessToken = GeneralHelper.getAccessToken();
    try {
        let response = await doGet(url, {
            ...options,
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}
/**
 * @param {string} url
 * @param {*} body
 * @param {{ headers?: * }} [options]
 * @returns {Promise<ResponseFormat>}
 */
export async function doAuthenticatedPost(url, body, options = {}) {
    let accessToken = GeneralHelper.getAccessToken();
    try {
        let response = await doPost(url, body, {
            ...options,
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}
/**
 * @param {string} url
 * @param {*} body
 * @param {{ headers?: * }} [options]
 * @returns {Promise<ResponseFormat>}
 */
export async function doAuthenticatedPut(url, body, options = {}) {
    let accessToken = GeneralHelper.getAccessToken();
    try {
        let response = await doPut(url, body, {
            ...options,
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}
/**
 * @param {string} url
 * @param {{ headers?: * }} [options]
 * @returns {Promise<ResponseFormat>}
 */
export async function doAuthenticatedDelete(url, options = {}) {
    let accessToken = GeneralHelper.getAccessToken();
    try {
        let response = await doDelete(url, {
            ...options,
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}

/** GET method without any custom headers
 * @param {string} url
 * @param {{ headers?: * }} options
 */
export async function doGet(url, options = {}) {
    return await Axios.get(url, options);
}
/** POST method without any custom headers
 * @param {string} url
 * @param {*} body
 * @param {{ headers?: * }} options
 */
export async function doPut(url, body, options = {}) {
    return await Axios.put(url, body, options);
}
/** PUT method without any custom headers
 * @param {string} url
 * @param {*} body
 * @param {{ headers?: * }} options
 */
export async function doPost(url, body, options = {}) {
    return await Axios.post(url, body, options);
}
/** DELETE method without any custom headers
 * @param {string} url
 * @param {{ headers?: * }} options
 */
export async function doDelete(url, options = {}) {
    return await Axios.delete(url, options);
}

/**
 * Format an object as a query string without the leading question mark
 * @param {*} o
 */
export function formatObjectAsQuery(o) {
    let op = '';
    let addItem = (key, val) => {
        if (op) {
            op += '&';
        }
        op += `${key}=${val}`;
    };
    for (let key in o) {
        let val = o[key];
        if (Array.isArray(val)) {
            for (let v of val) {
                addItem(key, v);
            }
        } else {
            addItem(key, val);
        }
    }
    return op;
}
/**
 * @typedef ResponseFormat
 * @property {*} data
 * @property {string} message
 */
