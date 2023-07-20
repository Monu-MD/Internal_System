import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectserviceService } from 'src/app/services/projectservice.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent {
couterViewData: any;
//   customerName: any;
// customerID: any;
// clientAddressLine1: any;
// clientAddressLine2: any;
// countryName: any;
// cityName: any;
// clientName1: any;
// clientEmialId1: any;
// clientContactNumber1: any;
// clientName2: any;
// clientEmialId2: any;
// clientContactNumber2: any;
// GSTNumber: any;
// PANNumber: any;
// remarks: any;


constructor(
  private http: HttpClient,
    private router: Router,
    private projectservice: ProjectserviceService
){
  const data=this.projectservice.getData();
  this.couterViewData=data[0];
}

Close(){
  this.router.navigate(['/Customercreation'])
}

}
