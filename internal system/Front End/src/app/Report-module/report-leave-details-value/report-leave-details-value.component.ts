import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-report-leave-details-value',
  templateUrl: './report-leave-details-value.component.html',
  styleUrls: ['./report-leave-details-value.component.css']
})
export class ReportLeaveDetailsValueComponent {

 
  leaveBalRpt!: FormGroup;
  leave_type:any;

  user_id: any;
  user_type: any;
  user_name: any;
  
  constructor(private http: HttpClient,
    private router: Router, private loginservice: LoginServiceService,private formBuilder: FormBuilder) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
    this.user_name = user[1];
    this.user_type = user[2];
  }

  ngOnInit() {
    this.initializeForm();
    this.fetchData();
  }

  initializeForm() {
    this.leaveBalRpt = this.formBuilder.group({
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }

  notNullValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === null) {
      return { notNull: true };
    }
    return null;
  }

  submit(item: any) {
    console.log(item);
    this.postData(item);
  }

  get() {
    return this.submit
  }


  fetchData() {
    this.http.get('http://localhost:4000/holiday/cocd').subscribe(
      (response: any) => {
        console.log(response.data);
        this.leave_type=response.data.leave_type;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }


  postData(data: any) {
  this.http.post('http://localhost:4000/report/reportValue', data, { responseType: 'arraybuffer' })
      .subscribe(
        (response: ArrayBuffer) => {
          console.log('Data posted successfully:', response);
  
          // Convert the ArrayBuffer data to a Blob
          const dataBlob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
          // Set the desired filename using the employee Id
          // const fileName = `Report_${item.emp_id}.xlsx`;
          const fileName = `Report.xlsx`;
  
          // Create a temporary URL for the Blob
          const downloadUrl = URL.createObjectURL(dataBlob);
  
          // Create a temporary link and trigger the download
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = fileName; // Set the desired filename for the download
          a.click();
  
          // Clean up the temporary URL and link
          URL.revokeObjectURL(downloadUrl);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
}


}