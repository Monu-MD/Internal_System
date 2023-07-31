import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { CmsService } from 'src/app/services/cms.service';
import { Router } from '@angular/router';

interface EmployeeDocument {
  govDocs: string[];
  govLen: number;
  eduDocs: string[];
  eduLen: number;
  medDocs: string[];
  medLen: number;
  expDocs: string[];
  expLen: number;
  phDocs: string[];
  phLen: number;
  resDocs: string[];
  resLen: number;
  othrDocs: string[];
  othrLen: number;
  hrDocs: string[];
  hrLen: number;
  cerDocs: string[];
  cerLen: number;
  bgDocs: string[];
  bgLen: number;

  eid: string;
  ename: string;
  emp_access: string;
}

@Component({
  selector: 'app-view-magzine',
  templateUrl: './view-magzine.component.html',
  styleUrls: ['./view-magzine.component.css']
})
export class ViewMagzineComponent {

  rowData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get('http://localhost:4000/cms/magazineViewAdmin').subscribe(
      (response: any) => {
        console.log(response.data);
        this.rowData = response.data;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }





  downloadFile(docId: string, empId: string): void {
    const url = `http://localhost:4000/cms/downloadFile?id=${docId}&empId=${empId}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Create a link element to download the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(response);
        link.download = docId; // Set the desired filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(`Downloading file: ${docId} for employee ID: ${empId}`);
      },
      (error: any) => {
        // Handle error, if any
        console.error('Error downloading document:', error);
      }
    );
  }



}
