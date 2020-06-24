import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Item } from './model/item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Item;
  loggedInEmail: string;
  @ViewChild('itemForm') public itemForm: NgForm;
  datePickerConfig: Partial<BsDatepickerConfig>;
  status: string;
  constructor(private _route: ActivatedRoute, private http: HttpClient, private _router: Router) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        maxDate: new Date,
        dateInputFormat: 'DD-MM-YYYY'

      });
    this.loggedInEmail = _route.snapshot.paramMap.get('loggedInEmail');
  }

  ngOnInit(): void {
    this.item = new Item();
    this.item.dateOfPurchase = null;
    this.item.userEmail = this.loggedInEmail;
    this.item.listOfItems = null;
    this.item.price = null;
    this._route.paramMap.subscribe(
      (val)=>
      {
        
      }   
    
    );
  }

  addItem() {

    let newItem: Item = Object.assign({}, this.item);
    this.itemForm.reset();


    this.http.post("http://localhost:8080/addItem", newItem, {
      headers: new HttpHeaders().set("authorization", sessionStorage.getItem('token'))
    }).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        if (response.status == 200) {
          console.log("POST call in response", response.status);
          this._router.navigate(['/home', this.loggedInEmail]);
        }
      },
      () => {
        console.log("The POST observable is now completed.");
      });

  }
}
