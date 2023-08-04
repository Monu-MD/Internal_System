import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { TravelServiceService } from 'src/app/services/travel-service.service';

@Component({
  selector: 'app-modified-trvel-requset',
  templateUrl: './modified-trvel-requset.component.html',
  styleUrls: ['./modified-trvel-requset.component.css']
})
export class ModifiedTrvelRequsetComponent {
  notification: any;

  ModTravelDet = new FormGroup<any>({

    project_id: new FormControl(''),
    journeyType: new FormControl(''),
    travelDate: new FormControl(''),
    tentativeReturnDate: new FormControl(''),
    from_location: new FormControl(''),
    to_location: new FormControl(''),
    remarks: new FormControl(''),
    toBeApprovedby: new FormControl(''),
    emp_id: new FormControl(''),
    req_id: new FormControl(''),
    emp_name: new FormControl(''),
  })
  user_id: any;
  user_type: any;
  ModTravelData: any;
  viewPage: any;

  constructor(
    private loginservice: LoginServiceService,
    private http: HttpClient,
    private travelService: TravelServiceService,
    private router: Router,

  ) {
    this.user_id = this.loginservice.getData()[0];
    this.user_type = this.loginservice.getData()[2]
    this.ModTravelData = this.travelService.getTrvelData()[2];
    this.notification=this.travelService.notification;

    console.log(this.ModTravelData);

  }
  ModifyData: any
  OpenModificationHtml: boolean = false;
  openModDet(req_id: any) {
    console.log(req_id, this.ModTravelData);
    this.ModifyData = this.ModTravelData.find((item: { req_id: any; }) => item.req_id === req_id)
    console.log(this.ModTravelData);
    if (this.ModTravelData != undefined) {
      this.OpenModificationHtml = true;
    }


  }
  travelModDet(value: any) {
    console.log(value);
    const payload = {
      item: value,
      test1: 'Submit'
    };
    this.travelService.travelReq(payload)
    this.notification='Travel Request has been modified successfully'

  }
}
