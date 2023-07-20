import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';

@Component({
  selector: 'app-customercreation',
  templateUrl: './customercreation.component.html',
  styleUrls: ['./customercreation.component.css']
})
export class CustomercreationComponent {
  user_id: any;
  notification: any;
  constructor(
    private loginService: LoginServiceService,
    private http: HttpClient,
    private router: Router,
    private projectservice: ProjectserviceService
  ) {
    const data = this.loginService.getData()
    this.user_id = data[0];

  }
  coustomerDetail = new FormGroup<any>({
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

  coustomer_Detail(item: any) {
    console.log(item);
    const creationData = {
      user_id: this.user_id,
      Item: item,
    }
    this.costumerCreation(creationData)
  }

  costumerCreation(creationData: any) {
    this.http.post('http://localhost:4000/projectdetails/customercreation', creationData).subscribe(
      (response: any) => {
        console.log(response.notification);

        if (response.message == 'redirect to customerview') {
          this.projectservice.setcoustomerviewData(response.customerViewData);
          this.router.navigate(['/CustomerView'])
        }
        else if (response.message == 'redirect to Customercreation') {
          alert(this.notification = response.notification);
          this.router.navigate(['/Customercreation'])
        }

      },
      (error: any) => {
        console.error('API Error:', error);

      }
    );
  }
}
