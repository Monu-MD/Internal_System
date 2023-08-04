import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-report-bulk-choose',
  templateUrl: './report-bulk-choose.component.html',
  styleUrls: ['./report-bulk-choose.component.css']
})
export class ReportBulkChooseComponent {

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  downloadReport(array: number) {  
    const url = 'http://localhost:4000/report/displayReport'; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { button: array };

    this.http.post(url, body, { headers, responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const fileName = 'report.xlsx'; 
        this.saveFile(response, fileName);
      },
      (error) => {
        console.error('Error downloading report', error);
      }
    );
  }

  private saveFile(blobContent: Blob, fileName: string) {
    const blob = new Blob([blobContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fileSaver.saveAs(blob, fileName);
  }
  
}
