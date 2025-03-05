import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, ChildDepartment, Department, Project, Transaction } from '../model/interface';
import { Employee } from '../model/Employee';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private apiurl = 'https://localhost:7133/api/Department';
  private apiurldep = 'https://localhost:7133/api/ChildDepartment/';
  private apiurlemp = 'https://localhost:7133/api/Employees/';
  private apiurlpro = 'https://localhost:7133/api/Project/';
  private apiurlTransaction = 'https://localhost:7133/api/Transaction/';
  private apiurlAccount = 'https://localhost:7133/api/Account/';
  private apiurlproemp = 'https://localhost:7133/api/projectemployee/';
  constructor(private http:HttpClient) { }

  GetDepartments() :Observable<Department[]>{
    return this.http.get<Department[]>(this.apiurl);
  }

  GetchildDepartmentbyid(deptid: number): Observable<ChildDepartment[]> {
    // Ensure proper formatting with a trailing slash or use string interpolation
    return this.http.get<ChildDepartment[]>(`${this.apiurldep}${deptid}`);
  }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiurlemp);
  };
  getProdata(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiurlpro);
  };
  getTransactiondata(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiurlTransaction);
  };
  getAccountdata(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiurlAccount);
  };
  saveemp(data:Employee){
    //debugger;
    console.log('Sending Employee Object:', data);
    return this.http.post(this.apiurlemp , data);
  }

  savepro(data:Project){
    //debugger;
    console.log('Sending Emploprojectyee Object:', data);
    return this.http.post(this.apiurlpro , data);
  }
  saveTransaction(data:Transaction){
    //debugger;
    console.log('Sending Transaction Object:', data);
    return this.http.post(this.apiurlTransaction , data);
  }
  saveAccount(data:Account){
    //debugger;
    console.log('Sending Transaction Object:', data);
    return this.http.post(this.apiurlAccount , data);
  }
 //servicecode is 
 UpdateeEployees(obj:Employee){
 // debugger;
  return this.http.put(`${this.apiurlemp}${obj.employeeId}`, obj);
    }
    
    UpdateAccount(obj:Account){
      // debugger;
       return this.http.put(`${this.apiurlAccount}${obj.id}`, obj);
         }
         UpdateTransaction(obj:Transaction){
          // debugger;
           return this.http.put(`${this.apiurlTransaction}${obj.id}`, obj);
             }
    Updateeproject(obj:Project){
      // debugger;
       return this.http.put(`${this.apiurlpro}${obj.projectId}`, obj);
         }
 
    deleteEployeebyid(id:number){
      //debugger;
      return this.http.delete(`${this.apiurlemp}${id}`);
        }
        getprojectbyid(id:number):Observable<Project>{
         // debugger;
          return this.http.get<Project>(`${this.apiurlpro}${id}`);
            }

            getTransactionbyid(id:number):Observable<Transaction>{
              // debugger;
               return this.http.get<Transaction>(`${this.apiurlTransaction}${id}`);
                 }
                 getAccountbyid(id:number):Observable<Account>{
                  // debugger;
                   return this.http.get<Account>(`${this.apiurlAccount}${id}`);
                     }
        deleteprojectbyid(id:number){
         // debugger;
          return this.http.delete(`${this.apiurlpro}${id}`);
            }
            deletetransactionbyid(id:number){
              // debugger;
               return this.http.delete(`${this.apiurlTransaction}${id}`);
                 }
            deleteACCOUNTbyid(id:number){
              // debugger;
               return this.http.delete(`${this.apiurlAccount}${id}`);
                 }
}
