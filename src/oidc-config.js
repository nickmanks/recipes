/**
* Configuration for OpenId-Connect client.
* @see https://github.com/IdentityModel/oidc-client-js/wiki.
*
* Most OpenId-Connect servers will require application registration
* including redirect-URIs.
* For the application code to work it needs CORS support
* from the OpenId-Connect server for fetching meta-data.
*/
import getOidcStores from './oidc-client/oidc-stores';
import {location} from './globals';
import {authority} from './config';


const {protocol, host, pathname} = location;

const redirectUri = `${protocol}//${host}${pathname}`;


/* eslint camelcase: 0 */
export default {
  authority,
  client_id: 'iicj6mPtapXbxNqr0on7zyLvjeJwIdwg',
  redirect_uri: redirectUri,

  response_type: 'id_token token',
  scope: 'openid profile email phone address',

  silent_redirect_uri: `${redirectUri}silent_renew.html`,
  automaticSilentRenew: true,
  // accessTokenExpiringNotificationTime: 150,
  monitorSession: false,
  loadUserInfo: false,
  filterProtocolClaims: false,
  ...getOidcStores()
};
