import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { TravelServiceService } from 'src/app/services/travel-service.service';

@Component({
  selector: 'app-cancel-travel-details',
  templateUrl: './cancel-travel-details.component.html',
  styleUrls: ['./cancel-travel-details.component.css']
})
export class CancelTravelDetailsComponent {
  notification: any;
  CanTravelDet = new FormGroup<any>({

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
  cancelTravelReqView: any;
  viewPage: any;
  data: any;

  constructor(
    private loginservice: LoginServiceService,
    private http: HttpClient,
    private travelService: TravelServiceService,
    private router: Router,

  ) {
    this.user_id = this.loginservice.getData()[0];
    this.user_type = this.loginservice.getData()[2]
    this.cancelTravelReqView = this.travelService.getTrvelData()[4];
    this.notification = this.travelService.notification;

  }
  ModifyData: any
  rejectReson: any
  rjt: boolean = false;
  specifc_req_id: any;
  count: any = 0;
  canReq(value: any) {
    this.specifc_req_id = value.req_id;
    this.count++;
    this.rjt = true
    if (this.count > 1) {
      console.log(value, this.rejectReson);
      this.data = {
        user_type: this.user_type,
        user_id: this.user_id,
        test2: 'Submit for Cancellation',
        item: value,
        rejectReson: this.rejectReson
      }
      if (this.data != undefined) {
        this.api(this.data)

      }

    }
  }

  AprRej(value: any, action: any) {
    this.specifc_req_id = value.req_id;
    if (action == 'apr') {
      this.data = {
        user_type: this.user_type,
        user_id: this.user_id,
        test2: 'Submit for Cancellation',
        item: value,
        rejectReson: this.rejectReson,
        action: 'apr'
      }
      if (this.data!= undefined) {
        this.api(this.data);
      }
    }
    else {
      this.rjt = true
      this.count++;
      if (this.count > 1) {
        this.data = {
          user_type: this.user_type,
          user_id: this.user_id,
          test2: 'Submit for Cancellation',
          item: value,
          rejectReson: this.rejectReson,
          action: 'rjt'
        }
        if (this.data!= undefined) {
          this.api(this.data);
        }
      }
    }
  }


  api(data: any) {
    console.log(data);
    
    this.http.post('http://localhost:4000/travel/travelReq', data).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.notification = response.notification
        this.cancelTravelReqView = response.cancelTravelReqView;
        
        this.rejectReson = false;

      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }


}
