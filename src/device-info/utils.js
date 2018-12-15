const isType = (device, type)=> {
  const {deviceInfo} = device;
  if (deviceInfo && deviceInfo.device) {
    return deviceInfo.device.type === type;
  }

  return false;
};

//  Have re-factored this out to a central spot. Eventually, if we move
//  to doing CSS based solely on device type, we can get rid of browser
//  all together. So for now, isMobile remains based on screen size and
//  is not based on the information we get using react-device (e.g. - based
//  on the User Agent string).
//  NOTE: This method takes for granted that a valid redux-responsive browser
//        object is passed-in here.
//        https://github.com/AlecAivazis/redux-responsive
export const isMobile = (browser)=> !browser.greaterThan.small;

//  Use the information we get from react-device (e.g. - the User Agent string)
//  to determine if we are on a tablet.
export const isTablet = (device)=> isType(device, 'tablet');
