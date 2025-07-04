import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {withInterceptors} from "@angular/common/http";
import {keycloakHttpInterceptor} from "./services/util/http/keycloak-http-interceptor.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),


]

};
