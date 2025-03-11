



  export interface User {
    userName: string; // Ensure this is the correct case
    password: string; // Ensure this is the correct case
  }

  export interface UserRegister {
    userName: string; 
    password: string; 
    email:string;
    firstName:string;
    lastName:string;

  }
  export interface Account {
    id: number;
    name: string;
    accountType: string;
  }
  
  export interface Transaction {
    id: number;
    transactionDate: string | Date; // Allow both Date and string
    accountID: number;
    accountName?: string;  // <-- Add this property
    description: string;
    debitAmount: number; 
    creditAmount: number;
  }
