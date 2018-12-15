import React, {Fragment} from 'react';
import SigninDialog from '../signin/dialog';
import theme from './theme.scss';


export const AppSignin = ()=> (
  <Fragment>
    <span className={theme.startup}>
      signing in...
    </span>
    <SigninDialog />
  </Fragment>
);

export default AppSignin;
