import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeadderComponent } from '../../common/headder/headder.component'
import { HttpClient } from '@angular/common/http';

// Define the EmployeeDocument interface before the component class
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
  ename: string;
  eid: string;
  emp_access: string;
}


@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css']
})
export class ViewDocumentsComponent {
 
  employeeData: EmployeeDocument | undefined;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchEmployeeData(); // Fetch employee data on component initialization
  }

  fetchEmployeeData() {
    // Replace the URL with the actual API endpoint to fetch employee data
    const apiUrl = 'http://localhost:4000/cms/cmsViewEmployee';
    
    this.http.get<EmployeeDocument>(apiUrl).subscribe(
      (data: EmployeeDocument) => {
        console.log(data+"-=-=-=-=--=-=-=-***");
        this.employeeData = data;
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }

  // Function to trigger file download
  downloadFile(docId: string, empId: string): void {
    const url = `/cmsViewEmployee?id=${docId}&empId=${empId}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Create a link element to download the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(response);
        link.download = docId; // Set the desired filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        // Handle error, if any
        console.error('Error downloading document:', error);
      }
    );
  }

  onSubmit(formData: any) {
    // Implement form submission logic here.
  }

}
