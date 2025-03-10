
export interface Department {
    departmentId: number
    departmentName: string
    sudentGender: string
  }


  export interface ChildDepartment {
    childDeptId: number
    departmentName: string
    parentDeptId: number
  }

  export interface Project {
    projectId: number
    projectName: string
    clientName: string
    startDate: string
    leadByEmpId: number
    contactPerson: string
    contactNo: string
    emailId: string
  }

  export interface User {
    userName: string; // Ensure this is the correct case
    password: string; // Ensure this is the correct case
  }

  export interface Account {
    id: number;
    name: string;
    accountType: string;
  }
  
  export interface Transaction {
    id: number;
    transactionDate: Date;
    accountId: number;
    description: string;
    debitAmount: number; 
    creditAmount: number;
  }
  