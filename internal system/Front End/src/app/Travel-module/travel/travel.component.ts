import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { TravelServiceService } from 'src/app/services/travel-service.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent {
  projectId: any;
  user_name: any;
  user_type: any;
  user_id: any;
  notification:any;
  constructor(private travelservice: TravelServiceService, private loginservice: LoginServiceService,
    private http :HttpClient) {
    this.projectId = this.travelservice.getTrvelData()[0].pid;
    this.user_id = this.loginservice.getData()[0];
    this.user_name = this.loginservice.getData()[1];
    this.user_type = this.loginservice.getData()[2];

    console.log(this.user_name);
    
  }
  travelid = new FormGroup<any>({

    projectId: new FormControl(''),
    journeyType: new FormControl(''),
    travelDate: new FormControl(''),
    tentativeReturnDate: new FormControl(''),
    fromLocation: new FormControl(''),
    toLocation: new FormControl(''),
    remarks: new FormControl(''),
    toBeApprovedby: new FormControl('')

  })

  travel(item: any) {
    console.log(item);
    const payload = {
      item: item,
      user_name: this.user_name,
      user_type: this.user_type,
      user_id: this.user_id,
      test:'Submit'
    };
    this.http.post('http://localhost:4000/travel/travelReq',payload).subscribe(
      (response: any) => {
        console.log(response.message);
        console.log(response);
        this.notification=response.notification;

      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }
}
