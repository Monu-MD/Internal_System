import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent {
  
  bank = new FormGroup<any>({

     name: new FormControl(''),
     bankname: new FormControl(''),
     branchname: new FormControl(''),
     accountnum: new FormControl(''),
     ifsccode: new FormControl('')
  })
  Bankdetails(item:any){
    console.log(item);
  }

  get(){
    return this.Bankdetails 
  }
}
