import React from 'react';
import {Provider} from 'react-redux';
import {Module, Scripts, Styles} from 'react-entry-loader/injectors';
import OldBrowserValidation from './browser-detection/dialog';
import SecurityMeta from './html/security';
import ViewportMeta from './html/viewport';
import SocialMeta from './html/social';
import VersionMeta from './html/version';
import render from './html/render';
import theme from './index.scss';
import App from './app';
import {store} from './store';


const detectDialogId = 'browser-detect';
const containerId = 'recipes';

/* eslint react/prop-types: off */

const Html = ({scripts, styles, version, appUrl})=> (
  <html>
    <head>
      <VersionMeta version={version} />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />

      <SecurityMeta appUrl={appUrl} />

      <ViewportMeta />

      <SocialMeta
        title="Recipes"
        appUrl={appUrl}
        description="Explore and store your recipes and meal plans"
      />
    </head>
    <body>
      {/*
        Material UI styles are added to the <head> elem, we want ours to
        override Material UI
      */}
      <Styles files={styles} />

      <OldBrowserValidation dialogId={detectDialogId} />

      <div id={containerId} className={theme.root}>
        <Module onLoad={(cmp)=> render(containerId, detectDialogId)(cmp)}>
          <Provider store={store}>
            {/* TODO: bug in react-entry-loader to make css work in template */}
            <App workaroundDependency={theme} />
          </Provider>
        </Module>
      </div>

      <iframe id="rp" style={{display: 'none'}} />
      {/*
        TODO: This should be moved into the <head> once the renderer can cope
        with waiting for the container element to load
      */}
      <Scripts files={scripts} async />

    </body>
  </html>
);

export default Html;
