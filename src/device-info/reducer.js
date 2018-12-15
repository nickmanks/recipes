import reducer from '../utils/reducer';

const DefaultState = {
  deviceInfo: {
    ua: '',
    browser: {
      name: '',
      version: ''
    },
    engine: {
      name: '',
      version: ''
    },
    os: {
      name: '',
      version: ''
    },
    device: {
      model: '',
      type: '',
      vendor: ''
    },
    cpu: {
      architecture: ''
    },
    screen: {
      height: '',
      width: '',
      orientation: ''
    }
  }
};

export default reducer(DefaultState, {
  'device-info/changed': (state, {deviceInfo})=> ({
    ...state,
    deviceInfo
  })
});
