/* global setTimeout, clearTimeout */

export const DEFAULT_DELAY = 100;


export default function debounce(fn, delay=DEFAULT_DELAY) {
  let timeout = null;

  return (...args)=> {
    clearTimeout(timeout);
    timeout = setTimeout(()=> fn(...args), delay);
  };
}
