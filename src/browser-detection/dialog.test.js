import fs from 'fs';
import {join} from 'path';
import React from 'react';
import {shallow} from 'enzyme';
import Dialog from './dialog';
import minify from './minify';

jest.spyOn(fs, 'readFileSync');


describe('<Dialog /> regression', ()=> {
  it('renders', ()=> {
    expect(
      <Dialog dialogId="test-element-id" />
    ).toMatchElem(
      <div
        id="test-element-id"
        style={{
          display: 'none',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          position: 'absolute'
        }}>
        <div
          style={{
            zIndex: 998,
            opacity: 0.7,
            background: '#B6B6B6',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%'
          }}
        />
        <div
          style={{
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
          }}
        >
          <h5 style={{marginBottom: '16px', fontFamily: 'Roboto, sans-serif'}}>
            Please upgrade your browser
          </h5>
          <p>
            We built MapBrowser on the latest technology.
            This makes it faster and easier to use.
            Unfortunately your browser doesn't support these technologies.
            To get the latest features, please upgrade or try using another
            supported browser.
          </p>
          <p style={{marginTop: '24px'}}>
            You can find a list of supported browsers
            <a
              href="https://docs.nearmap.com/display/ND/System+and+Browser+Requirements"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{fontStyle: 'italic'}}> here.</span>
            </a>
          </p>
        </div>
        <script type="text/javascript" async />
      </div>
    );
  });


  it('injects browser-detection-code', ()=> {
    const script = shallow(<Dialog />).find('script');

    expect(fs.readFileSync).toHaveBeenCalledWith(
      // eslint-disable-next-line no-undef
      join(__dirname, 'document-ready.js'),
      'utf8'
    );
    const {dangerouslySetInnerHTML} = script.props();
    expect(dangerouslySetInnerHTML).toEqual({
      __html: minify(fs.readFileSync.mock.results[0].value)
    });
  });
});
