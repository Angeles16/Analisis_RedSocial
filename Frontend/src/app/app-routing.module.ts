import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import component 
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {PeopleComponent} from './components/people/people.component';
import {UsereditComponent} from './components/useredit/useredit.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'people/:page', component: PeopleComponent},
  {path: 'edituser', component: UsereditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
