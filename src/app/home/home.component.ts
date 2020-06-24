import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './MyArrayType';
import { Item } from './add-item/model/item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string;

  items: Item[];

  constructor(private _route: ActivatedRoute, private _router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.email = this._route.snapshot.paramMap.get('email');



    this.http.get<Item[]>("http://localhost:8080/getAll", {
      headers: new HttpHeaders().set("authorization", sessionStorage.getItem('token'))
    }).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
        this.items = val;
      },
      response => {
        console.log("POST call in response", response.status);
      },
      () => {
        console.log("The POST observable is now completed.");
      });


  }
  deleteUser() {

  }
  editItem(item: Item) {
    console.log('========='+item.listOfItems);

    this._router.navigate(['/addItem',this.email])
  }
  addItem() {
    this._router.navigate(['/addItem', this.email]);

  }

}
