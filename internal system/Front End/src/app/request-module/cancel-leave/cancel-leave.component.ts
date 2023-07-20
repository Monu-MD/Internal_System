import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-cancel-leave',
  templateUrl: './cancel-leave.component.html',
  styleUrls: ['./cancel-leave.component.css']
})
export class CancelLeaveComponent {


  user_id: any;

  isSuccess: boolean = false;
  isError: boolean = false;
  message: string = '';

  constructor(private http: HttpClient, private loginservice: LoginServiceService, private router: Router) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
  }


  viewLeave: any;
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

  CancelButtonClicked(row: any) {
    const updatedData = { user_id: this.user_id, Data: row };
    console.log(updatedData);
    const notificationDuration = 3000; // Duration in milliseconds (3 seconds)

    this.http.post('http://localhost:4000/viewrequest/cancelLeave', updatedData).subscribe(
      (response: any) => {
        console.log(response);

        if (response.message == 'Leave request cancelled successfully') {
          // Show success notification
          this.isSuccess = true;
          this.isError = false;
          this.message = 'Cancelled successfully!';
        }
        else{
          this.isSuccess = true;
          this.isError = false;
          this.message = 'Applied Leave cannot be cancelled since it has passed the Leave Date.';
        }


        // Automatically hide the success notification after the specified duration
        setTimeout(() => {
          this.isSuccess = false;
          this.message = '';
        }, notificationDuration);

        // Add a class to trigger the animation for showing the notification
        setTimeout(() => {
          const notificationElement = document.querySelector('.notification');
          if (notificationElement) {
            notificationElement.classList.add('show');
          }
        }, 100);

        // this.router.navigateByUrl('/viewLev');
    this.fetchData(this.user_id);

      },
      (error) => {
        console.error(error);

        // Show error notification
        this.isSuccess = false;
        this.isError = true;
        this.message = 'An error occurred while approving the request';

      }
    );
  }
}