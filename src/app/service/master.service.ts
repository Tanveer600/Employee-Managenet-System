import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, Transaction } from '../model/interface';



@Injectable({
  providedIn: 'root'
})
export class MasterService {
  
  private apiurlTransaction = 'https://localhost:7133/api/Transaction/';
  private apiurlAccount = 'https://localhost:7133/api/Account/';

  constructor(private http:HttpClient) { }

  

 
 
 
  getTransactiondata(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiurlTransaction);
  };
  getAccountdata(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiurlAccount);
  };
 

  
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

    
    UpdateAccount(obj:Account){
      // debugger;
       return this.http.put(`${this.apiurlAccount}${obj.id}`, obj);
         }
         UpdateTransaction(obj:Transaction){
          // debugger;
           return this.http.put(`${this.apiurlTransaction}${obj.id}`, obj);
             }
   
 
    
     

            getTransactionbyid(id:number):Observable<Transaction>{
              // debugger;
               return this.http.get<Transaction>(`${this.apiurlTransaction}${id}`);
                 }
                 getAccountbyid(id:number):Observable<Account>{
                  // debugger;
                   return this.http.get<Account>(`${this.apiurlAccount}${id}`);
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
