import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { UserRequest} from "../../../model/user-request.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8020/api/users';

  constructor(private http: HttpClient) {}

  registerUser(request: unknown,idEntreprise:number): Observable<UserRequest> {
    const params = new HttpParams()
      .set('idEntreprise',idEntreprise)
    return this.http.post<UserRequest>(`${this.apiUrl}/register`, request,{ params });
  }
}
