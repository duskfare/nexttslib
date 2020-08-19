import Axios from 'axios';
import * as GeneralHelper from './general';
export async function doAuthenticatedGet(
  url: string,
  options: RequestOptions = {}
): Promise<ResponseFormat> {
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
export async function doAuthenticatedPost(
  url: string,
  body: any,
  options: RequestOptions = {}
): Promise<ResponseFormat> {
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
export async function doAuthenticatedPut(
  url: string,
  body: any,
  options: RequestOptions = {}
): Promise<ResponseFormat> {
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
export async function doAuthenticatedDelete(
  url: string,
  options: RequestOptions = {}
): Promise<ResponseFormat> {
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
 * @param url
 * @param options
 */
export async function doGet(url: string, options: RequestOptions = {}) {
  return await Axios.get(url, options);
}
/** POST method without any custom headers
 * @param url
 * @param body
 * @param options
 */
export async function doPut(
  url: string,
  body: any,
  options: RequestOptions = {}
) {
  return await Axios.put(url, body, options);
}
/** PUT method without any custom headers
 * @param url
 * @param body
 * @param options
 */
export async function doPost(
  url: string,
  body: any,
  options: RequestOptions = {}
) {
  return await Axios.post(url, body, options);
}
/** DELETE method without any custom headers
 * @param url
 * @param options
 */
export async function doDelete(url: string, options: RequestOptions = {}) {
  return await Axios.delete(url, options);
}

/**
 * Format an object as a query string without the leading question mark
 * @param o
 */
export function formatObjectAsQuery(o: any) {
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

export function formatResponseError(err) {
  let response = err.response;
  return {
    response: {
      url: response.request.responseURL,
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    },
  };
}

interface ResponseFormat {
  data: any;
  message: string;
}

interface RequestOptions {
  headers?: any;
}
