const DATE_CONSTANTS = {
  TODAY: 'Today',
  PM: 'PM',
  AM: 'AM',
  MONTH_NAMES: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  MONTH_NAMES_SHORT: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
};
/**
 *
 * @param {string | number} dateTime ISO string or time value in ms
 */
export function formatDateTime(dateTime) {
  let date = new Date(dateTime);
  let { PM, AM } = DATE_CONSTANTS;

  let pad = padDateComponent;
  let h_raw = date.getHours();
  let h_sfx = h_raw > 11 ? PM : AM;
  let h12 = h_raw >= 12 ? h_raw - 12 : h_raw;
  let h = pad(h12 === 0 ? 12 : h12); //Override special edge case for 12am
  let m = pad(date.getMinutes());

  let formatted_date = formatDate(date);

  let formatted_datetime = `${formatted_date} - ${h}:${m} ${h_sfx}`;
  return formatted_datetime;
}
/**
 * Formats a date object
 * @param {Date} date
 */
export function formatDate(date) {
  let current_date = new Date();
  let year_raw = date.getFullYear();
  let month_raw = date.getMonth();
  let date_raw = date.getDate();
  let { TODAY, MONTH_NAMES_SHORT } = DATE_CONSTANTS;

  let pad = padDateComponent;
  let dd = pad(date.getDate());
  let mm = pad(month_raw + 1);
  let mmm = MONTH_NAMES_SHORT[month_raw];
  let yyyy = pad(year_raw, 4);
  let date_formatted = `${yyyy}-${mm}-${dd}`;
  if (
    year_raw === current_date.getFullYear() &&
    month_raw === current_date.getMonth() &&
    date_raw === current_date.getDate()
  ) {
    date_formatted = TODAY;
  } else if (year_raw === current_date.getFullYear()) {
    date_formatted = `${mmm} ${dd}`;
  }
  return date_formatted;
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
  if (i < max_val) {
    for (let i = 0; i < length - 1; i++) {
      pfx += padChar;
    }
  }
  return `${pfx}${i}`;
}
