import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { TravelServiceService } from 'src/app/services/travel-service.service';

@Component({
  selector: 'app-approve-req',
  templateUrl: './approve-req.component.html',
  styleUrls: ['./approve-req.component.css']
})
export class ApproveReqComponent {
  user_id: any;
  user_type: any;
  viewDetTvlApr: any;
  notification: any;

  constructor(
    private loginservice: LoginServiceService,
    private http: HttpClient,
    private travelService: TravelServiceService,
    private router: Router,

  ) {
    this.user_id = this.loginservice.getData()[0];
    this.user_type = this.loginservice.getData()[2]
    this.viewDetTvlApr = this.travelService.getTrvelData()[3];
    console.log(this.viewDetTvlApr, typeof (this.viewDetTvlApr));

  }
  approvereq = new FormGroup<any>({
    Requestid: new FormControl(''),
    Employeeid: new FormControl(''),
    Employeename: new FormControl(''),
    Projectid: new FormControl(''),
    FromLocation: new FormControl(''),
    ToLocation: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    avlamt: new FormControl(''),
    Approvername: new FormControl(''),
    approverRemarks: new FormControl(''),
    Employeeremarks: new FormControl(''),
    bookedticketfare: new FormControl(''),
    pnrnumber: new FormControl(''),
    ticketnumber: new FormControl(''),

  })

  approve(item: any) {
    console.log(item);

  }

  data: any;
  rejectReson: any
  rjt: boolean = false;
  count = 0;

  approveRejTravel(value: string, viewDetTvlApr: any) {
    console.log(value, viewDetTvlApr);


    if (value == 'rej') {
      this.rjt = true
      this.count++;
      console.log(this.count);

      if (this.count > 1) {
        this.data = {
          user_type: this.user_type,
          user_id: this.user_id,
          action: value,
          tq: viewDetTvlApr,
          rejectReson: this.rejectReson
        }
      }

    } else {
      if (value = 'apr') {

        this.data = {
          user_type: this.user_type,
          user_id: this.user_id,
          action: value,
          tq: viewDetTvlApr
        }
      }
    }
    console.log(this.data);


    if (this.data != undefined) {

      this.http.post('http://localhost:4000/travel/aproveRejTvlreq', this.data).subscribe(
        (response: any) => {
          console.log('API Response:', response);
          this.notification = response.notification

        },
        (error: any) => {
          console.error('API Error:', error);
          // Handle error cases and navigate accordingly
          // this.router.navigate(['/error']);
        }
      );
    }


  }

}
