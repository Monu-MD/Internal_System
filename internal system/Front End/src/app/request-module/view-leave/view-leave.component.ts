import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-view-leave',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.css']
})
export class ViewLeaveComponent {

  user_id: any;

  constructor(private http: HttpClient, private loginservice: LoginServiceService) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
  }

 
  viewLeave :any;
  rowData: any[] = [];



itemsPerPage = 10;
currentPage = 1;
totalItems = 0;

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
  this.http.get('http://localhost:4000/viewrequest/viewLeave', { params })
    .subscribe(
      (response: any) => {

        console.log(response.Data);
         this.rowData = response.Data;

        // console.log(this.rowData);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );

}


}
