import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';
import { LoginServiceService } from 'src/app/services/login-service.service';


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
  selector: 'app-view-doc-status',
  templateUrl: './view-doc-status.component.html',
  styleUrls: ['./view-doc-status.component.css']
})
export class ViewDocStatusComponent {


  employeeData: EmployeeDocument | undefined;

  user_id: any;
  user_access: any;
  emp_Id: any;

  constructor(private http: HttpClient, private loginservice: LoginServiceService, private cmsService: CmsService) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
    this.user_access = user[2];
  }

  ngOnInit() {
    console.log("current user ID: ---" + this.user_id);
    this.pendingDoc();
  }

  pendingDoc() {
    const params = new HttpParams().set('user_id', this.user_id.toString())
    // .set('user_access', this.user_access.toString())
    console.log("status Api called");

    this.http.get('http://localhost:4000/cms/cmsPenViewSts', { params }).subscribe(
      (response: any) => {
        console.log( "Pending Data \n");
        console.log( response);
        this.employeeData = response;
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }


}
