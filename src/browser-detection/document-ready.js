//
// NOTE:  This script will be inlined into index.html by ./dialog.js
// during compile time.

// Use plain vanilla JavaScript to check browser compatibility.
// We subscribe to the document ready method and then
// show the Browser Compatibility dialog based on weather or not the tests
// passed.


// At the moment we will ignore this for testing as this functionality will be
// changed soon to reflect modern standards
/* istanbul ignore next */
(function(global) {
  function isIEBelow11() {
    if (global.navigator.appVersion.indexOf('MSIE') !== -1) {
      return true;
    }
    return false;
  }

  function validateBrowser() {
    if (!isIEBelow11()) {
      return;
    }
    //  Show the Browser Validation dialog.
    global.document.getElementById('browser-detect').style.display = 'block';
  }

  //  Subscribe to the event that fires for document ready.
  if (global.document.addEventListener) {
    global.document.addEventListener('DOMContentLoaded', validateBrowser);
  } else if (global.document.attachEvent) {
    //  For IE8... https://stackoverflow.com/a/9769930/1895012
    global.document.attachEvent('onreadystatechange', validateBrowser);
  }
})(window); // eslint-disable-line no-undef
