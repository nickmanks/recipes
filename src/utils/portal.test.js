import React from 'react';
import {mount} from 'enzyme';
import {document} from '../globals';
import Portal from './portal';


describe('<Portal /> ', ()=> {
  it('renders children in portal element', ()=> {
    const elem = document.createElement('div');

    mount(
      <Portal elem={elem}>
        <span>testing</span>
      </Portal>
    );

    expect(elem.querySelector('span').textContent).toBe('testing');
  });
});
