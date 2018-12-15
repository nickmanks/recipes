import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dialog from 'react-toolbox/lib/dialog';
import {signin} from '../oidc-client/redux/actions';
import theme from './theme.scss';


export const SigninDialog = ({open, onSigninClick})=> (
  <Dialog
    type='small'
    theme={theme}
    active={open}
    actions={[{
      label: 'Find out more',
      href: 'http://www.skan.io'
    }, {
      label: 'Continue',
      primary: true,
      onClick: ()=> onSigninClick()
    }]}
    title='Sign in to Recipes'
  >
    Explore your recipes, meal plans and grocery lists
  </Dialog>
);

SigninDialog.propTypes = {
  open: PropTypes.bool,
  onSigninClick: PropTypes.func
};


const mapStateToProps = ({oidc})=> ({
  open: (oidc.pending && oidc.error !== null)
    || (!oidc.pending && oidc.expired && oidc.error !== null)
});

const mapDispatchToProps = (dispatch)=> ({
  onSigninClick: ()=> dispatch(signin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninDialog);
