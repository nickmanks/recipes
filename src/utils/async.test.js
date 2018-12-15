import {defer} from './async';

describe('async utils', ()=> {
  it('calls function from defer', async ()=> {
    const func = jest.fn(()=> ('Done'));

    defer(func);

    await expect(func).asyncToHaveBeenCalledWith();
  });
});
