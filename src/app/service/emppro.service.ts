import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  User, UserRegister } from '../model/interface';


@Injectable({
  providedIn: 'root'
})
export class EmpproService {

  private apiUser = 'https://localhost:7133/api/User';
  constructor(private http:HttpClient) { }

  login(data: User): Observable<User> {
    return this.http.post<User>(`${this.apiUser}/authenticate`, data);
  }

  saveUser(data: UserRegister) {
    console.log('Sending user registration Object:', data);
    return this.http.post(`${this.apiUser}/register`, data);
  }
  
 
  
}
