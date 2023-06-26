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
  emp_data:any



  constructor(private http: HttpClient, private router: Router) { }




  setData(value: any): void {
    console.log(value);

    this.user_name = value.ename;
    this.user_id = value.eid;
    this.user_type = value.emp_access;
    this.emp_data=value.Emp_Master_Tbl[0];

  }
  setNotification(notification: any) {
    this.notification = notification
  }

  getData(): any {
    return [this.user_id, this.user_name, this.user_type, this.notification,this.emp_data]
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
      },
      (error: any) => {
        console.error('API Error:', error);

      }
    );
  }



}
