import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
@Component({
  selector: 'app-approve-leave',
  templateUrl: './approve-leave.component.html',
  styleUrls: ['./approve-leave.component.css']
})
export class ApproveLeaveComponent {
  user_id: any;

  constructor(private http: HttpClient, private loginservice: LoginServiceService) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
  }

  viewLeaveForm: any;
  rowData: any[] = [];

  itemsPerPage = 10;
  currentPage = 1;
  totalItems = this.rowData.length;

  PerPage: number = 100;
  itemsPerPageOptions: number[] = [10, 25, 50, 100];
  onItemsPerPageChange(): void {
    this.currentPage = 1;
  }


  ngOnInit() {

    this.fetchData(this.user_id);

  }

  fetchData(user_id: any) {
    const params = new HttpParams()
      .set('user_id', user_id.toString());
    this.http.get('http://localhost:4000/approve/approveView', { params })
      .subscribe(
        (response: any) => {
          console.log(response.data);

          if (response.message == 'redirect to apprv/Reject') {
            this.rowData = response.data;
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


}
