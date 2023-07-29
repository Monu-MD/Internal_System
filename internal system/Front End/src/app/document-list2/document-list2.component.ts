import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-document-list2',
  templateUrl: './document-list2.component.html',
  styleUrls: ['./document-list2.component.css']
})
export class DocumentList2Component {

  
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

  private readonly apiUrl = 'your-api-endpoint';
  deleteDocument(docId: string, empId: string): void {
    // Make sure to set the appropriate headers if required by your API (e.g., authentication token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other required headers here
    });

    // Make the DELETE request
    this.http.delete(`${this.apiUrl}/${empId}`, { headers })
      .subscribe(
        (response) => {
          // Handle the response if needed (e.g., show a success message)
          console.log('Document deleted successfully:', response);
        },
        (error) => {
          // Handle the error if the API call fails (e.g., show an error message)
          console.error('Error deleting document:', error);
        }
      );
  }

}
