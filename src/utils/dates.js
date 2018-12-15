import formatDate from 'dateformat';

/* eslint no-magic-numbers: ["error", {
  "ignore": [-1, 0, 1, 2, 4, 6, 8]
}] */

export function now() {
  return new Date();
}

export const mediumDate = (date)=> formatDate(date, 'ddd mmm d yyyy', true);

export const dateToUTC = (date)=> (
  Date.UTC(
    date.substring(0, 4), // Year.
    date.substring(4, 6) - 1, // Month (zero-based so -1)
    date.substring(6, 8) // Day.
  )
);
