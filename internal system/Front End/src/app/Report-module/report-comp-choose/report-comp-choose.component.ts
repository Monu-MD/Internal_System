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

  compReport = new FormGroup<any>({
    module: new FormControl('', [Validators.required]),
    emp_id: new FormControl('', [Validators.required]),    
  });



  postData(item: any) {
    const postData = {
      emp_id: item.emp_id,
      module: item.module,
    };
  
    this.http.post('http://localhost:4000/report/getReport', postData, { responseType: 'arraybuffer' })
      .subscribe(
        (response: ArrayBuffer) => {
          console.log('Data posted successfully:', response);
  
          // Convert the ArrayBuffer data to a Blob
          const dataBlob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
          // Set the desired filename using the employee Id
          const fileName = `Report_${item.emp_id}.xlsx`;
  
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
  
  onSubmit(item: any) {
    console.log(item);
    if (this.compReport.valid) {
      this.postData(item);
    } else {
      console.log('Form is invalid. Please check the input values.');
    }

  }
}
