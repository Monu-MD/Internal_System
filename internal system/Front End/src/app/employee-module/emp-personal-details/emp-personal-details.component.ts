import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddemployeeserviceService } from 'src/app/services/addemployeeservice.service';

@Component({
  selector: 'app-emp-personal-details',
  templateUrl: './emp-personal-details.component.html',
  styleUrls: ['./emp-personal-details.component.css']
})
export class EmpPersonalDetailsComponent {

  gender='';
  
  constructor(private router:Router,
    private http:HttpClient,
    private service :AddemployeeserviceService){}
    
    emp_Personal_Details = new FormGroup<any>({
    
    employeeId: new FormControl('', [Validators.required]),
    employeeName: new FormControl(''),
    gender:new FormControl(''),
    dateOfBirth:new FormControl(''),
    bloodGroup:new FormControl(''),
    tShirtSize:new FormControl(''),
    communicationAddress:new FormControl(''),
    state:new FormControl(''),
    city:new FormControl(''),
    state1:new FormControl(''),
    city1:new FormControl(''),
    pinCode:new FormControl(''),
    pinCode1:new FormControl(''),

    parmanentAddress:new FormControl(''),
    mobileNumber:new FormControl(''),
    altranativeContactNumber:new FormControl(''),
    emergencyContactNumber:new FormControl(''),
    emergencyContactPerson:new FormControl(''),
    fatherName:new FormControl(''),
    motherName:new FormControl(''),
    maritalStatus:new FormControl(''),
    spouseName:new FormControl(''),
    panNumber:new FormControl(''),
    passportNumber:new FormControl(''),
    adharCardNumber:new FormControl(''),
    drivingLicenceNumber:new FormControl(''),
    uanNumber:new FormControl('')
  });

  emp_personalDetails(item: any) {
    console.log(item);
    // if(item!=null){
      // this.router.navigate(['professionalDetails'])
      // this.service.addEmpPer(item);
    // }
  
  }
  communicationAddress:string='';
  parmanentAddress:string=' ';
  copyAddress:any;

  copyCurrentAddress(): void {
    if(this.copyAddress){
      this.parmanentAddress=this.communicationAddress;

    }
    else{
      this.parmanentAddress='';
    }
   
  }
}

