import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormControlDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import { AddemployeeserviceService } from 'src/app/services/addemployeeservice.service';
import { ApprvalServicesService } from 'src/app/services/apprval-services.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {
  approvalData: any;
  gender = '';
  user_type: any;
  user_id: any;

  comm_code_blood: any;
  comm_code_shirt: any;
  comm_code_state: any;
  comm_code_maritalstatus: any
  isSameAsCurrentAddress: any;
  cocd: any;
  emp_data: any;
  modifypersonal: boolean = false;


  constructor(private router: Router,
    private http: HttpClient,
    private service: AddemployeeserviceService,
    private loginservice: LoginServiceService,
    private aprovalservice: ApprvalServicesService) {

    const data = this.loginservice.getData();
    this.user_id = data[0];
    this.user_type = data[2]
    this.approvalData = data[8];
    this.emp_data = data[4];
    this.cocd = data[10];
    console.log(this.cocd);
    // this.user_id = this.cocd.empid;
    this.comm_code_blood = this.cocd.comm_code_blood;
    this.comm_code_shirt = this.cocd.comm_code_shirt;
    this.comm_code_state = this.cocd.comm_code_state;
    this.comm_code_maritalstatus = this.cocd.comm_code_maritalstatus;

    console.log(this.user_id);

    if (this.emp_data != undefined) {
      this.modifypersonal = true
    }

  }

  Personal_Details = new FormGroup<any>({

    employeeId: new FormControl('', [Validators.required]),
    employeeName: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl(''),
    bloodGroup: new FormControl(''),
    tShirtSize: new FormControl(''),
    communicationAddress: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    state1: new FormControl(''),
    city1: new FormControl(''),
    pinCode: new FormControl(''),
    pinCode1: new FormControl(''),

    permanentAddress: new FormControl(''),
    mobileNumber: new FormControl(''),
    altranativeContactNumber: new FormControl(''),
    emergencyContactNumber: new FormControl(''),
    emergencyContactPerson: new FormControl(''),
    fatherName: new FormControl(''),
    motherName: new FormControl(''),
    maritalStatus: new FormControl(''),
    spouseName: new FormControl(''),
    panNumber: new FormControl(''),
    passportNumber: new FormControl(''),
    adharCardNumber: new FormControl(''),
    drivingLicenceNumber: new FormControl(''),
    uanNumber: new FormControl(''),
    name: new FormControl(''),
    bankname: new FormControl(''),
    branchname: new FormControl(''),
    accountnum: new FormControl(''),
    ifsccode: new FormControl('')



  });

  personalDetails(item: any) {
    console.log(item);
    if (item != null) {
      // this.router.navigate(['professionalDetails'])

      this.addEmpPer(item);
    }

  }
  addEmpPer(data: any): void {


    const bloodGroup = data.bloodGroup;
    const shirt = data.tShirtSize;
    const state = data.state;
    const state1 = data.state1;
    const marital_status = data.maritalStatus;



    for (let i = 0; i < this.comm_code_blood.length; i++) {
      if (this.comm_code_blood[i].comm_code_desc === bloodGroup) {
        data.bloodGroup = this.comm_code_blood[i].comm_code_id;

        break;
      }
    }
    for (let i = 0; i < this.comm_code_shirt.length; i++) {
      if (this.comm_code_shirt[i].comm_code_desc === shirt) {
        data.tShirtSize = this.comm_code_shirt[i].comm_code_id;
        break;
      }
    }
    for (let i = 0; i < this.comm_code_state.length; i++) {
      if (this.comm_code_state[i].comm_code_desc === state) {
        data.state = this.comm_code_state[i].comm_code_id;
        break;
      }
    }
    for (let i = 0; i < this.comm_code_state.length; i++) {
      if (this.comm_code_state[i].comm_code_desc === state1) {
        data.state1 = this.comm_code_state[i].comm_code_id;
        break;
      }
    }
    for (let i = 0; i < this.comm_code_maritalstatus.length; i++) {
      if (this.comm_code_maritalstatus[i].comm_code_desc === marital_status) {
        data.maritalStatus = this.comm_code_maritalstatus[i].comm_code_id;
        break;
      }
    }
    console.log(data);

    if (this.modifypersonal === false) {

      /////////////when wmployeee rigister him self /////////////////////////////////////

      this.http.post('http://localhost:4000/capture/addempper', data).subscribe(
        (response: any) => {

          console.log(response.message);
          if (response.message == 'redirect to login page') {
            // console.log("professional entry");
            this.loginservice.setNotification(response.notification)
            this.router.navigate(['/'])

          }


        },
        (error: any) => {
          console.error('API Error:', error);
          // Handle error cases and navigate accordingly
          // this.router.navigate(['/error']);
        }
      );
    }
     else {
      //////////////////////// while employee modfiy its details/////////////////////////
      console.log("modify personal Details ");
      
      // this.http.post('http://localhost:4000/capture/addempper', data).subscribe(
      //   (response: any) => {

      //     console.log(response.message);
      //     if (response.message == 'redirect to login page') {
      //       // console.log("professional entry");
      //       this.loginservice.setNotification(response.notification)
      //       this.router.navigate(['/'])

      //     }


      //   },
      //   (error: any) => {
      //     console.error('API Error:', error);
      //     // Handle error cases and navigate accordingly
      //     // this.router.navigate(['/error']);
      //   }
      // );
    }

  }

  onCheckboxChange(event: any) {
    const isChecked = event.target.checked;
    this.isSameAsCurrentAddress = isChecked;

    if (isChecked) {
      const currentAddress = this.Personal_Details.get('communicationAddress')?.value;
      const currentState = this.Personal_Details.get('state')?.value;
      const currentCity = this.Personal_Details.get('city')?.value;
      const currentPinCode = this.Personal_Details.get('pinCode')?.value;

      this.Personal_Details.patchValue({
        permanentAddress: currentAddress,
        state1: currentState,
        city1: currentCity,
        pinCode1: currentPinCode
      });

      this.Personal_Details.get('permanentAddress')?.disable();
      this.Personal_Details.get('state1')?.disable();
      this.Personal_Details.get('city1')?.disable();
      this.Personal_Details.get('pinCode1')?.disable();
    } else {
      this.Personal_Details.get('permanentAddress')?.enable();
      this.Personal_Details.get('state1')?.enable();
      this.Personal_Details.get('city1')?.enable();
      this.Personal_Details.get('pinCode1')?.enable();
    }
  }


  callView(empid: any) {
    console.log(empid);
    this.http.post('http://localhost:4000/employeeDetails/approval', { empid }).subscribe(
      (response: any) => {
        console.log(response.message);
        console.log(response);


        // Handle the response accordingly
        if (response.message === 'redirect to aproval View') {
          this.loginservice.setViewAproval("aprovalView")
          this.aprovalservice.setprofessionalDetail(response.Professional_details)
          this.aprovalservice.setpersonalDetail(response.Personal_Data)



          this.router.navigate(['/empDetailview']);
        }
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }


}

