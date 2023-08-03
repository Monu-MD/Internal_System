import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ReimbursementserviceService } from 'src/app/services/reimbursementservice.service';

@Component({
  selector: 'app-reimbusment-req-details',
  templateUrl: './reimbusment-req-details.component.html',
  styleUrls: ['./reimbusment-req-details.component.css']
})
export class ReimbusmentReqDetailsComponent {

  ReimbusmentId: any;
  user_type: any;
  user_id: any;
  showRejectInput: any;
  rejectionReason: any;
  notification: any;
  row: any;
  rej: any;

  constructor(private http: HttpClient, private router: Router, private reimbusmentservice: ReimbursementserviceService, private loginservice: LoginServiceService) {
    const user = this.loginservice.getData();
    this.user_type = user[2];
    this.user_id = user[0];
    const data = this.reimbusmentservice.getData()[1];
    console.log(data, "data");

  }

  searchEmpolyeeDetailsForm = new FormGroup<any>({
    ReimbusmentId: new FormControl(''),
  })
  onSubmit(item: any) {

  }
  viewdetails(value: any) {
    //  console.log(this.searchEmpolyeeDetailsForm.get('ReimbusmentId'));
    console.log(value, value.remb_id);

    const Item = {
      ReimbusmentId: value.remb_id,
      user_type: this.user_type
    }
    console.log(Item.ReimbusmentId);
    if (Item != null) {
      this.searchEmpDetails(Item)
    }

  }


  searchEmpDetails(ReimbusmentId: any): void {
    console.log("enter");


    this.http.post('http://localhost:4000/reimbursement/reimburseUserDetails', ReimbusmentId).subscribe(
      (response: any) => {

        this.reimbusmentservice.setremuserdetails(response.reimbusrowData)
        this.router.navigate(['/remuserdetails'])
      },

    );
  }

  get() {
    return this.viewdetails
  }




  rowData: any[] = [];
  dataLoaded: boolean = false;
  data: any;

  ngOnInit() {
    this.fetchData(this.user_type);
  }

  fetchData(user_type:any) {
    const params = new HttpParams()
    .set('user_type', user_type.toString());
    console.log(user_type,"usertype");
    
    this.http.get('http://localhost:4000/reimbursement/reqdetails', { params })
      .subscribe(
        (response: any) => {
          console.log(response.data);

          if (response.message == 'redirect to employee details view') {
            this.rowData = response.data;
            this.dataLoaded = true;

          } else {
            console.error('Invalid response data');
          }

          console.log(this.rowData);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }



  rejectReson: any
  rjt: boolean = false;
  count = 0;




  approveProfile(status: any, row: any) {
    console.log("status", status, 'data', row);


    if (status == 'rej') {
      this.rjt = true
      this.count++;
      console.log(this.count);

      if (this.count > 1) {
        this.data = {
          user_type: this.user_type,
          user_id: this.user_id,
          action: status,
          row: row,
          rejectReson: this.rejectReson
        }
      }

    } else {
      if (status = 'Approve') {

        this.data = {
          user_type: this.user_type,
          user_id: this.user_id,
          action: status,
          row: row
        }
      }
    }
    this.costumerCreation(this.data)
    console.log(this.data, "dataa");

  }

  costumerCreation(data: any) {
    console.log(data);

    this.http.post('http://localhost:4000/reimbursement/approvee', data).subscribe(
      (response: any) => {
        console.log(response.notification);

        if (response.message == 'redirect to customerview') {
          this.reimbusmentservice.setremuserdetails(response.customerViewData);
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



  openRejectInput() {

    this.showRejectInput = true;
    this.rejectionReason = '';

  }



}
