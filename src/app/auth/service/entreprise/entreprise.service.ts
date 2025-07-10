import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entreprise} from "../../../model/entreprise.model";

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private apiUrl = 'http://localhost:8020/entreprise';

  constructor(private http: HttpClient) {}

  ajouterEntreprise(entreprise: Entreprise): Observable<Entreprise> {
    return this.http.post<Entreprise>(`${this.apiUrl}/create`, entreprise);
  }
  assignerUserToEntreprise(username: string, nom: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('nom', nom);

    return this.http.post(`${this.apiUrl}/assignerUserToEntreprise`, null, { params, responseType: 'text' });
  }
}
