import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginUser } from '../signup/model/loginuser.model';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: LoginUser;
  loginStatus: string;
  loggedInUser: any;
  @ViewChild('loginForm') public loginForm: NgForm;

  constructor(private http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.loginUser = new LoginUser();
    this.loginUser.email = null;
    this.loginUser.pwd = null;
  }
  login(): void {
    const newLoginUser: LoginUser = Object.assign({}, this.loginUser);
    this.loginForm.reset();

    this.http.post("http://localhost:8080/login",
      newLoginUser)
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
          this.loginStatus = "200";
          this.loggedInUser = val;
          console.log("Token is : " + this.loggedInUser.token);
          console.log("Username is : " + this.loggedInUser.username);
          sessionStorage.setItem('username',this.loggedInUser.username);
          let tokenStr= 'Bearer '+this.loggedInUser.token;
          sessionStorage.setItem('token', tokenStr);
          this._router.navigate(['/home', this.loggedInUser.username]);
          
        },
        response => {
          console.log("POST call in error", response.status);
          if (response.status === 401) {
            console.log("Equal");
            this._router.navigate(['/login']);
            this.loginStatus = response.status;
            console.log("Status is : " + this.loginStatus);
          }
        },
        () => {
          console.log("The POST observable is now completed.");
        });

  }

}

