/* global URL */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {lineBreaksToSpaces} from '../utils/strings';

const isDevelopment = (appUrl)=> {
  const url = new URL(appUrl);
  return (url.hostname === 'localhost'
    || url.hostname === 'apps.skandev.io');
};

const SecurityMeta = ({appUrl})=> (
  <Fragment>
    <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
    <meta httpEquiv="X-XSS-Protection" content="1" />

    <meta
      httpEquiv="Content-Security-Policy"
      content={lineBreaksToSpaces`
        default-src
         'self'
          ws:
          *.skan.io
          *.auth0.com
          ${isDevelopment(appUrl) ? '*.skandev.io' : ''};
        script-src
          'self'
          'unsafe-inline'
          www.google-analytics.com
          d1fc8wv8zag5ca.cloudfront.net/2.8.0/sp.js;
        img-src
          'self'
          blob:
          data:
          *.skan.io
          *.auth0.com
          www.google-analytics.com
          events.fivetran.com;
        style-src 'self' 'unsafe-inline' fonts.googleapis.com;
        font-src 'self' fonts.gstatic.com;
      `}
    />
  </Fragment>
);

SecurityMeta.propTypes = {
  appUrl: PropTypes.string
};

export default SecurityMeta;
