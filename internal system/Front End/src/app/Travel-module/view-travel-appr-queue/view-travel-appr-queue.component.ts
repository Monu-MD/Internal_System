import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';

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


  constructor(
    private loginservice: LoginServiceService,
    private http: HttpClient

  ) {
    this.user_id = this.loginservice.getData()[0]
  }

  // itemsPerPage = 10;
  // currentPage = 1;
  // totalItems = this.viewtravel.length;
  // PerPage: number = 100;
  // itemsPerPageOptions: number[] = [10, 25, 50, 100];
  // onItemsPerPageChange(): void {
  //   this.currentPage = 1;

  // }

  Filter(value: any) {
    

    let params = new HttpParams().set('status', value.requeststatus.toString())
    .set('user_id',this.user_id.toString());

    this.http.get('http://localhost:4000/travel/viewTravelReq', { params }).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.viewtravel = response.viewTravelReq;
        console.log(this.viewtravel);
        
      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );


  }
}
