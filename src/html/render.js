import {render} from 'react-entry-loader/render';
import {document, navigator} from '../globals';


const isIEBelow11 = ()=> navigator.appVersion.indexOf('MSIE') !== -1;


const ensureNoUpgradeBrowserMessage = (detectDialogId)=> {
  // Just in case the browser detection got things wrong and
  // loading the app actually worked, we just want to remove the
  // incorrectly displayed dialog
  document.getElementById(detectDialogId).style.display = 'none';
};


const addTouchWorkaround = ()=> {
  document.documentElement.addEventListener('touchstart', (event)=> {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, false);
};


const pageRenderer = (elemId, detectDialogId)=> (cmp)=> {
  if (isIEBelow11()) {
    // we are not going to even try to render the app for IE < 11
    return;
  }

  // TODO track requests using the store
  addTouchWorkaround();

  // TODO: scripts are loaded async, we need to wait for
  // element to be ready to render into
  render(elemId)(cmp);

  // just in case we have an upgrade browser message showing
  ensureNoUpgradeBrowserMessage(detectDialogId);
};

export default pageRenderer;
