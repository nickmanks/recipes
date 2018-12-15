import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dialog from 'react-toolbox/lib/dialog';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import theme from './theme.scss';


export const RefreshingSession = ({open})=> (
  <Dialog
    type='small'
    theme={theme}
    active={open}
    title='You are back!'
  >
    Looks like you’ve been away for a while.
    We’ll just need to check your session before we can
    show you more amazing recipes.
    <br />
    <ProgressBar mode='indeterminate' />
  </Dialog>
);

RefreshingSession.propTypes = {
  open: PropTypes.bool
};


const mapStateToProps = ({oidc})=> ({
  open: oidc.expired === true && oidc.error === null
});

export default connect(
  mapStateToProps
)(RefreshingSession);
