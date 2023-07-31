import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';


interface RejectedDocument {
  rlen: number;
  rdocs: string[];
  rreas: string[];
  rpath: string[];
  

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

  constructor(private http: HttpClient, private loginservice: LoginServiceService, private router: Router) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
    this.user_access = user[2];
  }

  ngOnInit() {
    console.log("current user ID: ---" + this.user_id);
    this.rejectDoc();
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



  
  private readonly apiUrl = 'http://localhost:4000/cms/cmsDeleteRejDocEmployee';
  deleteDocument(doc: string, empId: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    const notificationDuration = 3000;
    this.http.delete(`${this.apiUrl}?empId=${empId}&doc=${doc}`, options).subscribe(
      (response: any) => {
        console.log('Document deleted successfully:', response);
         this.isSuccess = true;
         this.isError = false;
         this.message = 'Document Deleted!!!';
 
         setTimeout(() => {
           this.isSuccess = false;
           this.message = '';
          }, notificationDuration);

          setTimeout(() => {
            const notificationElement = document.querySelector('.notification');
            if (notificationElement) {
              notificationElement.classList.add('show');
            }
          }, 100);
          
        this.router.navigate(['/viewDocs']);
      },
      (error) => {
        console.error('Error deleting document:', error);
      }
    );
  }
}
