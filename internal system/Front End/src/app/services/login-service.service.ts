import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginServiceService {
  eid: any;
  ename: any;
  emp_access: any;

  data: any;
  phtotUrl: any;
  notification: any;
  asset: any;
  emp_data: any;
  leave_master: any;
  project_data: any;
  adminDashboard: any;
  approvalData: any[] = [];
  viewAproval: any;
  cocd: any[] = []

  leid: any;
  lename: any;
  lemp_access: any;


  constructor(private http: HttpClient, private router: Router) {}


  setData(value: any): void {
    this.eid = value.user_id;
    this.ename = value.user_name;
    this.emp_access = value.user_type
    this.project_data = value.projectId
  }

  setViewAproval(value: any) {
    this.viewAproval = value;
    console.log(this.viewAproval);
  }

  setEmp_master_Tbl(value: any) {
    this.emp_data = value
  }

  set_project_tbl(value: any) {
    this.project_data = value;
  }
  setNotification(notification: any) {
    this.notification = notification
  }

  setAsset(value: any) {
    this.asset = value;
  }

  setLeaveMaster(leave_master: any) {
    this.leave_master = leave_master;
  }
  setAdminDashBoard(value: any) {
    this.adminDashboard = value
  }

  getData(): any {
    return [
      this.eid,
      this.ename,
      this.emp_access,

      this.notification,
      this.emp_data,
      this.leave_master,
      this.project_data,
      this.adminDashboard,
      this.approvalData,
      this.viewAproval,
      this.cocd,
      this.asset
    ]
  }


    ///////////////////// Setting and getting to Local storage  //////////////////////////
    setEmpData() {
      let data = {
        eid: this.eid,
        ename: this.ename,
        emp_access: this.emp_access
      }
  
      console.log("Setting sessionstorage: " + data);
      const myData = JSON.parse(JSON.stringify(data))
      console.log(myData);
  
      sessionStorage.setItem('EmpData', JSON.stringify(data));
    }
  
    loadData() {
      let data: any = sessionStorage.getItem('EmpData');
      return data;
    }
    //////////////////////////////////////////////////////////////////

  getData1(): any {
    console.log("calling session get Method.....");
    this.sesionStorage();
    return [
      this.leid,
      this.lename,
      this.lemp_access,
    ]
  }

  sesionStorage() {    
    const localData = this.loadData();
    const myData1 = JSON.parse(localData);
    this.leid = myData1.eid;
    this.lename = myData1.ename;
    this.lemp_access = myData1.emp_access;
  }

  forget(data: any): void {
    this.http.post('http://localhost:4000/forgotpwd', data).subscribe(
      (response: any) => {
        alert(response.notification)

        console.log(response.message);
        console.log(response.notification);
        alert(response.notification)
        this.data = response.Data.user_name;


        if (response.message == 'redirect to login') {

          this.router.navigate(['/'])

        }
        if (response.message == 'redirect to reset') {

          this.router.navigate(['/changePassword'])

        }
      },
      (error: any) => {
        console.error('API Error:', error);
        console.log(this.notification);
      }
    );
  }

}