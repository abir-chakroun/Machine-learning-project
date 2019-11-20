import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AboutComponent } from './views/About/About.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HelpComponent } from './views/Help/Help.component';
import {CanActivateAuthGuard2} from './can-activate2.guard';
import {CanActivateAuthGuard} from './can-activate.guard';
import { LoginAdminComponent } from './views/loginAdmin/loginAdmin.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AdminComponent } from './views/Admin/Admin.component';
import { AddpropositionComponent } from './views/addproposition/addproposition.component';
import { HomeComponent } from './views/home/home.component';
import { UsersComponent } from './views/users/users.component';
import { RetrainComponent } from './views/retrain/retrain.component';
import { HomeuserpageComponent } from './views/homeuserpage/homeuserpage.component';
import { RelanceComponent } from './views/relance/relance.component';
import { ResultComponent } from './views/result/result.component';
import { ClassifierComponent } from './views/classifier/classifier.component';
import { ChartJSComponent } from './views/chartjs/chartjs.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'About',
    component: AboutComponent,
    data: {
      title: 'About Page'   
    },
  },
  {
    path: 'Help',
    component: HelpComponent,
    data: {
      title: 'Help Page'
    },
    
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }},
    {
      path: 'loginAdmin',
      component: LoginAdminComponent,
      data: {
        title: 'LoginAdmin Page'
      }

  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  // admin routes
  { path:'Home',
  
  component:HomeComponent,
  data:{
    title:'Admin Home Page'
  },
},
{
  path: 'Users',
  component: UsersComponent,
  canActivate:[CanActivateAuthGuard2],
  data: {
    title: 'Users Page'   
  },

},
{ path:'Admin',
canActivate:[CanActivateAuthGuard2],
component:AdminComponent,
data:{
  title:'Admin proposition Page'
},
},
{ path:'Relance',
canActivate:[CanActivateAuthGuard2],
component:RelanceComponent,
data:{
  title:'Relance Page'
},
},
{ path:'Classifier',
canActivate:[CanActivateAuthGuard2],
component:ClassifierComponent,
data:{
  title:'Classifier Page'
},
},
// fin admin routes 
// user route 
{
  path: 'Homeuserpage',
  component: HomeuserpageComponent,
  canActivate:[CanActivateAuthGuard],
  data: {
    title: 'Homeuserpage Page'   
  },

},
{
    path: 'Addproposition',
    component: AddpropositionComponent,
    
    data: {
      title: 'About Page'   
    },

  },
  
  // Resultat 
  {
    path: 'Result ',
    component: ChartJSComponent,
    data: {
      title: 'Result Page'   
    },

  },
  
  
  

 
   
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    
    children: [
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
        ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
