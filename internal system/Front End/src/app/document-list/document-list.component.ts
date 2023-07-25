import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {

  @Input() header: string;
  @Input() documents: string[];
  @Input() employeeData: any; // Update the input to accept employeeData

  constructor(private http: HttpClient) {
    this.header = ''; // Initialize the property in the constructor
    this.documents = []; // Initialize the property in the constructor
  }

  // downloadFile(doc: string, empId: string) {
  //   // Implement the logic to download the file using doc and empId
  //   // For example:
  //   console.log(`Downloading file: ${doc} for employee ID: ${empId}`);
  // }


  // Function to trigger file download
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


   // Function to trigger email sending
   sendEMail(docId: string, empId: string, empAccess: string): void {
    const url = `http://localhost:4000/cms/cmsMailDoc?id=${docId}&empId=${empId}&empAccess=${empAccess}`;
    this.http.get(url).subscribe(
      () => {
        console.log(`Email sent for document: ${docId} for employee ID: ${empId}`);
        // You can add any logic here to show a success message or update UI after sending email
      },
      (error: any) => {
        console.error('Error sending email:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }


}
