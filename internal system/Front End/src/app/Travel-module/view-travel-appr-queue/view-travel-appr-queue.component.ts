import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { TravelServiceService } from 'src/app/services/travel-service.service';

@Component({
  selector: 'app-view-travel-appr-queue',
  templateUrl: './view-travel-appr-queue.component.html',
  styleUrls: ['./view-travel-appr-queue.component.css']
})
export class ViewTravelApprQueueComponent {

  viewtravel: any;
  filterForm = new FormGroup<any>({
    requeststatus: new FormControl('', [Validators.required])
  })
  user_id: any;
  notification: any;
  user_type: any;
  viewPage: any
  showNotification(notification: any) {
    this.notification = notification

    setTimeout(() => {
      this.notification = undefined;
    }, 2000);
  }

  constructor(
    private loginservice: LoginServiceService,
    private http: HttpClient,
    private travelService: TravelServiceService,
    private router: Router,

  ) {
    this.user_id = this.loginservice.getData()[0];
    this.user_type = this.loginservice.getData()[2]
    this.viewtravel = this.travelService.getTrvelData()[2];
  }


  Filter(value: any) {


    let params = new HttpParams().set('status', value.requeststatus.toString())
      .set('user_id', this.user_id.toString());

    this.http.get('http://localhost:4000/travel/viewTravelReq', { params }).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.viewtravel = response.viewTravelReq;
        console.log(this.viewtravel);
        if (response.notification != null) {
          this.showNotification(response.notification)
        }

      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );


  }
  data: any;
  rejectReson: any
  rjt: boolean = false;
  count = 0;
  specifc_req_id:any;
  approveRejTravel(value: string, tq: any) {
    console.log(value, tq);


    if (value == 'rej') {
      this.rjt = true
      this.specifc_req_id=tq.req_id;
      this.count++;
      console.log(this.count);

      if (this.count > 1) {
        this.data = {
          user_type: this.user_type,
          user_id: this.user_id,
          action: value,
          tq: tq,
          rejectReson: this.rejectReson
        }
      }

    } else {
      if (value = 'apr') {

        this.data = {
          user_type: this.user_type,
          user_id: this.user_id,
          action: value,
          tq: tq
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

  //////////////////////// to fetch finacne aprove ///////////////////////

  viewDetTvlApr(value: any) {
    console.log(value);
    let params = new HttpParams()
      .set('user_id', this.user_id.toString()).
      set('user_type', this.user_type.toString()).appendAll(value)

    this.http.get('http://localhost:4000/travel/viewDetTvlApr', { params }).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.travelService.setviewDetTvlApr(response.viewDetTvlApr);
        this.router.navigate([response.redirect])


      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );

  }

 
  

}
