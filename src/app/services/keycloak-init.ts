// src/app/keycloak-init.ts
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:9090/',
  realm: 'BusinessManager', // ton realm
  clientId: 'BusinessManager', // ton client Angular dans Keycloak
});

export const initializeKeycloak = () =>
  new Promise((resolve, reject) => {
    keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
    }).then((authenticated) => {
      if (authenticated) {
        resolve(keycloak);
      } else {
        reject('Keycloak init failed');
      }
    });
  });

export { keycloak };
