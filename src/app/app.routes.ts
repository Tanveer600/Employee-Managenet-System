import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { EmployeeComponent } from './Pages/employee/employee.component';
import { ProjectComponent } from './Pages/project/project.component';
import { EmployeeProjectComponent } from './Pages/employee-project/employee-project.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { ProjectformComponent } from './Pages/projectform/projectform.component';
import { TransactionComponent } from './Pages/transaction/transaction.component';
import { AccountComponent } from './Pages/account/account.component';
import { TransactionFormComponent } from './Pages/transaction-form/transaction-form.component';
import { AccountFormComponent } from './Pages/account-form/account-form.component';

export const routes: Routes = [

{
    path:'',
    redirectTo:'login',
    pathMatch:'full'
},
{
    path:'login',
   component:LoginComponent
},
{
    path:'',
   component:LayoutComponent,
  children: [
    {
        path:'dashboard',
       component:DashboardComponent
    },
    {
        path:'employee',
       component:EmployeeComponent
    },
    {
        path:'project',
       component:ProjectComponent
    },
    {
        path:'projectfrom/:id',
       component:ProjectformComponent
    },
    {
        path:'employeeproject',
       component:EmployeeProjectComponent
    },
    {
        path:'Transaction',
       component:TransactionComponent
    },
    {
        path:'transaction-form/:id',
       component:TransactionFormComponent
    },
    {
        path:'account',
       component:AccountComponent
    },
    {
        path:'account-form/:id',
       component:AccountFormComponent
    },
   ]
},

];
