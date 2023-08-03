import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-comp-choose',
  templateUrl: './report-comp-choose.component.html',
  styleUrls: ['./report-comp-choose.component.css']
})
export class ReportCompChooseComponent {

  constructor(private http: HttpClient) { }

  register = new FormGroup<any>({
    emp_id: new FormControl('', [Validators.required]),
    module: new FormControl('', [Validators.required]),
  });

  postData(item: any) {
    const postData = {
      emp_id: item.emp_id,
      module: item.module,
    };
    this.http.post('http://localhost:4000/report/getReport', postData)
      .subscribe(
        (response: any) => {
          console.log('Data posted successfully:', response);
          // Handle the response data from the backend here if needed
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

  onSubmit(item: any) {
    console.log(item);
    if (this.register.valid) {
      this.postData(item);
    } else {
      // Handle the form validation errors here
      console.log('Form is invalid. Please check the input values.');
    }
  }
}






// ngOnInit() {
//   this.fetchData();
// }
// fetchData() {
//   this.http.get('http://localhost:4000/report/reportCompChoose').subscribe(
//     (response: any) => {
//       console.log(response.data);
     

      
//     },
//     (error: any) => {
//       console.error('Error:', error);
//     }
//   );
// }






