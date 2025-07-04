import { Injectable } from '@angular/core';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak!: KeycloakInstance;
  private apiUrl = 'http://localhost:8020/api/keycloak'; // backend

  constructor(private http: HttpClient) {}

  async init(): Promise<void> {
    this._keycloak = new Keycloak({
      url: 'http://localhost:9090',
      realm: 'BusinessManager',
      clientId: 'BusinessManager'
    });

    await this._keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    });
    if (this._keycloak.token) {
      localStorage.setItem('access_token', this._keycloak.token); // ✅ sauvegarde le token
    }
  }

  get keycloak() {
    return this._keycloak;
  }

  get roles(): string[] {
    return this._keycloak.tokenParsed?.realm_access?.roles || [];
  }

  get userId(): string {
    return this._keycloak.tokenParsed?.sub || '';
  }



  get isTokenValid(): boolean {
    return !this._keycloak.isTokenExpired();
  }

  async login(): Promise<void> {
    await this._keycloak.login();
  }

  logout(): void {
    this._keycloak.logout({ redirectUri: 'http://localhost:4200' });
  }

  accountManagement(): void {
    this._keycloak.accountManagement();
  }

  async isLoggedIn(): Promise<boolean> {
    return this._keycloak.authenticated || false;
  }

  // appels vers ton backend (optionnels)
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUserSessions(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/${userId}/sessions`);
  }
}
