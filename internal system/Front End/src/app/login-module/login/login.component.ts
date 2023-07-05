import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  notification: any;




  constructor(private service: LoginServiceService,
    private router: Router, private http: HttpClient) {
    const user = this.service.getData();
    this.notification = user[3]
  }


  employeeId: any;
  Login = new FormGroup<any>({
    userid: new FormControl(''),
    password: new FormControl('')

  })
  login(item: any) {


    console.log(item);
    if (item.userid != "" || item.password != "") {

      this.loginData(item)
    } else {
      this.notification = "Enter login id or password"
    }

  }

  ///// login api///////////
  loginData(data: any): void {
    this.http.post('http://localhost:4000/login', data).subscribe(
      (response: any) => {
        console.log(response);

        this.notification = response.notification;
        if (response.message == 'redirect to admin dashboard') {
          this.service.setData(response.userData)
          this.service.setAdminDashBoard(response.Data)
          this.router.navigate(['/admindashboard'])

        }
        if (response.message == 'redirect to dashboard') {
          this.service.setData(response.Data.user_details)
         

          this.service.setEmp_master_Tbl(response.Data.emp_details)
          this.service.setLeaveMaster(response.Data.leave_master)

          this.notification = response.notification
          this.router.navigate(['/dashboard'])

        }
        else if (response.message == 'redirect to login') {

          this.router.navigate(['/'])

        }
        else if (response.message == 'redirect to reset') {
          this.service.setData(response.data)
          this.router.navigate(['/changePassword'])

        }
      },
      (error: any) => {
        console.error('API Error:', error);

      }
    );
  }



  forgetpas(item: any) {
    console.log("this is ts ", item);

    if (item != null) {
      this.service.forget(item)
    }
    else {
      alert("enter user id")
    }
  }
}