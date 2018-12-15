
/* eslint-disable no-undef */
import 'whatwg-fetch';
import 'custom-event-polyfill';

export const fetch = window.fetch;
export const localStorage = window.localStorage;
export const location = window.location;
export const document = window.document;
export const history = window.history;
export const navigator = window.navigator;
export const URL = window.URL;
export const CustomEvent = window.CustomEvent;
const win = window;
export {win as window};
