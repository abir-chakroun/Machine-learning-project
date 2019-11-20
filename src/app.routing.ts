import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from '../src/app/containers';


import { LoginComponent } from '../src/app/views/login/login.component';
import { RegisterComponent } from '../src/app/views/register/register.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';

import { CanActivateAuthGuard } from './can-activate.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate:[CanActivateAuthGuard]
    
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
     
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate:[CanActivateAuthGuard],
 
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'submit',
        loadChildren: './views/submit/submit.module#SubmitModule',
      }
  
    ]
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
