import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginUser } from './signup/model/loginuser.model';
import { LoginComponent } from './login/login.component';
import { AddItemComponent } from './home/add-item/add-item.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'home/:email', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addItem/:loggedInEmail', component: AddItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
