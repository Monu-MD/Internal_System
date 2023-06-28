import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddemployeeserviceService } from 'src/app/services/addemployeeservice.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-emp-personal-details',
  templateUrl: './emp-personal-details.component.html',
  styleUrls: ['./emp-personal-details.component.css']
})
export class EmpPersonalDetailsComponent {

  user_id:any;
  gender='';
  
  constructor(private router:Router,
    private http:HttpClient,
    private service :AddemployeeserviceService,private loginservice:LoginServiceService){

      const user=this.loginservice.getData()
      this.user_id=user[0]
     
      

    }
    
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
    this.addEmpPer(item)
    
  
  }
  addEmpPer(data: any): void {
    this.http.post('http://localhost:4000/employeeDetails/addempper', data).subscribe(
      (response: any) => {
        
          console.log(response.message);
          console.log(response.notification);
        if(response.message=='redirect to employee details view'){
          // console.log("professional entry");
          this.loginservice.setEmp_master_Tbl(response.Data)
          this.router.navigate(['/empDetailview'])
          
        }
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
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

