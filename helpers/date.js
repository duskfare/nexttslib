/**
 * 
 * @param {string | number} dateTime ISO string or time value in ms
 */
export function formatDateTime(dateTime) {
    let date = new Date(dateTime);
    let pad = padDateComponent;
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth());
    let yyyy = pad(date.getFullYear(), 4);
    let h_raw = date.getHours();
    let h_sfx = h_raw > 11 ? 'pm' : 'am';
    let h = h_raw >= 12 ? h_raw - 12 : h_raw;
    h = h === 0 ? 12 : h; //Override special edge case for 12am
    let m = pad(date.getMinutes());
    let s = pad(date.getSeconds());
    let formatted_date = `${yyyy}-${mm}-${dd}, ${h}:${m}${h_sfx}`;
    return formatted_date
}

/**
 * Pad the date component with leading zeros
 * @param {string | number} i 
 * @param {number} length The total number of characters in the date component
 */
function padDateComponent(i, length = 2) {
    let padChar = '0';
    i = parseInt('' + i);
    let pfx = '';
    let max_val = 10 * (length - 1);
    if(i < max_val) {
        for(let i = 0; i < length -1; i ++) {
            pfx += padChar;
        }
    }
    return`${pfx}${i}`;
}