import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { TransactionComponent } from './Pages/transaction/transaction.component';
import { AccountComponent } from './Pages/account/account.component';
import { TransactionFormComponent } from './Pages/transaction-form/transaction-form.component';
import { AccountFormComponent } from './Pages/account-form/account-form.component';
import { RegisterComponent } from './Pages/register/register.component';

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
    path:'register',
   component:RegisterComponent
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
