import getConfig from 'next/config';

const { publicRuntimeConfig = {} } = getConfig();
export const config = {
  client_id: publicRuntimeConfig.oktaClientId,
  client_secret: publicRuntimeConfig.oktaClientSecret,
  redirect_uri: publicRuntimeConfig.redirectUri,
  authorization_endpoint: publicRuntimeConfig.authorizationEndpoint,
  token_endpoint: publicRuntimeConfig.tokenEndpoint,
  requested_scopes: publicRuntimeConfig.requestedScopes,
  grant_type: publicRuntimeConfig.grantType,
  forgot_password_endpoint: publicRuntimeConfig.forgotPasswordEndpoint,
};
