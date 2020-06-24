import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './model/User.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User;
  status: string;
  @ViewChild('signupForm') public signupForm: NgForm;

  constructor(private http: HttpClient, private _router: Router) {

  }

  ngOnInit(): void {
    this.user = new User();
    this.user.firstName = null;
    this.user.lastName = null;
    this.user.gender = "male";
    this.user.email = null;
    this.user.phoneNumber = null;
    this.user.pwd = null;
    this.user.confirmPwd = null;

  }
  saveUser(): void {
    const newUser: User = Object.assign({}, this.user);
    this.signupForm.reset();

    this.http.post("http://localhost:8080/signup",
      newUser)
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
            this.status = "201";
            console.log("Status is : " + this.status);

        },
        response => {
          console.log("POST call in error", response.status);
          if (response.status === 409) {
            console.log("Equal");
            this._router.navigate(['/signup']);
            this.status = response.status;
            console.log("Status is : " + this.status);
          }
        },
        () => {
          console.log("The POST observable is now completed.");
        });





  }
}
