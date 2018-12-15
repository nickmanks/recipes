import {connect} from 'react-redux';
import Oidc from '../oidc-client';
import {getMapStateToProps} from '../oidc-client/redux/connect';
import {mapDispatchToProps} from '../oidc-client/redux/connect';
import {userLoaded} from '../oidc-client/redux/actions';
// import {updateFromUrl} from '../history/actions';
import oidcConfig from '../oidc-config';
import {location} from '../globals';

const mapStateToProps = getMapStateToProps(oidcConfig, location);

const mapDispatch = (dispatch)=> ({
  ...mapDispatchToProps(dispatch),
  onUserLoaded: (...args)=> {
    dispatch(userLoaded(...args));
  }
});

export default connect(mapStateToProps, mapDispatch)(Oidc);
