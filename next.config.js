const nextTranslate = require('next-translate')
const path = require('path');
module.exports = {
    ...nextTranslate(),
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    publicRuntimeConfig: {
        oktaClientId: process.env.OKTA_CLIENTID,
        oktaClientSecret: process.env.OKTA_CLIENTSECRET,
        redirectUri: process.env.REDIRECT_URI,
        authorizationEndpoint: `https://${process.env.OKTA_DOMAIN}/v1/authorize`,
        tokenEndpoint:`https://${process.env.OKTA_DOMAIN}/v1/token`,
        requestedScopes: "openid profile email",
        grantType: "authorization_code",
        forgotPasswordEndpoint: `https://${process.env.OKTA_DOMAIN}/api/v1/authn/recovery/password`
    },
  }