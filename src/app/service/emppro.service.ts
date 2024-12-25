import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpPro } from '../model/emppro';
import { Observable } from 'rxjs';
import { Project, User } from '../model/interface';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmpproService {
  private apiurlemp = 'https://localhost:7133/api/Employees/';
  private apiurlpro = 'https://localhost:7133/api/Project/';
  private apiurlproemp = 'https://localhost:7133/api/projectemployee/';
  private apiUser = 'https://localhost:7133/api/User';
  constructor(private http:HttpClient) { }
getAllEmpPro(): Observable<EmpPro[]> {
    return this.http.get<EmpPro[]>(this.apiurlproemp);
  };
  getProjectbyid(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiurlpro);
  };
  getempbyid(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiurlemp);
  };
  saveemppro(data:EmpPro){
    //debugger;
    console.log('Sending Employee Object:', data);
    return this.http.post(this.apiurlproemp , data);
  }
  login(data: User): Observable<User> {
    return this.http.post<User>(`${this.apiUser}/authenticate`, data);
  }
  //servicecode is 
 UpdateeEployeeProject(obj:EmpPro){
  // debugger;
   return this.http.put(`${this.apiurlproemp}${obj.empProjectId}`, obj);
     }
     deleteEployeeProjectbyid(id:number){
      //debugger;
      return this.http.delete(`${this.apiurlproemp}${id}`);
        }
   
}
