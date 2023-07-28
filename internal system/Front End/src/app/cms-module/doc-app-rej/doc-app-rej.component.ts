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
  selector: 'app-doc-app-rej',
  templateUrl: './doc-app-rej.component.html',
  styleUrls: ['./doc-app-rej.component.css']
})
export class DocAppRejComponent {

  isSuccess: boolean = false;
  isError: boolean = false;
  message: string = '';


  employeeData: any;
  user_id: any;
  user_access: any;

  constructor(private http: HttpClient, private loginservice: LoginServiceService, private cmsService: CmsService, private router: Router) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
    this.user_access = user[2];
  }

  ngOnInit() {
    var gotId = this.cmsService.getCMSempID();
    if (gotId != null) {
      this.user_id = gotId;
      console.log(this.user_id + "admin sending Id");

    }
    var eid = this.user_id;
    console.log("current user ID: ---" + eid);
    this.fetchEmployeeData();

    // Fetch employee data on component initialization
  }

  fetchEmployeeData() {
    const params = new HttpParams().set('user_id', this.user_id.toString())
      .set('user_access', this.user_access.toString())

    this.http.get('http://localhost:4000/cms/cmsViewEmployee', { params }).subscribe(
      (response: any) => {
        console.log(response);
        this.employeeData = response;
        
      },
      (error) => {
        console.error('Error fetching employee data:', error);
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

  approve(doc: string) {
    console.log("approve entered");
    const empId = this.employeeData?.eid;
    const notificationDuration = 3000; // Duration in milliseconds (3 seconds)

    if (!empId || !doc) {
      console.error("Required data not found in employeeData.");
      return;
    }

    const params = new HttpParams()
      .set('empId', empId)
      .set('doc', doc);

    this.http.get('http://localhost:4000/cms/cmsApprIndvAdmin', { params }).subscribe(
      (response) => {
        console.log(response);
        console.log("Document Aprroved Sucessfully");
         // Show success notification
         this.isSuccess = true;
         this.isError = false;
         this.message = 'Document approved successfully!';
 
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
        this.fetchEmployeeData();
      },
      (error) => {
        console.error(error);
        console.log("Opp's!!!! failed to Approve");
        // Show error notification
        this.isSuccess = false;
        this.isError = true;
        this.message = 'An error occurred while approving the Document';
      }
    );

  
  }



  rejectReason: { [key: string]: string } = {};

  Reject(doc: string) {
    console.log("Reject entered");
    const empId = this.employeeData?.eid;
    const notificationDuration = 3000; // Duration in milliseconds (3 seconds)

    if (!empId || !doc || !this.rejectReason[doc]) {
      console.error("Required data not found in employeeData.");
      return;
    }
    const params = new HttpParams()
      .set('empId', empId)
      .set('doc', doc)
      .set('reas', this.rejectReason[doc]);

    this.http.get('http://localhost:4000/cms/cmsApprRejectAdmin', { params }).subscribe(
      (response) => {
        console.log(response);
        console.log("Document Rejected Sucessfully");
          // Show success notification
          this.isSuccess = true;
          this.isError = false;
          this.message = 'Document Rejected successfully!';
  
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

        this.fetchEmployeeData();
      },
      (error) => {
        console.error(error);
        console.log("Opp's!!!! failed to Reject");
         // Show error notification
         this.isSuccess = false;
         this.isError = true;
         this.message = 'An error occurred while approving the Document';
 
      }
    );
   

  }

































  //single data approve
  // approve() {
  //   console.log("approve entered");
  //   const  empId = this.employeeData?.eid; 
  //   const doc = this.employeeData?.govDocs; 



  //   console.log("empId"+empId);
  //   console.log("doc"+doc);



  //   if (!empId || !doc ) {
  //     console.error("Required data not found in employeeData.");
  //     return;
  //   }

  //   const params = new HttpParams()
  //     .set('empId', empId)
  //     .set('doc', doc);


  //   this.http.get('http://localhost:4000/cms/cmsApprIndvAdmin', { params }).subscribe(
  //     (response) => {
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }



  // approve() {
  //   console.log("approve entered");
  //   const empId = this.employeeData?.eid;
  //   const govDocsArray = this.employeeData?.govDocs;

  //   console.log("empId" + empId);
  //   console.log("govDocsArray" + govDocsArray);

  //   if (!empId || !govDocsArray) {
  //     console.error("Required data not found in employeeData.");
  //     return;
  //   }

  //   // Loop through each document in the govDocsArray
  //   govDocsArray.forEach((doc: string) => {
  //     const params = new HttpParams()
  //       .set('empId', empId)
  //       .set('doc', doc);

  //     this.http.get('http://localhost:4000/cms/cmsApprIndvAdmin', { params }).subscribe(
  //       (response) => {
  //         console.log(response);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );


  //   });
  // } 


}

