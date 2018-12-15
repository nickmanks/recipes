import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Oidc from '../signin';
import AppSignin from '../app-signin';

// TODO: bug in react-entry-loader to make css work in template
import '../index.scss';


export const App = ({signin, appReady})=> (
  <section style={{width: '100%', height: '100%'}}>
    <Oidc />
    {(signin.pending) ? <AppSignin /> : <h1> I'd load the app </h1>}
    {appReady ? (<h1> I'm the layout! </h1>) : null}
  </section>
);

App.propTypes = {
  signin: PropTypes.object,
  appReady: PropTypes.bool,
  mobile: PropTypes.bool,
  onDeviceInfoChanged: PropTypes.func
};

const mapStateToProps = ({oidc})=> ({
  signin: oidc,
  appReady: !oidc.pending
});

export default connect(mapStateToProps)(App);
