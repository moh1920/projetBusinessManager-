import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {initializeKeycloak} from "./app/services/keycloak-init";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "./app/app.routes";
import {APP_INITIALIZER} from "@angular/core";
import {KeycloakService} from "./app/services/util/keycloak/keycloak.service";


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

export function initializeKeycloakFactory(keycloakService: KeycloakService) {
  return () => keycloakService.init(); // 👈 utilise bien init()
}
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloakFactory,
      deps: [KeycloakService],
      multi: true
    }
  ]
});
