import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TravelServiceService {
  pidRptName: any;
  notification: any;

  constructor(private http: HttpClient, private rouetr: Router) { }
  ///////////////////////// most commonly used api's //////////////////////////////////
  fetchProjectId(employeeId: string) {
    console.log('service', employeeId);

    // const params = new HttpParams().set('employeeId', JSON.stringify(employeeId, null, "'"));
    const params = new HttpParams().set('employeeId', employeeId.toString());

    this.http.get('http://localhost:4000/travel/travel', { params }).subscribe(
      (response: any) => {
        console.log(response);

        this.pidRptName = response.pidRptName;
        this.rouetr.navigate([response.redirect])
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }


  travelReq(value: any) {
    this.http.post('http://localhost:4000/travel/travelReq', value).subscribe(
      (response: any) => {
        console.log(response.message);
        console.log(response);
        this.notification = response.notification;

      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }


  travelApprovalView: any;
  setTravelApprovalView(value: any) {
    this.travelApprovalView = value;
  }
  getTrvelData() {
    return [this.pidRptName,
    this.notification,
    this.travelApprovalView

    ]
  }
}
