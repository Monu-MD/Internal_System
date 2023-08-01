import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  showNotification(notification: any) {
    this.notification = notification

    setTimeout(() => {
      this.notification = undefined;
    }, 2000);
  }

  constructor(
    private loginservice: LoginServiceService,
    private http: HttpClient,
    private viewtvl: TravelServiceService,

  ) {
    this.user_id = this.loginservice.getData()[0];
    this.user_type = this.loginservice.getData()[2]
    this.viewtravel = this.viewtvl.getTrvelData()[2];
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

  approveRejTravel(value: string, tq: any) {
    console.log(value, tq);

    const data = {
      user_type: this.user_type,
      user_id: this.user_id,
      action: value,
      tq: tq
    }

    this.http.post('http://localhost:4000/travel/aproveRejTvlreq', data).subscribe(
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
  viewDetTvlApr(){
    
  }

}
