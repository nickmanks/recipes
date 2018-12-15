/* eslint-disable id-length, no-magic-numbers */

/**
 * Converts a float into a string of the format: deg° min' sec"
 **/
const degreesToDMS = (degrees)=> {
  const d = degrees | 0;
  const md = Math.abs(degrees - d) * 60;
  const m = md | 0;
  const sd = Math.round((md - m) * 60);
  return `${d}° ${m}' ${sd}"`;
};

/**
* Formats a lat, lng as a string depending on the format specified.
*
* If format == 'deg' the lat long will be represented as
* -12.345689, 12.3456789.
* If format == 'dms' the lat long will be represented as
* -12° 34' 56", 123° 45' 67"
* using HTML <span> elements for alignment.
**/
export const formatLatLng = (lat, lng, format)=> {
  if (!lat || !lng) {
    return '';
  }

  if (format === 'dms') {
    return `${degreesToDMS(lat)}, ${degreesToDMS(lng)}`;
  }

  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};
