import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
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
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css']
})
export class ViewDocumentsComponent {

  employeeData: EmployeeDocument | undefined;
  user_id: any;
  user_access: any;


  constructor(private http: HttpClient, private loginservice: LoginServiceService) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
    this.user_access = user[2];
  }

  ngOnInit() {
    this.fetchEmployeeData(); // Fetch employee data on component initialization
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

  
}
