import {combineReducers} from 'redux';
import {createResponsiveStateReducer} from 'redux-responsive';
import focus from 'refocus/reducer';
import oidc from './oidc-client/redux/reducer';
import device from './device-info/reducer';

const browser = createResponsiveStateReducer(
  {extraSmall: 480, small: 767, medium: 992, large: 1200}
);

export default combineReducers({
  browser,
  focus,
  oidc,
  device
});
