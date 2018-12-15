/* global setTimeout */
//  Default timeout (in milliseconds) value if we need to use setTimeout.
export const DEFAULT_TIMEOUT = 20;

export const sleep = (timeout = DEFAULT_TIMEOUT)=> (
  new Promise((resolve)=> setTimeout(resolve, timeout))
);

export const defer = async (fn)=> {
  await null;
  return await fn();
};
