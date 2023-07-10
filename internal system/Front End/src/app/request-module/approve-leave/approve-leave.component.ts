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

  approveleave = new FormGroup<any>({
    employeeName: new FormControl('', [Validators.required]),

  })

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

  submit(item: any) {
  }

  ngOnInit() {
    this.fetchData(this.user_id);
  }

  fetchData(user_id: any) {
    const params = new HttpParams()
      .set('user_id', user_id.toString());
    this.http.get('http://localhost:4000/approverequest/approveView', { params })
      .subscribe(
        (response: any) => {

          console.log(response.Data);
          this.rowData = response.Data;
          if (response.message == "admin viewed") {

          }
          else {
            console.log("admin not viewed");

          }
          console.log(this.rowData);

        },
        (error: any) => {
          console.error('Error:', error);
        }
      );

  }


}
