export const auth0Config = {
  domain: 'xxxx.com',
  clientId: 'YYYYY',
  audience: 'https://xxxx.com/auth/',
  redirectUri: window.location.origin,
};

// Log the redirect URI to make sure it's what we expect
console.log('Redirect URI:', window.location.origin);