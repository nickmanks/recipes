import React, {Fragment} from 'react';


const ViewportMeta = ()=> (
  <Fragment>
    <meta
      name="viewport"
      content="
      width=device-width,
      initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,
      user-scalable=no, shrink-to-fit=no"
    />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />

    <meta httpEquiv="X-UA-Compatible" content="IE=11" />
  </Fragment>
);

export default ViewportMeta;
