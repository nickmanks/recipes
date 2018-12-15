import React from 'react';
import minify from './minify';
// TODO: once react-entry-loader supports webpack loaders for template
// dependencies that are not shared by the entry module,
// we should switch to the following:
// import documentReady from './raw-loader!./document-ready.js';
import loadRaw from './loader';


const hiddenFullScreen = {
  display: 'none',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  position: 'absolute'
};

const overlay = {
  zIndex: 998,
  opacity: 0.7,
  background: '#B6B6B6',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%'
};

const h5 = {
  marginBottom: '16px',
  fontFamily: 'Roboto, sans-serif'
};

const dialog = {
  zIndex: 999,
  background: '#fff',
  position: 'absolute',
  fontFamily: 'Roboto, sans-serif',
  top: '35%',
  left: '50%',
  width: '400px',
  marginLeft: '-200px',
  height: '30%',
  minHeight: '300px',
  lineHeight: '150%',
  padding: '24px'
};


/* eslint react/prop-types: off */

const OldBrowserValidation = ({dialogId})=> (
  <div id={dialogId} style={hiddenFullScreen}>
    {/*
      Display an overlay underneath the Browser Validation dialog to block the
      user from clicking on anything else but the OK button in the Browser
      Validation dialog.
    */}
    <div style={overlay} />

    <div style={dialog}>
      <h5 style={h5}>
        Please upgrade your browser
      </h5>

      <p>
        We built MapBrowser on the latest technology.
        This makes it faster and easier to use. Unfortunately your
        browser doesn't support these technologies. To get the latest
        features, please upgrade or try using another supported browser.
      </p>

      <p style={{marginTop: '24px'}}>
        You can find a list of supported browsers
        <a
          href="https://docs.nearmap.com/display/ND/System+and+Browser+Requirements"
          target="_blank" rel='noopener noreferrer'
        >
          <span style={{fontStyle: 'italic'}}> here.</span>
        </a>
      </p>
    </div>
    <script
      type='text/javascript'
      async
      dangerouslySetInnerHTML={{
        __html: minify(loadRaw('./document-ready.js'))
      }}
    />
  </div>
);

export default OldBrowserValidation;
