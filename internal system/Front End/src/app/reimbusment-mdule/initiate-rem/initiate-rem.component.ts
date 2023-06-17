import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormControlDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-initiate-rem',
  templateUrl: './initiate-rem.component.html',
  styleUrls: ['./initiate-rem.component.css']
})
export class InitiateRemComponent {



  initiaterem = new FormGroup<any>({
    employeeid:new FormControl(''),
    employeeName:new FormControl(''),
    projectId:new FormControl(''),
    approvedBy:new FormControl(''),
    finanaceManager:new FormControl(''),
    totalAmount:new FormControl(''),
    remarks:new FormControl(''),


  })



  initiateRem(item: any) {
    console.log(item);

  }

}
