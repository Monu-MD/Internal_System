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

  isSuccess: boolean = false;
  isError: boolean = false;
  message: string = '';

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
    const notificationDuration = 3000; // Duration in milliseconds (3 seconds)
    
    this.http.get(url).subscribe(
      (response:any) => {
        console.log(`Email sent for document: ${docId} for employee ID: ${empId}`);
        console.log(response);

        // Show success notification
        this.isSuccess = true;
        this.isError = false;
        this.message = 'Document sent successfully!!';

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

      },
      (error: any) => {
        console.error('Error sending email:', error);
        // Handle error, e.g., show an error message to the user
        this.isSuccess = false;
        this.isError = true;
        this.message = 'An error occurred while approving the request';

      }
    );
  }


}
