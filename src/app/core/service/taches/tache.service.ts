import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {StatutTache, Tache} from "../../../model/tache.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private baseUrl = 'http://localhost:8020/taches';

  constructor(private http: HttpClient) {}

  addTache(tache: Tache, idCategorieTache: number, idProjet: number): Observable<Tache> {
    return this.http.post<Tache>(`${this.baseUrl}/addTache/${idCategorieTache}/${idProjet}`, tache);
  }

  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.baseUrl}/getAll`);
  }

  // Obtenir une tâche par ID
  getTacheById(id: number): Observable<Tache> {
    return this.http.get<Tache>(`${this.baseUrl}/getById/${id}`);
  }

  // Mettre à jour une tâche
  updateTache(id: number, tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.baseUrl}/update/${id}`, tache);
  }

  // Supprimer une tâche
  deleteTache(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  getAllTachesByProjet(idProjet: number): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.baseUrl}/getAllTacheByProjet/${idProjet}`);
  }

  assignerTacheAMembre(idTache: number, idMembre: number) {
    const url = `${this.baseUrl}/assign-tache-membre/${idTache}/${idMembre}`;
    return this.http.put<void>(url, null);
  }
  updateTacheStatut(id: number, statut: StatutTache) {
    return this.http.put<void>(`${this.baseUrl}/${id}/${statut}`, null);
  }

  getNombreTacheByStatus(statut: string): Observable<number> {
    const params = new HttpParams().set('statut', statut);
    return this.http.get<number>(`${this.baseUrl}/count-by-status`, { params });
  }
}

