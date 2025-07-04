import {inject, Injectable} from '@angular/core';
import {CanActivateFn, Router} from "@angular/router";
import {KeycloakService} from "../services/util/keycloak/keycloak.service";

export const authGuard: CanActivateFn = () => {
  const  keycloakService=inject(KeycloakService);
  const router=inject(Router);
  if (!keycloakService.isTokenValid){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
