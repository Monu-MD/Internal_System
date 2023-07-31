import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';


interface RejectedDocument {
  govDocs1: string[];
  govLen1: number;
  eduDocs1: string[];
  eduLen1: number;
  medDocs1: string[];
  medLen1: number;
  expDocs1: string[];
  expLen1: number;
  phDocs1: string[];
  phLen1: number;
  resDocs1: string[];
  resLen1: number;
  othrDocs1: string[];
  othrLen1: number;
  hrDocs1: string[];
  hrLen1: number;
  cerDocs1: string[];
  cerLen1: number;
  bgDocs1: string[];
  bgLen1: number;

  eid: string;
}

@Component({
  selector: 'app-rej-doc',
  templateUrl: './rej-doc.component.html',
  styleUrls: ['./rej-doc.component.css']
})
export class RejDocComponent {

  
  rejetedData: RejectedDocument | undefined;
  
  isSuccess: boolean = false;
  isError: boolean = false;
  message: string = '';


  employeeData: any;
  user_id: any;
  user_access: any;

  constructor(private http: HttpClient, private loginservice: LoginServiceService) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
    this.user_access = user[2];
  }

  ngOnInit() {

    console.log("current user ID: ---" + this.user_id);
    this.rejectDoc();

    // Fetch employee data on component initialization
  }

  
  rejectDoc() {
    const params = new HttpParams().set('user_id', this.user_id.toString())
    // .set('user_access', this.user_access.toString())

    this.http.get('http://localhost:4000/cms/cmsRejViewSts', { params }).subscribe(
      (response: any) => {
        console.log( "Rejected Data \n");
        console.log( response);
        this.rejetedData = response;
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }

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
