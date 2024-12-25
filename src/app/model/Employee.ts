export class Employee {
 
  employeeId: number;
    employeeName: string;
    emailID: string;
    deptID: number;
    contactNo: string;
    password: string;
    gender: string;
    role: string;
  
  
    constructor(){
      this.employeeId= 0;
      this.employeeName= '';
      this.emailID= '';
      this.deptID= 0;
      this.contactNo= '';
      this.password= '';
      this.gender= '';
      this.role= '';
    }
  }