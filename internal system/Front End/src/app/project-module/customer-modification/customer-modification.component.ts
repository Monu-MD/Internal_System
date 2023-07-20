import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';


@Component({
  selector: 'app-customer-modification',
  templateUrl: './customer-modification.component.html',
  styleUrls: ['./customer-modification.component.css']
})
export class CustomerModificationComponent {
  show: boolean = false;
  notification: any;
  modData: any;
  user_id: any;
  user_type: any;
  constructor(private http: HttpClient, private router: Router, private loginservice: LoginServiceService,
    private projectservice: ProjectserviceService) {
    this.user_id = this.loginservice.getData()[0];
    this.user_type = this.loginservice.getData()[2]
  }

  coustomerIDSearch = new FormGroup<any>({
    coustomerID: new FormControl('')
  })

  coustomer_ID_Search(cid: any) {
    console.log(cid);
    this.http.post('http://localhost:4000/projectdetails/ModcustDetails', cid).subscribe(
      (response: any) => {
        console.log(response);
        if (response.notification == 'Coustoer ID Does Not Exist') {
          this.notification = response.notification;
        } else {
          this.show = true;
          this.modData = response.modadta

        }

      },
      (error: any) => {
        console.error('API Error:', error);

      }
    );

  }

  coustomerModification = new FormGroup<any>({
    customerName: new FormControl(''),
    customerID: new FormControl(''),
    clientAddressLine1: new FormControl(''),
    clientAddressLine2: new FormControl(''),
    countryName: new FormControl(''),
    cityName: new FormControl(''),
    clientName1: new FormControl(''),
    clientEmialId1: new FormControl(''),
    clinetContactNumber1: new FormControl(''),
    clientName2: new FormControl(''),
    clientEmialId2: new FormControl(''),
    clinetContactNumber2: new FormControl(''),
    GSTNumber: new FormControl(''),
    PANNumber: new FormControl(''),
    remarks: new FormControl(''),


  })

  coustomer_Modification(item: any) {
    console.log(item);
    const Item = {
      item: item,
      user_id: this.user_id
    }

    this.http.post('http://localhost:4000/projectdetails/customerModification', Item).subscribe(
      (response: any) => {
        console.log(response);
        if (response.message == 'redirect to customermodview') {
          this.projectservice.setcoustomerviewData(response.ModifiedData);
          this.router.navigate(['/CustomerView'])
        }


      },
      (error: any) => {
        console.error('API Error:', error);

      }
    );

  }
}
