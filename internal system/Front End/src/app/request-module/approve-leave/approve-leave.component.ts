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

  isSuccess: boolean = false;
  isError: boolean = false;
  message: string = '';



  approveleave = new FormGroup<any>({
    employeeName: new FormControl('', [Validators.required]),
    rejectionReason: new FormControl(''),
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

  /////////////////////////////////////////////////////////////////////
  fetchData(user_id: any) {
    const params = new HttpParams()
      .set('user_id', user_id.toString());
    this.http.get('http://localhost:4000/viewrequest/approveView', { params })
      .subscribe(
        (response: any) => {

          console.log(response.Data);
          this.rowData = response.Data;

          console.log(this.rowData);

        },
        (error: any) => {
          console.error('Error:', error);
        }
      );

  }


  approveButtonClicked(row: any) {
    const updatedData = { user_id: this.user_id, Data: row };
    console.log(updatedData);
    const notificationDuration = 3000; // Duration in milliseconds (3 seconds)

    this.http.put('http://localhost:4000/approverequest/approveAppliedLeaves', updatedData).subscribe(
      (response) => {
        console.log(response);

        // Show success notification
        this.isSuccess = true;
        this.isError = false;
        this.message = 'Request approved successfully!';

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


  /////////////////////////////////////////////////////////////////////////////////////

  rejectButtonClicked(row: any) {
    const rejectionReason = prompt("Enter the rejection reason:");
    const updatedData = { user_id: this.user_id, Data: row, Reason: rejectionReason };
    console.log(updatedData);
    if (rejectionReason) {
      console.log("Rejection Reason: " + rejectionReason);

      const notificationDuration = 3000; // Duration in milliseconds (3 seconds)

      this.http.post('http://localhost:4000/approverequest/rejectLeaves', updatedData).subscribe(
        (response) => {
          console.log(response);

          // Show success notification
          this.isSuccess = true;
          this.isError = false;
          this.message = 'Request rejected successfully!  ';

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

          this.fetchData(this.user_id);
        },
        (error) => {
          console.error(error);

          // Show error notification
          this.isSuccess = false;
          this.isError = true;
          this.message = 'An error occurred while rejecting the request';

        }
      );


      
      // Display a success message to the user
      alert("Rejection reason: " + rejectionReason);
    }
  }




}


