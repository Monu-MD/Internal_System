import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-list2',
  templateUrl: './document-list2.component.html',
  styleUrls: ['./document-list2.component.css']
})

export class DocumentList2Component {


  @Input() header: string;
  @Input() documents: string[];
  @Input() employeeData: any; // Update the input to accept employeeData

  constructor(private http: HttpClient, private router: Router) {
    this.header = ''; 
    this.documents = []; 
  }

  isSuccess: boolean = false;
  isError: boolean = false;
  message: string = '';



  private readonly apiUrl = 'http://localhost:4000/cms/cmsDeletePenDocEmployee';
  deleteDocument(doc: string, empId: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    this.http.delete(`${this.apiUrl}?empId=${empId}&doc=${doc}`, options).subscribe(
      (response: any) => {
        console.log('Document deleted successfully:', response);
        this.router.navigate(['/viewDocs']);
      },
      (error) => {
        console.error('Error deleting document:', error);
      }
    );
  }


}
