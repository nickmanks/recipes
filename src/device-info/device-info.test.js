import {testStore} from '../testing/helpers';
import {isMobile, isTablet} from '../device-info/utils';
import {deviceInfoChanged} from './actions';

describe('<Device />', ()=> {

  it('we are not on a tablet (case 1)', ()=> {
    const device = {
    };

    expect(isTablet(device)).toBe(false);
  });

  it('we are not on a tablet (case 2)', ()=> {
    const device = {
      deviceInfo: {
      }
    };

    expect(isTablet(device)).toBe(false);
  });

  it('we are not on a tablet (case 3)', ()=> {
    const device = {
      deviceInfo: {
        device: {
          type: 'mobile'
        }
      }
    };

    expect(isTablet(device)).toBe(false);
  });

  it('we are on a tablet', ()=> {
    const device = {
      deviceInfo: {
        device: {
          type: 'tablet'
        }
      }
    };

    expect(isTablet(device)).toBe(true);
  });

  it('changes the device info', ()=> {
    const store = testStore();
    const newDeviceInfo = {
      ua: 'newValue',
      browser: {
        name: 'newValue',
        version: 'newValue'
      },
      engine: {
        name: 'newValue',
        version: 'newValue'
      },
      os: {
        name: 'newValue',
        version: 'newValue'
      },
      device: {
        model: 'newValue',
        type: 'newValue',
        vendor: 'newValue'
      },
      cpu: {
        architecture: 'newValue'
      },
      screen: {
        height: 'newValue',
        width: 'newValue',
        orientation: 'newValue'
      }
    };

    store.dispatch(deviceInfoChanged(newDeviceInfo));

    expect(store.getState().device).toEqual({
      deviceInfo: newDeviceInfo
    });
  });
});

describe('isMobile', ()=> {
  it('on mobile', ()=> {
    expect(isMobile({
      greaterThan: {
        small: false
      }
    })).toBe(true);
  });

  it('not on mobile', ()=> {
    expect(isMobile({
      greaterThan: {
        small: true
      }
    })).toBe(false);
  });
});
