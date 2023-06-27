import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  user_name: any;
  user_id: any;
  user_type: any;
  data: any;
  phtotUrl: any;
  notification: any;
  emp_data: any



  constructor(private http: HttpClient, private router: Router) { }




  setData(value: any): void {
    console.log(value);
    if (value.emp_name != null) {

      this.user_name = value.emp_name;
    }
    else{
      this.user_name = value.ename;

    }
    if (value.emp_id) {
      this.user_id = value.emp_id;

    }else{

      this.user_id = value.eid;
    }

    this.user_type = value.emp_access;
  }

  setEmp_master_Tbl(value: any) {
    this.emp_data = value[0]
  }
  setNotification(notification: any) {
    this.notification = notification
  }

  getData(): any {
    return [this.user_id, this.user_name, this.user_type, this.notification, this.emp_data]
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
