import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { LoginAdminComponent } from './views/loginAdmin/loginAdmin.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AboutComponent } from './views/About/About.component';
import { HelpComponent } from './views/Help/Help.component';
import { AuthenticationService } from './authentication.service';
import{AuthenticationService2} from './authentication2.service';
import {AdminComponent} from './views/Admin/Admin.component'
const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CanActivateAuthGuard } from './can-activate.guard';
import{CanActivateAuthGuard2}from'./can-activate2.guard';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import{PropositionsService} from './views/Admin/propositions.service';
import { from } from 'rxjs';
import { AddpropositionComponent } from './views/addproposition/addproposition.component';
import { HomeComponent } from './views/home/home.component';
import { UsersComponent } from './views/users/users.component';
import { RetrainComponent } from './views/retrain/retrain.component';
import { RelanceComponent } from './views/relance/relance.component';
import { HomeuserpageComponent } from './views/homeuserpage/homeuserpage.component';
import { ResultComponent } from './views/result/result.component';
import { ClassifierComponent } from './views/classifier/classifier.component';
import { ChartJSComponent } from './views/chartjs/chartjs.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,

    AdminComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    HelpComponent,
    LoginAdminComponent,
    AddpropositionComponent,
    HomeComponent,
    UsersComponent,
    RetrainComponent,
    RelanceComponent,
    HomeuserpageComponent,
    ResultComponent,
    ClassifierComponent,
    ChartJSComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },PropositionsService,AuthenticationService, CanActivateAuthGuard,AuthenticationService2, CanActivateAuthGuard2],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
