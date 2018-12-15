import React from 'react';
import {Module, Scripts} from 'react-entry-loader/injectors';
import processSilentRenew from './oidc-client/silent_renew';

/* eslint react/prop-types: off */

const Html = ({scripts})=> (
  <html>
    <head>
      <title>OpenID-connect token renew</title>
      <Scripts files={scripts} />
    </head>
    <body>
      <Module onLoad={()=> processSilentRenew()} />
    </body>
  </html>
);

export default Html;
