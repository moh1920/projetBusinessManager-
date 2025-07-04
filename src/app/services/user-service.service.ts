import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from "../models/users";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = 'http://localhost:8020/user';

  constructor(private http: HttpClient) {}

  createUser(user: Users): Observable<Users> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Users>(this.baseUrl, user, { headers });
  }

  getAllUsers(): Observable<Users[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Users[]>(`${this.baseUrl}/getAllUsers` ,{headers});
  }
}
