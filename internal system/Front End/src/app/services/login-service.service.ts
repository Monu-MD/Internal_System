import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  ename: any;
  eid: any;
  emp_access: any;
  data: any;
  phtotUrl: any;
  notification: any;
  emp_data: any;
  leave_master:any;



  constructor(private http: HttpClient, private router: Router) { }




  setData(value: any): void {
    this.ename = value.user_name;
    this.eid = value.user_id;
    this.emp_access = value.user_type
  }

  setEmp_master_Tbl(value: any) {
    this.emp_data = value
  }
  setNotification(notification: any) {
    this.notification = notification
  }
  setLeaveMaster(leave_master:any){
    this.leave_master=leave_master;
  }

  getData(): any {
    return [this.eid, this.ename, this.emp_access, this.notification, this.emp_data,this.leave_master]
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
